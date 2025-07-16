
//React and Modules
// import dynamic from "next/dynamic";
import moment from "moment";
import type { Moment } from "moment";

import { ErrorMessage } from "@hookform/error-message";
import { Controller } from "react-hook-form";

import { 
	Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  TextField, 
	Alert,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

//Components
import DropdownsCompany from "./components/DropdownsCompany";
import FormMessages from "@/components/atoms/FormMessages";
import FullLoader from "@/components/atoms/FullLoader";
import InputAutocomplete from "@/components/atoms/InputAutocomplete";
import LabelForm from "@/components/atoms/LabelForm";
// const DateTimePicker = dynamic(
// 	() => import("@/components/atoms/DateTimePicker"),
// 	{ ssr: false }
// )

import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

//Constants
import { GTRANS } from "@/constants/Globals";

//Hooks
import useTranslation from "@/hooks/useTranslation";
import useRegisterVisitForm from "./useRegisterVisitForm";
import useSessionProviderHook from "@/providers/SessionProvider/hooks";

//Interfaces and types
import { RegisterVisitFormProps } from "@/interfaces/Organisms";

//Styles
import { HeadingForm } from "@/styles/elements";

//Texts
const TRANS = {
	title: {
		id: "RegisterVisitForm.HeadingForm.ScheduleVisit",
		defaultMessage: "Programar Visita",
		description: "",
	},
	label_entry_date: {
		id: "RegisterVisitForm.Typography.Label.EntryDate",
		defaultMessage: "Fecha ingreso:",
		description: "",
	},
	label_departure_date: {
		id: "RegisterVisitForm.Typography.Label.DepartureDate",
		defaultMessage: "Fecha salida:",
		description: "",
	},
	label_reason: {
		id: "RegisterVisitForm.Typography.Label.Reason",
		defaultMessage: "Razón de visita:",
		description: "",
	},
	label_interventor: {
		id: "RegisterVisitForm.Typography.Label.WhoApproveDocuments",
		defaultMessage: "¿Quién autoriza la visita?:",
		description: "",
	},
	label_approver: {
		id: "RegisterVisitForm.Typography.Label.WhoApproveDocuments",
		defaultMessage: "¿Quién aprueba los documentos?:",
		description: "",
	},
	help_text_search_interventor: {
		id: "RegisterVisitForm.InputAutocomplete.HelpTextSearchApprover",
		defaultMessage: "Busca la persona que aprueba la visita",
		description: "",
	},
	help_text_search_approver: {
		id: "RegisterVisitForm.InputAutocomplete.HelpTextSearchApprover",
		defaultMessage: "Busca la persona que aprobará los documentos de la visita.",
		description: "",
	},
	save: {
		id: "RegisterVisitForm.Button.Save",
		defaultMessage: "Guardar",
		description: "",
	},
}


export default function RegisterVisitForm({ visitId, open, onClose, preFillFormData, onSaved }: RegisterVisitFormProps) {
	
	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)

	const { getLoggedUser } = useSessionProviderHook();
	const loggedUser = getLoggedUser();
	
	const {
		indexRefresh,
		company_selected,
		branch_selected,
		isInnerLoading,
		minDateDeparture,
		errors,
		companies,
		message,
		error,
		control,
		isLoadingCompanies,
		closeForm,
		handleSubmit,
		onSubmit,
		register,
		getInputDateValue,
		onChangeInputDate,
		setMinDateDeparture,
		renderValueDropdown,
		getCompany,
		getBranch,
		getGate,
		getBranches,
		getGates,
		isValidForm,
		emitGetOptionsInterventor,
		emitGetOptionsApprovers,
	} = useRegisterVisitForm(onClose, preFillFormData, visitId, onSaved)


  return (
		<>
			<Dialog open={open} onClose={closeForm}>
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
							{ /* Field: Entry date */}
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
							{ /* Field: Departure date */}
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
							{ /* Field: Reason */}
							<Grid size={12}>
								<LabelForm
									label={TEXTS.label_reason}
								/>
								<TextField
									{...register("reason", { required: TEXTS.required })}
									fullWidth
									multiline
									rows={3}
								/>
								<ErrorMessage
									errors={errors}
									name="reason"
									render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
								/>
							</Grid>

							{ /* Field: Interventor */}
							<Grid size={12}>
								<LabelForm
									label={TEXTS.label_interventor}
									required={true}
								/>
								<Controller
									name="email_interventor"
									control={control}
									rules={{ required: TEXTS.required }}
									render={({ field }) => (
										<InputAutocomplete
											onChange={(val) => field.onChange(val ? val.value : "")}
											emitGetOptions={emitGetOptionsInterventor}
											helpText={TEXTS.help_text_search_interventor}
											defaultValue={field.value || loggedUser?.email}
										/>
									)}
								/>
								<ErrorMessage
									errors={errors}
									name="reason"
									render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
								/>
							</Grid>

							{ /* Field: Approver */}
							<Grid size={12}>
								<LabelForm
									label={TEXTS.label_approver}
									required={false}
								/>
								<Controller
									name="email_approver"
									control={control}
									render={({ field }) => (
										<InputAutocomplete
											onChange={(val) => field.onChange(val ? val.value : "")}
											emitGetOptions={emitGetOptionsApprovers}
											helpText={TEXTS.help_text_search_approver}
											defaultValue={field.value}
										/>
									)}
								/>
								<ErrorMessage
									errors={errors}
									name="reason"
									render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
								/>
							</Grid>
							{
								// Dropdowns in Form Register visit
								<DropdownsCompany
									isLoadingCompanies={isLoadingCompanies}
									errors={errors}
									control={control}
									companies={companies}
									company_selected={company_selected}
									branch_selected={branch_selected}
									renderValueDropdown={renderValueDropdown}
									getCompany={getCompany}
									getBranches={getBranches}
									getBranch={getBranch}
									getGates={getGates}
									getGate={getGate}
								/>
							}
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
