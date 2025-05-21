
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
import LabelForm from "@/components/atoms/LabelForm";
import SelectLoadedItems from "@/components/atoms/SelectLoadedItems";

//Constants
import { GTRANS } from "@/constants/Globals";


//Hooks
import useFormGiveEntryEmployee from "./useFormGiveEntryEmployee";
import useTranslation from "@/hooks/useTranslation";

//Interfaces and types
import { FormGiveEntryEmployeeProps } from "@/interfaces/Forms";

//Styles
import { BoxButtonsForm, HeadingForm, SpaceBtn } from "@/styles/elements";

//Texts
const TRANS = {
	title: {
		id: "FormGiveEntryEmployee.HeadingForm.Title",
		defaultMessage: "Ingresar Empleado Interno",
		description: "",
	},
	label_card: {
		id: "FormGiveEntryEmployee.Typography.Label.Card",
		defaultMessage: "Ficha #:",
		description: "",
	},
	label_company: {
		id: "FormGiveEntryEmployee.Typography.Label.Company",
		defaultMessage: "Empresa:",
		description: "",
	},
	label_entry_comments: {
		id: "FormGiveEntryEmployee.Typography.Label.EntryComments",
		defaultMessage: "Observaciones:",
		description: "",
	},
	help_message_entry_comments: {
		id: "FormGiveEntryEmployee.CounterTextField.HelpMessageEntryComments",
		defaultMessage: "Máximo 200 caracteres.",
		description: "",
	},
	give_entry: {
		id: "FormGiveEntryEmployee.CounterTextField.GiveEntry",
		defaultMessage: "Ingresar",
		description: "",
	},
}

export default function FormGiveEntryEmployee({ employee, onCancel }: FormGiveEntryEmployeeProps) {

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
	} = useFormGiveEntryEmployee(employee)

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
						{
							onCancel && (
								<>
									<Button
										variant="outlined"
										onClick={onCancel}
									>{GTEXTS.close}</Button>
									<SpaceBtn />
								</>
							)
						}
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