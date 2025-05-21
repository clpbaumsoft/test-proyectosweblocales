
import {
	Button,
	Card,
	Dialog,
	DialogContent
} from "@mui/material";
import KeyIcon from "@mui/icons-material/Key";

//Components
import BoldLabel from "@/components/atoms/BoldLabel";
import FormMessages from "@/components/atoms/FormMessages";
import FullLoader from "@/components/atoms/FullLoader";
import FormGiveEntryEmployee from "@/components/molecules/FormGiveEntryEmployee";

//Interfaces and types
import { CardEmployeeProps } from "@/interfaces/Molecules";

//Hooks
import useCardEmployee from "./useCardEmployee";
import useTranslation from "@/hooks/useTranslation";

//Styles
import { BoxButtonsForm } from "@/styles/elements";

//Texts
const TRANS = {
	label_employee_itype_code: {
		id: "CardEmployee.BoldLabel.IdentificationTypeCode",
		defaultMessage: "Tipo documento:",
		description: "",
	},
	label_employee_dni: {
		id: "CardEmployee.BoldLabel.Dni",
		defaultMessage: "Documento:",
		description: "",
	},
	label_employee_code: {
		id: "CardEmployee.BoldLabel.Code",
		defaultMessage: "Código:",
		description: "",
	},
	label_employee_name: {
		id: "CardEmployee.BoldLabel.EmployeeName",
		defaultMessage: "Nombre:",
		description: "",
	},
	give_entry: {
		id: "CardEmployee.Button.GiveEntry",
		defaultMessage: "Dar ingreso",
		description: "",
	},
	give_leave: {
		id: "CardEmployee.Button.GiveLeave",
		defaultMessage: "Dar salida",
		description: "",
	},
}

export default function CardEmployee({ employee, hideEntry = false }: CardEmployeeProps) {

	const TEXTS = useTranslation(TRANS)

	const {
		stateEmployee,
		isInnerLoading,
		message,
		error,
		isOpenModalEntryEmployee,
		onClickGiveLeave,
		toggleIsOpenModalEntryEmployee,
		openModalEntry,
	} = useCardEmployee(employee)

	return (
		<>
			<Card sx={{ p: '10px' }}>
				{
					isInnerLoading && (
						<FullLoader variant="absolute" />
					)
				}
				<BoldLabel
					sx={{ mb: '10px' }}
					label={TEXTS.label_employee_name}
					value={stateEmployee.name}
				/>
				{
					stateEmployee.identification_type && (
						<BoldLabel
						sx={{ mb: '10px' }}
						label={TEXTS.label_employee_itype_code}
						value={stateEmployee.identification_type.code}
						/>
					)
				}
				<BoldLabel
					sx={{ mb: '10px' }}
					label={TEXTS.label_employee_dni}
					value={stateEmployee.identification_number}
				/>
				{
					stateEmployee.code && (
						<BoldLabel
							label={TEXTS.label_employee_code}
							value={stateEmployee.code}
						/>
					)
				}
				<FormMessages
					message={message}
					error={error}
				/>
				<BoxButtonsForm>
					{
						!stateEmployee.active_entry_employee ? (
							!hideEntry && (
								<Button
									color="success"
									variant="contained"
									startIcon={<KeyIcon />}
									onClick={openModalEntry}
								>{TEXTS.give_entry}</Button>
							)
						) : (
							<Button
								color="error"
								variant="contained"
								onClick={onClickGiveLeave}
							>{TEXTS.give_leave}</Button>
						)
					}
				</BoxButtonsForm>
			</Card>

			{/*  */}
			<Dialog open={isOpenModalEntryEmployee}>
				<DialogContent>
					<FormGiveEntryEmployee 
						employee={employee}
						onCancel={toggleIsOpenModalEntryEmployee}
					/>
				</DialogContent>
			</Dialog>
		</>
	)
}