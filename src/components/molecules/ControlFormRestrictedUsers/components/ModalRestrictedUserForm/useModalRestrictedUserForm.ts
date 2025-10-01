
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
import { RestrictedUserFormType } from "@/interfaces/Forms";
import type { Moment } from "moment";

//Services
import Orchestra from "@/services/Orchestra";
import { Visitor } from "@/interfaces/Models";

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

export default function useModalRestrictedUserForm(visitor: Visitor, onClose: () => void, visitId?: number, onSaved?: (data: RestrictedUserFormType) => Promise<void>) {
	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)

	const {
		control,
		reset,
		register,
		handleSubmit,
		getValues,
		setValue,
		watch,
		formState: { errors, isValid },
	} = useForm<RestrictedUserFormType>({ 
		mode: 'onChange',
		defaultValues: { 
			banned_start_time: visitor?.banned_start_time || '',
			banned_end_time: visitor?.banned_end_time || '',
			is_banned: visitor?.is_banned || false,
			ban_comment: visitor?.ban_comment || '',
		} 
	})

	const {
		openModalLoginForm,
	} = useSessionProviderHook()
	
  const [minDateDeparture, setMinDateDeparture] = useState<Moment>(moment())
	
  const [isInnerLoading, setIsInnerLoading] = useState<boolean>(false)
  const [okMessage, errorMessage, changeOkMessage, changeErrorMessage, hideMessages] = useFormMessages()
  const [indexRefresh, setIndexRefresh] = useState(0)

      // Observar cambios en is_banned
    const isBanned = watch('is_banned');

    // Función para manejar el cambio del checkbox
    const handleCheckboxChange = (checked: boolean) => {
        setValue('is_banned', checked);
        if (!checked) {
            // Si se desmarca, limpiar las fechas
            setValue('banned_start_time', '');
            setValue('banned_end_time', '');
        }
    };

	
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
  const onChangeInputDate = (key: keyof RestrictedUserFormType, value: Moment | null) => {
    setValue(key, value?.format('YYYY-MM-DD') || '')
  }
	
	/**
   * Function to return the value of an input date.
   * @returns 
   */
	const getInputDateValue = (key: keyof RestrictedUserFormType) => {
		const value = getValues(key);
		
		if (key === 'banned_start_time' || key === 'banned_end_time') {
			const dateStr = value as string;
			return dateStr ? moment(dateStr) : null;
		}
		
		return null;
	}
	
	/**
   * Function to handle the submit of the form. Saving the visit data.
   * @returns 
   */
  const onSubmit: SubmitHandler<RestrictedUserFormType> = async (data) => {
		try {
			if(isInnerLoading) {
				return
			}
			
			const dataToSend = {
				id_visitor: visitor?.id,
				banned_start_time: data?.banned_start_time ? data?.banned_start_time :  visitor?.banned_start_time ? visitor?.banned_start_time : '',
				banned_end_time: data?.banned_end_time ? data?.banned_end_time : visitor?.banned_end_time ? visitor?.banned_end_time : '',
				is_banned: data?.is_banned ? data?.is_banned : false,
				ban_comment: data?.ban_comment ? data?.ban_comment : visitor?.ban_comment ? visitor?.ban_comment : '',
			}
			
			setIsInnerLoading(true)
			hideMessages()
			let result
			if(visitor?.id) {
				result = await Orchestra.restrictecUsersService.create(dataToSend)
			} else {
				result = await Orchestra.restrictecUsersService.create(dataToSend)
			}
			if(result) {
				if(onSaved) {
					await onSaved(dataToSend)
				}

				changeOkMessage(visitor?.is_currently_banned ? 'Usuario habilitado' : 'Usuario Restringido')

				hideMessages(3*800, ()=> {
					const buttonSearch: HTMLButtonElement | null = document.getElementById('search-person-button') as HTMLButtonElement | null;
					if (buttonSearch) {
						buttonSearch.click();
					}
				})

				if(!visitor?.id) {
					reset()
					setIndexRefresh(indexRefresh+1)
					changeOkMessage(TEXTS.visit_saved)
				} else {
					changeOkMessage(TEXTS.visit_duplicated)
				}
				
			} else {
				changeErrorMessage(TEXTS.error_saving_visit)
			}
			if(window && !visitor?.id) {
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
		setValue,
		getValues,
		isBanned,
        handleCheckboxChange,
	}
}
