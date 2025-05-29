//React and modules
import axios from "axios";
import type { AxiosError } from "axios";

//Constants
import { BASE_URL_API, GERRORS } from "@/constants/Globals";

//Interfaces and types
import { RestorePasswordFormType } from "@/interfaces/Organisms";
import { ErrorResponseDataType } from "@/interfaces/General";
import { ResetPasswordFormType } from "@/interfaces/Auth";
import { UserType } from "@/interfaces/Models";

//Errors
import AuthError from "@/errors/AuthError";
import LocalError from "@/errors/LocalError";

//Libs
import apiRequest from "@/lib/ApiRequest";

export default class AuthService {

	/**
	 * Requests to restore the user's password.
	 */
	async restorePassword(userData: RestorePasswordFormType) : Promise<void> {
		try {
			await apiRequest().post('/restore-password', userData).then((res) => res.data)
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
	 * Checks if a token is valid and available.
	 */
	async isValidToken(token: string) {
		try {
			const config = {
				method: 'get',
				maxBodyLength: Infinity,
				url: `${BASE_URL_API}/me`,
				headers: { 
					'Accept': 'application/json', 
					'Authorization': `Bearer ${token}`
				}
			};
			await axios.request(config)
			return true
		} catch {
			return false
		}
	}
	
	/**
	 * Changes the user's password.
	 */
	async changePassword(data: ResetPasswordFormType, token: string) {
		try {
			const config = {
				method: 'post',
				maxBodyLength: Infinity,
				url: `${BASE_URL_API}/reset-password`,
				headers: { 
					'Accept': 'application/json', 
					'Authorization': `Bearer ${token}`
				},
				data,
			};
			await axios.request(config)
		} catch(catchError) {
			const error = catchError as AxiosError
			const status = error?.status || 500
			const dataResponse = (error?.response?.data as ErrorResponseDataType) || { error: "" }
			const message = dataResponse.error || dataResponse.message || GERRORS.error_something_went_wrong
			if(status === 401) {
				throw new AuthError(GERRORS.link_has_expired)
			}
			throw new LocalError(message)
		}
	}
	
	/**
	 * Returns the user logged.
	 */
	async me(accessToken: string = '') : Promise<UserType> {
		try {
			return await apiRequest(accessToken).get("/me").then((res) => res.data)
		} catch(catchError) {
			const error = catchError as AxiosError
			const status = error?.status || 500
			const dataResponse = (error?.response?.data as ErrorResponseDataType) || { error: "" }
			const message = dataResponse.error || dataResponse.message || GERRORS.error_something_went_wrong
			if(status === 401) {
				throw new AuthError(GERRORS.session_has_not_started)
			}
			throw new LocalError(message)
		}
	}

}