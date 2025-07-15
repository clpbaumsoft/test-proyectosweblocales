//React and modules
import type { AxiosError } from "axios";

//Constants
import { GERRORS } from "@/constants/Globals";

//Errors
import AuthError from "@/errors/AuthError";
import LocalError from "@/errors/LocalError";

//Interfaces and types
import { ErrorResponseDataType } from "@/interfaces/General";
import { UserType } from "@/interfaces/Models";

//Libs
import apiRequest from "@/lib/ApiRequest";

export default class UserService {

	/**
	 * Searches an approver user.
	 */
	async searchApprover(search: string, accessToken: string = '') : Promise<UserType[]> {
		try {
			return await apiRequest(accessToken).get(`/search/approver/?s=${search}`).then((res) => res.data)
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

	/**
	 * Searches an interventor user.
	 */
	async searchInterventor(search: string, accessToken: string = '') : Promise<UserType[]> {
		try {
			return await apiRequest(accessToken).get(`/search/interventor/?s=${search}`).then((res) => res.data)
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