import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

//Constants
import { GTRANS } from "@/constants/Globals";

//Errors
import AuthError from "@/errors/AuthError";
import LocalError from "@/errors/LocalError";
import ValidationError from "@/errors/ValidationError";

//Hooks
import useFormMessages from "@/hooks/useFormMessages";
import useSessionProviderHook from "@/providers/SessionProvider/hooks";
import useTranslation from "@/hooks/useTranslation";

//Interfaces and types
import { FormGiveEntryEmployeeType } from "@/interfaces/Forms";
import { Employee } from "@/interfaces/Models";

//Services
import Orchestra from "@/services/Orchestra";
import EntryControlEvents from "@/events/EntryControlEvents";

//Texts
const TRANS = {
	success_entry_vehicle: {
		id: "FormGiveEntryEmployee.SuccessMessage.CreateEntryVehicleSuccessfully",
		defaultMessage: "Entrada realizada exitosamente.",
		description: "",
	},
}

export default function useFormGiveEntryEmployee(employee: Employee) {
	
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
	} = useForm<FormGiveEntryEmployeeType>({ defaultValues: {
		
	}})

	const [okMessage, errorMessage, changeOkMessage, changeErrorMessage, hideMessages] = useFormMessages()
	const [isInnerLoading, setIsInnerLoading] = useState(false)

	/**
	 * Submits the data to give entry of an employee.
	 */
	const onSubmit = async (data: FormGiveEntryEmployeeType) => {
		try {
			if(isInnerLoading) {
				return
			}
			setIsInnerLoading(true)
			hideMessages()
			
			const entry = await Orchestra.entryEmployeeService.give(employee.id, data)
			
			changeOkMessage(TEXTS.success_entry_vehicle)
			
			EntryControlEvents.updateEmployee.emit('update_employee', { ...employee, active_entry_employee: entry })
			
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
	
	/**
	 * Loads the companies.
	 */
	const loadCompanies = useCallback(async () => {
		const results = await Orchestra.companyService.all()
		return results.map((company) => ({ label: company.short_description, value: company.id }))
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
		loadCompanies,
	}
}