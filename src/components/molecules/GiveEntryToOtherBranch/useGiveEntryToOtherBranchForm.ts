import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

//Constants
import { GTRANS } from "@/constants/Globals";

//Errors
import AuthError from "@/errors/AuthError";
import LocalError from "@/errors/LocalError";
import ValidationError from "@/errors/ValidationError";

//Events
import EntryControlEvents from "@/events/EntryControlEvents";

//Hooks
import useFormMessages from "@/hooks/useFormMessages";
import useSessionProviderHook from "@/providers/SessionProvider/hooks";
import useTranslation from "@/hooks/useTranslation";

//Interfaces and types
import { VisitFormToOtherBranchType } from "@/interfaces/Forms";
import { Visit, Visitor } from "@/interfaces/Models";

//Services
import Orchestra from "@/services/Orchestra";

//Texts
const TRANS = {
	success_entry_to_other_branch: {
		id: "GiveEntryToOtherBranch.SuccessMessage.CreateEntryToOtherBranchSuccessfully",
		defaultMessage: "Entrada a nueva sede realizada exitosamente.",
		description: "",
	},
}

export default function useGiveEntryToOtherBranchForm(visitor: Visitor, visit: Visit) {
	console.log("🚀 ~ useGiveEntryToOtherBranchForm ~ visit:", visit)
	
	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)

	const {
		openModalLoginForm,
	} = useSessionProviderHook()
	
	const {
		control,
		formState: { errors },
		reset,
		register,
		handleSubmit,
	} = useForm<VisitFormToOtherBranchType>({ defaultValues: {
		visitor_id: visitor?.id || '',
		gate_selected: ''
	}})

	const [okMessage, errorMessage, changeOkMessage, changeErrorMessage, hideMessages] = useFormMessages()
	const [isInnerLoading, setIsInnerLoading] = useState(false)

	/**
	 * Submits the data to give entry visit to other branch.
	 */
	const onSubmit = async (data: VisitFormToOtherBranchType) => {
		try {
			if(isInnerLoading) {
				return
			}
			setIsInnerLoading(true)
			hideMessages(2*1000, ()=> {
				const buttonSearch: HTMLButtonElement | null = document.getElementById('search-person-button') as HTMLButtonElement | null;
				if (buttonSearch) {
					buttonSearch.click();
				}
			})
			if(visitor) {
				await Orchestra.visitToOtherBranchService.create(data)
				const copyVisitor = { ...visitor }
				EntryControlEvents.updateVisitor.emit('update_visitor', copyVisitor)
				changeOkMessage(TEXTS.success_entry_to_other_branch)
				reset()
				setIsInnerLoading(false)
			}
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
	
	/**
	 * Loads the gates.
	 */
	const loadGates = useCallback(async () => {
		const results = await Orchestra.gateService.all()
		return results.map((gate) => {
			return ({ label: `${gate.description} - ${gate?.branch?.company?.short_description || ""}`, value: gate.id })
		})
	}, [])
		
	return {
		isInnerLoading,
		message: okMessage,
		error: errorMessage,
		errors,
		control,
		register,
		handleSubmit,
		onSubmit,
		loadGates,
	}
}