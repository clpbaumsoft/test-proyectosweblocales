import { useState } from "react";

//Constants
import { GTRANS } from "@/constants/Globals";

//Errors
import AuthError from "@/errors/AuthError";
import LocalError from "@/errors/LocalError";
import ValidationError from "@/errors/ValidationError";

//Events
import EntryControlEvents from "@/events/EntryControlEvents";

//Interfaces and types
import { Visitor } from "@/interfaces/Models";

//Hooks
import useSessionProviderHook from "@/providers/SessionProvider/hooks";
import useFormMessages from "@/hooks/useFormMessages";
import useToggleBoolean from "@/hooks/useToggleBoolean";
import useTranslation from "@/hooks/useTranslation";

//Packages
import { mcm } from "@/packages/mui-confirm-modal/src";

//Services
import Orchestra from "@/services/Orchestra";

//Texts
const TRANS = {
	success_give_leave_entry: {
		id: "CardActiveEntry.SuccessMessage.LeaveSuccessfully",
		defaultMessage: "Salida exitosa!",
		description: "",
	},
}

export default function useCardActiveEntry(visitor: Visitor) {

	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)
	
	const {
		openModalLoginForm,
		getLoggedUser,
	} = useSessionProviderHook()

	const [isInnerLoading, setIsInnerLoading] = useState(false)
	const [okMessage, errorMessage, changeOkMessage, changeErrorMessage, hideMessages] = useFormMessages()
	const [isOpenModalEntryVehicle, toggleModalEntryVehicle] = useToggleBoolean(false)
	const [isOpenModalEntryToOtherBranch, toggleModalEntryToOtherBranch] = useToggleBoolean(false)
	

	/**
	 * 
	 */
	const onClickGiveLeave = async () => {
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

			if(visitor) {
				await Orchestra.entryService.leave(visitor.id)
				changeOkMessage(TEXTS.success_give_leave_entry)
				hideMessages(5*1000, () => {
					EntryControlEvents.updateVisitor.emit('update_visitor', { ...visitor, active_entry: null })
				})
				setIsInnerLoading(false)
			}
			
		} catch(catchError) {
			setIsInnerLoading(false)
			if(catchError instanceof AuthError) {
				return openModalLoginForm()
			}
			if(catchError instanceof LocalError || catchError instanceof ValidationError) {
				return changeErrorMessage(catchError.message)
			}
			changeErrorMessage(GTEXTS.error_something_went_wrong)
		}
	}

	return {
		loggedUser: getLoggedUser(),
		isInnerLoading,
		message: okMessage,
		error: errorMessage,
		isOpenModalEntryToOtherBranch,
		toggleModalEntryToOtherBranch,
		isOpenModalEntryVehicle,
		toggleModalEntryVehicle,
		onClickGiveLeave,
	}
}