//React and modules
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

//Constants
import { GTRANS } from "@/constants/Globals";

//Errors
import AuthError from "@/errors/AuthError";
import LocalError from "@/errors/LocalError";

//Hooks
import useFormMessages from "@/hooks/useFormMessages";
import useTranslation from "@/hooks/useTranslation";

//Interfaces and types
import { RestorePasswordFormType } from "@/interfaces/Organisms";
import Orchestra from "@/services/Orchestra";


const TRANS = {
	restore_password_sent: {
		id: "RestorePasswordForm.SuccessMessage.RestorePasswordSent",
		defaultMessage: "Solicitud recibida. Revisa tu bandeja de entrada para encontrar el correo de restauración.",
		description: "",
	},
}

const EMPTY_FIELDS_FORM = {
	dni_type: "",
	dni: "",
	email: "",
}

export default function useRestorePasswordForm() {

	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)
	
	const {
		formState: { errors, isValid },
		register,
		handleSubmit,
		watch,
	} = useForm<RestorePasswordFormType>({ defaultValues: {...EMPTY_FIELDS_FORM} })

	const [isInnerLoading, setIsInnerLoading] = useState(false)
	const [okMessage, errorMessage, changeOkMessage, changeErrorMessage, hideMessages] = useFormMessages()
	const [valueTypeDni] = watch(['dni_type'])


	/**
	 * Function to handle the form submit event and log in the user with credentials.
	 * @param data 
	 */
	const onSubmit: SubmitHandler<RestorePasswordFormType> = async (data) => {
		
		try {
			if(isInnerLoading) {
				return
			}
			setIsInnerLoading(true)
			hideMessages()
			
			await Orchestra.authService.restorePassword(data)
			
			changeOkMessage(TEXTS.restore_password_sent)
			
			setIsInnerLoading(false)
		} catch(error) {
			setIsInnerLoading(false)
			if(error instanceof AuthError) {
				changeErrorMessage(error.message || GTEXTS.error_something_went_wrong);
			} else if(error instanceof LocalError) {
				changeErrorMessage(error.message || GTEXTS.error_something_went_wrong);
			} else {
				changeErrorMessage(GTEXTS.error_something_went_wrong);
			}
		}
	}

	/**
	 * Returns if the form is valid to be submitted.
	 */
	const isValidForm = () => {
		return isValid && !isInnerLoading
	}

	return {
		isInnerLoading,
		message: okMessage,
		error: errorMessage,
		errors,
		valueTypeDni,
		register,
		handleSubmit,
		onSubmit,
		isValidForm,
	}
}