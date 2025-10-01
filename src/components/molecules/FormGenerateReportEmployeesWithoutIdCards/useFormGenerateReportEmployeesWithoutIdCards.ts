import { useState } from "react";
import { useForm } from "react-hook-form";
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

// Interface for the form data
interface EmployeeReportFormType {
  start_date: string;
  end_date: string;
}

// Interface for employee without ID card data from API
interface EmployeeWithoutIdCardData {
  id: number;
  card_number: string;
  left_at: string | null;
  comments: string | null;
  id_employee: number;
  id_employee_receiver: number | null;
  id_company: number;
  id_gaveleave_user: number;
  status: string;
  soft_delete: boolean;
  id_creator_user: number;
  creator_date: string;
  id_modifier_user: number;
  modifier_date: string;
  employee: {
    id: number;
    identification_number: string;
    code: string;
    name: string;
    email: string;
    type: string;
    id_identification_type: number;
    id_active_entry_employee: number | null;
    status: string;
    soft_delete: boolean;
    id_creator_user: number;
    creator_date: string;
    id_modifier_user: number;
    modifier_date: string;
    identification_type: {
      id: number;
      code: string;
      description: string;
      status: string;
      soft_delete: boolean;
      id_creator_user: number | null;
      creator_date: string;
      id_modifier_user: number | null;
      modifier_date: string;
    };
  };
  employee_receiver?: {
    id: number;
    identification_number: string;
    code: string;
    name: string;
    email: string;
    type: string;
    id_identification_type: number;
    id_active_entry_employee: number | null;
    status: string;
    soft_delete: boolean;
    id_creator_user: number;
    creator_date: string;
    id_modifier_user: number;
    modifier_date: string;
    identification_type: {
      id: number;
      code: string;
      description: string;
      status: string;
      soft_delete: boolean;
      id_creator_user: number | null;
      creator_date: string;
      id_modifier_user: number | null;
      modifier_date: string;
    };
  };
  company?: {
    id: number;
    nit: string;
    short_description: string;
    long_description: string;
    address: string;
    email: string;
    status: string;
    soft_delete: boolean;
    id_creator_user: number;
    creator_date: string;
    id_modifier_user: number;
    modifier_date: string;
  };
}

// Interface for processed data to show in table
interface ProcessedEmployeeData {
  id: number;
  identification_type: string | null;
  identification_number: string | null;
  full_name: string | null;
  entry_date: string | null;
  exit_date: string | null;
  card_number: string | null;
  employee_receiver: string | null;
  company: string | null;
  observations: string | null;
}

//Texts
const TRANS = {
  success_generate_report: {
    id: "FormGenerateReportEmployeesWithoutIdCards.SuccessMessage.GenerateReport",
    defaultMessage: "Reporte de empleados sin carné generado exitosamente.",
    description: "",
  },
  error_invalid_date_range: {
    id: "FormGenerateReportEmployeesWithoutIdCards.ErrorMessage.InvalidDateRange",
    defaultMessage: "La fecha final debe ser mayor o igual a la fecha inicial.",
    description: "",
  },
  error_date_range_too_large: {
    id: "FormGenerateReportEmployeesWithoutIdCards.ErrorMessage.DateRangeTooLarge",
    defaultMessage: "El rango de fechas no puede ser mayor a 2 años.",
    description: "",
  },
  error_dates_required: {
    id: "FormGenerateReportEmployeesWithoutIdCards.ErrorMessage.DatesRequired",
    defaultMessage: "Las fechas de inicio y fin son obligatorias.",
    description: "",
  },
};

export default function useFormGenerateReportEmployeesWithoutIdCards() {
  const TEXTS = useTranslation(TRANS);
  const GTEXTS = useTranslation(GTRANS);

  const { openModalLoginForm } = useSessionProviderHook();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<EmployeeReportFormType>({
    
  });

  // Set default dates to today
  const [valueStart, setValueStart] = useState<Dayjs | null>(dayjs());
  const [valueEnd, setValueEnd] = useState<Dayjs | null>(dayjs());
  const [isInnerLoading, setIsInnerLoading] = useState(false);
  const [reportData, setReportData] = useState<ProcessedEmployeeData[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [okMessage, errorMessage, changeOkMessage, changeErrorMessage, hideMessages] = useFormMessages();


  const isValidForm = () => {
    // Check if dates are provided
    if (!valueStart || !valueEnd) {
      changeErrorMessage(TEXTS.error_dates_required);
      return false;
    }

    if (valueEnd.isBefore(valueStart)) {
      changeErrorMessage(TEXTS.error_invalid_date_range);
      return false;
    }

    // Validate that the date range is not too large (optional - max 2 years)
    const daysDifference = valueEnd.diff(valueStart, 'days');
    if (daysDifference > 730) {
      changeErrorMessage(TEXTS.error_date_range_too_large);
      return false;
    }

    return true;
  };

  /**
   * Formats the API response data to match our interface
   */
  const formatEmployeeData = (rawData: EmployeeWithoutIdCardData[]): ProcessedEmployeeData[] => {

    return rawData?.map((item: EmployeeWithoutIdCardData) => {
      return {
        id: item.id,
        identification_type: item.employee.identification_type?.code || '',
        identification_number: item.employee.identification_number || '',
        full_name: item.employee.name || '',
        entry_date: item.creator_date || '',
        exit_date: item.left_at || null,
        card_number: item.card_number || '',
        employee_receiver: item.employee_receiver?.name || null,
        company: item.company?.short_description || 'N/A',
        observations: item.comments || null,
      };
    });
  };

  /**
   * Handles the form submission and fetches employee report data
   */
  const onSubmit = async (data: EmployeeReportFormType) => {
    console.log("🚀 ~ onSubmit ~ data:", data)
    try {
      if (isInnerLoading) {
        return;
      }

      if (!isValidForm()) {
        return;
      }

      setIsInnerLoading(true);
      hideMessages();

      const startDate = valueStart?.format('YYYY-MM-DD') || "";
      const endDate = valueEnd?.format('YYYY-MM-DD') || "";

      // Call the service to get employees without ID cards report
      const response = await Orchestra.generateReportsService.historyEmployeesWithoutIdCards(
        startDate,
        endDate
      );


      // Handle the API response - it could be wrapped in a data property or be the raw array
      let rawData: EmployeeWithoutIdCardData[] = [];
      if (Array.isArray(response)) {
        rawData = response;
      } else if (response.data && Array.isArray(response.data)) {
        rawData = response.data;
      } else if (response.employees && Array.isArray(response.employees)) {
        rawData = response.employees;
      } else {
        console.warn('Unexpected API response structure:', response);
        rawData = [];
      }

      const formattedData = formatEmployeeData(rawData);

      setReportData(formattedData);
      setPage(0); // Reset to first page when new data is loaded

      if (formattedData.length > 0) {
        changeOkMessage(TEXTS.success_generate_report);
      } else {
        changeErrorMessage("No se encontraron registros para el rango de fechas seleccionado");
      }

    } catch (catchError) {
      console.error("Error fetching employee report:", catchError);
      
      if (catchError instanceof AuthError) {
        openModalLoginForm();
        return;
      }

      if (catchError instanceof LocalError || catchError instanceof ValidationError) {
        changeErrorMessage(catchError.message);
      } else {
        changeErrorMessage(GTEXTS.error_something_went_wrong);
      }
    } finally {
      setIsInnerLoading(false);
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
   * Exports employee report data to XLSX
   */
  const exportToXLSX = () => {
    if (reportData.length === 0) {
      changeErrorMessage("No hay datos para exportar");
      return;
    }

    const data = reportData.map(item => ({
      'Tipo de Identificación': item.identification_type || '',
      'Número de Identificación': item.identification_number || '',
      'Nombre Completo': item.full_name || '',
      'Fecha de Ingreso a la Empresa': item.entry_date ? dayjs(item.entry_date).format('DD/MM/YYYY HH:mm') : '',
      'Fecha de Salida de la Empresa': item.exit_date ? dayjs(item.exit_date).format('DD/MM/YYYY HH:mm') : '',
      'Número de Ficha': item.card_number || '',
      'Empleado que Recibe': item.employee_receiver || '',
      'Empresa': item.company || '',
      'Observación': item.observations || ''
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Empleados sin Carné');

    // Auto-adjust column widths
    const colWidths = Object.keys(data[0] || {}).map(header => ({
      wch: Math.max(header.length, 20)
    }));
    worksheet['!cols'] = colWidths;

    // Generate filename with current date
    const filename = `empleados_sin_carne_${dayjs().format('YYYY-MM-DD_HH-mm')}.xlsx`;
    
    XLSX.writeFile(workbook, filename);
    changeOkMessage("Archivo Excel descargado exitosamente");
  };

  /**
   * Exports employee report data to CSV
   */
  const exportToCSV = () => {
    if (reportData.length === 0) {
      changeErrorMessage("No hay datos para exportar");
      return;
    }

    const headers = [
      'Tipo de Identificación',
      'Número de Identificación',
      'Nombre Completo',
      'Fecha de Ingreso a la Empresa',
      'Fecha de Salida de la Empresa',
      'Número de Ficha',
      'Empleado que Recibe',
      'Empresa',
      'Observación'
    ];

    // Add BOM to support UTF-8 encoding for accents and special characters
    const BOM = '\uFEFF';
    const csvContent = BOM + [
      headers.join(','),
      ...reportData.map(item => [
        `"${item.identification_type}"`,
        `"${item.identification_number}"`,
        `"${item.full_name}"`,
        `"${item.entry_date ? dayjs(item.entry_date).format('DD/MM/YYYY HH:mm') : ''}"`,
        `"${item.exit_date ? dayjs(item.exit_date).format('DD/MM/YYYY HH:mm') : ''}"`,
        `"${item.card_number}"`,
        `"${item.employee_receiver || ''}"`,
        `"${item.company}"`,
        `"${item.observations || ''}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `reporte_empleados_sin_carnes_${dayjs().format('YYYY-MM-DD_HH-mm')}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    changeOkMessage("Archivo CSV descargado exitosamente");
  };

  return {
    // Form controls
    errors,
    register,
    handleSubmit,
    onSubmit,
    
    // Date controls
    valueStart,
    setValueStart,
    valueEnd,
    setValueEnd,
    
    // Data and state
    isInnerLoading,
    reportData,
    page,
    rowsPerPage,
    
    // Messages
    message: okMessage,
    error: errorMessage,
    hideMessages,
    
    // Functions
    isValidForm,
    handleChangePage,
    handleChangeRowsPerPage,
    exportToCSV,
    exportToXLSX,
  };
}
