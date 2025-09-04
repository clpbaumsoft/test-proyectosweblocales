
import { useState } from "react";
import dayjs, { Dayjs } from 'dayjs';
import * as XLSX from 'xlsx';

//Constants
import { GTRANS } from "@/constants/Globals";

//Errors
import AuthError from "@/errors/AuthError";
import LocalError from "@/errors/LocalError";
import ValidationError from "@/errors/ValidationError";

//Hooks
import useFormMessages from "@/hooks/useFormMessages";
import useSessionProviderHook from "@/providers/SessionProvider/hooks";
import useTranslation from "@/hooks/useTranslation";

//Services
import Orchestra from "@/services/Orchestra";

// Interfaces for the API response structure
interface BaseUser {
  identification_number: string;
  first_name: string | null;
  middle_name: string | null;
  first_last_name: string | null;
  second_last_name: string | null;
  phone: string | null;
  email: string | null;
  id_identification_type: number | null;
  status: string;
  soft_delete: boolean;
  id_creator_user: number | null;
  creator_date: string;
  id_modifier_user: number | null;
  modifier_date: string;
  is_admin: number;
  fullname: string;
  unique_permissions: string[];
}

interface VisitorType {
  id: number;
  short_description: string;
  long_description: string | null;
  requirements: string | null;
  status: string;
  soft_delete: boolean;
  id_creator_user: number;
  creator_date: string;
  id_modifier_user: number | null;
  modifier_date: string;
}

interface VisitorData {
  id: number;
  fullname: string;
  first_name: string;
  middle_name: string | null;
  first_last_name: string;
  second_last_name: string | null;
  identification_number: string;
  id_identification_type: number;
  identification_type?: {
    id: number;
    code: string;
    description: string;
  };
}

interface VisitVisitor {
  id: number;
  id_visitor_type: number;
  id_visit: number;
  id_visitor: number;
  status: string;
  soft_delete: boolean;
  id_creator_user: number;
  creator_date: string;
  id_modifier_user: number | null;
  modifier_date: string;
  visitor_type_description: string;
  visitor_type: VisitorType;
  visitor?: VisitorData;
}

interface ApiVisitResponseItem {
  id: number;
  start_date: string;
  end_date: string;
  reason: string;
  reason_cancel: string | null;
  cancelled_at: string | null;
  approved_at: string | null;
  id_company: number;
  id_branch: number;
  id_gate: number;
  id_approver_docs_user: number | null;
  id_approver_user: number | null;
  id_cancelled_user: number | null;
  status: string;
  soft_delete: boolean;
  id_creator_user: number;
  creator_date: string;
  id_modifier_user: number | null;
  modifier_date: string;
  id_interventor_user: number | null;
  interventor: BaseUser | null;
  visit_visitors: VisitVisitor[];
  approver_docs: BaseUser | null;
}

// Interface for the processed visit report data (what we show in the table)
interface VisitReportData {
  id: number;
  created_at: string;
  reason: string;
  status: string;
  start_date: string;
  end_date: string;
  interventor_name: string;
  visitors_count: number;
  approver_name: string;
  document_verifier_name: string;
  visitor_first_name: string;
  visitor_middle_name: string;
  visitor_first_last_name: string;
  visitor_second_last_name: string;
  identification_type: string;
  identification_number: string;
  visitor_type: string;
}

//Texts
const TRANS = {
  success_generate_report: {
    id: "FormGenerateVisitisReport.SuccessMessage.GenerateReport",
    defaultMessage: "Reporte generado exitosamente.",
    description: "",
  },
  error_invalid_date_range: {
    id: "FormGenerateVisitisReport.ErrorMessage.InvalidDateRange",
    defaultMessage: "La fecha final debe ser mayor o igual a la fecha inicial.",
    description: "",
  },
  error_date_required: {
    id: "FormGenerateVisitisReport.ErrorMessage.DateRequired",
    defaultMessage: "Las fechas inicial y final son requeridas.",
    description: "",
  },
};

export default function useFormGenerateVisitisReport() {
  const TEXTS = useTranslation(TRANS);
  const GTEXTS = useTranslation(GTRANS);

  const { openModalLoginForm } = useSessionProviderHook();

  const [valueStart, setValueStart] = useState<Dayjs | null>(dayjs(new Date()));
  const [valueEnd, setValueEnd] = useState<Dayjs | null>(dayjs(new Date()));
  const [isInnerLoading, setIsInnerLoading] = useState(false);
  const [visitsData, setVisitsData] = useState<VisitReportData[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [okMessage, errorMessage, changeOkMessage, changeErrorMessage, hideMessages] = useFormMessages();

  /**
   * Validates the form before submission
   */
  const isValidForm = () => {
    if (!valueStart || !valueEnd) {
      changeErrorMessage(TEXTS.error_date_required);
      return false;
    }
    
    if (valueEnd.isBefore(valueStart)) {
      changeErrorMessage(TEXTS.error_invalid_date_range);
      return false;
    }

    // Validate that the date range is not too large (optional - max 2 years)
    const daysDifference = valueEnd.diff(valueStart, 'days');
    if (daysDifference > 730) {
      changeErrorMessage("El rango de fechas no puede ser mayor a 2 años.");
      return false;
    }
    
    return true;
  };

  /**
   * Formats the API response data to match our interface
   */
  const formatVisitData = (rawData: ApiVisitResponseItem[]): VisitReportData[] => {
    
    const result: VisitReportData[] = [];
    
    rawData.forEach((visitItem: ApiVisitResponseItem) => {
      
      const getStatusDescription = (status: string): string => {
        const statusMap: Record<string, string> = {
          '1': 'Pendiente',
          '2': 'Aprobada',
          '3': 'Rechazada',
          '4': 'Cancelada',
        };
        return statusMap[status] || status;
      };

      // If there are no visitors, create one row with visit info only
      if (!visitItem.visit_visitors || visitItem.visit_visitors.length === 0) {
        result.push({
          id: visitItem.id,
          created_at: visitItem.creator_date,
          reason: visitItem.reason,
          status: getStatusDescription(visitItem.status),
          start_date: visitItem.start_date,
          end_date: visitItem.end_date,
          interventor_name: visitItem.interventor?.fullname || '',
          visitors_count: 0,
          approver_name: visitItem.interventor?.fullname || '',
          document_verifier_name: visitItem.approver_docs?.fullname || '',
          visitor_first_name: '',
          visitor_middle_name: '',
          visitor_first_last_name: '',
          visitor_second_last_name: '',
          identification_type: '',
          identification_number: '',
          visitor_type: '',
        });
      } else {
        // Create one row per visitor
        visitItem.visit_visitors.forEach((visitVisitor) => {
          const visitor = visitVisitor.visitor;
          
          result.push({
            id: visitItem.id,
            created_at: visitItem.creator_date,
            reason: visitItem.reason,
            status: getStatusDescription(visitItem.status),
            start_date: visitItem.start_date,
            end_date: visitItem.end_date,
            interventor_name: visitItem.interventor?.fullname || '',
            visitors_count: visitItem.visit_visitors.length,
            approver_name: visitItem.interventor?.fullname || '',
            document_verifier_name: visitItem.approver_docs?.fullname || '',
            visitor_first_name: visitor?.first_name || '',
            visitor_middle_name: visitor?.middle_name || '',
            visitor_first_last_name: visitor?.first_last_name || '',
            visitor_second_last_name: visitor?.second_last_name || '',
            identification_type: visitor?.identification_type?.code || '',
            identification_number: visitor?.identification_number || '',
            visitor_type: visitVisitor.visitor_type?.short_description || '',
          });
        });
      }
    });

    return result;
  };

  /**
   * Handles the form submission and fetches visits data
   */
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    try {
      if (isInnerLoading) {
        return;
      }

      if (!isValidForm()) {
        return;
      }

      setIsInnerLoading(true);
      hideMessages();

      const startDate = valueStart?.format('YYYY-MM-DD');
      const endDate = valueEnd?.format('YYYY-MM-DD');

      const response = await Orchestra.generateReportsService.allVisits(startDate!, endDate!);
      
      // Handle the API response - it could be wrapped in a data property or be the raw array
      let rawData: ApiVisitResponseItem[] = [];
      if (Array.isArray(response)) {
        rawData = response;
      } else if (response.data && Array.isArray(response.data)) {
        rawData = response.data;
      } else if (response.visits && Array.isArray(response.visits)) {
        rawData = response.visits;
      } else {
        console.warn('Unexpected API response structure:', response);
        rawData = [];
      }
      
      const formattedData = formatVisitData(rawData);
      
      setVisitsData(formattedData);
      setPage(0);
      changeOkMessage(`${TEXTS.success_generate_report} (${formattedData.length} registros encontrados)`);
      setIsInnerLoading(false);
    } catch (catchError) {
      setIsInnerLoading(false);
      if (catchError instanceof AuthError) {
        return openModalLoginForm();
      }
      if (catchError instanceof LocalError || catchError instanceof ValidationError) {
        changeErrorMessage(catchError.message);
      } else {
        changeErrorMessage(GTEXTS.error_something_went_wrong);
      }
    }
  };

  /**
   * Handles page change for pagination
   */
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  /**
   * Handles rows per page change for pagination
   */
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  /**
   * Exports visits data to XLSX
   */
  const exportToXLSX = () => {
    if (visitsData.length === 0) {
      changeErrorMessage("No hay datos para exportar");
      return;
    }

    const data = visitsData.map(visit => ({
      'ID Visita': visit.id || '',
      'Fecha Creación': visit.created_at || '',
      'Descripción': visit.reason || '',
      'Estado': visit.status || '',
      'Fecha Inicial': visit.start_date || '',
      'Fecha Final': visit.end_date || '',
      'Interventor': visit.interventor_name || '',
      'Cant. Visitantes': visit.visitors_count || '',
      'Aprobó': visit.approver_name || '',
      'Verificador Docs': visit.document_verifier_name || '',
      'Primer Nombre': visit.visitor_first_name || '',
      'Segundo Nombre': visit.visitor_middle_name || '',
      'Primer Apellido': visit.visitor_first_last_name || '',
      'Segundo Apellido': visit.visitor_second_last_name || '',
      'Tipo Identificación': visit.identification_type || '',
      'Número Identificación': visit.identification_number || '',
      'Tipo Visitante': visit.visitor_type || ''
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte Visitas');

    // Auto-adjust column widths
    const colWidths = Object.keys(data[0] || {}).map(header => ({
      wch: Math.max(header.length, 20)
    }));
    worksheet['!cols'] = colWidths;

    // Generate filename with current date
    const filename = `reporte_visitas_${dayjs().format('YYYY-MM-DD_HH-mm')}.xlsx`;
    
    XLSX.writeFile(workbook, filename);
    changeOkMessage("Archivo Excel descargado exitosamente");
  };

  /**
   * Exports visits data to CSV
   */
  const exportToCSV = () => {
    if (visitsData.length === 0) {
      changeErrorMessage("No hay datos para exportar");
      return;
    }

    const headers = [
      'ID Visita',
      'Fecha Creación',
      'Descripción',
      'Estado',
      'Fecha Inicial',
      'Fecha Final',
      'Interventor',
      'Cant. Visitantes',
      'Aprobó',
      'Verificador Docs',
      'Primer Nombre',
      'Segundo Nombre',
      'Primer Apellido',
      'Segundo Apellido',
      'Tipo Identificación',
      'Número Identificación',
      'Tipo Visitante'
    ];
    
    // Add BOM to support UTF-8 encoding for accents and special characters
    const BOM = '\uFEFF';
    const csvContent = BOM + [
      headers.join(','),
      ...visitsData.map(visit => [
        visit.id,
        `"${visit.created_at}"`,
        `"${visit.reason.replace(/"/g, '""')}"`,
        `"${visit.status}"`,
        `"${visit.start_date}"`,
        `"${visit.end_date}"`,
        `"${visit.interventor_name}"`,
        visit.visitors_count,
        `"${visit.approver_name}"`,
        `"${visit.document_verifier_name}"`,
        `"${visit.visitor_first_name}"`,
        `"${visit.visitor_middle_name}"`,
        `"${visit.visitor_first_last_name}"`,
        `"${visit.visitor_second_last_name}"`,
        `"${visit.identification_type}"`,
        `"${visit.identification_number}"`,
        `"${visit.visitor_type}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `reporte_visitas_${dayjs().format('YYYY-MM-DD_HH-mm')}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    changeOkMessage("Archivo CSV descargado exitosamente");
  };

  return {
    valueStart,
    setValueStart,
    valueEnd,
    setValueEnd,
    isInnerLoading,
    visitsData,
    page,
    rowsPerPage,
    message: okMessage,
    error: errorMessage,
    hideMessages,
    isValidForm,
    onSubmit,
    handleChangePage,
    handleChangeRowsPerPage,
    exportToCSV,
    exportToXLSX,
  };
}