import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import type { Moment } from "moment";
import type { DateValidationError } from "@mui/x-date-pickers";

//Hooks
import useTranslation from "@/hooks/useTranslation";

//Interfaces and types
import { CustomDatePickerProps } from "@/interfaces/Atoms";

const TRANS = {
	toolbar_title: {
		id: "CustomDatePicker.DatePicker.Choose",
		defaultMessage: "Seleccionar",
		description: "",
	},
	previous_month: {
		id: "CustomDatePicker.DatePicker.PreviousMonth",
		defaultMessage: "Mes anterior",
		description: "",
	},
	next_month: {
		id: "CustomDatePicker.DatePicker.NextMonth",
		defaultMessage: "Mes siguiente",
		description: "",
	},
	label_cancel_button: {
		id: "CustomDatePicker.DatePicker.Button.Cancel",
		defaultMessage: "Cancelar",
		description: "",
	},
	label_clear_button: {
		id: "CustomDatePicker.DatePicker.Button.Clean",
		defaultMessage: "Limpiar",
		description: "",
	},
	label_ok_button: {
		id: "CustomDatePicker.DatePicker.Button.Accept",
		defaultMessage: "Aceptar",
		description: "",
	},
	label_today_button: {
		id: "CustomDatePicker.DatePicker.Button.Today",
		defaultMessage: "Hoy",
		description: "",
	},
	open_previous_view: {
		id: "CustomDatePicker.DatePicker.SeePrevious",
		defaultMessage: "Ver anterior",
		description: "",
	},
	open_next_view: {
		id: "CustomDatePicker.DatePicker.SeeNext",
		defaultMessage: "Ver siguiente",
		description: "",
	},
	start: {
		id: "CustomDatePicker.DatePicker.Home",
		defaultMessage: "Inicio",
		description: "",
	},
	end: {
		id: "CustomDatePicker.DatePicker.End",
		defaultMessage: "Fin",
		description: "",
	},
}

export default function CustomDatePicker({ label, onChange, inputProps }: CustomDatePickerProps<Moment | null, DateValidationError>) {

	const TEXTS = useTranslation(TRANS)
	return (
		<>
			<LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="es">
				<DatePicker
					label={label}
					onChange={onChange}
					localeText={{
						toolbarTitle: TEXTS.toolbar_title,
						previousMonth: TEXTS.previous_month,
						nextMonth: TEXTS.next_month,
						cancelButtonLabel: TEXTS.label_cancel_button,
						clearButtonLabel: TEXTS.label_clear_button,
						okButtonLabel: TEXTS.label_ok_button,
						todayButtonLabel: TEXTS.label_today_button,
						openPreviousView: TEXTS.open_previous_view,
						openNextView: TEXTS.open_next_view,
						start: TEXTS.start,
						end: TEXTS.end,
					}}
					format="D MMMM, YYYY"
					slotProps={{
						toolbar: {
							toolbarFormat: 'D MMMM, YYYY',
							hidden: true,
						},
						textField: inputProps
					}}
				/>
			</LocalizationProvider>
		</>
	)
}