//React and modules
import type { AxiosError } from "axios";

//Constants
import { GERRORS } from "@/constants/Globals";

//Errors
import AuthError from "@/errors/AuthError";
import LocalError from "@/errors/LocalError";
import ValidationError from "@/errors/ValidationError";

//Interfaces and types
import { createVisitorWithBasicData, VisitorFormType } from "@/interfaces/Organisms";
import { VisitVisitor } from "@/interfaces/Models";
import { ErrorResponseDataType } from "@/interfaces/General";
import { RowUploadFile } from "@/interfaces/Atoms";

//Libs
import apiRequest, { apiRequestFormData } from "@/lib/ApiRequest";



export default class VisitVisitorService {

	/**
	 * Add a visitor with basic data.
	 * @returns 
	 */
	async createVisitorWithBasicData(visitor: createVisitorWithBasicData) {
		try {
			await apiRequestFormData().post('/visitor/add-basic-visitor', visitor)
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
	 * Add a visitor to a visit.
	 * @returns 
	 */
	async create(visitId: number, visitor: VisitorFormType, startdate_sgsst: string, enddate_sgsst: string) {
    console.log("🚀 ~ VisitVisitorService ~ create ~ visitor:", visitor)
    
	// console.log("👌👌👌👌👌👌👌👌👌👌👌👌👌👌👌 ~ VisitVisitorService ~ create ~ visitor:", visitor)

	const newDataVisitorToCreate = {
        ...visitor,
        address: visitor.address || " No registra",
        phone: visitor.phone || " 000000",
		emergency_contact_name: visitor.emergency_contact_name || " No registra",
		emergency_contact_phone: visitor.emergency_contact_phone || "000000",
		requires_security_speak: visitor.requires_security_speak || 1,
		startdate_sgsst: startdate_sgsst || '',
		enddate_sgsst: enddate_sgsst || '',
    };

	console.log("👌👌👌👌👌👌👌👌👌👌👌👌👌👌👌👌 ~ VisitVisitorService ~ create ~ newDataVisitorToCreate:", newDataVisitorToCreate)

		try {
			const formEncode = new FormData()
			formEncode.append('id_visit', String(visitId))
			for(const key in newDataVisitorToCreate) {
				const val = newDataVisitorToCreate[key as keyof VisitorFormType]
				if(val instanceof File) {
					formEncode.append(key, val)
				} else {
					formEncode.append(key, key === 'photo' ? "" : val as string)
				}
			}
			// SEND THE DATA TO NEW VISITOR IN VISIT
			await apiRequestFormData().post('/visit-visitors', formEncode)

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
	 * Upload a document to a visitor.
	 */
	async uploadDocument(visitVisitor: VisitVisitor, uploadFile: RowUploadFile) {
		try {

			const formEncode = new FormData()
			if(uploadFile.document_type) {
				formEncode.append('document_type', String(uploadFile.document_type))
			}
			formEncode.append('document', uploadFile.file)
			if(uploadFile.description) {
				formEncode.append('description', uploadFile.description)
			}
			
			await apiRequestFormData().post(`/visit-visitors/${visitVisitor.id}/documents`, formEncode).then((res) => res.data);
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
	 * Get all visitor's documents.
	 */
	async allDocuments(visitVisitor: VisitVisitor) {
		try {
			return await apiRequest().get(`/visit-visitors/${visitVisitor.id}/documents`).then((res) => res.data);
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
	 * Approves a visitor
	 */
	async approve(visitVisitor: VisitVisitor) {
		try {
			return await apiRequest().patch(`/visit-visitors/${visitVisitor.id}/approve`).then((res) => res.data);
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
	 * Rejects a visitor
	 */
	async reject(visitVisitor: VisitVisitor) {
		try {
			return await apiRequest().patch(`/visit-visitors/${visitVisitor.id}/reject`).then((res) => res.data);
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
	 * Cancels a visitor
	 */
	async cancel(visitVisitor: VisitVisitor) {
		try {
			return await apiRequest().patch(`/visit-visitors/${visitVisitor.id}/cancel`).then((res) => res.data);
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