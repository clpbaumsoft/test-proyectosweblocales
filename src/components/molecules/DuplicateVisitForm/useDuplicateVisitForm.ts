
//React and Modules
import { useState } from "react";

import moment from "moment";
import "moment/locale/es";

import { useForm, SubmitHandler } from "react-hook-form"

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
import { DuplicateVisitFormType, VisitFormType } from "@/interfaces/Forms";
import type { Moment } from "moment";
import type { ItemSelector } from "@/interfaces/General";

//Services
import Orchestra from "@/services/Orchestra";

//Texts
const TRANS = {
	visit_saved: {
		id: "DuplicateVisitForm.SuccessMessage.VisitSaved",
		defaultMessage: "Visita guardada.",
		description: "",
	},
	visit_duplicated: {
		id: "DuplicateVisitForm.SuccessMessage.VisitUpdated",
		defaultMessage: "Visita duplicada.",
		description: "",
	},
	error_saving_visit: {
		id: "DuplicateVisitForm.ErrorMessage.ErrorSavingVisit",
		defaultMessage: "No fue posible guardar la visita.",
		description: "",
	},
	error_loading_companies: {
		id: "DuplicateVisitForm.ErrorMessage.ErrorLoadingCompanies",
		defaultMessage: "Error cargando las empresas.",
		description: "",
	},
}

const EMPTY_FIELDS_FORM = {
	entry_date: '',
	departure_date: '',
	reason: '',
	email_approver: '',
	company_selected: '',
	branch_selected: '',
	gate_selected: '',
}

export default function useDuplicateVisitForm(onClose: () => void, preFillFormData: VisitFormType = EMPTY_FIELDS_FORM, visitId?: number, onSaved?: (data: DuplicateVisitFormType) => Promise<void>) {
	
	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)

	const {
		control,
		reset,
		register,
		watch,
		handleSubmit,
		getValues,
		setValue,
		formState: { errors, isValid },
	} = useForm<VisitFormType>({ defaultValues: { ...preFillFormData } })

	const {
		openModalLoginForm,
	} = useSessionProviderHook()
	
  const [minDateDeparture, setMinDateDeparture] = useState<Moment>(moment())
  const [company_selected, branch_selected, gate_selected] = watch(["company_selected","branch_selected","gate_selected"])
	
  const [isInnerLoading, setIsInnerLoading] = useState<boolean>(false)
  const [okMessage, errorMessage, changeOkMessage, changeErrorMessage, hideMessages] = useFormMessages()
  const [indexRefresh, setIndexRefresh] = useState(0)
	
	/**
	 * Function to handle the close form event.
	 */
	const closeForm = () => {
		onClose()
		reset()
	}

	/**
   * Function to handle the changes of the datepicker elements.
   * @returns 
   */
  const onChangeInputDate = (key: keyof VisitFormType, value: Moment | null) => {
    setValue(key, value?.format('YYYY-MM-DD HH:mm:ss') || '')
  }
	
	/**
   * Function to return the value of an input date.
   * @returns 
   */
	const getInputDateValue = (key: keyof VisitFormType) => {
		const valStrDate = getValues(key)
		if (!valStrDate) return null

		let valueToParse: string | number | undefined
		if (typeof valStrDate === 'object' && valStrDate !== null) {
			valueToParse = (valStrDate as ItemSelector).value
		} else {
			valueToParse = valStrDate as string | number
		}

		return valueToParse ? moment(valueToParse) : null
	}
	
	/**
   * Function to handle the submit of the form. Saving the visit data.
   * @returns 
   */
  const onSubmit: SubmitHandler<DuplicateVisitFormType> = async (data) => {
		try {
			if(isInnerLoading) {
				return
			}

			const dataToSend = {
				id_visit: visitId,
				...data,
			}

			setIsInnerLoading(true)
			hideMessages()
			let result
			if(visitId) {
				result = await Orchestra.visitService.duplicateVisit(dataToSend)
			} else {
				result = await Orchestra.visitService.duplicateVisit(dataToSend)
			}
			if(result) {
				if(onSaved) {
					await onSaved(dataToSend)
				}
				if(!visitId) {
					reset()
					setIndexRefresh(indexRefresh+1)
					changeOkMessage(TEXTS.visit_saved)
				} else {
					changeOkMessage(TEXTS.visit_duplicated)
				}
				
			} else {
				changeErrorMessage(TEXTS.error_saving_visit)
			}
			if(window && !visitId) {
				const eventTriggerLoadVisits = new CustomEvent("VisitsDashboardLoadVisits")
				window.dispatchEvent(eventTriggerLoadVisits)
			}
			
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

	/**
	 * Function used to render the values of the dropdowns.
	 * @param selected
	 * @param description 
	 * @returns 
	 */
	const renderValueDropdown = (selected: unknown, description: string) => {
		if (!selected || selected === -1 || selected === '') {
			return GTEXTS.select_option
		}
		return description || GTEXTS.select_option
	}

	/**
	 * Returns if the form can be submitted.
	 */
	const isValidForm = () => {
		return isValid && !isInnerLoading
	}

	/**
	 * Effects
	 */

	
	return {
		indexRefresh,
		company_selected,
		branch_selected,
		gate_selected,
		isInnerLoading,
		minDateDeparture,
		errors,
		control,
		message: okMessage,
		error: errorMessage,
		closeForm,
		handleSubmit,
		onSubmit,
		register,
		getInputDateValue,
		onChangeInputDate,
		setMinDateDeparture,
		renderValueDropdown,
		isValidForm,
	}
}