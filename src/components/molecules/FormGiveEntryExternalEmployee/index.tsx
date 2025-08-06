
import {
	Alert,
	Box,
	Button,
	TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

//Components
import CounterTextField from "@/components/atoms/CounterTextField";
import FormMessages from "@/components/atoms/FormMessages";
import FullLoader from "@/components/atoms/FullLoader";
import InputAutocomplete from "@/components/atoms/InputAutocomplete";
import LabelForm from "@/components/atoms/LabelForm";
import SelectLoadedItems from "@/components/atoms/SelectLoadedItems";

//Constants
import { GTRANS } from "@/constants/Globals";


//Hooks
import useFormGiveEntryExternalEmployee from "./useFormGiveEntryExternalEmployee";
import useTranslation from "@/hooks/useTranslation";

//Styles
import { BoxButtonsForm, HeadingForm } from "@/styles/elements";

//Texts
const TRANS = {
	title: {
		id: "FormGiveEntryExternalEmployee.HeadingForm.Title",
		defaultMessage: "Ingresar Empleado Externo",
		description: "",
	},
	label_card: {
		id: "FormGiveEntryExternalEmployee.Typography.Label.Card",
		defaultMessage: "Ficha #:",
		description: "",
	},
	label_identification_type: {
		id: "FormGiveEntryExternalEmployee.Typography.Label.IdentificationType",
		defaultMessage: "Tipo de documento:",
		description: "",
	},
	label_document: {
		id: "FormGiveEntryExternalEmployee.Typography.Label.Document",
		defaultMessage: "Documento:",
		description: "",
	},
	label_code: {
		id: "FormGiveEntryExternalEmployee.Typography.Label.Code",
		defaultMessage: "Código del empleado:",
		description: "",
	},
	label_fullname: {
		id: "FormGiveEntryExternalEmployee.Typography.Label.Fullname",
		defaultMessage: "Nombre completo:",
		description: "",
	},
	label_email: {
		id: "FormGiveEntryExternalEmployee.Typography.Label.Email",
		defaultMessage: "Correo electrónico:",
		description: "",
	},
	label_company: {
		id: "FormGiveEntryExternalEmployee.Typography.Label.Company",
		defaultMessage: "Empresa:",
		description: "",
	},
	label_receiver: {
		id: "FormGiveEntryExternalEmployee.Typography.Label.Receiver",
		defaultMessage: "Empleado que recibe:",
		description: "",
	},
	help_text_search_receiver: {
		id: "RegisterVisitForm.InputAutocomplete.HelpTextSearchReceiver",
		defaultMessage: "Busca al empleado que recibirá al empleado que ingresa.",
		description: "",
	},
	label_entry_comments: {
		id: "FormGiveEntryExternalEmployee.Typography.Label.EntryComments",
		defaultMessage: "Observaciones:",
		description: "",
	},
	help_message_entry_comments: {
		id: "FormGiveEntryExternalEmployee.CounterTextField.HelpMessageEntryComments",
		defaultMessage: "Máximo 200 caracteres.",
		description: "",
	},
	give_entry: {
		id: "FormGiveEntryExternalEmployee.CounterTextField.GiveEntry",
		defaultMessage: "Ingresar",
		description: "",
	},
}

export default function FormGiveEntryExternalEmployee() {

	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)

	const {
		isInnerLoading,
		message,
		error,
		errors,
		control,
		register,
		handleSubmit,
		onSubmit,
		loadCompanies,
		loadIdentificationTypes,
		emitGetOptionsReceivers,
	} = useFormGiveEntryExternalEmployee()

	return (
		<>
			<Box sx={{ position: 'relative' }}>
				{
					isInnerLoading && (
						<FullLoader variant="absolute" />
					)
				}
				<form onSubmit={handleSubmit(onSubmit)}>
					<HeadingForm>{TEXTS.title}</HeadingForm>
					<Grid container spacing={3}>
					
						{ /* Field: Document */}
						<Grid size={12}>
							<LabelForm
								label={TEXTS.label_card}
							/>
							<TextField
								{...register("card_number", { required: GTEXTS.required })}
								fullWidth
								size="small"
							/>
							<ErrorMessage
								errors={errors}
								name="card_number"
								render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
							/>
						</Grid>
						
						{ /* Field: Identification type */}
						<Grid size={{ xs: 12, md: 12 }}>
							<LabelForm
								label={TEXTS.label_identification_type}
							/>
							<Controller
								name="identity_type"
								control={control}
								rules={{
									required: GTEXTS.required,
								}}
								render={({ field }) => (
									<SelectLoadedItems
										fetchItems={loadIdentificationTypes} 
										onChangeValue={(itemValue) => field.onChange(itemValue ? parseInt(String(itemValue.value)) : itemValue)}
										defaultValue={field.value}
										inputProps={{
											fullWidth: true,
											size: 'small',
										}}
									/>
								)}
							/>
							<ErrorMessage
								errors={errors}
								name="identity_type"
								render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
							/>
						</Grid>
						
						{ /* Field: Document */}
						<Grid size={12}>
							<LabelForm
								label={TEXTS.label_document}
							/>
							<TextField
								{...register("document", { required: GTEXTS.required })}
								fullWidth
								size="small"
							/>
							<ErrorMessage
								errors={errors}
								name="document"
								render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
							/>
						</Grid>
						
						{ /* Field: Code */}
						<Grid size={12}>
							<LabelForm
								label={TEXTS.label_code}
								required={false}
							/>
							<TextField
								{...register("code")}
								fullWidth
								size="small"
							/>
							<ErrorMessage
								errors={errors}
								name="code"
								render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
							/>
						</Grid>
						
						{ /* Field: Fullname */}
						<Grid size={12}>
							<LabelForm
								label={TEXTS.label_fullname}
							/>
							<TextField
								{...register("fullname", { required: GTEXTS.required })}
								fullWidth
								size="small"
							/>
							<ErrorMessage
								errors={errors}
								name="fullname"
								render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
							/>
						</Grid>

						{ /* Field: Email */}
						<Grid size={12}>
							<LabelForm
								label={TEXTS.label_email}
								required={false}
							/>
							<TextField
								type="email"
								{...register("email")}
								fullWidth
								size="small"
							/>
							<ErrorMessage
								errors={errors}
								name="email"
								render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
							/>
						</Grid>
						
						{ /* Field: Company */}
						<Grid size={{ xs: 12, md: 12 }}>
							<LabelForm
								label={TEXTS.label_company}
							/>
							<Controller
								name="company"
								control={control}
								rules={{
									required: GTEXTS.required,
								}}
								render={({ field }) => (
									<SelectLoadedItems
										fetchItems={loadCompanies} 
										onChangeValue={(itemValue) => field.onChange(itemValue ? parseInt(String(itemValue.value)) : itemValue)}
										defaultValue={field.value}
										inputProps={{
											fullWidth: true,
											size: 'small',
										}}
									/>
								)}
							/>
							<ErrorMessage
								errors={errors}
								name="company"
								render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
							/>
						</Grid>
						
						{ /* Field: Receiver */}
						<Grid size={12}>
							<LabelForm
								label={TEXTS.label_receiver}
							/>
							<Controller
								name="receiver"
								control={control}
								rules={{
									required: GTEXTS.required,
								}}
								render={({ field }) => (
									<InputAutocomplete
										onChange={(val) => field.onChange(val.value)}
										emitGetOptions={emitGetOptionsReceivers}
										helpText={TEXTS.help_text_search_receiver}
										defaultValue={field.value}
									/>
								)}
							/>
							<ErrorMessage
								errors={errors}
								name="receiver"
								render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
							/>
						</Grid>
						
						{ /* Field: Entry comments */}
						<Grid size={12}>
							<LabelForm
								label={TEXTS.label_entry_comments}
								required={false}
							/>
							<CounterTextField
								textFieldProps={{
									id: "comments",
									...register("comments"),
									fullWidth: true,
									multiline: true,
									rows: 3,
								}}
								helperText={TEXTS.help_message_entry_comments}
							/>
							<ErrorMessage
								errors={errors}
								name="comments"
								render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
							/>
						</Grid>
					</Grid>
					<FormMessages
						message={message}
						error={error}
					/>
					<BoxButtonsForm>
						<Button
							type="submit"
							variant="contained"
						>{TEXTS.give_entry}</Button>
					</BoxButtonsForm>
				</form>
		</Box>
		</>
	)
}