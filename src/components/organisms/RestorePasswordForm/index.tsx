//React and modules
import {
	TextField,
	Button,
	Select,
	MenuItem,
	FormControl,
	Alert,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ErrorMessage } from "@hookform/error-message";

//Components
import FormMessages from "@/components/atoms/FormMessages";
import FullLoader from "@/components/atoms/FullLoader";
import LabelForm from "@/components/atoms/LabelForm";

//Constants
import {
	GTRANS,
	IDENTIFICATION_TYPE_CODE_CC,
	IDENTIFICATION_TYPE_CODE_TI,
	IDENTIFICATION_TYPE_CODE_CE,
	IDENTIFICATION_TYPE_CODE_NI,
	IDENTIFICATION_TYPE_CODE_OE,
	IDENTIFICATION_TYPE_CODE_PA,
	IDENTIFICATION_TYPE_CODE_PT,
} from "@/constants/Globals";

//Hooks
import useRestorePasswordForm from "./useRestorePasswordForm";
import useTranslation from "@/hooks/useTranslation";

//Interfaces and types
import { RestorePasswordFormProps } from "@/interfaces/Organisms";

//Styles
import { BoxButtonsForm, SpaceBtn } from "@/styles/elements";


//Texts
const TRANS = {
	option_cc: {
		id: "RestorePasswordForm.MenuItem.CC",
		defaultMessage: "Cédula de ciudadanía",
		description: "",
	},
	option_ti: {
		id: "RestorePasswordForm.MenuItem.TI",
		defaultMessage: "Tarjeta de identidad",
		description: "",
	},
	option_ce: {
		id: "RestorePasswordForm.MenuItem.CE",
		defaultMessage: "Cédula de extranjería",
		description: "",
	},
	option_ni: {
		id: "RestorePasswordForm.MenuItem.NI",
		defaultMessage: "Identificación tributaria",
		description: "",
	},
	option_oe: {
		id: "RestorePasswordForm.MenuItem.OE",
		defaultMessage: "Operaciones externas",
		description: "",
	},
	option_pt: {
		id: "RestorePasswordForm.MenuItem.PT",
		defaultMessage: "Permiso de trabajo",
		description: "",
	},
	option_pa: {
		id: "RestorePasswordForm.MenuItem.PA",
		defaultMessage: "Pasaporte",
		description: "",
	},
	label_dni: {
		id: "RestorePasswordForm.LabelForm.Dni",
		defaultMessage: "Documento:",
		description: "",
	},
	label_dni_type: {
		id: "RestorePasswordForm.LabelForm.DniType",
		defaultMessage: "Tipo de documento:",
		description: "",
	},
	label_email: {
		id: "RestorePasswordForm.LabelForm.Email",
		defaultMessage: "Correo electrónico registrado:",
		description: "",
	},
	send: {
		id: "RestorePasswordForm.Button.Send",
		defaultMessage: "Enviar",
		description: "",
	},
}

export default function RestorePasswordForm({ onCancel }: RestorePasswordFormProps) {
	
	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)

	const {
		isInnerLoading,
		message,
		error,
		errors,
		valueTypeDni,
		register,
		handleSubmit,
		onSubmit,
		isValidForm,
	} = useRestorePasswordForm()

	return (
		<>
		{
			isInnerLoading && (
				<FullLoader variant="absolute" />
			)
		}
		<form onSubmit={handleSubmit(onSubmit)}>
			<Grid container spacing={2}>
				<Grid size={12}>
					<FormControl fullWidth>
						<LabelForm
							label={TEXTS.label_dni_type}
						/>
						<Select
							id="recovery_identification_type"
							{...register("dni_type", { required: GTEXTS.required })}
							size="small"
							displayEmpty
							value={valueTypeDni}
						>
							<MenuItem value="">{GTEXTS.select_option}</MenuItem>
							<MenuItem value={IDENTIFICATION_TYPE_CODE_CC}>{TEXTS.option_cc}</MenuItem>
							<MenuItem value={IDENTIFICATION_TYPE_CODE_TI}>{TEXTS.option_ti}</MenuItem>
							<MenuItem value={IDENTIFICATION_TYPE_CODE_CE}>{TEXTS.option_ce}</MenuItem>
							<MenuItem value={IDENTIFICATION_TYPE_CODE_NI}>{TEXTS.option_ni}</MenuItem>
							<MenuItem value={IDENTIFICATION_TYPE_CODE_OE}>{TEXTS.option_oe}</MenuItem>
							<MenuItem value={IDENTIFICATION_TYPE_CODE_PA}>{TEXTS.option_pa}</MenuItem>
							<MenuItem value={IDENTIFICATION_TYPE_CODE_PT}>{TEXTS.option_pt}</MenuItem>
						</Select>
						<ErrorMessage
							errors={errors}
							name="dni_type"
							render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
						/>
					</FormControl>
				</Grid>
				<Grid size={12}>
					<FormControl fullWidth>
						<LabelForm
							label={TEXTS.label_dni}
						/>
						<TextField
							id="recovery_identity_number"
							{...register("dni", { required: GTEXTS.required })}
							size="small"
						/>
						<ErrorMessage
							errors={errors}
							name="dni"
							render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
						/>
					</FormControl>
				</Grid>
				<Grid size={12}>
					<FormControl fullWidth>
						<LabelForm
							label={TEXTS.label_email}
						/>
						<TextField 
							id="recovery_email" 
							{...register("email", { required: GTEXTS.required })} 
							size="small"
						/>
						<ErrorMessage
							errors={errors}
							name="email"
							render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
						/>
					</FormControl>
				</Grid>
				<FormMessages
					message={message}
					error={error}
				/>
			</Grid>
			<BoxButtonsForm>
				<Button 
					onClick={onCancel} 
					color="inherit" 
					variant="outlined"
				>{GTEXTS.cancel}</Button>
				<SpaceBtn />
				<Button 
					type="submit" 
					variant="contained" 
					disabled={!isValidForm()}
				>{TEXTS.send}</Button>
			</BoxButtonsForm>
		</form>
		</>
	)
}