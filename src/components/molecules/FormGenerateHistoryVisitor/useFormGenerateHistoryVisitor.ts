
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import dayjs, { Dayjs } from 'dayjs';

//Constants
import { GTRANS, IDENTIFICATION_TYPE_CODE_CC } from "@/constants/Globals";

//Errors
import AuthError from "@/errors/AuthError";
import LocalError from "@/errors/LocalError";
import ValidationError from "@/errors/ValidationError";

//Hooks
import useFormMessages from "@/hooks/useFormMessages";
import useSessionProviderHook from "@/providers/SessionProvider/hooks";
import useTranslation from "@/hooks/useTranslation";

//Interfaces and types
import { IdentificationType } from "@/interfaces/Models";

//Services
import Orchestra from "@/services/Orchestra";

// Interface for the form data
interface VisitorHistoryFormType {
  identification_type: string | number;
  identification_number: string;
  start_date?: string;
  end_date?: string;
}

// Interface for visitor history data from API
interface VisitorHistoryData {
  id: number;
  card_number: string | null;
  left_at: string | null;
  emergency_contact_name: string | null;
  emergency_contact_phone: string | null;
  id_visit_visitor: number | null;
  id_carecompany: number | null;
  id_arlcompany: number | null;
  status: string | null;
  creator_date: string | null;
  carecompany: {
    id: number | null,
    name: string | null,
    status: string | null,
    soft_delete: boolean | null,
    id_creator_user: number,
    creator_date: string | null,
    id_modifier_user: number | null,
    modifier_date: string | null
  } | null;
  arlcompany: {
    id: number,
    name: string | null,
    status: string | null,
    soft_delete: boolean,
    id_creator_user: number | null,
    creator_date: string | null,
    id_modifier_user: number | null,
    modifier_date: string | null
  } | null;
  gaveleave_user: {
    identification_number: string;
    first_name: string;
    middle_name: string | null;
    first_last_name: string;
    second_last_name: string | null;
    fullname: string;
    unique_permissions?: string[] | null;
  };
  visit_visitor: {
    id: number;
    visitor_type_description: string;
    visit: {
      id: number;
      start_date: string;
      end_date: string;
      reason: string;
      interventor: {
        fullname: string;
      } | null;
    };
    visitor_type: {
      short_description: string;
    };
    visitor: {
      id: number;
      identification_number: string;
      first_name: string;
      middle_name: string | null;
      first_last_name: string;
      second_last_name: string | null;
      emergency_contact_name: string | null;
      emergency_contact_phone: string | null;
      fullname: string;
      identification_type: {
        id: number;
        code: string;
        description: string;
      };
    };
  };
}

// Interface for processed data to show in table
interface ProcessedVisitorHistoryData {
  id: number;
  visit_id: number;
  identification_type: string;
  identification_number: string;
  first_name: string;
  middle_name: string;
  first_last_name: string;
  second_last_name: string;
  company_entry_date: string;
  company_exit_date: string;
  visit_start_date: string;
  visit_end_date: string;
  eps: string;
  arl: string;
  record_number: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  visitor_type: string;
  interventor_name: string;
  visit_id_reference: number;
}

//Texts
const TRANS = {
  success_generate_report: {
    id: "FormGenerateHistoryVisitor.SuccessMessage.GenerateReport",
    defaultMessage: "Historial generado exitosamente.",
    description: "",
  },
  error_invalid_date_range: {
    id: "FormGenerateHistoryVisitor.ErrorMessage.InvalidDateRange",
    defaultMessage: "La fecha final debe ser mayor o igual a la fecha inicial.",
    description: "",
  },
  error_identification_required: {
    id: "FormGenerateHistoryVisitor.ErrorMessage.IdentificationRequired",
    defaultMessage: "El tipo y número de identificación son requeridos.",
    description: "",
  },
  error_identification_number_invalid: {
    id: "FormGenerateHistoryVisitor.ErrorMessage.IdentificationNumberInvalid",
    defaultMessage: "El número de identificación debe tener al menos 3 caracteres.",
    description: "",
  },
};

export default function useFormGenerateHistoryVisitor() {
  const TEXTS = useTranslation(TRANS);
  const GTEXTS = useTranslation(GTRANS);

  const { openModalLoginForm } = useSessionProviderHook();

  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
    watch,
  } = useForm<VisitorHistoryFormType>({
    defaultValues: {
      identification_type: IDENTIFICATION_TYPE_CODE_CC,
      identification_number: "",
    }
  });

  const [valueStart, setValueStart] = useState<Dayjs | null>(null);
  const [valueEnd, setValueEnd] = useState<Dayjs | null>(null);
  const [isInnerLoading, setIsInnerLoading] = useState(false);
  const [historyData, setHistoryData] = useState<ProcessedVisitorHistoryData[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [identificationTypes, setIdentificationTypes] = useState<IdentificationType[]>([]);

  const [okMessage, errorMessage, changeOkMessage, changeErrorMessage, hideMessages] = useFormMessages();

  const watchedValues = watch();

  /**
   * Loads the identification types.
   */
  const loadIdentificationTypes = useCallback(async () => {
    if (identificationTypes.length > 0) {
      return identificationTypes.map((itype) => ({ label: itype.code, value: itype.id }))
    }
    const results = await Orchestra.identificationTypeService.all()
    setIdentificationTypes([...results])
    return results.map((itype) => ({ label: itype.code, value: itype.id }))
  }, [identificationTypes, setIdentificationTypes]);

  /**
   * Returns the code from id in the identification types list.
   * @param id 
   */
  const getCodeById = (id: string) => {
    if (!identificationTypes.length) {
      return undefined
    }
    return identificationTypes.find((itype) => itype.id.toString() === id)?.code
  };

  /**
   * Returns the id from code in the identification types list.
   * @param code 
   */
  const getIdByCode = (code: string) => {
    if (!identificationTypes.length) {
      return undefined
    }
    return identificationTypes.find((itype) => itype.code === code)?.id
  };

  /**
   * Validates the form before submission
   */
  const isValidForm = () => {
    if (!watchedValues.identification_type || !watchedValues.identification_number) {
      changeErrorMessage(TEXTS.error_identification_required);
      return false;
    }

    if (watchedValues.identification_number.length < 3) {
      changeErrorMessage(TEXTS.error_identification_number_invalid);
      return false;
    }

    if (valueStart && valueEnd && valueEnd.isBefore(valueStart)) {
      changeErrorMessage(TEXTS.error_invalid_date_range);
      return false;
    }

    // Validate that the date range is not too large (optional - max 2 years)
    if (valueStart && valueEnd) {
      const daysDifference = valueEnd.diff(valueStart, 'days');
      if (daysDifference > 730) {
        changeErrorMessage("El rango de fechas no puede ser mayor a 2 años.");
        return false;
      }
    }

    return true;
  };

  /**
   * Formats the API response data to match our interface
   */
  const formatHistoryData = (rawData: VisitorHistoryData[]): ProcessedVisitorHistoryData[] => {
    console.log("🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌 ~ formatHistoryData ~ rawData:", rawData);
    
    return rawData?.map((item: VisitorHistoryData) => {
      const visitor = item.visit_visitor.visitor;
      const visit = item.visit_visitor.visit;
      
      return {
        id: item.id,
        visit_id: visit.id,
        identification_type: visitor.identification_type.code || '',
        identification_number: visitor.identification_number || '',
        first_name: visitor.first_name || '',
        middle_name: visitor.middle_name || '',
        first_last_name: visitor.first_last_name || '',
        second_last_name: visitor.second_last_name || '',
        company_entry_date: item.creator_date || '',
        company_exit_date: item.left_at || '',
        visit_start_date: visit.start_date || '',
        visit_end_date: visit.end_date || '',
        eps: item.carecompany?.name || '',
        arl: item.arlcompany?.name || '',
        record_number: item.card_number || '',
        emergency_contact_name: item.emergency_contact_name || visitor.emergency_contact_name || '',
        emergency_contact_phone: item.emergency_contact_phone || visitor.emergency_contact_phone || '',
        visitor_type: item.visit_visitor.visitor_type.short_description || '',
        interventor_name: visit.interventor?.fullname || '',
        visit_id_reference: visit.id,
      };
    });
  };

  /**
   * Handles the form submission and fetches visitor history data
   */
  const onSubmit = async (data: VisitorHistoryFormType) => {
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

      const identificationTypeId = data.identification_type;
      if (!identificationTypeId) {
        changeErrorMessage("Tipo de identificación no válido");
        setIsInnerLoading(false);
        return;
      }

      const startDate = valueStart?.format('YYYY-MM-DD');
      const endDate = valueEnd?.format('YYYY-MM-DD');

      const response = await Orchestra.generateReportsService.visitorsHistory(
        identificationTypeId.toString(), // Convert to string if needed
        data.identification_number,
        startDate,
        endDate
      );
      console.log("💕💕💕💕💕💕💕💕💕💕💕💕 ~ onSubmit ~ response:", response)

      // Handle the API response - it could be wrapped in a data property or be the raw array
      let rawData: VisitorHistoryData[] = [];
      if (Array.isArray(response)) {
        rawData = response;
      } else if (response.data && Array.isArray(response.data)) {
        rawData = response.data;
      } else if (response.history && Array.isArray(response.history)) {
        rawData = response.history;
      } else {
        console.warn('Unexpected API response structure:', response);
        rawData = [];
      }

      // Get the identification type code to pass to formatHistoryData
      const identificationTypeCode = getCodeById(identificationTypeId.toString()) || identificationTypeId.toString();
      console.log("🚀 ~ onSubmit ~ identificationTypeCode:", identificationTypeCode)

      const formattedData = formatHistoryData(rawData);
      console.log("🚀 ~ onSubmit ~ formattedData:", formattedData)

      setHistoryData(formattedData);
      setPage(0); // Reset to first page when new data is loaded
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
   * Exports history data to CSV
   */
  const exportToCSV = () => {
    if (historyData.length === 0) {
      changeErrorMessage("No hay datos para exportar");
      return;
    }

    const headers = [
      'Tipo Identificación',
      'Número Identificación',
      'Primer Nombre',
      'Segundo Nombre',
      'Primer Apellido',
      'Segundo Apellido',
      'Fecha Entrada',
      'Fecha Salida',
      'Fecha Inicio Programada',
      'Fecha Fin Programada',
      'EPS',
      'ARL',
      'Número Tarjeta',
      'Contacto Emergencia',
      'Teléfono Emergencia',
      'Tipo Visitante',
      'Interventor',
      'ID Visita'
    ];

    const csvContent = [
      headers.join(','),
      ...historyData.map(item => [
        `"${item.identification_type}"`,
        `"${item.identification_number}"`,
        `"${item.first_name}"`,
        `"${item.middle_name}"`,
        `"${item.first_last_name}"`,
        `"${item.second_last_name}"`,
        `"${item.company_entry_date}"`,
        `"${item.company_exit_date}"`,
        `"${item.visit_start_date}"`,
        `"${item.visit_end_date}"`,
        `"${item.eps}"`,
        `"${item.arl}"`,
        `"${item.record_number}"`,
        `"${item.emergency_contact_name}"`,
        `"${item.emergency_contact_phone}"`,
        `"${item.visitor_type}"`,
        `"${item.interventor_name}"`,
        item.visit_id_reference
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `historial_visitante_${dayjs().format('YYYY-MM-DD_HH-mm')}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    changeOkMessage("Archivo CSV descargado exitosamente");
  };

  return {
    // Form controls
    control,
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
    historyData,
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
    loadIdentificationTypes,
    getIdByCode,
    getCodeById,
  };
}