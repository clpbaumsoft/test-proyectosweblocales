import { useState } from "react";

//Interfaces and types
import { SearchPersonFormType } from "@/interfaces/Forms";
import { Employee } from "@/interfaces/Models";
import { Person } from "@/interfaces/General";

//Services
import Orchestra from "@/services/Orchestra";

export default function useFormEntryEmployee(type: string = "") {

	const [employee, setEmployee] = useState<Employee | null>(null)
	const [hasFinished, setHasFinished] = useState(false)

	/**
	 * Submits the form to search an employee.
	 * @param data 
	 * @returns 
	 */
	const onSearchEmployee = async (data: SearchPersonFormType) : Promise<Person> => {
		return await Orchestra.employeeService.search(data.document_type, data.document_or_name, type, [
			'active_entry_employee',
			'identification_type',
			'creator',
		])
	}

	/**
	 * Loads the result of the employee search.
	 * @param employee 
	 */
	const onLoadResult = (employee: Person) => {
		setEmployee(employee ? { ...employee } as Employee : null)
		setHasFinished(true)
	}
	
	return {
		employee,
		hasFinished,
		onSearchEmployee,
		onLoadResult,
	}
}