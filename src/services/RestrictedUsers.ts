//React and modules
import type { AxiosError } from "axios";

//Constants
import { GERRORS } from "@/constants/Globals";

//Errors
import AuthError from "@/errors/AuthError";
import LocalError from "@/errors/LocalError";
import ValidationError from "@/errors/ValidationError";

//Interfaces and types
import { ErrorResponseDataType } from "@/interfaces/General";


//Libs
import apiRequest from "@/lib/ApiRequest";
import { RestrictedUserFormType } from "@/interfaces/Forms";


export default class RestrictecUsersService {

	/**
	 * Register a visit
	 * @returns 
	 */
	async create(visitorData: RestrictedUserFormType) {
	console.log("💕💕💕💕💕💕💕💕💕💕 ~ RestrictecUsersService ~ create ~ visitorData:", visitorData)

		const dataToSend = {
			start_date: visitorData.banned_start_time?.split(' ')?.[0],
			end_date: visitorData.banned_end_time?.split(' ')?.[0],
			is_banned: visitorData.is_banned,
		}
		console.log("🚀🚀🚀🚀🚀🚀🚀 ~ RestrictecUsersService ~ create ~ dataToSend:", dataToSend)
		
		try {
			await apiRequest().post(`/visitor/${visitorData?.id_visitor}/update-access`, dataToSend);
			return true
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