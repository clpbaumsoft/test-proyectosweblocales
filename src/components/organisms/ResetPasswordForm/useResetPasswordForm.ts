import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

//Constants
import { GTRANS } from "@/constants/Globals";
import PAGES from "@/constants/Pages";

//Errors
import AuthError from "@/errors/AuthError";
import LocalError from "@/errors/LocalError";

//Interfaces and types
import { ResetPasswordFormType } from "@/interfaces/Auth";

//Hooks
import useFormMessages from "@/hooks/useFormMessages";
import useTranslation from "@/hooks/useTranslation";

//Services
import Orchestra from "@/services/Orchestra";

//Texts
const TRANS = {
	password_changed: {
		id: "ResetPasswordForm.SuccessMessage.PasswordChangedSuccessfully",
		defaultMessage: "Tu contraseña se ha cambiado exitosamente. Seras redirigido automaticamente al formulario de ingreso.",
		description: "",
	},
}

const EMPTY_FIELDS_FORM = {
	new_password: '',
	confirm_new_password: '',
}

export default function useResetPasswordForm(accessToken: string) {

	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)
	
	const router = useRouter()
	
	const {
		formState: { errors, isValid },
		register,
		handleSubmit,
		watch,
	} = useForm<ResetPasswordFormType>({ defaultValues: { ...EMPTY_FIELDS_FORM } })
	
	const [okMessage, errorMessage, changeOkMessage, changeErrorMessage, hideMessages] = useFormMessages()	
	const [isInnerLoading, setIsInnerLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	
	const[new_password] = watch(['new_password'])

	/**
	 * Function to handle the form submit event and change the user's password.
	 * @param data 
	 */
	const onSubmit: SubmitHandler<ResetPasswordFormType> = async (data) => {
		
		try {
			if(isInnerLoading) {
				return
			}
			setIsInnerLoading(true)
			hideMessages()
			
			await Orchestra.authService.changePassword(data, accessToken)
			
			changeOkMessage(TEXTS.password_changed)
			
			await new Promise((resolve) => {
				setTimeout(resolve, 8*1000)
			})
			
			router.push(PAGES.login)
			
			setIsInnerLoading(false)
		} catch(error) {
			if(error instanceof AuthError) {
				changeErrorMessage(error.message || GTEXTS.error_something_went_wrong)
			} else if(error instanceof LocalError) {
				changeErrorMessage(error.message || GTEXTS.error_something_went_wrong)
			} else {
				changeErrorMessage(GTEXTS.error_something_went_wrong)
			}
			setIsInnerLoading(false)
		}
	}
	
	const onClickTogglePassword = () => setShowPassword(!showPassword)
	
	const onClickToggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword)

	return {
		isInnerLoading,
		message: okMessage,
		error: errorMessage,
		isValid,
		errors,
		showPassword,
		showConfirmPassword,
		hasEightChars: new_password.trim().length >= 8,
		hasOneNumber: /\p{N}/u.test(new_password),
		hasOneLetter: /\p{L}/u.test(new_password),
		hasOneSymbol: /\p{Z}|\p{S}|\p{P}/u.test(new_password),
		handleSubmit,
		hideMessages,
		onSubmit,
		register,
		onClickTogglePassword,
		onClickToggleConfirmPassword,
	}
}