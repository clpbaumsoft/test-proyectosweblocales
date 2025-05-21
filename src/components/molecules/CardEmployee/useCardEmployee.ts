import { useEffect, useState } from "react";

//Constants
import { GTRANS } from "@/constants/Globals";

//Error
import AuthError from "@/errors/AuthError";
import LocalError from "@/errors/LocalError";
import ValidationError from "@/errors/ValidationError";

//Events
import EntryControlEvents from "@/events/EntryControlEvents";

//Hooks
import useToggleBoolean from "@/hooks/useToggleBoolean";
import useFormMessages from "@/hooks/useFormMessages";
import useSessionProviderHook from "@/providers/SessionProvider/hooks";
import useTranslation from "@/hooks/useTranslation";

//Interfaces and types
import { Employee } from "@/interfaces/Models";

//Services
import Orchestra from "@/services/Orchestra";
import useRecordState from "@/hooks/useRecordState";

//Texts
const TRANS = {
	success_leave_employee: {
		id: "CardEmployee.SuccessMessage.LeaveEmployee",
		defaultMessage: "Salida exitosa.",
		description: "",
	}
}

export default function useCardEmployee(employee: Employee) {
	
	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)
	
	const {
		openModalLoginForm,
	} = useSessionProviderHook()

	const [isOpenModalEntryEmployee, toggleIsOpenModalEntryEmployee] = useToggleBoolean(false)
	const [isInnerLoading, setIsInnerLoading] = useState(false)
	
	const [okMessage, errorMessage, changeOkMessage, changeErrorMessage, hideMessages] = useFormMessages()
	const [stateEmployee, setAttrEmployee, , setStateEmployee] = useRecordState<Employee>({ ...employee })
	
	/**
	 * Gives leave to an employee.
	 */
	const onClickGiveLeave = async () => {
		try {
			if(isInnerLoading) {
				return
			}
			setIsInnerLoading(true)
			hideMessages()
			await Orchestra.entryEmployeeService.leave(employee.id)
			
			changeOkMessage(TEXTS.success_leave_employee)
			setAttrEmployee('active_entry_employee', null)
			setIsInnerLoading(false)
		} catch(catchError) {
			setIsInnerLoading(false)
			if(catchError instanceof AuthError) {
				return openModalLoginForm()
			}
			if(catchError instanceof LocalError || catchError instanceof ValidationError) {
				changeErrorMessage(catchError.message)
			} else {
				changeErrorMessage(GTEXTS.error_something_went_wrong)			}
		}
	}

	/**
	 * Opens the modal to register the employee's entry.
	 */
	const openModalEntry = () => {
		toggleIsOpenModalEntryEmployee()
		hideMessages()
	}
	
	useEffect(() => {
		const handlerUpdateEmployee = (newEmployee: Employee) => {
			setStateEmployee({ ...newEmployee })
		}

		EntryControlEvents.updateEmployee.on('update_employee', handlerUpdateEmployee)

		return () => {
			EntryControlEvents.updateEmployee.off('update_employee', handlerUpdateEmployee)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	
	useEffect(() => {
		setStateEmployee({ ...employee })
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [employee])

	return {
		stateEmployee,
		isInnerLoading,
		message: okMessage,
		error: errorMessage,
		isOpenModalEntryEmployee,
		toggleIsOpenModalEntryEmployee,
		onClickGiveLeave,
		openModalEntry,
	}
}