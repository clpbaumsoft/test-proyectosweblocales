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
import { VisitDocument } from "@/interfaces/Models";

//Libs
import apiRequest, { apiRequestFormData } from "@/lib/ApiRequest";
import { ChangeDocumentFormType } from "@/interfaces/Forms";

export default class VisitDocumentService {

	/**
	 * Rejects a visit document.
	 */
	async reject(visitDocumentId: number | string, reason: string, accessToken: string = '') {
		try {
			return await apiRequest(accessToken).patch(`/visit-documents/${visitDocumentId}/reject`, { reason })
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
	 * Approves a visit document.
	 */
	async approve(visitDocumentId: number | string, accessToken: string = '') {
		try {
			return await apiRequest(accessToken).patch(`/visit-documents/${visitDocumentId}/approve`)
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
	 * Changed a document to a visitor.
	 */
	async changeDocument(visitDocument: VisitDocument, dataForm: ChangeDocumentFormType) {
		try {

			const formEncode = new FormData()
			formEncode.append('document', dataForm.document)
			formEncode.append('document_type', String(dataForm.document_type))
			if(dataForm.description) {
				formEncode.append('description', dataForm.description)
			}
			formEncode.append('_method', 'PATCH');
			await apiRequestFormData().post(`/visit-documents/${visitDocument.id}`, formEncode).then((res) => res.data);
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