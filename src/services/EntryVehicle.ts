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
	

	/**
	 * Add a entry vehicle for the Employee
	 * @returns 
	 */
	async giveEmployeeEntryVehicle(data: GiveEntryVehicleFormType) {
		try {
			return await apiRequest().post(`/employee/give-entry-vehicle`, data).then((res) => res.data);
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
	 * Leave the active entry vehicle for employee
	 * @returns 
	 */
	async leaveEmployeeVehicle(id: number) {
		try {
			return await apiRequest().get(`/employee/entry-vehicle/${id}/leave`).then((res) => res.data);
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
	 * Search for an active employee vehicle by plate number
	 * @param plateNumber - The vehicle plate number to search for
	 * @returns Vehicle data if found
	 */
	async searchEmployeeVehicle(plateNumber: string) {
		try {
			const dataSearchVehicleEmployee = await apiRequest().get(`/employee/entry-vehicle/search?number=${encodeURIComponent(plateNumber)}`).then((res) => res.data);
			return dataSearchVehicleEmployee?.results;
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