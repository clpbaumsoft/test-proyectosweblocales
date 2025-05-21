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
import useSessionProviderHook from "@/providers/SessionProvider/hooks";
import useFormMessages from "@/hooks/useFormMessages";
import useTranslation from "@/hooks/useTranslation";

//Interfaces and types
import { CreateEntryFormType } from "@/interfaces/Forms";
import { Visit, Visitor } from "@/interfaces/Models";

//Services
import Orchestra from "@/services/Orchestra";

//Texts
const TRANS = {
	success_give_entry: {
		id: "CreateEntryForm.SuccessMessage.GiveEntrySuccessfully",
		defaultMessage: "Visitante ingresado exitosamente.",
		description: "",
	},
}

export default function useCreateEntryForm(visit: Visit, visitor: Visitor) {

	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)
	
	const {
		openModalLoginForm,
	} = useSessionProviderHook()
	
	const {
		control,
		register,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateEntryFormType>({ defaultValues: {
		emergency_name: visitor.emergency_contact_name,
		emergency_phone: visitor.emergency_contact_phone,
		eps: visitor.id_carecompany,
		arl: visitor.id_arlcompany,
	}})
	
	const [okMessage, errorMessage, changeOkMessage, changeErrorMessage, hideMessages] = useFormMessages()
	const [isInnerLoading, setIsInnerLoading] = useState(false)


	/**
	 * Submits the data to create an entry.
	 */
	const onSubmit = async (data: CreateEntryFormType) => {
		try {
			if(isInnerLoading) {
				return
			}
			setIsInnerLoading(true)
			hideMessages()
			
			const entry = await Orchestra.entryService.give(visit.id, visitor.id, data)
			const newVisitor = { ...visitor, active_entry: { ...entry } }
			EntryControlEvents.updateVisitor.emit('update_visitor', newVisitor)
			changeOkMessage(TEXTS.success_give_entry)
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

	
	const loadCareCompanies = useCallback(async () => {
		const results = await Orchestra.careCompanyService.all()
		return results.map((careCompany) => ({ label: careCompany.name, value: careCompany.id }))
	}, [])

	const loadArlCompanies = useCallback(async () => {
		const results = await Orchestra.arlCompanyService.all()
		return results.map((arlCompany) => ({ label: arlCompany.name, value: arlCompany.id }))
	}, [])

	return {
		isInnerLoading,
		message: okMessage,
		error: errorMessage,
		errors,
		register,
		control,
		onSubmit,
		handleSubmit,
		watch,
		loadCareCompanies,
		loadArlCompanies,
	}
}