import Image from "next/image";
import FullLoader from "@/components/atoms/FullLoader";
// import RestorePasswordForm from "@/components/organisms/RestorePasswordForm";
import LabelForm from "@/components/atoms/LabelForm";
import { GTRANS } from "@/constants/Globals";
import useLoginForm from "./useLoginForm";
import useTranslation from "@/hooks/useTranslation";
import { IDENTIFICATION_TYPES, TRANS } from "./constants";
import InputGroup from "@/components/atoms/InputGroup";
import Divider from "@/components/atoms/Divider";
import { LogosMicrosoft } from "@/assets/icons/Microsoft";
import { Button } from "@/components/atomsv2/Button";
import Select from "@/components/atoms/Select";
import FieldErrorMessage from "@/components/atomsv2/FieldErrorMessage";
import { XCircleIcon } from "@heroicons/react/16/solid";

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
				<div className="max-w-150 w-125 mx-auto">
					<Image
						src="/images/logos/logo.png"
						alt="Proquinal"
						priority={true}
					  className="object-cover relative right-2"
						width={303}
						height={303}
					/>
				<div className="text-[24px] my-12.5 font-inter font-medium">{TEXTS.title}</div>
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
						<FieldErrorMessage errorMessage={errors?.dni_type?.message} />
					</div>
					<div className="flex flex-col gap-1">
						<LabelForm label={TEXTS.label_dni} />
						<InputGroup 
							type="text"
							placeholder={TEXTS.label_dni}
							{...register("dni", { required: GTEXTS.required })}
						/>
						<FieldErrorMessage errorMessage={errors?.dni?.message} />
					</div>
					<div className="flex flex-col gap-1">
						<LabelForm label={TEXTS.label_password} />
						<InputGroup 
							type="password"
							placeholder={TEXTS.label_password}
							{...register("password", { required: GTEXTS.required })}
						/>
						<FieldErrorMessage errorMessage={errors?.password?.message} />
					</div>
					{isVisibleErrorMessage && (
						<div className="w-full">
							<div className="rounded-md bg-red-50 p-3">
								<div className="flex justify-between">
									<div className="ml-3">
										<h3 className="text-sm font-medium text-red-800">
											{errorMessage}
										</h3>
									</div>
									<div className="shrink-0">
										<XCircleIcon aria-hidden="true" className="size-5 text-red-400 cursor-pointer" onClick={() => setIsVisibleErrorMessage(false)} />
									</div>
								</div>
							</div>
						</div>
					)}
					<div className="flex flex-col gap-4 mt-8">
						<Button 
							type="submit" 
							disabled={!isValidForm()}
						>
							INGRESAR
						</Button>
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
				{/* <Dialog open={openRecovery} onClose={handleCloseRecovery}>
					<DialogTitle>{TEXTS.title_recovery_password}</DialogTitle>
					<DialogContent>
						<RestorePasswordForm onCancel={handleCloseRecovery} />
					</DialogContent>
				</Dialog> */}
				</div>
			</div>
		</>
	)
}