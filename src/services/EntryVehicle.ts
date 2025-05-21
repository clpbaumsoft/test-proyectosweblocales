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
import { GiveEntryVehicleFormType, GiveLeaveVehicleFormType } from "@/interfaces/Forms";

//Libs
import apiRequest from "@/lib/ApiRequest";

export default class EntryVehicleService {

	

	/**
	 * Add a entry vehicle for the visitor
	 * @returns 
	 */
	async give(visitId: number, visitorId: number, data: GiveEntryVehicleFormType) {
		try {
			return await apiRequest().post(`/visits/${visitId}/visitors/${visitorId}/give-entry-vehicle`, data).then((res) => res.data);
		} catch(catchError) {
			const error = catchError as AxiosError
			const status = error?.status || 500
			const dataResponse = (error?.response?.data as ErrorResponseDataType) || { error: "" }
			const message = dataResponse.error || dataResponse.message || GERRORS.error_something_went_wrong
			if(status === 401) {
				throw new AuthError(GERRORS.your_session_has_finished)
			}
			if(status === 422) {
				throw new ValidationError(dataResponse.message)
			}
			if(status === 404) {
				throw new LocalError(GERRORS.page_not_found)
			}
			throw new LocalError(message)
		}
	}
	
	/**
	 * Leave the active entry vehicle for the visitor
	 * @returns 
	 */
	async leave(visitorId: number, data: GiveLeaveVehicleFormType) {
		try {
			return await apiRequest().post(`/visitors/${visitorId}/leave-entry-vehicle`, data).then((res) => res.data);
		} catch(catchError) {
			const error = catchError as AxiosError
			const status = error?.status || 500
			const dataResponse = (error?.response?.data as ErrorResponseDataType) || { error: "" }
			const message = dataResponse.error || dataResponse.message || GERRORS.error_something_went_wrong
			if(status === 401) {
				throw new AuthError(GERRORS.your_session_has_finished)
			}
			if(status === 422) {
				throw new ValidationError(dataResponse.message)
			}
			if(status === 404) {
				throw new LocalError(GERRORS.page_not_found)
			}
			throw new LocalError(message)
		}
	}
	

}