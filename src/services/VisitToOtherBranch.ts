//React and modules
import type { AxiosError } from "axios";

//Constants
import { GERRORS } from "@/constants/Globals";

//Errors
import AuthError from "@/errors/AuthError";
import LocalError from "@/errors/LocalError";
import ValidationError from "@/errors/ValidationError";

//Interfaces and types
import { VisitFormToOtherBranchType } from "@/interfaces/Forms";
import { ErrorResponseDataType } from "@/interfaces/General";

//Libs
import apiRequest from "@/lib/ApiRequest";

export default class VisitToOtherBranchService {

	/**
	 * Register a visit to other branch
	 * @returns 
	 */
	async create(visitData: VisitFormToOtherBranchType) {
		try {
			await apiRequest().post(`/visitors/${visitData?.visitor_id}/gate/${visitData?.gate_selected}`, visitData);
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

    /**
	 * Leave the active entry for the visitor in Other Branch
	 * @returns 
	 */
		async leave(visitorId: number) {
			try {
				return await apiRequest().post(`/visitors/${visitorId}/leave-gate`).then((res) => res.data);
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
	 * Update a visit
	 * @param visitId 
	 * @returns 
	 */
	async update(visitId: number, visitData: VisitFormToOtherBranchType) {
		try {
			await apiRequest().put(`/visits/${visitId}`, visitData);
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