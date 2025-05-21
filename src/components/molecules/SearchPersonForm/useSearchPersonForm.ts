import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

//Constants
import { GTRANS, IDENTIFICATION_TYPE_CODE_CC } from "@/constants/Globals";

//Errors
import AuthError from "@/errors/AuthError";
import LocalError from "@/errors/LocalError";
import ValidationError from "@/errors/ValidationError";

//Interfaces and types
import { SearchPersonFormType } from "@/interfaces/Forms";
import { Person } from "@/interfaces/General";

//Hooks
import useSessionProviderHook from "@/providers/SessionProvider/hooks";
import useTranslation from "@/hooks/useTranslation";
import Orchestra from "@/services/Orchestra";
import { IdentificationType } from "@/interfaces/Models";


export default function useSearchPersonForm(onSearch: (dataSearch: SearchPersonFormType) => Promise<Person>, onResult: (person: Person) => void, onFail?: (error: unknown) => void) {
	
	const GTEXTS = useTranslation(GTRANS)

	const {
		openModalLoginForm,
		showLocalError,
	} = useSessionProviderHook()

	const {
		control,
		formState: { errors },
		register,
		handleSubmit,
	} = useForm<SearchPersonFormType>({
		defaultValues: {
			document_type: IDENTIFICATION_TYPE_CODE_CC,
			document_or_name: "",
		}
	})

	const [isInnerLoading, setIsInnerLoading] = useState(false)
	const [identificationTypes, setIdentificationTypes] = useState<IdentificationType[]>([])

	/**
	 * Submits the form to search the active visits of a visitor.
	 * @param data 
	 * @returns 
	 */
	const onSubmit = async (data: SearchPersonFormType) => {
		try {
			if(isInnerLoading) {
				return
			}
			setIsInnerLoading(true)

			const person = await onSearch(data)
			setIsInnerLoading(false)
			
			onResult(person ? { ...person } : null)
			
		} catch(catchError) {
			if(onFail) {
				onFail(catchError)
			}
			setIsInnerLoading(false)
			if(catchError instanceof AuthError) {
				return openModalLoginForm()
			}
			if(catchError instanceof LocalError || catchError instanceof ValidationError) {
				return showLocalError(catchError)
			}
			showLocalError(new LocalError(GTEXTS.error_something_went_wrong))
		}
	}

	/**
	 * Loads the identification types.
	 */
	const loadIdentificationTypes = useCallback(async () => {
		if(identificationTypes.length > 0) {
			return identificationTypes.map((itype) => ({ label: itype.code, value: itype.id }))
		}
		const results = await Orchestra.identificationTypeService.all()
		setIdentificationTypes([...results])
		return results.map((itype) => ({ label: itype.code, value: itype.id }))
	}, [identificationTypes, setIdentificationTypes])

	/**
	 * Returns the id from code in the identification types list.
	 * @param code 
	 */
	const getIdByCode = (code: string) => {
		if(!identificationTypes.length) {
			return undefined
		}
		return identificationTypes.find((itype) => itype.code === code)?.id
	}

	return {
		isInnerLoading,
		control,
		errors,
		register,
		handleSubmit,
		onSubmit,
		loadIdentificationTypes,
		getIdByCode,
	}
}