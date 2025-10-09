import {
	Alert,
	Box,
	Button,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	FormControl,
	InputLabel,
	ListItem,
	ListItemText,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import DoDisturbAltIcon from "@mui/icons-material/DoDisturbAlt";
import EditIcon from "@mui/icons-material/Edit";

//Components
import ButtonFile from "@/components/atoms/ButtonFile";
import CounterTextField from "@/components/atoms/CounterTextField";
import FormMessages from "@/components/atoms/FormMessages";
import FullLoader from "@/components/atoms/FullLoader";
import LabelForm from "@/components/atoms/LabelForm";
import ModalFullScreen from "@/components/atoms/ModalFullScreen";

//Constants
import { GTRANS } from "@/constants/Globals";
import PAGES from "@/constants/Pages";
import { 
	VISIT_DOCUMENT_STATUS_APPROVED, 
	VISIT_DOCUMENT_STATUS_PENDING, 
	VISIT_DOCUMENT_STATUS_REJECTED, 
	VISITOR_STATUS_APPROVED 
} from "@/constants/Visit";

//Hooks
import useItemListVisitVisitorDoc from "./useItemListVisitVisitorDoc";
import { ErrorMessage } from "@hookform/error-message";
import useTranslation from "@/hooks/useTranslation";

//Interfaces and types
import { ItemListVisitVisitorDocProps } from "@/interfaces/Molecules";
import { DocumentType } from "@/interfaces/Models";

//Styles
import { BoxButtonsForm, SpaceBtn } from "@/styles/elements";

//Texts
const TRANS = {
	approve: {
		id: "ItemListVisitVisitorDoc.Button.Approve",
		defaultMessage: "Aprobar",
		description: "",
	},
	reject: {
		id: "ItemListVisitVisitorDoc.Button.Reject",
		defaultMessage: "Rechazar",
		description: "",
	},
	label_reject_reason: {
		id: "ItemListVisitVisitorDoc.Typography.Label.TypeRejectReason",
		defaultMessage: "Escribe el motivo del rechazo:",
		description: "",
	},
	help_message_reject: {
		id: "ItemListVisitVisitorDoc.CounterTextField.HelpMessageReject",
		defaultMessage: "Máximo 200 caracteres.",
		description: "",
	},
	label_reason: {
		id: "ItemListVisitVisitorDoc.Typography.Label.Reason",
		defaultMessage: "Motivo:",
		description: "",
	},
	label_status: {
		id: "ItemListVisitVisitorDoc.Typography.Label.Status",
		defaultMessage: "Estado:",
		description: "",
	},
	change_document: {
		id: "ItemListVisitVisitorDoc.Button.ChangeDocument",
		defaultMessage: "Cambiar",
		description: "",
	},
	label_document_type: {
		id: "ItemListVisitVisitorDoc.TextField.Label.DocumentType",
		defaultMessage: "Tipo documento:",
		description: "",
	},
	label_description: {
		id: "ItemListVisitVisitorDoc.TextField.Label.Description",
		defaultMessage: "Descripción:",
		description: "",
	},
	choose_a_document: {
		id: "ItemListVisitVisitorDoc.ButtonFile.ChooseAFile",
		defaultMessage: "Selecciona",
		description: "",
	},
}

export default function ItemListVisitVisitorDoc({ prefix, itemVisitDoc, documentTypes, visitorStatus, onChangeItemDoc }: ItemListVisitVisitorDocProps) {

	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)
	
	const {
		loggedUser,
		reasonStatus,
		isInnerLoading,
		isOpenModal,
		isOpenRejectForm,
		errors,
		isValid,
		isSendingRejectReason,
		message,
		error,
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
	} = useItemListVisitVisitorDoc(itemVisitDoc, documentTypes, onChangeItemDoc)

	return (
		<>
			<ListItem>
				<ListItemText 
					primary={`${prefix}. ${visitDoc.document_type?.description || GTEXTS.unknown_document}`} 
					secondary={visitDoc.description || ""}
				/>
				<Dialog open={isEditing}>
					<form onSubmit={handleSubmitChange(onSubmitUpdateDocument)}>
						<DialogContent>
							{
								isLoadingChange && (
									<FullLoader variant="absolute" />
								)
							}
							<FormControl fullWidth size="small">
								<InputLabel>{TEXTS.label_document_type}</InputLabel>
								<Select
									{...registerChange("document_type", { required: GTEXTS.required })}
									label={TEXTS.label_document_type}
									sx={{ minWidth: 100 }}
									displayEmpty
									value={valueTypeId}
								>
									{
										documentTypes.map((docType: DocumentType) => ({ label: docType.description, value: docType.id })).map((itemSelector, indexItemSelector: number) => (
											<MenuItem key={`idxItemSelector${indexItemSelector}`} value={itemSelector.value}>{itemSelector.label}</MenuItem>
										))
									}
								</Select>
							</FormControl>
							<Box component="div" sx={{ height: '15px' }} />
							<ButtonFile
								{...registerChange("document", { required: GTEXTS.required })}
								onChange={onChangeNewDocument}
								defaultValueImage={null}
								buttonProps={{
									sx: { width: '100%' },
								}}
								accept="image/*,application/pdf"
							>{TEXTS.choose_a_document}</ButtonFile>
							<ErrorMessage
								errors={errorsChange}
								name="document"
								render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
							/>
							<Box component="div" sx={{ height: '20px' }} />
							<TextField
								size="small"
								label={TEXTS.label_description}
								variant="outlined"
								{...registerChange("description")}
							/>
							<FormMessages
								message={okMsgChange}
								error={errorMsgChange}
							/>
						</DialogContent>
					<DialogActions>
						<Button 
							variant="outlined"
							color="primary"
							onClick={toggleIsEditing}
						>{GTEXTS.close}</Button>
						<Button
							variant="contained"
							type="submit"
						>
							{GTEXTS.save}
						</Button>
					</DialogActions>
					</form>
				</Dialog>
				<Box component="span" sx={{ width: '10px' }} />
				<Button
					variant="outlined"
					startIcon={<AttachFileIcon />}
					onClick={toggleModal}
				>
					{GTEXTS.check_it_out}
				</Button>
				{
					loggedUser.can('update_visit') && (visitDoc.status === VISIT_DOCUMENT_STATUS_PENDING || visitDoc.status === VISIT_DOCUMENT_STATUS_REJECTED) && visitorStatus !== VISITOR_STATUS_APPROVED && (
						<>
							<Box component="span" sx={{ width: '10px' }} />
							<Button
								title={TEXTS.change_document}
								variant="outlined"
								onClick={toggleIsEditing}
								startIcon={<EditIcon />}
								disabled={isEditing}
							>{TEXTS.change_document}</Button>
						</>
					)
				}
				<Box
					sx={{
						position: 'absolute',
						right: '0',
						transform: 'translateX(50%)',
					}}
				>
				{
					visitDoc.status === VISIT_DOCUMENT_STATUS_APPROVED && (
						<TaskAltIcon titleAccess={reasonStatus || undefined} color="success" sx={{ ml: '10px' }} />
					)
				}
				{
					visitDoc.status === VISIT_DOCUMENT_STATUS_REJECTED && (
						<DoDisturbAltIcon titleAccess={visitDoc.approver_observations || undefined} color="error" sx={{ ml: '10px' }} />
					)
				}
				</Box>
			</ListItem>
			<ModalFullScreen 
				title={`${prefix}. ${visitDoc.document_type?.description || GTEXTS.unknown_document}`}
				subTitle={visitDoc.description || ""}
				open={isOpenModal}
				handleClose={toggleModal}
				textAction={GTEXTS.close}
				handleAction={toggleModal}
			>
				<Box 
					sx={{ 
						flex: 1,
						position: 'relative',
						overflow: 'hidden',
					}}
				>
					{
						isInnerLoading && (
							<FullLoader variant="absolute" />
						)
					}
					<iframe 
						src={PAGES.visitor_id_files.replace('[id]', String(visitDoc.id))}
						style={{ width: '100%', height: '100%' }}
						onLoad={onLoadIframe}
					/>
					{
						isOpenRejectForm && (
							<Container
								sx={{
									py: '40px',
									position: 'absolute',
									backgroundColor: 'var(--mui-palette-common-white)',
									left: '50%',
									top: '50%',
									transform: 'translate(-50%,-50%)',
									border: '3px solid var(--mui-palette-primary-main)',
									borderRadius: 'var(--mui-shape-borderRadius)',
									zIndex: 1,
								}}
							>
								{
									isSendingRejectReason && (
										<FullLoader variant="absolute" />
									)
								}
								<form onSubmit={handleSubmit(onSubmitRejectVisitDocument)}>
									<LabelForm
										label={TEXTS.label_reject_reason}
									/>
									<CounterTextField
										textFieldProps={{
											id: "reject_reason",
											...register("reject_reason", { required: GTEXTS.required }),
											fullWidth: true,
											multiline: true,
											rows: 3,
										}}
										helperText={TEXTS.help_message_reject}
									/>
									<ErrorMessage
										errors={errors}
										name="reject_reason"
										render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
									/>
									<FormMessages
										message={message}
										error={error}
									/>
									<BoxButtonsForm>
										<Button 
											variant="outlined" 
											onClick={toggleIsOpenRejectForm}
										>{GTEXTS.close}</Button>
										<SpaceBtn />
										<Button 
											variant="contained" 
											disabled={!isValid}
											type="submit"
										>{GTEXTS.send}</Button>
									</BoxButtonsForm>
								</form>
							</Container>
						)
					}
					<Container 
						maxWidth={false}
						sx={{
							position: 'absolute',
							left: '0',
							bottom: '20px',
							width: '100%',
							zIndex: 2,
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						{
							(loggedUser.can('approvedocs_visit') && !isOpenRejectForm && visitDoc.status !== VISIT_DOCUMENT_STATUS_APPROVED) ? (
								<>
									<Button
										variant="contained"
										color="error"
										startIcon={<DoDisturbAltIcon color="inherit" />}
										onClick={() => toggleIsOpenRejectForm()}
									>{TEXTS.reject}</Button>
									<Button
										variant="contained"
										color="success"
										startIcon={<TaskAltIcon color="inherit" />}
										onClick={onClickApproveVisitDocument}
									>{TEXTS.approve}</Button>
								</>
							) : (
								(!loggedUser.can('approvedocs_visit')) && reasonStatus && (
									<Box 
										sx={{
											backgroundColor: 'var(--mui-palette-common-white)',
											padding: '20px',
											borderRadius: 'var(--mui-shape-borderRadius)',
											border: '3px solid var(--mui-palette-primary-main)',
										}}
									>
										<Typography component="label">{TEXTS.label_status} <Typography component="b" fontWeight="bold">{reasonStatus}</Typography></Typography>
										{
											visitDoc.approver_observations && (
												<>
													<br/>
													<br/>
													<Typography component="label">{TEXTS.label_reason}</Typography>
													<br/>
													<Typography fontWeight="bold">{visitDoc.approver_observations}</Typography>
												</>
											)
										}
									</Box>
								)
							)
						}
					</Container>
				</Box>
			</ModalFullScreen>
		</>
	)
}