import Modal from "@/components/atoms/Dialog";
import DuplicateVisitForm from "@/components/molecules/DuplicateVisitForm";
import RegisterVisitForm from "@/components/molecules/RegisterVisitForm";
import CreateVisitorForm from "@/components/organisms/CreateVisitorForm";
import PAGES from "@/constants/Pages";
import {
	VISIT_STATUS_CANCELLED,
} from "@/constants/Visit";
import useTranslation from "@/hooks/useTranslation";
import { VisitRowActionsProps } from "@/interfaces/Molecules";
import { EyeIcon, PencilIcon, UserPlusIcon, XCircleIcon } from "@heroicons/react/24/outline";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
	Badge,
	Button,
	Tooltip,
} from "@mui/material";
import Link from "next/link";
import CancelVisitForm from "./components/CancelVisitForm";
import { TRANS } from "./constants";
import useVisitRowActions from "./useVisitRowActions";
import styles from "./VisitRowActions.module.scss";

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
			<div className="flex items-center gap-2">
				{loggedUser.canOr(['approvedocs_visit', 'read_visit']) && (
					<Link href={PAGES.visits_id.replace('[id]', String(rowData.id))} passHref>
						<Tooltip title={TEXTS.see} placement="top">
							<EyeIcon 
								className="
									w-5 
									text-[#aeaeae] 
									cursor-pointer
									hover:text-[var(--proquinal-dark-teal)]
								" 
							/>
						</Tooltip>
					</Link>
				)}
				{loggedUser.can('update_visit') && (
					<>
						<Tooltip title={TEXTS.edit} placement="top">
							<PencilIcon
								onClick={toggleModalEdit}
								className="
									w-5 
									text-[#aeaeae] 
									cursor-pointer
									hover:text-[var(--proquinal-dark-teal)]
								"
							/>
						</Tooltip>
						{isVisitExpired() && (
							<Tooltip title={TEXTS.duplicateVisit} placement="top">
								<Button
									className={`${styles.button_action_icon}`}
									variant="outlined"
									onClick={toggleModalDuplicateVisit}
									startIcon={<ContentCopyIcon sx={{ margin: '0 !important' }} />}
									sx={{
										margin: '0px !important',
									}}
								>
								</Button>
							</Tooltip>
						)}
						{(rowData.status !== VISIT_STATUS_CANCELLED) && (
							<Tooltip title={TEXTS.cancel} placement="top">
								<XCircleIcon
									className="
										w-5 
										text-[#aeaeae]
										cursor-pointer
										hover:text-[var(--proquinal-dark-teal)]
									"
									onClick={toggleIsOpenCancelForm}
								/>
							</Tooltip>
						)}
						{(rowData.status !== VISIT_STATUS_CANCELLED) && (
							<Tooltip title={TEXTS.add_visitor} placement="top">
								<Badge badgeContent={rowData.visitors_count} color="primary">
									<UserPlusIcon 
										className="
											w-5 
											text-[#aeaeae] 
											cursor-pointer
											hover:text-[var(--proquinal-dark-teal)]
										"
										onClick={toggleModalAddVisitor}
									/>
								</Badge>
							</Tooltip>
						)}
					</>
				)}
			</div>


			{ /* Form duplicate Visit */}
			{ isOpenDuplicateForm &&
				<DuplicateVisitForm 
					visitId={rowData.id} 
					open={isOpenDuplicateForm}
					onClose={toggleModalDuplicateVisit}
					// onSaved={onUpdateRowData}
				/>
			}

			{isOpenModalEdit && (
				<RegisterVisitForm
					visitId={rowData.id}
					open={isOpenModalEdit}
					onClose={onCloseModalEdit}
					preFillFormData={{
						entry_date: rowData.start_date,
						departure_date: rowData.end_date,
						reason: rowData.reason,
						email_approver: rowData.approver_docs?.email || "",
						email_interventor: rowData.interventor?.email || "",
						company_selected: rowData.company.id,
						branch_selected: rowData.branch.id,
						gate_selected: rowData.gate.id,
					}}
					onSaved={onUpdateRowData}
				/>
			)}
			
			<Modal
				show={isOpenModalAddVisitor}
				onClose={toggleModalAddVisitor}
			>
				<CreateVisitorForm
					visitId={rowData.id}
					onCancel={toggleModalAddVisitor}
					onIncreaseVisitorsCounter={onIncreaseVisitorsCounter}
				/>
			</Modal>
			<Modal
				show={isOpenCancelForm}
				onClose={toggleIsOpenCancelForm}
			>
				<CancelVisitForm
					visitId={rowData.id}
					setRowData={setRowData}
					onCancel={toggleIsOpenCancelForm}
					omitDobleCheck={true}
				/>
			</Modal>
		</>
	)
}