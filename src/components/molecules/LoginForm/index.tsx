import Image from "next/image";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	Alert,
} from "@mui/material";
import { ErrorMessage } from "@hookform/error-message";
import Logo from "@/assets/logo.png";
import FullLoader from "@/components/atoms/FullLoader";
import RestorePasswordForm from "@/components/organisms/RestorePasswordForm";
import LabelForm from "@/components/atoms/LabelForm";
import { GTRANS } from "@/constants/Globals";
import useLoginForm from "./useLoginForm";
import useTranslation from "@/hooks/useTranslation";
import Select from "@/components/atoms/Select";
import { IDENTIFICATION_TYPES, TRANS } from "./constants";
import InputGroup from "@/components/atoms/InputGroup";
import Divider from "@/components/atoms/Divider";
import Button from "@/components/atoms/Button";
import { LogosMicrosoft } from "@/assets/icons/Microsoft";


export default function LoginForm() {
	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)

	const {
		errors,
		isVisibleErrorMessage,
		errorMessage,
		isInnerLoading,
		openRecovery,
		isValidForm,
		onSubmit,
		// handleOpenRecovery,
		handleCloseRecovery,
		handleSubmit,
		register,
		setIsVisibleErrorMessage,
	} = useLoginForm()

	return (
		<>
			{isInnerLoading && <FullLoader />}
			<div className="flex flex-1 flex-col justify-center py-5 shadow-md bg-white max-w-[50%] h-screen">
				<div className="max-w-[600px] w-[500px] mx-auto">
					<Image
						src={Logo}
						alt="Proquinal"
						priority={true}
					  className="object-cover w-[303px] relative right-2"
					/>
				<div className="text-[24px] my-[50px] font-inter font-[500]">{TEXTS.title}</div>
				<form 
				 	className="flex flex-col gap-6"
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className="flex flex-col gap-1">
						<LabelForm label={TEXTS.label_dni_type} />
						<Select
							options={IDENTIFICATION_TYPES(TEXTS)}
							{...register("dni_type", { required: GTEXTS.required })}
						/>
						<ErrorMessage
							errors={errors}
							name="dni_type"
							render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
						/>
					</div>
					<div className="flex flex-col gap-1">
						<LabelForm label={TEXTS.label_dni} />
						<InputGroup 
							type="text"
							placeholder={TEXTS.label_dni}
							{...register("dni", { required: GTEXTS.required })}
						/>
						<ErrorMessage
							errors={errors}
							name="dni"
							render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
						/>
					</div>
					<div className="flex flex-col gap-1">
						<LabelForm label={TEXTS.label_password} />
						<InputGroup 
							type="password"
							placeholder={TEXTS.label_password}
							{...register("password", { required: GTEXTS.required })}
						/>
						<ErrorMessage
							errors={errors}
							name="password"
							render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
						/>
					</div>
					{isVisibleErrorMessage && (
							<div className="w-full">
								<Alert severity="error" onClose={() => setIsVisibleErrorMessage(false)}>{errorMessage}</Alert>
							</div>
						)
					}
					<div className="flex flex-col gap-4 mt-8">
						<Button 
							type="submit" 
							text="INGRESAR" 
							disabled={!isValidForm()}
						/>
						<Divider />
						<a
							className="
								flex
								justify-center
								px-3.5 
								py-2.5 
								text-sm 
								font-semibold
								rounded-md
								border-2
								border-proquinal-teal
							"
							href="https://spaniel-hip-trivially.ngrok-free.app/login/microsoft/"
							rel="noopener noreferrer"
						>
							<LogosMicrosoft />
						</a>
					</div>
					{/* Forget password - temporarily hidden */}
					{/* <Grid size={12} mt={0}>
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
					</Grid> */}
				</form>
				<Dialog open={openRecovery} onClose={handleCloseRecovery}>
					<DialogTitle>{TEXTS.title_recovery_password}</DialogTitle>
					<DialogContent>
						<RestorePasswordForm onCancel={handleCloseRecovery} />
					</DialogContent>
				</Dialog>
				</div>
			</div>
		</>
	)
}