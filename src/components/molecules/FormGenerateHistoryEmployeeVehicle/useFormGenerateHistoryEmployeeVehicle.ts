import { useState } from "react";
import { useForm } from "react-hook-form";
import dayjs, { Dayjs } from 'dayjs';

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
interface VehicleHistoryFormType {
  plate: string;
  start_date?: string;
  end_date?: string;
}

// Interface for vehicle history data from API
interface VehicleHistoryData {
  id: number;
  number: string; // Esta es la placa del vehículo
  leave_driver: string | null;
  entry_driver: string | null;
  left_at: string | null; // Fecha de salida
  comments_entry: string | null;
  comments_leave: string | null;
  id_vehicle_type: number;
  id_visit_visitor: number;
  id_gate: number;
  id_gate_leave: number;
  id_gaveleave_user: number;
  status: string;
  soft_delete: boolean;
  id_creator_user: number;
  creator_date: string; // Fecha de entrada
  id_modifier_user: number;
  modifier_date: string;
  creator_user: {
    first_name: string;
    middle_name: string | null;
    first_last_name: string;
    second_last_name: string | null;
    fullname: string;
    unique_permissions?: string[];
  };
  gaveleave_user: {
    identification_number: string;
    first_name: string;
    middle_name: string | null;
    first_last_name: string;
    second_last_name: string | null;
    phone: string;
    email: string;
    fullname: string;
    unique_permissions?: string[];
  };
  visit_visitor: {
    id: number;
    visitor_type_description: string;
    visitor_data: {
      id: number;
      identification_number: string;
      first_name: string;
      middle_name: string | null;
      first_last_name: string;
      second_last_name: string | null;
      fullname: string;
    };
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
      id: number;
      short_description: string;
    };
    visitor: {
      id: number;
      identification_number: string;
      first_name: string;
      middle_name: string | null;
      first_last_name: string;
      second_last_name: string | null;
      fullname: string;
    };
  };
  inspect_points: Array<{
    id: number;
    description: string;
    status: string;
    pivot: {
      id_entry_vehicle: number;
      id_inspect_point: number;
      status: string;
    };
  }>;
  gate: {
    id: number;
    description: string;
    id_branch: number;
    status: string;
  };
  vehicle_type: {
    id: number;
    description: string;
    status: string;
  };
}

// Interface for processed data to show in table
interface ProcessedVehicleHistoryData {
  id: number;
  plate: string;
  entry_date: string;
  exit_date: string;
  full_name: string | null;
  fullname_leave?: string | null;
  inspection_points: string;
  gate_name: string;
  observations: string;
}

//Texts
const TRANS = {
  success_generate_report: {
    id: "FormGenerateHistoryVehicle.SuccessMessage.GenerateReport",
    defaultMessage: "Historial generado exitosamente.",
    description: "",
  },
  error_invalid_date_range: {
    id: "FormGenerateHistoryVehicle.ErrorMessage.InvalidDateRange",
    defaultMessage: "La fecha final debe ser mayor o igual a la fecha inicial.",
    description: "",
  },
  error_plate_required: {
    id: "FormGenerateHistoryVehicle.ErrorMessage.PlateRequired",
    defaultMessage: "La placa del vehículo es requerida.",
    description: "",
  },
  error_plate_invalid: {
    id: "FormGenerateHistoryVehicle.ErrorMessage.PlateInvalid",
    defaultMessage: "La placa del vehículo debe tener al menos 3 caracteres.",
    description: "",
  },
  error_date_range_too_large: {
    id: "FormGenerateHistoryVehicle.ErrorMessage.DateRangeTooLarge",
    defaultMessage: "El rango de fechas no puede ser mayor a 2 años.",
    description: "",
  },
};

export default function useFormGenerateHistoryEmployeeVehicle() {
  const TEXTS = useTranslation(TRANS);
  const GTEXTS = useTranslation(GTRANS);

  const { openModalLoginForm } = useSessionProviderHook();

  const {
    formState: { errors },
    register,
    handleSubmit,
    watch,
  } = useForm<VehicleHistoryFormType>({
    defaultValues: {
      plate: "",
    }
  });

  const [valueStart, setValueStart] = useState<Dayjs | null>(null);
  const [valueEnd, setValueEnd] = useState<Dayjs | null>(null);
  const [isInnerLoading, setIsInnerLoading] = useState(false);
  const [historyData, setHistoryData] = useState<ProcessedVehicleHistoryData[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [okMessage, errorMessage, changeOkMessage, changeErrorMessage, hideMessages] = useFormMessages();

  const watchedValues = watch();

  const isValidForm = () => {
    if (!watchedValues.plate) {
      changeErrorMessage(TEXTS.error_plate_required);
      return false;
    }

    if (watchedValues.plate.length < 3) {
      changeErrorMessage(TEXTS.error_plate_invalid);
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
        changeErrorMessage(TEXTS.error_date_range_too_large);
        return false;
      }
    }

    return true;
  };

  /**
   * Formats the API response data to match our interface
   */
  const formatHistoryData = (rawData: VehicleHistoryData[]): ProcessedVehicleHistoryData[] => {
    console.log("🚗🚗🚗🚗🚗🚗🚗🚗🚗🚗 ~ formatHistoryData ~ rawData:", rawData);
    
    return rawData?.map((item: VehicleHistoryData) => {
      // Concatenar los puntos de inspección en una sola cadena
      const inspectionPoints = item.inspect_points?.map(point => point.description).join(', ') || '';
      
      // Combinar comentarios de entrada y salida
      const observations = [item.comments_entry, item.comments_leave]
        .filter(comment => comment && comment.trim())
        .join(' | ') || '';

      return {
        id: item.id,
        plate: item.number?.toLocaleUpperCase() || '', // El campo "number" es la placa
        entry_date: item.creator_date || '', // Fecha de entrada
        exit_date: item.left_at || '', // Fecha de salida
        full_name: item.creator_user.fullname || '', // Nombre completo quien dió ingreso
        fullname_leave: item?.gaveleave_user?.fullname || '', // Nombre completo quien dió salida
        inspection_points: inspectionPoints,
        gate_name: item.gate?.description || '', // Nombre de la portería
        observations: observations, // Comentarios combinados
      };
    });
  };

  /**
   * Handles the form submission and fetches vehicle history data
   */
  const onSubmit = async (data: VehicleHistoryFormType) => {
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

      const plate = data.plate.trim();
      if (!plate) {
        changeErrorMessage(TEXTS.error_plate_required);
        setIsInnerLoading(false);
        return;
      }

      const startDate = valueStart?.format('YYYY-MM-DD');
      const endDate = valueEnd?.format('YYYY-MM-DD');

      console.log("🚀 ~ Fetching vehicle history with params:", {
        plate,
        startDate,
        endDate
      });

      // Call the service to get vehicle history
      const response = await Orchestra.generateReportsService.historyEmployeeVehicle(
        plate,
        startDate,
        endDate
      );

      console.log("🚀 ~ Vehicle history response:", response);

      // Handle the API response - it could be wrapped in a data property or be the raw array
      let rawData: VehicleHistoryData[] = [];
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

      const formattedData = formatHistoryData(rawData);
      console.log("🚀 ~ onSubmit ~ formattedData:", formattedData)

      setHistoryData(formattedData);
      setPage(0); // Reset to first page when new data is loaded

      if (formattedData.length > 0) {
        changeOkMessage(TEXTS.success_generate_report);
      } else {
        changeErrorMessage("No se encontraron registros");
      }

    } catch (catchError) {
      console.error("Error fetching vehicle history:", catchError);
      
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
   * Exports history data to CSV
   */
  const exportToCSV = () => {
    if (historyData.length === 0) {
      changeErrorMessage("No hay datos para exportar");
      return;
    }

    const headers = [
      'Placa',
      'Fecha Ingreso',
      'Fecha Salida',
      'Puntos Inspeccionados',
      'Portería de Acceso',
      'Observaciones'
    ];

    const csvContent = [
      headers.join(','),
      ...historyData.map(item => [
        `"${item.plate}"`,
        `"${item.entry_date ? dayjs(item.entry_date).format('DD/MM/YYYY HH:mm') : ''}"`,
        `"${item.exit_date ? dayjs(item.exit_date).format('DD/MM/YYYY HH:mm') : ''}"`,
        `"${item.inspection_points}"`,
        `"${item.gate_name}"`,
        `"${item.observations}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `historial_vehiculo_${dayjs().format('YYYY-MM-DD_HH-mm')}.csv`);
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
  };
}
