
//React and Modules
import { useState, useEffect } from "react";

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
import useDebounce from "@/hooks/useDebounce";
import useFormMessages from "@/hooks/useFormMessages";
import useSessionProviderHook from "@/providers/SessionProvider/hooks";
import useTranslation from "@/hooks/useTranslation";

//Interfaces and types
import { Branch, Company, Gate } from "@/interfaces/Models";
import { VisitFormType } from "@/interfaces/Forms";
import type { Moment } from "moment";
import { ItemSelector } from "@/interfaces/General";

//Services
import Orchestra from "@/services/Orchestra";

//Texts
const TRANS = {
	visit_saved: {
		id: "RegisterVisitForm.SuccessMessage.VisitSaved",
		defaultMessage: "Visita guardada.",
		description: "",
	},
	visit_updated: {
		id: "RegisterVisitForm.SuccessMessage.VisitUpdated",
		defaultMessage: "Visita actualizada.",
		description: "",
	},
	error_saving_visit: {
		id: "RegisterVisitForm.ErrorMessage.ErrorSavingVisit",
		defaultMessage: "No fue posible guardar la visita.",
		description: "",
	},
	error_loading_companies: {
		id: "RegisterVisitForm.ErrorMessage.ErrorLoadingCompanies",
		defaultMessage: "Error cargando las empresas.",
		description: "",
	},
}

const EMPTY_FIELDS_FORM = {
	entry_date: '',
	departure_date: '',
	reason: '',
	email_interventor: '',
	email_approver: '',
	company_selected: '',
	branch_selected: '',
	gate_selected: '',
}

export default function useRegisterVisitForm(onClose: () => void, preFillFormData: VisitFormType = EMPTY_FIELDS_FORM, visitId?: number, onSaved?: (data: VisitFormType) => Promise<void>) {
	
	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)
	const { getLoggedUser } = useSessionProviderHook();
	const loggedUser = getLoggedUser();

	const defaultValues = {
		...preFillFormData,
		email_interventor: preFillFormData.email_interventor || loggedUser?.email || ''
	};

	const {
		control,
		reset,
		register,
		watch,
		handleSubmit,
		getValues,
		setValue,
		formState: { errors, isValid },
	} = useForm<VisitFormType>({ defaultValues })

	const {
		isLoggedIn,
		openModalLoginForm,
		showLocalError,
	} = useSessionProviderHook()
	
  const [companies, setCompanies] = useState<Company[]>([])
  const [minDateDeparture, setMinDateDeparture] = useState<Moment>(moment())
  const [company_selected, branch_selected, gate_selected] = watch(["company_selected","branch_selected","gate_selected"])
	
  const [isInnerLoading, setIsInnerLoading] = useState<boolean>(false)
  const [isLoadingCompanies, setIsLoadingCompanies] = useState<boolean>(true)
	const [okMessage, errorMessage, changeOkMessage, changeErrorMessage, hideMessages] = useFormMessages()
  const [indexRefresh, setIndexRefresh] = useState(0)
	const [debounce] = useDebounce()
	
	/**
	 * Function to handle the close form event.
	 */
	const closeForm = () => {
		onClose()
		reset()
	}
	
	/**
	 * Return the company object.
	 */
	const getCompany = () => {
		const theCompany = companies.find((company: Company) => company.id === company_selected)
		if(!theCompany) {
			return { short_description: '' }
		}
		return theCompany
	}

	/**
	 * Return the branch object.
	 */
	const getBranch = () => {
		const theCompany = companies.find((company: Company) => company.id === company_selected)
		if(!theCompany) {
			return { short_description: '' }
		}
		const theBranch = theCompany.branches?.find((branch: Branch) => branch.id === branch_selected)
		if(!theBranch) {
			return { short_description: '' }
		}
		return theBranch
	}

	/**
	 * Return the gate object.
	 */
	const getGate = () => {
		const theCompany = companies.find((company: Company) => company.id === company_selected)
		if(!theCompany) {
			return { description: '' }
		}
		const theBranch = theCompany.branches?.find((branch: Branch) => branch.id === branch_selected)
		if(!theBranch) {
			return { description: '' }
		}
		const theGate = theBranch.gates?.find((gate: Gate) => gate.id === gate_selected)
		if(!theGate) {
			return { description: '' }
		}
		return theGate
	}

  /**
   * Returns a list of branches from the form state. Based on the company selection.
   * @returns 
   */
  const getBranches = () => {
    const myCompany = companies.find(company => company.id === company_selected)
    return myCompany?.branches || []
  }

  /**
   * Returns a list of gates from the form state. Based in the branch selection.
   * @returns 
   */
  const getGates = () => {
    const branches = getBranches()
    const myBranch = branches.find(branch => branch.id === branch_selected)
    return myBranch?.gates || []
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
		return valStrDate ? moment(valStrDate) : null
  }
	
	/**
   * Function to handle the submit of the form. Saving the visit data.
   * @returns 
   */
  const onSubmit: SubmitHandler<VisitFormType> = async (data) => {
		try {
			if(isInnerLoading) {
				return
			}
			setIsInnerLoading(true)
			hideMessages()
			let result
			if(visitId) {
				result = await Orchestra.visitService.update(visitId, data)
			} else {
				result = await Orchestra.visitService.create(data)
			}
			if(result) {
				if(onSaved) {
					await onSaved({
						id_visit: visitId,
						...data,
					})
				}
				if(!visitId) {
					reset()
					setIndexRefresh(indexRefresh+1)
					changeOkMessage(TEXTS.visit_saved)
				} else {
					changeOkMessage(TEXTS.visit_updated)
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
		return isValid && !isInnerLoading && !isLoadingCompanies
	}

	/**
	 * Searches a user interventor by the criteria.
	 */
	const emitGetOptionsInterventor = async (criteriaSearch: string) : Promise<ItemSelector[]> => {
		const results = await Orchestra.userService.searchInterventor(criteriaSearch)
		return results.map((user) => ({ label: `${user.first_name} (${user.email})`, value: user.email }))
	}

	/**
	 * Searches a user approver by the criteria.
	 */
	const emitGetOptionsApprovers = async (criteriaSearch: string) : Promise<ItemSelector[]> => {
		const results = await Orchestra.userService.searchApprover(criteriaSearch)
		return results.map((user) => ({ label: `${user.first_name} (${user.email})`, value: user.email }))
	}

	/**
	 * Effects
	 */

  useEffect(() => {
		/**
   	 * Loads the companies and save them in a state variable.
   	 */
		const fetchCompanies = async () => {
			if(!isLoggedIn) {
				return
			}
			debounce(async () => {
				try {
					const companiesData = await Orchestra.companyService.all()
					if (!Array.isArray(companiesData)) {
						throw new LocalError(TEXTS.error_loading_companies)
					}
					setCompanies([...companiesData])
					setIsLoadingCompanies(false)
				} catch(catchError) {
					if(catchError instanceof AuthError) {
						return openModalLoginForm()
					}
					if(catchError instanceof LocalError || catchError instanceof ValidationError) {
						return showLocalError(catchError)
					}
					throw catchError
				} finally {
					setIsLoadingCompanies(false)
				}
			})
		}

    fetchCompanies();
	// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, debounce, openModalLoginForm, showLocalError]);
	
	useEffect(() => {
		setValue('branch_selected', preFillFormData.branch_selected)
	}, [company_selected, setValue, preFillFormData.branch_selected])
	
	useEffect(() => {
		setValue('gate_selected', preFillFormData.gate_selected)
	}, [branch_selected, setValue, preFillFormData.gate_selected])
	
	useEffect(() => {
		if (!getValues('email_interventor')) {
			setValue('email_interventor', loggedUser?.email || '')
		}
	}, [setValue, loggedUser?.email, getValues])
	
	return {
		indexRefresh,
		company_selected,
		branch_selected,
		gate_selected,
		isInnerLoading,
		minDateDeparture,
		errors,
		control,
		companies,
		message: okMessage,
		error: errorMessage,
		isLoadingCompanies,
		closeForm,
		handleSubmit,
		onSubmit,
		register,
		getInputDateValue,
		onChangeInputDate,
		setMinDateDeparture,
		renderValueDropdown,
		getCompany,
		getBranch,
		getGate,
		getBranches,
		getGates,
		isValidForm,
		emitGetOptionsInterventor,
		emitGetOptionsApprovers,
	}
}