//React and modules
import type { AxiosError } from "axios";

//Constants
import { GERRORS } from "@/constants/Globals";

//Errors
import AuthError from "@/errors/AuthError";
import LocalError from "@/errors/LocalError";

//Interfaces and types
import { Company } from "@/interfaces/Models";
import { ErrorResponseDataType } from "@/interfaces/General";

//Libs
import apiRequest from "@/lib/ApiRequest";

export default class CompanyService {

	/**
	 * Requests all the companies.
	 */
	async all() : Promise<Company[]> {
		try {
			return await apiRequest().get('/companies?relations=branches,gates').then((res) => res.data);
		} catch(catchError) {
			const error = catchError as AxiosError
			const status = error?.status || 500
			const dataResponse = (error?.response?.data as ErrorResponseDataType) || { error: "" }
			const message = dataResponse.error || dataResponse.message || GERRORS.error_something_went_wrong
			if(status === 401) {
				throw new AuthError(GERRORS.your_session_has_finished)
			}
			throw new LocalError(message)
		}
	}

}