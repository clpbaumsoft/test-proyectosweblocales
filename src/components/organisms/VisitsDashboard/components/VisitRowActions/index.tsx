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
import { ChevronDownIcon, DocumentDuplicateIcon, EllipsisHorizontalIcon, EyeIcon, PencilIcon, UserPlusIcon, XCircleIcon } from "@heroicons/react/24/outline";
import CancelVisitForm from "./components/CancelVisitForm";
import { TRANS } from "./constants";
import useVisitRowActions from "./useVisitRowActions";
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from "@/components/atomsv2/Dropdown";
import { Badge } from "@mui/material";

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

	const actions = [
		{
			label: TEXTS.see,
			icon: <EyeIcon className="w-5 text-[#aeaeae] cursor-pointer" />,
			href: PAGES.visits_id.replace('[id]', String(rowData.id)),
			onClick: () => {},
			disabled: !loggedUser.canOr(['approvedocs_visit', 'read_visit'])
		},
		{
			label: TEXTS.edit,
			icon: <PencilIcon className="w-5 text-[#aeaeae] cursor-pointer" />,
			onClick: toggleModalEdit,
			disabled: !loggedUser.can('update_visit')
		},
		{
			label: TEXTS.duplicateVisit,
			icon: <DocumentDuplicateIcon className="w-5 text-[#aeaeae] cursor-pointer" />,
			onClick: toggleModalDuplicateVisit,
			disabled: !loggedUser.can('update_visit') || !isVisitExpired()
		},
		{
			label: TEXTS.cancel,
			icon: <XCircleIcon className="w-5 text-[#aeaeae] cursor-pointer" />,
			onClick: toggleIsOpenCancelForm,
			disabled: !loggedUser.can('update_visit') || !(rowData.status !== VISIT_STATUS_CANCELLED)
		},
		{
			label: TEXTS.add_visitor,
			icon: <Badge badgeContent={rowData.visitors_count} color="primary" className="mr-4">
				<UserPlusIcon className="w-5 text-[#aeaeae] cursor-pointer" />
			</Badge>,
			onClick: toggleModalAddVisitor,
			disabled: !loggedUser.can('update_visit') || !(rowData.status !== VISIT_STATUS_CANCELLED)
		}
	]

	return (
		<>
			<Dropdown>
				<DropdownButton color="white">
					<EllipsisHorizontalIcon className="text-black!" />
				</DropdownButton>
				<DropdownMenu>
					{actions.map((action, index) => (
						<DropdownItem 
							key={index} 
							href={action?.href}
							onClick={action.onClick} 
							disabled={action.disabled} 
							className="cursor-pointer"
						>
							{action.icon}
							{action.label}
						</DropdownItem>
					))}
				</DropdownMenu>
			</Dropdown>

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