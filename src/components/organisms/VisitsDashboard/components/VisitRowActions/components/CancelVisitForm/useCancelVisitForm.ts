import { useState } from "react";
import { useForm } from "react-hook-form";

//Constants
import { GTRANS } from "@/constants/Globals"
import { VISIT_STATUS_CANCELLED } from "@/constants/Visit";

//Errors
import AuthError from "@/errors/AuthError";
import LocalError from "@/errors/LocalError";
import ValidationError from "@/errors/ValidationError";

//Hooks
import useSessionProviderHook from "@/providers/SessionProvider/hooks";
import useFormMessages from "@/hooks/useFormMessages";
import useTranslation from "@/hooks/useTranslation";

//Interfaces and types
import { VisitRow } from "@/interfaces/Atoms";
import { CancelVisitFormType } from "@/interfaces/Molecules";

//Packages
import { mcm } from "@/packages/mui-confirm-modal/src";

//Services
import Orchestra from "@/services/Orchestra";

//Texts
const TRANS = {
	success_cancel: {
		id: "CancelVisitForm.SuccessMessage.VisitCancelled",
		defaultMessage: "Visita cancelada!",
		description: "",
	},
}

export default function useCancelVisitForm(visitId: number, setRowData: (key: keyof VisitRow, newValue: unknown) => void) {
	
	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)

	const {
		openModalLoginForm,
	} = useSessionProviderHook()
	
	const {
		reset,
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<CancelVisitFormType>({ defaultValues: {  } })
	
	const [isInnerLoading, setIsInnerLoading] = useState(false)
	const [okMessage, errorMessage, changeOkMessage, changeErrorMessage, hideMessages] = useFormMessages()
	
	/**
	 * Change the visit's status to cancelled.
	 * 
	 */
	const onSubmit = async (data: CancelVisitFormType) => {
		try {
			if(isInnerLoading) {
				return
			}
			const confirmed = await mcm.confirm(GTEXTS.message_confirm_noback_action)
			if(!confirmed) {
				return
			}
			
			setIsInnerLoading(true)
			
			hideMessages()
			
			await Orchestra.visitService.cancel(visitId || 0, data.reason_cancel)
			setRowData('status', VISIT_STATUS_CANCELLED)
			changeOkMessage(TEXTS.success_cancel)
			reset()
			setIsInnerLoading(false)
		} catch(catchError) {
			setIsInnerLoading(false)
			if(catchError instanceof AuthError) {
				return openModalLoginForm()
			}
			if(catchError instanceof LocalError || catchError instanceof ValidationError) {
				changeErrorMessage(catchError.message)
			} else {
				changeErrorMessage(GTEXTS.error_something_went_wrong)
			}
		}
	}
	
	return {
		isValid,
		isInnerLoading,
		message: okMessage,
		error: errorMessage,
		errors,
		onSubmit,
		handleSubmit,
		register,
	}
}