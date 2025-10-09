//React and modules

import {
	Box,
	Button,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	styled,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ListAltIcon from "@mui/icons-material/ListAlt";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import DoDisturbAltIcon from "@mui/icons-material/DoDisturbAlt";
import DeleteIcon from "@mui/icons-material/Delete";

//Components
import ListVisitVisitorDocs from "@/components/molecules/ListVisitVisitorDocs";
import ModalFullScreen from "@/components/atoms/ModalFullScreen";
import UploadDocuments from "@/components/atoms/UploadDocuments";
import FullLoader from "@/components/atoms/FullLoader";
import WarningCondition from "@/components/atoms/WarningCondition";

//Constants
import { GTRANS } from "@/constants/Globals";
import {
	VISITOR_STATUS_APPROVED,
	VISITOR_STATUS_CANCELLED,
	VISITOR_STATUS_REJECTED,
} from "@/constants/Visit";

//Interfaces and types
import { VisitorRowActionsProps } from "@/interfaces/Molecules";

//Hooks
import useVisitorRowActions from "./useVisitorRowActions";
import useTranslation from "@/hooks/useTranslation";

//Texts
const TRANS = {
	title_modal_upload_documents: {
		id: "VisitorRowActions.ModalFullScreen.UploadDocuments",
		defaultMessage: "Subir documentos",
		description: "",
	},
	title_list_visit_visitor_docs: {
		id: "VisitorRowActions.DialogTitle.TitleDocuments",
		defaultMessage: "Documentos",
		description: "",
	},
	save: {
		id: "VisitorRowActions.ModalFullScreen.Save",
		defaultMessage: "Guardar",
		description: "",
	},
	see_documents: {
		id: "VisitorRowActions.Button.SeeDocuments",
		defaultMessage: "Ver Docs",
		description: "",
	},
	upload_documents: {
		id: "VisitorRowActions.Button.UploadDocuments",
		defaultMessage: "Subir Doc",
		description: "",
	},
	cancel_visitor: {
		id: "VisitorRowActions.Button.CancelVisitor",
		defaultMessage: "Cancelar",
		description: "",
	},
	message_cancelled_visitor: {
		id: "VisitorRowActions.WarningCondition.MessageCancelledVisitor",
		defaultMessage: "Visitante cancelado.",
		description: "",
	},
}

//Styles
const BoxButtons = styled('div')(({ theme }) => ({
	position: 'relative',
	display: 'table',
	mx: 'auto',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
		justifyContent: 'center',
  },
}))

const SpaceBtn = styled('div')(({ }) => ({
	height: '10px',
	width: '10px',
}))

export default function VisitorRowActions({ visitVisitor, documentTypes, visitStartDate }: VisitorRowActionsProps) {

	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)

	const {
		loggedUser,
		files,
		actions,
		isInnerLoading,
		isOpenModalAddDocuments,
		isOpenListVisitVisitorDocs,
		stateRowVisitVisitor,
		reasonStatus,
		toogleListVisitVisitorDocs,
		toggleModalAddDocuments,
		uploadAllDocuments,
		setKeyStateRowVisitVisitor,
		onClickCancelVisitor,
	} = useVisitorRowActions(visitVisitor)

	return (
		<>
			<BoxButtons>
				{
					isInnerLoading && (
						<FullLoader variant="absolute" size="small" />
					)
				}
				{
					stateRowVisitVisitor.status !== VISITOR_STATUS_CANCELLED ? (
						<>
							{
								loggedUser.can('update_visit') && !loggedUser.can('approvedocs_visit') && (
									<>
										<Button 
											variant="outlined"
											onClick={toggleModalAddDocuments} 
											startIcon={<CloudUploadIcon />}
										>{TEXTS.upload_documents}</Button>
										<SpaceBtn />
									</>
								)
							}
							<Button 
								variant="outlined"
								onClick={toogleListVisitVisitorDocs} 
								startIcon={<ListAltIcon />}
							>{TEXTS.see_documents}</Button>
						<SpaceBtn />

						{
							visitStartDate && new Date() < new Date(visitStartDate) && (
								<Button 
									variant="contained"
									color="error"
									onClick={onClickCancelVisitor} 
									startIcon={<DeleteIcon />}
								>
									{TEXTS.cancel_visitor}
								</Button>
							)
						}
						</>
					) : (
						<WarningCondition condition={false}>{TEXTS.message_cancelled_visitor}</WarningCondition>
					)
				}
				<SpaceBtn />
				<Box>
				{
					stateRowVisitVisitor.status === VISITOR_STATUS_APPROVED && (
						<TaskAltIcon titleAccess={reasonStatus || undefined} color="success" />
					)
				}
				{
					stateRowVisitVisitor.status === VISITOR_STATUS_REJECTED && (
						<DoDisturbAltIcon titleAccess={reasonStatus || undefined} color="error" />
					)
				}
				</Box>
			</BoxButtons>

			<Dialog open={isOpenListVisitVisitorDocs} onClose={toogleListVisitVisitorDocs}>
				<DialogTitle>{TEXTS.title_list_visit_visitor_docs}</DialogTitle>
				<DialogContent>
					<ListVisitVisitorDocs 
						visitVisitor={visitVisitor}
						documentTypes={documentTypes}
						onChangeStatusVisitor={(newStatus: string) => setKeyStateRowVisitVisitor('status', newStatus)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={toogleListVisitVisitorDocs}>{GTEXTS.close}</Button>
				</DialogActions>
			</Dialog>
			
			{ /* Modal to upload documents to the visitor. */}
			<ModalFullScreen 
				title={TEXTS.title_modal_upload_documents}
				open={isOpenModalAddDocuments}
				handleClose={toggleModalAddDocuments}
				textAction={TEXTS.save}
				handleAction={uploadAllDocuments}
				addFixedRowSave={true}
			>
				<Container maxWidth={false}>
					<UploadDocuments 
						files={files} 
						actions={actions}
						documentTypes={documentTypes}
					/>
				</Container>
			</ModalFullScreen>
		</>
	)
}