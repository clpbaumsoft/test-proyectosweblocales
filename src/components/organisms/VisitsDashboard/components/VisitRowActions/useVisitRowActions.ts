import { useState } from "react"

//Interfaces and types
import { VisitRow } from "@/interfaces/Atoms"
import { VisitFormType } from "@/interfaces/Forms";

//Hooks
import useSessionProviderHook from "@/providers/SessionProvider/hooks";
import useToggleBoolean from "@/hooks/useToggleBoolean";

//Services
import Orchestra from "@/services/Orchestra"

export default function useVisitRowActions(setRowData: (key: keyof VisitRow, newValue: unknown) => void, rowData: VisitRow) {

	const [isOpenModalEdit, setIsOpenModalEdit] = useState(false)
	const [isOpenModalAddVisitor, setIsOpenModalAddVisitor] = useState(false)
	const [isOpenCancelForm, toggleIsOpenCancelForm] = useToggleBoolean(false)
	
	const {
		getLoggedUser,
	} = useSessionProviderHook()

	const onCloseModalEdit = () => {
		setIsOpenModalEdit(false)
	}

	const toggleModalEdit = () => {
		setIsOpenModalEdit(!isOpenModalEdit)
	}

	const toggleModalAddVisitor = () => {
		setIsOpenModalAddVisitor(!isOpenModalAddVisitor)
	}

	/**
	 * Updates the information of the row.
	 * @param newVisitData 
	 */
	const onUpdateRowData = async (newVisitData: VisitFormType) : Promise<void> => {
		setRowData('id', newVisitData.id_visit)
		setRowData('start_date', newVisitData.entry_date)
		setRowData('end_date', newVisitData.departure_date)
		setRowData('reason', newVisitData.reason)
		
		if(newVisitData.id_visit) {
			const visit = await Orchestra.visitService.get(newVisitData.id_visit)
			if(visit) {
				setRowData('approver_docs', visit.approver_docs || null)
				setRowData('company', visit.company)
				setRowData('company_name', visit.company.short_description)
				setRowData('branch_name', visit.branch.short_description)
				setRowData('branch', visit.branch)
				setRowData('gate_name', visit.gate.description)
				setRowData('gate', visit.gate)
				setRowData('visitors_count', visit.visitors_count)
			}
		}
	}


	const onIncreaseVisitorsCounter = () => {
		setRowData('visitors_count', (rowData.visitors_count || 0) + 1)
	}

	return {
		loggedUser: getLoggedUser(),
		isOpenModalEdit,
		isOpenModalAddVisitor,
		isOpenCancelForm,
		toggleModalEdit,
		onCloseModalEdit,
		toggleModalAddVisitor,
		onUpdateRowData,
		onIncreaseVisitorsCounter,
		toggleIsOpenCancelForm,
	}
}