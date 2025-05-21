import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

//Constants
import { GTRANS } from "@/constants/Globals";
import { VISIT_DOCUMENT_STATUS_APPROVED, VISIT_DOCUMENT_STATUS_NAMES, VISIT_DOCUMENT_STATUS_PENDING, VISIT_DOCUMENT_STATUS_REJECTED } from "@/constants/Visit";

//Errors
import AuthError from "@/errors/AuthError";
import LocalError from "@/errors/LocalError";

//Hooks
import useToggleBoolean from "@/hooks/useToggleBoolean";
import useSessionProviderHook from "@/providers/SessionProvider/hooks";
import useFormMessages from "@/hooks/useFormMessages";
import useRecordState from "@/hooks/useRecordState";
import useTranslation from "@/hooks/useTranslation";

//Interfaces and types
import { ChangeDocumentFormType, RejectVisitDocumentFormType } from "@/interfaces/Forms";
import { DocumentType, VisitDocument } from "@/interfaces/Models";

//Packages
import { mcm } from "@/packages/mui-confirm-modal/src";

//Services
import Orchestra from "@/services/Orchestra";
import ValidationError from "@/errors/ValidationError";

//Texts
const TRANS = {
	reject_succes_message: {
		id: "ItemListVisitVisitorDoc.SuccessMessage.DocumentRejected",
		defaultMessage: "Documento rechazado exitosamente.",
		description: "",
	},
	error_sending_reject_reason: {
		id: "ItemListVisitVisitorDoc.ErrorMessage.ErrorRejectingDocument",
		defaultMessage: "No fue posible rechazar el documento. Intenta más tarde.",
		description: "",
	},
	loading_approve: {
		id: "ItemListVisitVisitorDoc.Toast.LoadingApprove",
		defaultMessage: "Aprobando...",
		description: "",
	},
	success_approving_visit_document: {
		id: "ItemListVisitVisitorDoc.SuccessMessage.DocumentApproved",
		defaultMessage: "Documento aprobado!",
		description: "",
	},
	error_approving_visit_document: {
		id: "ItemListVisitVisitorDoc.ErrorMessage.ApproveRejected",
		defaultMessage: "Aprobación rechazada. Intenta nuevamente.",
		description: "",
	},
	error_changing_document: {
		id: "ItemListVisitVisitorDoc.ErrorMessage.ErrorChangingDocument",
		defaultMessage: "No fue posible cambiar el documento.",
		description: "",
	},
	success_changing_visit_document: {
		id: "ItemListVisitVisitorDoc.SuccessMessage.DocumentUpdated",
		defaultMessage: "Documento actualizado exitosamente.",
		description: "",
	},
}

export default function useItemListVisitVisitorDoc(itemVisitDoc: VisitDocument, documentTypes: DocumentType[], onChangeItemDoc?: (newDoc: VisitDocument) => void) {
	
	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)
	
	const {
		getLoggedUser,
		openModalLoginForm,
		showLocalError,
	} = useSessionProviderHook()

	const [isOpenModal, toggleModal] = useToggleBoolean()
	const [isInnerLoading, setIsInnerLoading] = useState(true)
	const [isOpenRejectForm, toggleIsOpenRejectForm, setIsOpenRejectForm] = useToggleBoolean()
	const [isSendingRejectReason, setIsSendingRejectReason] = useState(false)
	const [isApproving, setIsApproving] = useState(false)
	const [visitDoc, setKeyVisitDoc] = useRecordState<VisitDocument>({...itemVisitDoc}, onChangeItemDoc)
	const timerRef = useRef<number>(null)
	const [okMessage, errorMessage, changeOkMessage, changeErrorMessage, hideMessages] = useFormMessages()
	
	const [isEditing, toggleIsEditing] = useToggleBoolean()
	const [isLoadingChange, setIsLoadingChange] = useState(false)
	const [okMsgChange, errorMsgChange, changeOkMsgChange, changeErrorMsgChange, hideMessagesChange] = useFormMessages()

	const {
		formState: { errors, isValid },
		register,
		handleSubmit,
		reset,
	} = useForm<RejectVisitDocumentFormType>()

	const formChange = useForm<ChangeDocumentFormType>({ defaultValues: {
		document_type: visitDoc.document_type.id,
		description: visitDoc.description || "",
	}})

	const registerChange = formChange.register
	const handleSubmitChange = formChange.handleSubmit
	const errorsChange = formChange.formState.errors
	const [valueTypeId] = formChange.watch(['document_type'])

	const onLoadIframe = () => setIsInnerLoading(false)

	/**
	 * Function to handle the form submit event and reject a visit document.
	 * @param data 
	 */
	const onSubmitRejectVisitDocument: SubmitHandler<RejectVisitDocumentFormType> = async (data) => {

		try {
			if(isSendingRejectReason) {
				return
			}
			setIsSendingRejectReason(true)
			hideMessages()
			await Orchestra.visitDocumentService.reject(itemVisitDoc.id, data.reject_reason)
			setKeyVisitDoc('status', VISIT_DOCUMENT_STATUS_REJECTED)
			setKeyVisitDoc('approver_observations', data.reject_reason)
			changeOkMessage(TEXTS.reject_succes_message)
			reset()
			setIsSendingRejectReason(false)
		} catch(catchError) {
			setIsSendingRejectReason(false)
			if(catchError instanceof AuthError) {
				return openModalLoginForm()
			}
			if(catchError instanceof ValidationError) {
				return changeErrorMessage(catchError.message)
			}
			changeErrorMessage(TEXTS.error_sending_reject_reason)
		}

	}

	/**
	 * Function used to approve a visit document.
	 */
	const onClickApproveVisitDocument = async () => {
		if(isApproving) {
			return
		}

		const confirmed = await mcm.confirm(GTEXTS.message_confirm_noback_action)
		if(!confirmed) {
			return
		}
		setIsApproving(true)
		
		const promiseApprove = new Promise(async (resolve, reject) => {
			try {
				await Orchestra.visitDocumentService.approve(itemVisitDoc.id)
				setKeyVisitDoc('status', VISIT_DOCUMENT_STATUS_APPROVED)
				setKeyVisitDoc('approver_observations', null)
				resolve('ok')
			} catch(catchError) {
				reject(catchError)
			} finally {
				setIsApproving(false)
			}
		})
		
		toast.promise(
			promiseApprove,
			{
				pending: TEXTS.loading_approve,
				success: TEXTS.success_approving_visit_document,
				error: {
					render({data}) {
						if(data instanceof AuthError) {
							return GTEXTS.session_expired_message
						}
						return TEXTS.error_approving_visit_document
					}
				}
			},
			{
				position: 'bottom-center',
			}
		)
	}

	/**
	 * Changes a document.
	 */
	const onSubmitUpdateDocument = async (data: ChangeDocumentFormType) => {
		try {
			if(isLoadingChange) {
				return
			}
			setIsLoadingChange(true)
			hideMessagesChange()
			await Orchestra.visitDocumentService.changeDocument(itemVisitDoc, data)
			setKeyVisitDoc('description', data.description)
			setKeyVisitDoc('status', VISIT_DOCUMENT_STATUS_PENDING)
			setKeyVisitDoc('approver_observations', null)
			const selectedDocType = documentTypes.find((dT) => dT.id === data.document_type)
			if(selectedDocType) {
				setKeyVisitDoc('document_type', { ...selectedDocType })
				setKeyVisitDoc('id_document_type', selectedDocType.id)
			}
			changeOkMsgChange(TEXTS.success_changing_visit_document)
			hideMessagesChange(3*1000)
		} catch(catchError) {
			if(catchError instanceof AuthError) {
				return openModalLoginForm()
			}
			if(catchError instanceof LocalError) {
				return showLocalError(catchError)
			}
			if(catchError instanceof ValidationError) {
				return changeErrorMsgChange(catchError.message)
			}
			changeErrorMsgChange(TEXTS.error_changing_document)
		} finally {
			setIsLoadingChange(false)
		}
	}

	/**
	 * Update the file value in the form state.
	 * @param theFile 
	 */
	const onChangeNewDocument = (theFile: File) => {
		formChange.setValue('document', theFile)
	}

	useEffect(() => {
		if(!isOpenModal) {
			timerRef.current = setTimeout(() => {
				setIsInnerLoading(true)
				setIsOpenRejectForm(false)
				reset()
			}, 900) as unknown as number
		}
		return () => {
			if(timerRef.current !== null) {
				clearTimeout(timerRef.current)
			}
		}
	}, [isOpenModal, reset, setIsOpenRejectForm])

	useEffect(() => {
		if(!isOpenRejectForm) {
			hideMessages()
			reset()
		}
	}, [isOpenRejectForm, reset, hideMessages])

	return {
		loggedUser: getLoggedUser(),
		reasonStatus: VISIT_DOCUMENT_STATUS_NAMES[visitDoc.status],
		isInnerLoading,
		isOpenModal,
		isOpenRejectForm,
		errors,
		isValid,
		isSendingRejectReason,
		message: okMessage,
		error: errorMessage,
		visitDoc,
		isEditing,
		valueTypeId,
		errorsChange,
		okMsgChange,
		errorMsgChange,
		isLoadingChange,
		toggleModal,
		onLoadIframe,
		toggleIsOpenRejectForm,
		register,
		handleSubmit,
		onSubmitRejectVisitDocument,
		onClickApproveVisitDocument,
		toggleIsEditing,
		registerChange,
		handleSubmitChange,
		onSubmitUpdateDocument,
		onChangeNewDocument,
	}
}