
import { useState } from "react";

//Constants
import { GTRANS } from "@/constants/Globals";

//Errors
import AuthError from "@/errors/AuthError";
import LocalError from "@/errors/LocalError";
import ValidationError from "@/errors/ValidationError";

//Events
// import EntryControlEvents from "@/events/EntryControlEvents";

//Interfaces and types
import { Visitor } from "@/interfaces/Models";

//Hooks
import useSessionProviderHook from "@/providers/SessionProvider/hooks";
import useFormMessages from "@/hooks/useFormMessages";
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

export default function useCardActiveEntryInOtherBranch(visitor: Visitor) {

	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)
	
	const {
		openModalLoginForm,
		getLoggedUser,
	} = useSessionProviderHook()

	const [isInnerLoading, setIsInnerLoading] = useState(false)
	const [okMessage, errorMessage, changeOkMessage, changeErrorMessage, hideMessages] = useFormMessages()


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

			await Orchestra.visitToOtherBranchService.leave(visitor?.id)
			changeOkMessage(TEXTS.success_give_leave_entry)
			hideMessages(2*1000, ()=> {
				const buttonSearch: HTMLButtonElement | null = document.getElementById('search-person-button') as HTMLButtonElement | null;
				if (buttonSearch) {
					buttonSearch.click();
				}
			})
			setIsInnerLoading(false)
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
		onClickGiveLeave,
	}
}