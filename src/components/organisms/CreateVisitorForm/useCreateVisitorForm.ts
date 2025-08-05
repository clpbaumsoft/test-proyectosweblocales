
//React and Modules
import { useCallback, useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";

//Errors
import AuthError from "@/errors/AuthError";
import LocalError from "@/errors/LocalError";
import NoResultsError from "@/errors/NoResultError";
import ValidationError from "@/errors/ValidationError";

//Helpers
import { mediaUrl } from "@/lib/Helpers";

//Hooks
import useSessionProviderHook from "@/providers/SessionProvider/hooks";
import useFormMessages from "@/hooks/useFormMessages";
import useTableVisitsProviderHook from "@/providers/TableVisitsProvider/hook";
import useTranslation from "@/hooks/useTranslation";

//Interfaces and types
import { VisitorFormType } from "@/interfaces/Organisms";

//Services
import Orchestra from "@/services/Orchestra";
import { Visitor } from "@/interfaces/Models";

//Texts
const TRANS = {
	visitor_created: {
		id: "CreateVisitorForm.SuccessMessage.VisitorAdded",
		defaultMessage: "Visitante agregado.",
		description: "",
	},
	error_saving_visitor: {
		id: "CreateVisitorForm.ErrorMessage.NoCreatedVisitor",
		defaultMessage: "No se creó al visitante.",
		description: "",
	},
}

const EMPTY_FIELDS_FORM = {
	id_visitor_type: "",
	identity_number: "",
	id_identity_type: "",
	requires_security_speak: 0,
	first_name: "",
	middle_name: "",
	first_last_name: "",
	second_last_name: "",
	phone: "",
	address: "",
	emergency_contact_name: "",
	emergency_contact_phone: "",
	photo: null,
	city: "",
	social_security: "",
	arl: "",
}

export default function useCreateVisitorForm(visitId: number, increaseVisitorsCounter: () => void, isNewVisitorBasicForm: boolean) {
	const TEXTS = useTranslation(TRANS)
	const [currentVisitorData, setCurrentVisitorData] = useState<Visitor>()

	const {
		openModalLoginForm,
		showLocalError,
	} = useSessionProviderHook()
	
	const {
		control,
		reset,
		register,
		handleSubmit,
		getValues,
		setValue,
		formState: { errors },
	} = useForm<VisitorFormType>({
		defaultValues: { ...EMPTY_FIELDS_FORM },
		//mode: 'onSubmit',
	})

	const {
		listVisitorTypes,
		listIdentificationTypes,
		setListVisitorTypes,
		setListIdentificationTypes,
	} = useTableVisitsProviderHook()
	

  const [isInnerLoading, setIsInnerLoading] = useState<boolean>(false)
	const [okMessage, errorMessage, changeOkMessage, changeErrorMessage, hideMessages] = useFormMessages()
	/**
	 * Function to handle the submit of the form. Saving the visitor data.
	 * @returns 
	 */
	const onSubmit: SubmitHandler<VisitorFormType> = async (data) => {
		try {
			if(isInnerLoading) {
				return
			}
			hideMessages()
			setIsInnerLoading(true)
			if(isNewVisitorBasicForm) {
				const newData = {
					"id_identification_type": data?.id_identity_type,
					"identification_number": data?.identity_number,
					"first_name": data?.first_name,
					"middle_name": data?.middle_name,
					"first_last_name": data?.first_last_name,
					"second_last_name": data?.second_last_name,
				}
				await Orchestra.visitVisitorService.createVisitorWithBasicData(newData) 
				hideMessages(3*800, ()=> {
					const buttonSearch: HTMLButtonElement | null = document.getElementById('search-person-button') as HTMLButtonElement | null;
					if (buttonSearch) {
						buttonSearch.click();
					}
				})
			} else {
				console.log("currentVisitorDataAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" ,currentVisitorData)
				await Orchestra.visitVisitorService.create(visitId, data, currentVisitorData?.startdate_sgsst || "", currentVisitorData?.enddate_sgsst || "")

			}
			reset()
			changeOkMessage(TEXTS.visitor_created)
			increaseVisitorsCounter()
			setIsInnerLoading(false)
		} catch(catchError) {
			setIsInnerLoading(false)
			if(catchError instanceof AuthError) {
				return openModalLoginForm()
			}
			if(catchError instanceof LocalError || catchError instanceof ValidationError) {
				changeErrorMessage(catchError.message)
			} else {
				changeErrorMessage(TEXTS.error_saving_visitor)
			}
		}
		
	}

	/**
	 * On error event used to clean the form messages.
	 */
	const onError = () => {
		hideMessages()
	}
	
	/**
	 * Checks if the form is valid.
	 * @returns 
	 */
	const isValidForm = () => {
		return !isInnerLoading
	}
	
	/**
	 * On blur event for the field "identity_number" to check if the visitor already exists and it is then, the form will be filled with the data.
	 */
	const onBlurIdentificationNumber = async () => {
		
		try {
			const idIdentificationType = getValues('id_identity_type')
			const identificationNumber = getValues('identity_number')
			
			if(!identificationNumber || !idIdentificationType || isInnerLoading) {
				return
			}
			setIsInnerLoading(true)
			const visitor = await Orchestra.visitorService.get(identificationNumber, idIdentificationType)
			setCurrentVisitorData(visitor)
			setValue('requires_security_speak', visitor.requires_security_speak ? 1 : 0)
			setValue('first_name', visitor.first_name)
			setValue('middle_name', visitor.middle_name || "")
			setValue('first_last_name', visitor.first_last_name)
			setValue('second_last_name', visitor.second_last_name || "")
			setValue('phone', visitor.phone)
			setValue('emergency_contact_name', visitor.emergency_contact_name || "No registra")
			setValue('emergency_contact_phone', visitor.emergency_contact_phone || "0000000")
			setValue('address', visitor.address)
			setValue('arl', visitor.id_arlcompany ? visitor.id_arlcompany : '')
			setValue('social_security', visitor.id_carecompany ? visitor.id_carecompany : '')
			setValue('city', visitor.id_city ? visitor.id_city : '')
			setValue('photo', visitor.photo_url ? mediaUrl(visitor.id, 'foto-visitante') : null)
			setIsInnerLoading(false)
		} catch(catchError) {
			setIsInnerLoading(false)
			if(catchError instanceof NoResultsError) {
				setValue('first_name', '')
				setValue('middle_name', '')
				setValue('first_last_name', '')
				setValue('second_last_name', '')
				setValue('phone', '')
				setValue('emergency_contact_name', '')
				setValue('emergency_contact_phone', '')
				setValue('address', '')
				setValue('arl', '')
				setValue('social_security', '')
				setValue('city', '')
				setValue('photo', null)
				return
			}
			if(catchError instanceof AuthError) {
				return openModalLoginForm()
			}
			if(catchError instanceof LocalError || catchError instanceof ValidationError) {
				return showLocalError(catchError)
			}
			throw catchError
		}
	}

	/**
	 * Returns photo's default value.
	 */
	const getPhotoDefaultValue = () : string | null => {
		const preLoadedValue = getValues('photo')
		return preLoadedValue instanceof File ? null : preLoadedValue
	}
	
	/**
	 * Loads the care companies.
	 */
	const loadCareCompanies = useCallback(async () => {
		const results = await Orchestra.careCompanyService.all()
		return results.map((careCompany) => ({ label: careCompany.name, value: careCompany.id }))
	}, [])
	
	/**
	 * Loads the arl companies.
	 */
	const loadArlCompanies = useCallback(async () => {
		const results = await Orchestra.arlCompanyService.all()
		return results.map((arlCompany) => ({ label: arlCompany.name, value: arlCompany.id }))
	}, [])
	
	/**
	 * Loads the cities.
	 */
	const loadCities = useCallback(async () => {
		const results = await Orchestra.cityService.all()
		return results.map((city) => ({ label: city.name, value: city.id }))
	}, [])
	
	/**
	 * Loads the visitor types.
	 */
	const loadVisitorTypes = useCallback(async () => {
		if(listVisitorTypes.length > 0) {
			return listVisitorTypes.map((vtype) => ({ label: vtype.short_description, value: vtype.id }))
		}
		const results = await Orchestra.visitorTypeService.all()
		setListVisitorTypes([...results])
		return results.map((vtype) => ({ label: vtype.short_description, value: vtype.id }))
	}, [listVisitorTypes, setListVisitorTypes])
	
	/**
	 * Loads the identification types.
	 */
	const loadIdentificationTypes = useCallback(async () => {
		if(listIdentificationTypes.length > 0) {
			return listIdentificationTypes.map((itype) => ({ label: itype.code, value: itype.id }))
		}
		const results = await Orchestra.identificationTypeService.all()
		setListIdentificationTypes([...results])
		return results.map((itype) => ({ label: itype.code, value: itype.id }))
	}, [listIdentificationTypes, setListIdentificationTypes])
	
	
	return {
		message: okMessage,
		error: errorMessage,
		isInnerLoading,
		errors,
		control,
		reset,
		register,
		handleSubmit,
		setValue,
		onSubmit,
		onError,
		isValidForm,
		onBlurIdentificationNumber,
		getPhotoDefaultValue,
		loadCareCompanies,
		loadArlCompanies,
		loadCities,
		loadVisitorTypes,
		loadIdentificationTypes,
		currentVisitorData,
	}
}