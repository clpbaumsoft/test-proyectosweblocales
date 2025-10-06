//React and modules
import Link from "next/link";

import {
	Button,
	Dialog,
	DialogContent,
	Tooltip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

//Components
import CreateVisitorForm from "@/components/organisms/CreateVisitorForm";
import CancelVisitForm from "./components/CancelVisitForm";

//Constants
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
		isOpenModalAddVisitor,
		isOpenCancelForm,
		isOpenDuplicateForm,
		toggleModalAddVisitor,
		onIncreaseVisitorsCounter,
		toggleIsOpenCancelForm,
		toggleModalDuplicateVisit,
	} = useVisitRowActions(setRowData, rowData)


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