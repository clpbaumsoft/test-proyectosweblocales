import { useState } from "react"
import { toast } from "react-toastify";

//Constants
import { GTRANS } from "@/constants/Globals";
import { VISITOR_STATUS_CANCELLED, VISITOR_STATUS_NAMES } from "@/constants/Visit";

//Errors
import AuthError from "@/errors/AuthError";
import LocalError from "@/errors/LocalError";
import ValidationError from "@/errors/ValidationError";

//Interfaces and types
import { VisitVisitor } from "@/interfaces/Models";
import { RowUploadFile } from "@/interfaces/Atoms";

//Packages
import { mcm } from "@/packages/mui-confirm-modal/src";

//Services
import Orchestra from "@/services/Orchestra";

//Hooks
import useArrayState from "@/hooks/useArrayState";
import useSessionProviderHook from "@/providers/SessionProvider/hooks";
import useRecordState from "@/hooks/useRecordState";
import useTranslation from "@/hooks/useTranslation";

//Texts
const TRANS = {
	loading_cancel: {
		id: "VisitorRowActions.Toast.LoadingCancel",
		defaultMessage: "Cancelando...",
		description: "",
	},
	success_cancelling_visitor: {
		id: "VisitorRowActions.Toast.SuccessCancellingVisitor",
		defaultMessage: "Visitante cancelado exitosamente!",
		description: "",
	},
	error_cancelling_visitor: {
		id: "VisitorRowActions.Toast.ErrorCancellingVisitor",
		defaultMessage: "Algo salió mal cancelando al visitante.",
		description: "",
	},
}

export default function useVisitorRowActions(visitVisitor: VisitVisitor) {

	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)
	
	const {
		isGlobalLoading,
		setIsGlobalLoading,
		openModalLoginForm,
		showLocalError,
		getLoggedUser,
	} = useSessionProviderHook()

	const [files, actions] = useArrayState<RowUploadFile>([])
	
	const [isInnerLoading, setIsInnerLoading] = useState(false)
	const [isOpenModalAddDocuments, setIsOpenModalAddDocuments] = useState(false)
	const [isOpenListVisitVisitorDocs, setIsOpenListVisitVisitorDocs] = useState(false)
	const [stateRowVisitVisitor, setKeyStateRowVisitVisitor] = useRecordState<VisitVisitor>({ ...visitVisitor })

	const toggleModalAddDocuments = () => setIsOpenModalAddDocuments(!isOpenModalAddDocuments)

	/**
	 * Uploads all the files to a visitor.
	 * @returns 
	 */
	const uploadAllDocuments = async () => {
		try {
			if(isGlobalLoading) {
				return
			}
			setIsGlobalLoading(true)
			for(const index in files) {
				const file = files[index]
				try {
					if(file.isSaved) {
						continue
					}
					await Orchestra.visitVisitorService.uploadDocument(visitVisitor, file)
					actions.set(index, {
						...file,
						isSaved: true,
						hasError: false,
						message: "",
					})
				} catch (innerCatch) {
					if(innerCatch instanceof LocalError || innerCatch instanceof ValidationError) {
						actions.set(index, {
							...file,
							hasError: true,
							message: innerCatch.message,
						})
						continue
					}
					throw innerCatch
				}
			}
		} catch(catchError) {
			if(catchError instanceof AuthError) {
				return openModalLoginForm()
			}
			if(catchError instanceof LocalError || catchError instanceof ValidationError) {
				return showLocalError(catchError)
			}
			throw catchError
		} finally {
			setIsGlobalLoading(false)
		}
	}


	const toogleListVisitVisitorDocs = () => setIsOpenListVisitVisitorDocs(!isOpenListVisitVisitorDocs)

	/**
	 * Cancels a visitor in a visit.
	 */
	const onClickCancelVisitor = async () => {

			if(isInnerLoading) {
			return
		}
		const confirmed = await mcm.confirm(GTEXTS.message_confirm_noback_action)
		if(!confirmed) {
			return
		}
		setIsInnerLoading(true)

		const promiseCancel = new Promise(async (resolve, reject) => {
			try {
				await Orchestra.visitVisitorService.cancel(visitVisitor)
				setKeyStateRowVisitVisitor('status', VISITOR_STATUS_CANCELLED)
				resolve('ok')
			} catch(catchError) {
				reject(catchError)
			} finally {
				setIsInnerLoading(false)
			}
		})

		toast.promise(
			promiseCancel,
			{
				pending: TEXTS.loading_cancel,
				success: TEXTS.success_cancelling_visitor,
				error: {
					render({data}) {
						if(data instanceof AuthError) {
							return GTEXTS.session_expired_message
						}
						return TEXTS.error_cancelling_visitor
					}
				}
			},
			{
				position: 'bottom-center',
			}
		)
	}

	return {
		loggedUser: getLoggedUser(),
		reasonStatus: VISITOR_STATUS_NAMES[stateRowVisitVisitor.status],
		isInnerLoading,
		files,
		actions,
		isOpenModalAddDocuments,
		isOpenListVisitVisitorDocs,
		stateRowVisitVisitor,
		setKeyStateRowVisitVisitor,
		toogleListVisitVisitorDocs,
		toggleModalAddDocuments,
		uploadAllDocuments,
		onClickCancelVisitor,
	}
}