import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import type { Moment } from "moment";
import type { DateValidationError } from "@mui/x-date-pickers";
import useTranslation from "@/hooks/useTranslation";
import { CustomDatePickerProps } from "@/interfaces/Atoms";
import { TRANS } from "./constants";

const styles = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '0.375rem',
    '&:hover fieldset': {
      borderColor: '#9ca3af',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#00575f',
      borderWidth: '2px',
    },
  },
  '& .MuiInputBase-input': {
    fontSize: '0.875rem',
    padding: '0.625rem 0.875rem',
  },
  '& .MuiInputLabel-root': {
    fontSize: '0.875rem',
    '&.Mui-focused': {
      color: '#00575f',
    },
  },
}

export default function CustomDatePicker({ label, defaultValue, minDate, onChange, inputProps }: CustomDatePickerProps<Moment | null, DateValidationError>) {
	const TEXTS = useTranslation(TRANS)
	return (
		<>
			<LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="es">
				<DatePicker
					label={label}
					defaultValue={defaultValue || null}
					minDate={minDate || null}
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
					sx={styles}
				/>
			</LocalizationProvider>
		</>
	)
}