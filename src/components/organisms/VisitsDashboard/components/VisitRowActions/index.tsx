//React and modules
import Link from "next/link";

import {
	Badge,
	Button,
	Dialog,
	DialogContent,
} from "@mui/material";
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
import { BoxButtons, SpaceBtn } from "@/styles/elements";

//Texts
const TRANS = {
	see: {
		id: "VisitRowActions.Button.See",
		defaultMessage: "Ver",
		description: "",
	},
	edit: {
		id: "VisitRowActions.Button.Edit",
		defaultMessage: "Editar",
		description: "",
	},
	cancel: {
		id: "VisitRowActions.Button.Cancel",
		defaultMessage: "Cancelar",
		description: "",
	},
	add_visitor: {
		id: "VisitRowActions.Button.AddVisitor",
		defaultMessage: "Agregar",
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
		toggleModalEdit,
		onCloseModalEdit,
		toggleModalAddVisitor,
		onUpdateRowData,
		onIncreaseVisitorsCounter,
		toggleIsOpenCancelForm,
	} = useVisitRowActions(setRowData, rowData)

	return (
		<>
			<BoxButtons>
				{
					loggedUser.canOr(['approvedocs_visit', 'read_visit']) && (
						<Link href={PAGES.visits_id.replace('[id]', String(rowData.id))} passHref>
							<Button 
								variant="outlined" 
								color="info"
								startIcon={<VisibilityIcon color="info" />}
							>{TEXTS.see}</Button>
						</Link>
					)
				}

				{
					loggedUser.can('update_visit') && (
						<>
							<SpaceBtn />
							<Button 
								variant="outlined" 
								onClick={toggleModalEdit}
								startIcon={<EditIcon />}
								>{TEXTS.edit}</Button>
							{
								(rowData.status !== VISIT_STATUS_CANCELLED) && (
									<>
										<SpaceBtn />
										<Button 
											variant="outlined" 
											onClick={toggleIsOpenCancelForm}
											startIcon={<DoNotDisturbOnIcon color="error" />}
											color="error"
										>{TEXTS.cancel}</Button>
									</>
								)
							}
							{
								(rowData.status !== VISIT_STATUS_CANCELLED) && (
									<>
										<SpaceBtn />
										<Badge badgeContent={rowData.visitors_count} color="primary">
											<Button 
												variant="outlined" 
												onClick={toggleModalAddVisitor}
												startIcon={<PersonAddIcon color="success" />}
												color="success"
												title={TEXTS.help_text_add_visitor}
											>{TEXTS.add_visitor}</Button>
										</Badge>
									</>
								)
							}
						</>
					)
				}
			</BoxButtons>
			
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
							email_approver: rowData.approver_docs?.email || "",
							company_selected: rowData.company.id,
							branch_selected: rowData.branch.id,
							gate_selected: rowData.gate.id,
						}}
						onSaved={onUpdateRowData}
					/>
				)
			}
			{
				<Dialog open={isOpenModalAddVisitor} onClose={toggleModalAddVisitor}>
					<DialogContent>
						<CreateVisitorForm 
							visitId={rowData.id} 
							onCancel={toggleModalAddVisitor}
							onIncreaseVisitorsCounter={onIncreaseVisitorsCounter}
						/>
					</DialogContent>
				</Dialog>
			}
			
			{ /* Form used to cancel the visit. */}
			{
				<Dialog open={isOpenCancelForm} onClose={toggleIsOpenCancelForm}>
					<DialogContent>
						<CancelVisitForm 
							visitId={rowData.id} 
							setRowData={setRowData}
							onCancel={toggleIsOpenCancelForm}
						/>
					</DialogContent>
				</Dialog>
			}
		</>
	)
}