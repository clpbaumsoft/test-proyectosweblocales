import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

//Constants
import { GTRANS } from "@/constants/Globals";
import { VISIT_DOCUMENT_STATUS_APPROVED, VISIT_DOCUMENT_STATUS_PENDING, VISITOR_STATUS_APPROVED, VISITOR_STATUS_REJECTED } from "@/constants/Visit";

//Errors
import AuthError from "@/errors/AuthError";
import LocalError from "@/errors/LocalError";
import ValidationError from "@/errors/ValidationError";

//Interfaces and types
import { VisitDocument, VisitVisitor } from "@/interfaces/Models";

//Hooks
import useSessionProviderHook from "@/providers/SessionProvider/hooks";
import useDebounce from "@/hooks/useDebounce";
import useTranslation from "@/hooks/useTranslation";

//Packages
import { mcm } from "@/packages/mui-confirm-modal/src";

//Services
import Orchestra from "@/services/Orchestra";

//Texts
const TRANS = {
	loading_approve: {
		id: "ListVisitVisitorDocs.Toast.LoadingApprove",
		defaultMessage: "Aprobando...",
		description: "",
	},
	success_approving_visitor: {
		id: "ListVisitVisitorDocs.SuccessMessage.ApprovedVisitor",
		defaultMessage: "Visitante aprobado!",
		description: "",
	},
	error_approving_visitor: {
		id: "ListVisitVisitorDocs.ErrorMessage.ErrorApproveVisitor",
		defaultMessage: "No fue posible aprobar al visitante. Intenta nuevamente.",
		description: "",
	},
	loading_rejecting: {
		id: "ListVisitVisitorDocs.Toast.LoadingRejecting",
		defaultMessage: "Rechazando...",
		description: "",
	},
	success_rejecting_visitor: {
		id: "ListVisitVisitorDocs.SuccessMessage.RejectingVisitor",
		defaultMessage: "Visitante rechazado!",
		description: "",
	},
	error_rejecting_visitor: {
		id: "ListVisitVisitorDocs.ErrorMessage.RejectingVisitor",
		defaultMessage: "No fue posible rechazar al visitante. Intenta nuevamente.",
		description: "",
	},
	message_confirm_pending_docs: {
		id: "ListVisitVisitorDocs.ConfirmMessage.PendingDocs",
		defaultMessage: "Aún hay documentos que NO han sido aprobados. ¿Deseas continuar?",
		description: "",
	},
	message_confirm_approved_docs_reject: {
		id: "ListVisitVisitorDocs.ConfirmMessage.ApproveDocsReject",
		defaultMessage: "Todos los documentos han sido aprobados. ¿Deseas continuar?",
		description: "",
	},
}

export default function useListVisitVisitorDocs(visitVisitor: VisitVisitor, onChangeStatusVisitor?: (newStatus: string) => void) {
	
	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)

	const {
		openModalLoginForm,
		showLocalError,
		getLoggedUser,
	} = useSessionProviderHook()

	const [isInnerLoading, setIsInnerLoading] = useState(true)
	const [isApproving, setIsApproving] = useState(false)
	const [isRejecting, setIsRejecting] = useState(false)
	const [rowsDocs, setRowsDocs] = useState<VisitDocument[]>([])
	const [allDocsReviewed, setAllDocsReviewed] = useState(false)
	const totalApproved  = useRef<number>(0)

	const [debounce] = useDebounce()
	
	/**
	 * Approves a visitor.
	 */
	const onClickApprove = async () => {

		if(isApproving || rowsDocs.length <= 0) {
			return
		}

		let messageConfirmation = GTEXTS.message_confirm_noback_action
		if(totalApproved.current < rowsDocs.length) {
			messageConfirmation = TEXTS.message_confirm_pending_docs
		}

		const confirmed = await mcm.confirm(messageConfirmation)
		if(!confirmed) {
			return
		}
		setIsApproving(true)

		const promiseApprove = new Promise(async (resolve, reject) => {
			try {
				await Orchestra.visitVisitorService.approve(visitVisitor)
				if(onChangeStatusVisitor) {
					onChangeStatusVisitor(VISITOR_STATUS_APPROVED)
				}
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
				success: TEXTS.success_approving_visitor,
				error: {
					render({data}) {
						if(data instanceof AuthError) {
							return GTEXTS.session_expired_message
						}
						return TEXTS.error_approving_visitor
					}
				}
			},
			{
				position: 'bottom-center',
			}
		)
	}

	/**
	 * Rejects a visitor.
	 */
	const onClickReject = async () => {

		if(isRejecting || rowsDocs.length <= 0) {
			return
		}

		let messageConfirmation = GTEXTS.message_confirm_noback_action
		if(totalApproved.current === rowsDocs.length) {
			messageConfirmation = TEXTS.message_confirm_approved_docs_reject
		}

		const confirmed = await mcm.confirm(messageConfirmation)
		if(!confirmed) {
			return
		}
		setIsRejecting(true)

		const promiseReject = new Promise(async (resolve, reject) => {
			try {
				await Orchestra.visitVisitorService.reject(visitVisitor)
				if(onChangeStatusVisitor) {
					onChangeStatusVisitor(VISITOR_STATUS_REJECTED)
				}
				resolve('ok')
			} catch(catchError) {
				reject(catchError)
			} finally {
				setIsRejecting(false)
			}
		})
		
		toast.promise(
			promiseReject,
			{
				pending: TEXTS.loading_rejecting,
				success: TEXTS.success_rejecting_visitor,
				error: {
					render({data}) {
						if(data instanceof AuthError) {
							return GTEXTS.session_expired_message
						}
						return TEXTS.error_rejecting_visitor
					}
				}
			},
			{
				position: 'bottom-center',
			}
		)
	}
	
	/**
	 * Updates the state of a single visit document item.
	 */
	const onChangeItemDoc = (newDoc: VisitDocument, index: number) => {
		const copyDocs = [...rowsDocs]
		copyDocs[index] = { ...newDoc }
		totalApproved.current = copyDocs.filter((doc) => doc.status === VISIT_DOCUMENT_STATUS_APPROVED).length
		
		// Verificar si todos los documentos han sido revisados (aprobados o rechazados)
		const hasPendingDocs = copyDocs.some((doc) => doc.status === VISIT_DOCUMENT_STATUS_PENDING)
		setAllDocsReviewed(!hasPendingDocs)
		setRowsDocs(copyDocs)
	}
	
	useEffect(() => {
		const loadVisitDocs = async () => {
			debounce(async () => {
				try {
					const docs = await Orchestra.visitVisitorService.allDocuments(visitVisitor)
					setRowsDocs([...docs])
					totalApproved.current = docs.filter((doc: VisitDocument) => doc.status === VISIT_DOCUMENT_STATUS_APPROVED).length
					
					// Verificar si todos los documentos han sido revisados (aprobados o rechazados)
					const hasPendingDocs = docs.some((doc: VisitDocument) => doc.status === VISIT_DOCUMENT_STATUS_PENDING)
					setAllDocsReviewed(!hasPendingDocs)
				} catch(catchError) {
					if(catchError instanceof AuthError) {
						return openModalLoginForm()
					}
					if(catchError instanceof LocalError || catchError instanceof ValidationError) {
						return showLocalError(catchError)
					}
					throw catchError
				} finally {
					setIsInnerLoading(false)
				}
			})
		}

		loadVisitDocs()
	}, [visitVisitor, debounce, openModalLoginForm, showLocalError])

	return {
		loggedUser: getLoggedUser(),
		isInnerLoading,
		rowsDocs,
		allDocsReviewed,
		visitVisitor,
		onClickApprove,
		onClickReject,
		onChangeItemDoc,
	}
}