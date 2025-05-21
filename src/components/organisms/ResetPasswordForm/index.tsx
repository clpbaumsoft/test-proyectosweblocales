import Image from "next/image";

import {
	Button,
	Typography,
	Box,
	Alert,
	InputAdornment,
	IconButton,
	OutlinedInput,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ErrorMessage } from "@hookform/error-message";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

//Assets
import Logo from "@/assets/logo.png";

//Components
import FormMessages from "@/components/atoms/FormMessages";
import FullLoader from "@/components/atoms/FullLoader";
import LabelForm from "@/components/atoms/LabelForm";

//Constants
import { GTRANS } from "@/constants/Globals";

//Hooks
import useResetPasswordForm from "./useResetPasswordForm";
import useTranslation from "@/hooks/useTranslation";

//Interfaces and types
import { ResetPasswordFormProps } from "@/interfaces/Organisms";

//Texts
const TRANS = {
	intro: {
		id: "ResetPasswordForm.Typography.H6.IntroRestorePassword",
		defaultMessage: "A continuación ingresa la nueva contraseña para tu cuenta.",
		description: "",
	},
	label_new_password: {
		id: "ResetPasswordForm.LabelForm.NewPassword",
		defaultMessage: "Nueva contraseña",
		description: "",
	},
	label_confirm_new_password: {
		id: "ResetPasswordForm.LabelForm.ConfirmPassword",
		defaultMessage: "Confirma la contraseña",
		description: "",
	},
	label_password_requirements: {
		id: "ResetPasswordForm.Typography.Label.ShouldHave",
		defaultMessage: "Debe tener:",
		description: "",
	},
	display_the_password: {
		id: "ResetPasswordForm.IconButton.ShowPassword",
		defaultMessage: "Mostrar contraseña",
		description: "",
	},
	hide_the_password: {
		id: "ResetPasswordForm.IconButton.HidePassword",
		defaultMessage: "Ocultar contraseña",
		description: "",
	},
	strong_password_required: {
		id: "ResetPasswordForm.OutlinedInput.InvalidaPassword",
		defaultMessage: "Contraseña inválida.",
		description: "",
	},
	min_length: {
		id: "ResetPasswordForm.Typography.Span.MinLength",
		defaultMessage: "8 caracteres",
		description: "",
	},
	one_letter: {
		id: "ResetPasswordForm.Typography.Span.OneLetter",
		defaultMessage: "1 letra",
		description: "",
	},
	one_number: {
		id: "ResetPasswordForm.Typography.Span.OneNumber",
		defaultMessage: "1 número",
		description: "",
	},
	one_symbol: {
		id: "ResetPasswordForm.Typography.Span.OneSymbol",
		defaultMessage: "1 símbolo",
		description: "",
	},
	passwords_not_match: {
		id: "ResetPasswordForm.OutlinedInput.PasswordNotMatch",
		defaultMessage: "No son iguales.",
		description: "",
	},
	change: {
		id: "ResetPasswordForm.Button.Change",
		defaultMessage: "Cambiar",
		description: "",
	},
}

export default function ResetPasswordForm({ accessToken }: ResetPasswordFormProps) {

	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)

	const {
		isInnerLoading,
		isValid,
		error,
		message,
		errors,
		showPassword,
		showConfirmPassword,
		hasEightChars,
		hasOneNumber,
		hasOneLetter,
		hasOneSymbol,
		onSubmit,
		handleSubmit,
		register,
		onClickTogglePassword,
		onClickToggleConfirmPassword,
	} = useResetPasswordForm(accessToken)

	return (
		<>
			<div>
				{
					isInnerLoading && (
						<FullLoader />
					)
				}
				<Box sx={{ my: 5, display: 'flex', justifyContent: 'center' }}>
					<Image
						src={Logo}
						alt="Proquinal"
						priority={true}
						style={{
							objectFit: 'contain',
						}}
					/>
				</Box>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Grid sx={{ maxWidth: 350, mx: 'auto' }} container spacing={2}>
						<Typography component="h6" variant="body1">{TEXTS.intro}</Typography>
						<div>
							<Typography component="label">{TEXTS.label_password_requirements}</Typography>
							<div>
								<Typography component="span" sx={{ color: hasEightChars ? 'success.main' : '' }}>{TEXTS.min_length}</Typography>
								<Typography component="span" sx={{ mx: '5px' }}>+</Typography>
								<Typography component="span" sx={{ color: hasOneLetter ? 'success.main' : '' }}>{TEXTS.one_letter}</Typography>
								<Typography component="span" sx={{ mx: '5px' }}>+</Typography>
								<Typography component="span" sx={{ color: hasOneNumber ? 'success.main' : '' }}>{TEXTS.one_number}</Typography>
								<Typography component="span" sx={{ mx: '5px' }}>+</Typography>
								<Typography component="span" sx={{ color: hasOneSymbol ? 'success.main' : '' }}>{TEXTS.one_symbol}</Typography>
							</div>
						</div>
							
						{/* Field: New password */}
						<Grid size={12}>
							<LabelForm
								label={TEXTS.label_new_password}
							/>
							<OutlinedInput 
								id="new_password"
								type={showPassword ? 'text' : 'password'}
								{...register("new_password", {
									required: GTEXTS.required,
									validate: {
										strongPassword: (new_password) => {
											const min = new_password.trim().length >= 8
											const hasNumber = /\p{N}/u.test(new_password)
											const hasLetter = /\p{L}/u.test(new_password)
											const hasSymbol = /\p{Z}|\p{S}|\p{P}/u.test(new_password)
											return min && hasNumber && hasLetter && hasSymbol ? true : TEXTS.strong_password_required
										},
									},
								})}
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
								name="new_password"
								render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
							/>
						</Grid>

						{/* Field: Confirm new password */}
						<Grid size={12}>
							<LabelForm
								label={TEXTS.label_confirm_new_password}
							/>
							<OutlinedInput
								id="confirm_new_password"
								type={showConfirmPassword ? 'text' : 'password'}
								{...register("confirm_new_password", {
									required: GTEXTS.required,
									validate: {
										checkSamePassword: (confirm_new_password, { new_password }) => {
											return new_password === confirm_new_password ? true : TEXTS.passwords_not_match
										},
									},
								})}
								fullWidth
								size="small"
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label={
												showConfirmPassword ? TEXTS.hide_the_password : TEXTS.display_the_password 
											}
											onClick={onClickToggleConfirmPassword}
											edge="end"
										>
											{showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
										</IconButton>
									</InputAdornment>
								}
							/>
							<ErrorMessage
								errors={errors}
								name="confirm_new_password"
								render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
							/>
						</Grid>
						<FormMessages
							message={message}
							error={error}
						/>
						{/* Submit button */}
						<Grid size={12}>
							<Button
								variant="contained"
								type="submit"
								fullWidth
								disabled={!isValid}
							>
								{TEXTS.change}
							</Button>
						</Grid>
					</Grid>
				</form>
			</div>
		</>
	)
}