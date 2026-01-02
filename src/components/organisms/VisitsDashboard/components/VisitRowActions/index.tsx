//React and modules
import Link from "next/link";

import {
	Badge,
	Button,
	Dialog,
	DialogContent,
	Tooltip,
} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from "@mui/icons-material/Edit";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import VisibilityIcon from "@mui/icons-material/Visibility";

//Components
import RegisterVisitForm from "@/components/molecules/RegisterVisitForm";
import CreateVisitorForm from "@/components/organisms/CreateVisitorForm";
import CancelVisitForm from "./components/CancelVisitForm";

//Constants
import {
	VISIT_STATUS_CANCELLED,
} from "@/constants/Visit";
import PAGES from "@/constants/Pages";

//Hooks
import useVisitRowActions from "./useVisitRowActions";
import useTranslation from "@/hooks/useTranslation";

//Interfaces and types
import { VisitRowActionsProps } from "@/interfaces/Molecules";

//Styles
import { BoxButtons } from "@/styles/elements";
import DuplicateVisitForm from "@/components/molecules/DuplicateVisitForm";
import styles from "./VisitRowActions.module.scss";
import { ItemSelector } from "@/interfaces/General";

//Texts
const TRANS = {
	see: {
		id: "VisitRowActions.Button.See",
		defaultMessage: "Ver detalles de la visita",
		description: "",
	},
	duplicateVisit: {
		id: "VisitRowActions.Button.DuplicateVisit",
		defaultMessage: "Duplicar visita",
		description: "",
	},
	edit: {
		id: "VisitRowActions.Button.Edit",
		defaultMessage: "Editar visita",
		description: "",
	},
	cancel: {
		id: "VisitRowActions.Button.Cancel",
		defaultMessage: "Cancelar visita",
		description: "",
	},
	add_visitor: {
		id: "VisitRowActions.Button.AddVisitor",
		defaultMessage: "Agregar visitante",
		description: "",
	},
	help_text_add_visitor: {
		id: "VisitRowActions.Button.HelpTextAddVisitor",
		defaultMessage: "Agregar visitante",
		description: "",
	},
}

export default function VisitRowActions({ setRowData, rowData }: VisitRowActionsProps) {

	const TEXTS = useTranslation(TRANS)

	const {
		loggedUser,
		isOpenModalEdit,
		isOpenModalAddVisitor,
		isOpenCancelForm,
		isOpenDuplicateForm,
		toggleModalEdit,
		onCloseModalEdit,
		toggleModalAddVisitor,
		onUpdateRowData,
		onIncreaseVisitorsCounter,
		toggleIsOpenCancelForm,
		toggleModalDuplicateVisit,
	} = useVisitRowActions(setRowData, rowData)


	const end_date = rowData.end_date ? new Date(rowData.end_date) : null;

	const isVisitExpired = (): boolean => {
		if (!end_date) return false;
		
		const currentDate = new Date();
		// currentDate.setHours(0, 0, 0, 0);
		const compareDate = new Date(end_date);
		// compareDate.setHours(0, 0, 0, 0);
		
		return currentDate >= compareDate;
	}

	return (
		<>
			<BoxButtons sx={{ display: 'flex', flexDirection: { md: 'column', xl: 'row'}, alignItems: 'center', gap: 1}}>
				{
					loggedUser.canOr(['approvedocs_visit', 'read_visit']) && (
						<Link href={PAGES.visits_id.replace('[id]', String(rowData.id))} passHref>
							<Tooltip title={TEXTS.see} placement="top">
								<Button
									className={`${styles.button_action_icon}`} 
									variant="outlined" 
									color="info"
									startIcon={<VisibilityIcon color="info" />}
								>
								</Button>
							</Tooltip>
						</Link>
					)
				}

				{
					loggedUser.can('update_visit') && (
						<>
							<Tooltip title={TEXTS.edit} placement="top">
								<Button 
									className={`${styles.button_action_icon}`}
									variant="outlined" 
									onClick={toggleModalEdit}
									startIcon={<EditIcon />}
								>
								</Button>
							</Tooltip>
						    {
								isVisitExpired() && (
									<Tooltip title={TEXTS.duplicateVisit} placement="top">
										<Button
											className={`${styles.button_action_icon}`}
											variant="outlined" 
											onClick={toggleModalDuplicateVisit}
											startIcon={<ContentCopyIcon sx={{margin: '0 !important'}}/>}
											sx={{
												margin: '0px !important',
											}}			
										>
										</Button>
									</Tooltip>
								)
							}

							{
								(rowData.status !== VISIT_STATUS_CANCELLED) && (
									<>
										<Tooltip title={TEXTS.cancel} placement="top">
											<Button 
												className={`${styles.button_action_icon}`}
												variant="outlined" 
												onClick={toggleIsOpenCancelForm}
												startIcon={<DoNotDisturbOnIcon color="error" />}
												color="error"
											>
											</Button>
										</Tooltip>
									</>
								)
							}

							{
								(rowData.status !== VISIT_STATUS_CANCELLED) && (
									<>
										<Tooltip title={TEXTS.add_visitor} placement="top">
											<Badge badgeContent={rowData.visitors_count} color="primary">
												<Button 
													className={`${styles.button_action_icon}`}
													variant="outlined" 
													onClick={toggleModalAddVisitor}
													startIcon={<PersonAddIcon color="success" />}
													color="success"
													title={TEXTS.help_text_add_visitor}
												>
												</Button>
											</Badge>
										</Tooltip>

									</>
								)
							}
						</>
					)
				}
			</BoxButtons>


			{ /* Form duplicate Visit */}
			{ isOpenDuplicateForm &&
				<DuplicateVisitForm 
					visitId={rowData.id} 
					open={isOpenDuplicateForm}
					onClose={toggleModalDuplicateVisit}
					// onSaved={onUpdateRowData}
				/>
			}


			{ /* Form used to update the visit information */}
			{
				isOpenModalEdit && (
					<RegisterVisitForm 
						visitId={rowData.id}
						open={isOpenModalEdit} 
						onClose={onCloseModalEdit}
						preFillFormData={{
							entry_date: rowData.start_date,
							departure_date: rowData.end_date,
							reason: rowData.reason,
							email_interventor: rowData.approver_docs?.email || "",
							id_interventor_employee: 
								rowData.interventor?.id 
									&& { value: rowData.interventor.id, label: rowData.interventor.name } as ItemSelector,
							company_selected: rowData.company.id,
							branch_selected: rowData.branch.id,
							gate_selected: rowData.gate.id,
						}}
						onSaved={onUpdateRowData}
					/>
				)
			}
			
			<Dialog open={isOpenModalAddVisitor} onClose={toggleModalAddVisitor}>
				<DialogContent>
					<CreateVisitorForm 
						visitId={rowData.id} 
						onCancel={toggleModalAddVisitor}
						onIncreaseVisitorsCounter={onIncreaseVisitorsCounter}
					/>
				</DialogContent>
			</Dialog>
			
			{ /* Form used to cancel the visit. */}
			{
				<Dialog open={isOpenCancelForm} onClose={toggleIsOpenCancelForm}>
					<DialogContent>
						<CancelVisitForm 
							visitId={rowData.id} 
							setRowData={setRowData}
							onCancel={toggleIsOpenCancelForm}
							omitDobleCheck={true}
						/>
					</DialogContent>
				</Dialog>
			}
		</>
	)
}