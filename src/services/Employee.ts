//React and modules
import type { AxiosError } from "axios";

//Constants
import { GERRORS } from "@/constants/Globals";

//Errors
import AuthError from "@/errors/AuthError";
import LocalError from "@/errors/LocalError";
import ValidationError from "@/errors/ValidationError";

//Interfaces and types
import { Employee } from "@/interfaces/Models";
import { ErrorResponseDataType } from "@/interfaces/General";

//Libs
import apiRequest from "@/lib/ApiRequest";

export default class EmployeeService {

	/**
	 * Searches an employee.
	 */
	async search(idIdentificationType: string | number, dniOrNameOrCode: number | string, type: string = "", relations: string[] = []) : Promise<Employee> {
		try {
			return await apiRequest().get(`/employee-search?identity_type=${idIdentificationType}&type=${type}${dniOrNameOrCode ? '&document_or_name_or_code='+dniOrNameOrCode : ''}${relations.length > 0 ? '&relations='+relations.join(',') : ''}`).then((res) => res.data)
		} catch(catchError) {
			const error = catchError as AxiosError
			const status = error?.status || 500
			const dataResponse = (error?.response?.data as ErrorResponseDataType) || { error: "", message: "" }
			const message = dataResponse.error || dataResponse.message || GERRORS.error_something_went_wrong
			if(status === 401) {
				throw new AuthError(GERRORS.your_session_has_finished)
			}
			if(status === 422) {
				throw new ValidationError(dataResponse.message)
			}
			throw new LocalError(message)
		}
	}

}