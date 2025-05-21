import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

//Constants
import { EMPLOYEE_TYPE_INTERNAL, GTRANS } from "@/constants/Globals";

//Errors
import AuthError from "@/errors/AuthError";
import LocalError from "@/errors/LocalError";
import ValidationError from "@/errors/ValidationError";

//Hooks
import useFormMessages from "@/hooks/useFormMessages";
import useSessionProviderHook from "@/providers/SessionProvider/hooks";
import useTranslation from "@/hooks/useTranslation";

//Interfaces and types
import { FormGiveEntryExternalEmployeeType } from "@/interfaces/Forms";
import { ItemSelector } from "@/interfaces/General";

//Services
import Orchestra from "@/services/Orchestra";

//Texts
const TRANS = {
	success_entry_vehicle: {
		id: "FormGiveEntryExternalEmployee.SuccessMessage.CreateEntryVehicleSuccessfully",
		defaultMessage: "Entrada realizada exitosamente.",
		description: "",
	},
}

export default function useFormGiveEntryExternalEmployee() {
	
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
	} = useForm<FormGiveEntryExternalEmployeeType>({ defaultValues: {
		card_number: "",
		company: "",
		code: "",
		document: "",
		identity_type: "",
		fullname: "",
		email: "",
		receiver: "",
		comments: "",
	}})

	const [okMessage, errorMessage, changeOkMessage, changeErrorMessage, hideMessages] = useFormMessages()
	const [isInnerLoading, setIsInnerLoading] = useState(false)

	/**
	 * Submits the data to give entry of an employee.
	 */
	const onSubmit = async (data: FormGiveEntryExternalEmployeeType) => {
		try {
			if(isInnerLoading) {
				return
			}
			setIsInnerLoading(true)
			hideMessages()
			
			await Orchestra.entryEmployeeService.giveEntryExternal(data)
			
			changeOkMessage(TEXTS.success_entry_vehicle)
			
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
	
	
	
	/**
	 * Loads the identification types.
	 */
	const loadIdentificationTypes = useCallback(async () => {
		const results = await Orchestra.identificationTypeService.all()
		return results.map((identityType) => ({ label: identityType.code, value: identityType.id }))
	}, [])
	
	
	/**
	 * Search an employee by name.
	 */
	const emitGetOptionsReceivers = useCallback(async (criteriaSearch: string) : Promise<ItemSelector[]> => {
		const employee = await Orchestra.employeeService.search("", criteriaSearch, EMPLOYEE_TYPE_INTERNAL)
		return [{ label: employee.name, value: employee.id }]
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
		loadIdentificationTypes,
		emitGetOptionsReceivers,
	}
}