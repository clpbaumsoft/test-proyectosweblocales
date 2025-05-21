import { 
	Alert,
	Box,
  Button,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import KeyIcon from "@mui/icons-material/Key";
import { ErrorMessage } from "@hookform/error-message";
import { Controller } from "react-hook-form";

//Components
import FormMessages from "@/components/atoms/FormMessages";
import FullLoader from "@/components/atoms/FullLoader";
import LabelForm from "@/components/atoms/LabelForm";
import SelectLoadedItems from "@/components/atoms/SelectLoadedItems";

//Constants
import { GTRANS } from "@/constants/Globals";

//Hooks
import useCreateEntryForm from "./useCreateEntryForm";
import useTranslation from "@/hooks/useTranslation";

//Interfaces and types
import { CreateEntryFormProps } from "@/interfaces/Molecules";

//Styles
import { BoxButtonsForm, HeadingForm, SpaceBtn } from "@/styles/elements";

//Texts
const TRANS = {
	title: {
		id: "CreateEntryForm.HeadingForm.Title",
		defaultMessage: "Dar Ingreso",
		description: "",
	},
	label_card_number: {
		id: "CreateEntryForm.Typography.Label.CardNumber",
		defaultMessage: "Ficha #",
		description: "",
	},
	label_eps: {
		id: "CreateEntryForm.Typography.Label.CareCompany",
		defaultMessage: "EPS",
		description: "",
	},
	label_arl: {
		id: "CreateEntryForm.Typography.Label.ArlCompany",
		defaultMessage: "ARL",
		description: "",
	},
	label_emergency_name: {
		id: "CreateEntryForm.Typography.Label.EmergencyContactName",
		defaultMessage: "Contacto de emergencia",
		description: "",
	},
	label_emergency_phone: {
		id: "CreateEntryForm.Typography.Label.EmergencyContactPhone",
		defaultMessage: "Teléfono contacto de emergencia",
		description: "",
	},
	get_in_entry: {
		id: "CreateEntryForm.Button.GiveEntry",
		defaultMessage: "Ingresar",
		description: "",
	},
}

export default function CreateEntryForm({ visit, visitor, onClose }: CreateEntryFormProps) {

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
		loadCareCompanies,
		loadArlCompanies,
	} = useCreateEntryForm(visit, visitor)

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
						{ /* Field: Card number */}
						<Grid size={12}>
							<LabelForm
								label={TEXTS.label_card_number}
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
						{ /* Field: EPS Company */}
						<Grid size={{ xs: 12, md: 6 }}>
							<LabelForm
								label={TEXTS.label_eps}
							/>
							<Controller
								name="eps"
								control={control}
								rules={{
									required: GTEXTS.required,
								}}
								render={({ field }) => (
									<SelectLoadedItems
										fetchItems={loadCareCompanies} 
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
								name="eps"
								render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
							/>
						</Grid>
						{ /* Field: ARL Company */}
						<Grid size={{ xs: 12, md: 6 }}>
							<LabelForm
								label={TEXTS.label_arl}
							/>
							<Controller
								name="arl"
								control={control}
								rules={{
									required: GTEXTS.required,
								}}
								render={({ field }) => (
									<SelectLoadedItems
										fetchItems={loadArlCompanies} 
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
								name="arl"
								render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
							/>
						</Grid>
						{ /* Field: Emergency contact name */}
						<Grid size={{ xs: 12, md: 6 }}>
							<LabelForm
								label={TEXTS.label_emergency_name}
							/>
							<TextField
								{...register("emergency_name", { required: GTEXTS.required })}
								fullWidth
								size="small"
							/>
							<ErrorMessage
								errors={errors}
								name="emergency_name"
								render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
							/>
						</Grid>
						{ /* Field: Emergency contact phone */}
						<Grid size={{ xs: 12, md: 6 }}>
							<LabelForm
								label={TEXTS.label_emergency_phone}
							/>
							<TextField
								{...register("emergency_phone", { required: GTEXTS.required })}
								fullWidth
								size="small"
								placeholder=""
							/>
							<ErrorMessage
								errors={errors}
								name="emergency_phone"
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
							variant="outlined"
							color="primary"
							onClick={onClose}
						>{GTEXTS.close}</Button>
						<SpaceBtn />
						<Button
							variant="contained"
							startIcon={<KeyIcon />}
							type="submit"
						>
							{TEXTS.get_in_entry}
						</Button>
					</BoxButtonsForm>
				</form>
			</Box>
		</>
	)
}