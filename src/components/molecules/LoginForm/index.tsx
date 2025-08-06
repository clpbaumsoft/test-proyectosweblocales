//React and modules
import Image from "next/image";

import {
	TextField,
	Button,
	Typography,
	Box,
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	Alert,
	OutlinedInput,
	InputAdornment,
	Select,
	MenuItem,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ErrorMessage } from "@hookform/error-message";

//Assets
import Logo from "@/assets/logo.png";

//Components
import FullLoader from "@/components/atoms/FullLoader";
import RestorePasswordForm from "@/components/organisms/RestorePasswordForm";
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
import useLoginForm from "./useLoginForm";
import useTranslation from "@/hooks/useTranslation";

//Styles
import { HeadingForm } from "@/styles/elements";

//Texts
const TRANS = {
	title: {
		id: "LoginForm.HeadingForm.Title",
		defaultMessage: "Iniciar Sesión",
		description: "",
	},
	label_dni_type: {
		id: "LoginForm.LabelForm.DocumentType",
		defaultMessage: "Tipo documento:",
		description: "",
	},
	label_dni: {
		id: "LoginForm.LabelForm.Dni",
		defaultMessage: "Número documento:",
		description: "",
	},
	label_password: {
		id: "LoginForm.LabelForm.Password",
		defaultMessage: "Contraseña:",
		description: "",
	},
	info_password: {
		id: "LoginForm.LabelForm.InfoPassword",
		defaultMessage: "La contraseña debe tener un mínimo de 8 y un máximo de 10 caracteres, \n 1 carácter mayúscula, 1 carácter especial +-*/$\[]*¨´{} menos #.",
		description: "",
	},
	display_the_password: {
		id: "LoginForm.LabelForm.DisplayPassword",
		defaultMessage: "Mostrar contraseña",
		description: "",
	},
	hide_the_password: {
		id: "LoginForm.LabelForm.HideThePassword",
		defaultMessage: "Ocultar contraseña",
		description: "",
	},
	cancel: {
		id: "LoginForm.Button.Cancel",
		defaultMessage: "Cancelar",
		description: "",
	},
	login: {
		id: "LoginForm.Button.Login",
		defaultMessage: "Ingresar",
		description: "",
	},
	login_microsoft: {
		id: "LoginForm.Button.LoginMicrosoft",
		defaultMessage: "Ingresa con tu cuenta Microsoft",
		description: "",
	},
	forget_password: {
		id: "LoginForm.LabelForm.ForgetPassword",
		defaultMessage: "Olvidé mi contraseña",
		description: "",
	},
	title_recovery_password: {
		id: "LoginForm.LabelForm.RecoveryPassword",
		defaultMessage: "Recuperar Contraseña",
		description: "",
	},
	option_cc: {
		id: "LoginForm.MenuItem.CC",
		defaultMessage: "Cédula de ciudadanía",
		description: "",
	},
	option_ti: {
		id: "LoginForm.MenuItem.TI",
		defaultMessage: "Tarjeta de identidad",
		description: "",
	},
	option_ce: {
		id: "LoginForm.MenuItem.CE",
		defaultMessage: "Cédula de extrangería",
		description: "",
	},
	option_ni: {
		id: "LoginForm.MenuItem.NI",
		defaultMessage: "Identificación tributaria",
		description: "",
	},
	option_oe: {
		id: "LoginForm.MenuItem.OE",
		defaultMessage: "Operaciones externas",
		description: "",
	},
	option_pt: {
		id: "LoginForm.MenuItem.PT",
		defaultMessage: "Permiso de trabajo",
		description: "",
	},
	option_pa: {
		id: "LoginForm.MenuItem.PA",
		defaultMessage: "Pasaporte",
		description: "",
	},
}

export default function LoginForm() {

	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)

	const {
		errors,
		isVisibleErrorMessage,
		errorMessage,
		isInnerLoading,
		openRecovery,
		showPassword,
		isValidForm,
		onSubmit,
		handleOpenRecovery,
		handleCloseRecovery,
		handleSubmit,
		register,
		setIsVisibleErrorMessage,
		onClickTogglePassword,
	} = useLoginForm()

	return (
		<>
			{
				isInnerLoading && (
					<FullLoader />
				)
			}
			<Box
				sx={{
					flex: 1,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					padding: 2,
					borderRadius: 2,
					boxShadow: 3,
				}}
			>
				<Box sx={{ mb: 1, display: 'flex', justifyContent: 'center' }}>
					<Image
						src={Logo}
						alt="Proquinal"
						priority={true}
						style={{
							objectFit: 'contain',
						}}
					/>
				</Box>
				<HeadingForm sx={{ mx: 'auto' }}>{TEXTS.title}</HeadingForm>

				<form onSubmit={handleSubmit(onSubmit)}>
					<Grid sx={{ maxWidth: 350, mx: 'auto' }} container spacing={2}>
						{/* User ID */}
						<Grid size={12}>
							<LabelForm
								label={TEXTS.label_dni_type}
							/>
							<Select
								{...register("dni_type", { required: GTEXTS.required })}
								size="small"
								fullWidth
								defaultValue={IDENTIFICATION_TYPE_CODE_CC}
							>
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
						</Grid>
						{/* User ID */}
						<Grid size={12}>
							<LabelForm
								label={TEXTS.label_dni}
							/>
							<TextField
								id="login_dni"
								{...register("dni", { required: GTEXTS.required })}
								fullWidth
								size="small"
							/>
							<ErrorMessage
								errors={errors}
								name="dni"
								render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
							/>
						</Grid>

						{/* Password */}
						<Grid size={12}>
							<LabelForm
								label={TEXTS.label_password}
							/>
							<OutlinedInput
								id="login_password"
								type={showPassword ? 'text' : 'password'}
								{...register("password", { required: GTEXTS.required })}
								fullWidth
								size="small"
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label={
												showPassword ? TEXTS.hide_the_password : TEXTS.display_the_password
											}
											onClick={onClickTogglePassword}
											edge="end"
										>
											{showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
										</IconButton>
									</InputAdornment>
								}
							/>
							<ErrorMessage
								errors={errors}
								name="password"
								render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
							/>
						</Grid>

						{
							isVisibleErrorMessage && (
								<Grid size={12}>
									<Alert severity="error" onClose={() => setIsVisibleErrorMessage(false)}>{errorMessage}</Alert>
								</Grid>
							)
						}

						{/* Submit button */}
						<Grid size={12}>
							<Button
								variant="contained"
								type="submit"
								fullWidth
								disabled={!isValidForm()}
							>
								{TEXTS.login}
							</Button>

						</Grid>

						{/* Microsoft login button */}
						<Grid size={12}>
							<Button
								variant="outlined"
								fullWidth
								component="a"
								href="https://spaniel-hip-trivially.ngrok-free.app/login/microsoft/"
								rel="noopener noreferrer"
							>
								{TEXTS.login_microsoft}
							</Button>
						</Grid>

						{/* Forget password */}
						<Grid size={12} mt={0}>
							<Typography
								variant="body2"
								component="a"
								onClick={handleOpenRecovery}
								sx={{
									color: 'primary.main',
									textDecoration: 'underline',
									cursor: 'pointer',
								}}
							>
								{TEXTS.forget_password}
							</Typography>
						</Grid>
					</Grid>
				</form>

				{/* Recovery password modal */}
				<Dialog open={openRecovery} onClose={handleCloseRecovery}>
					<DialogTitle>{TEXTS.title_recovery_password}</DialogTitle>
					<DialogContent>
						<RestorePasswordForm onCancel={handleCloseRecovery} />
					</DialogContent>
				</Dialog>
			</Box>
		</>
	)
}