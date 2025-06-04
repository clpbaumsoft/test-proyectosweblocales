
//React and Modules
// import dynamic from "next/dynamic";
import moment from "moment";
import type { Moment } from "moment";

import { 
	Button, 
  	Dialog, 
  	DialogActions, 
  	DialogContent, 
} from "@mui/material";
import Grid from "@mui/material/Grid2";

//Components
import FormMessages from "@/components/atoms/FormMessages";
import FullLoader from "@/components/atoms/FullLoader";
import LabelForm from "@/components/atoms/LabelForm";

import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

//Constants
import { GTRANS } from "@/constants/Globals";

//Hooks
import useTranslation from "@/hooks/useTranslation";
import useDuplicateVisitForm from "./useDuplicateVisitForm";

//Interfaces and types
import { DuplicateVisitFormProps } from "@/interfaces/Organisms";

//Styles
import { HeadingForm } from "@/styles/elements";

//Texts
const TRANS = {
	title: {
		id: "DuplicateVisitForm.HeadingForm.ScheduleVisit",
		defaultMessage: "Duplicar Visita",
		description: "",
	},
	label_entry_date: {
		id: "DuplicateVisitForm.Typography.Label.EntryDate",
		defaultMessage: "Nueva fecha ingreso:",
		description: "",
	},
	label_departure_date: {
		id: "DuplicateVisitForm.Typography.Label.DepartureDate",
		defaultMessage: "Nueva fecha salida:",
		description: "",
	},
	save: {
		id: "DuplicateVisitForm.Button.Save",
		defaultMessage: "Guardar",
		description: "",
	},
}


export default function DuplicateVisitForm({ visitId, open = false, onClose, preFillFormData }: DuplicateVisitFormProps) {
	
	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)
	
	const {
		indexRefresh,
		isInnerLoading,
		minDateDeparture,
		message,
		error,
		closeForm,
		handleSubmit,
		onSubmit,
		getInputDateValue,
		onChangeInputDate,
		setMinDateDeparture,
		isValidForm,
	} = useDuplicateVisitForm(onClose, preFillFormData, visitId)


  return (
		<>
			<Dialog open={open || false} onClose={closeForm}>
				{
					isInnerLoading && (
						<FullLoader variant="absolute" />
					)
				}
				<DialogContent>
					<LocalizationProvider dateAdapter={AdapterMoment}>
						<form onSubmit={handleSubmit(onSubmit)}>
							<HeadingForm>{TEXTS.title}</HeadingForm>
							<Grid container spacing={3}>
								{ /* Field: start date */}
								<Grid size={{ xs: 12, md: 6 }}>
									<LabelForm
										label={TEXTS.label_entry_date}
									/>
									<DateTimePicker
										key={`entryDatePicer${indexRefresh}`}
										defaultValue={getInputDateValue('entry_date')}
										onChange={(date: Moment | null) => {
											onChangeInputDate('entry_date', date)
											if(date) {
												setMinDateDeparture(date.clone().add(5, 'minutes'))
											}
										}}
										minDate={moment()}
									/>
								</Grid>
								{ /* Field: end date */}
								<Grid size={{ xs: 12, md: 6 }}>
									<LabelForm
										label={TEXTS.label_departure_date}
									/>
									<DateTimePicker
										key={`departureDatePicer${indexRefresh}`}
										defaultValue={getInputDateValue('departure_date')}
										onChange={(date: Moment | null) => onChangeInputDate('departure_date', date)}
										minDate={minDateDeparture}
									/>
								</Grid>
							</Grid>
							<FormMessages
								message={message}
								error={error}
							/>
							<DialogActions>
								<Button
									onClick={closeForm}
									variant="outlined"
								>
									{GTEXTS.close}
								</Button>
								<Button
									type="submit"
									variant="contained"
									disabled={!isValidForm()}
								>
									{TEXTS.save}
								</Button>
							</DialogActions>
					</form>
					</LocalizationProvider>
				</DialogContent>
			</Dialog>
		</>
  );
}
