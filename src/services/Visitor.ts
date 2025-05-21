//React and modules
import type { AxiosError } from "axios";

//Constants
import { GERRORS } from "@/constants/Globals";

//Errors
import AuthError from "@/errors/AuthError";
import LocalError from "@/errors/LocalError";
import ValidationError from "@/errors/ValidationError";
import NoResultsError from "@/errors/NoResultError";

//Interfaces and types
import { Visit, Visitor } from "@/interfaces/Models";
import { ErrorResponseDataType } from "@/interfaces/General";
import { PaginateVisitors } from "@/interfaces/Molecules";
import { RegisterTalkVisitorFormType } from "@/interfaces/Forms";

//Libs
import apiRequest, { apiRequestFormData } from "@/lib/ApiRequest";



export default class VisitorService {

	/**
	 * Get all the visitors of a Visit
	 */
	async getVisitors(visit: Visit, page: number, rowsPerPage: number) : Promise<PaginateVisitors> {
		try {
			return await apiRequest().get(`/visits/${visit.id}/visitors?page=${page}&per_page=${rowsPerPage}`).then((res) => res.data);
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
	 * Searches a visitor.
	 */
	async searchVisitor(idIdentificationType: string | number, dniOrName: number | string, relations: string[] = []) : Promise<Visitor> {
		try {
			return await apiRequest().get(`/visitor-search?identity_type=${idIdentificationType}${dniOrName ? '&document_or_name='+dniOrName : ''}${relations.length > 0 ? '&relations='+relations.join(',') : ''}`).then((res) => res.data)
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
	 * Get a visitor data.
	 * @returns 
	 */
	async get(idOrDni: number | string, idIdentificationType: string | number | null = null) : Promise<Visitor> {
		try {
			return await apiRequest().get(`/visitors/${idOrDni}${idIdentificationType ? '?identity_type='+idIdentificationType : ''}`).then((res) => res.data);
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
				throw new NoResultsError(GERRORS.no_results)
			}
			throw new LocalError(message)
		}
	}

	/**
	 * Saves the date of the training about security.
	 * @returns 
	 */
	async saveSecurityTraining(visitorId: number, data: RegisterTalkVisitorFormType) {
		try {
			return await apiRequest().patch(`/visitors/${visitorId}/security-training`,  data).then((res) => res.data);
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
	 * Changes the visitor data's photo.
	 * @returns 
	 */
	async changePhoto(visitorId: number, photo: File) {
		try {
			const formEncode = new FormData()
			formEncode.append('photo', photo)
			formEncode.append('_method', 'PATCH');
			return await apiRequestFormData().post(`/visitors/${visitorId}/photo`, formEncode).then((res) => res.data);
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