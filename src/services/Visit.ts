//React and modules
import type { AxiosError } from "axios";

//Constants
import { GERRORS } from "@/constants/Globals";

//Errors
import AuthError from "@/errors/AuthError";
import LocalError from "@/errors/LocalError";
import ValidationError from "@/errors/ValidationError";

//Interfaces and types
import { PaginateVisits } from "@/interfaces/Molecules";
import { DuplicateVisitFormType, VisitFormType } from "@/interfaces/Forms";
import { ErrorResponseDataType } from "@/interfaces/General";
import { Visit } from "@/interfaces/Models";

//Libs
import apiRequest from "@/lib/ApiRequest";
import { PageNotFoundError } from "next/dist/shared/lib/utils";

export default class VisitService {

	/**
	 * Requests all the user's visits.
	 */
	async all(page: number, rowsPerPage: number, filter: string = 'activated') : Promise<PaginateVisits> {
		try {
			return await apiRequest().get(`/visits?relations=company,branch,gate,approver_docs&fields=visitors.total&page=${page}&per_page=${rowsPerPage}${filter ? '&filter='+filter : ''}`).then((res) => res.data);
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
	* Requests all the user's visits by APPROVER DOCS.
	*/
	async allVisitbyApproverDocsUser(page: number, rowsPerPage: number, filter: string = 'activated') : Promise<PaginateVisits> {
		try {
			return await apiRequest().get(`/visits/approver/docs?relations=company,branch,gate,approver_docs&fields=visitors.total&page=${page}&per_page=${rowsPerPage}${filter ? '&filter='+filter : ''}`).then((res) => res.data);
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
	 * Get a visit.
	 * @returns 
	 */
	async get(visitId: number | string, token: string = '') : Promise<Visit> {
		try {
			return await apiRequest(token).get(`/visits/${visitId}?relations=company,branch,gate,approver_docs,canceller&fields=visitors.total`).then((res) => res.data);
		} catch(catchError) {
			const error = catchError as AxiosError
			const status = error?.status || 500
			const dataResponse = (error?.response?.data as ErrorResponseDataType) || { error: "" }
			const message = dataResponse.error || dataResponse.message || GERRORS.error_something_went_wrong
			if(status === 401) {
				throw new AuthError(GERRORS.your_session_has_finished)
			}
			if(status === 404) {
				throw new PageNotFoundError(GERRORS.page_not_found)
			}
			throw new LocalError(message)
		}
	}


	/**
	 * Register a visit
	 * @returns 
	 */
	async create(visitData: VisitFormType) {
		try {
			await apiRequest().post('/visits', visitData);
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
	 * Update a visit
	 * @param visitId 
	 * @returns 
	 */
	async update(visitId: number, visitData: VisitFormType) {
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

	/**
	 * Cancels a visit.
	 * @param visitId 
	 * @param reason
	 * @returns 
	 */
	async cancel(visitId: number, reason: string) {
		try {
			await apiRequest().patch(`/visits/${visitId}/cancel`, { reason });
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
	 * Duplicate a visit
	 * @returns 
	 */
	async duplicateVisit(visitDataToDuplicate: DuplicateVisitFormType) {
		
		const data = {
			start_date: visitDataToDuplicate.entry_date,
			end_date: visitDataToDuplicate.departure_date,
		}

		try {
			await apiRequest().post(`/visit/${visitDataToDuplicate.id_visit}/duplicate`, data);
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