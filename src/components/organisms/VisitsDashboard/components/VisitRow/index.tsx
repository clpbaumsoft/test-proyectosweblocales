//React and Modules
import {
	TableCell,
	TableRow,
	Typography,
} from "@mui/material";

//Components
import VisitRowActions from "../VisitRowActions";
import WarningCondition from "@/components/atoms/WarningCondition";

//Constants
import { VISIT_STATUS_NAMES } from "@/constants/Visit";

//Lib
import { formatsDate, isBetweenDates, now } from "@/lib/Helpers";

//Hooks
import useVisitRow from "./useVisitRow";

//Interfaces and types
import { VisitRowProps } from "@/interfaces/Molecules";

//Styles
import styles from "./VisitRow.module.scss";

export default function VisitRow({ row }: VisitRowProps) {

	const {
		stateVisit,
		setStateVisit,
	} = useVisitRow(row)

	return (
		<>
			<TableRow
				className={`${styles.visitRow} relative`}
				sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
			>
				<TableCell component="th" scope="row" align="center">
					<b>{stateVisit.id}</b>
				</TableCell>
				<TableCell component="th" scope="row" align="center">
					<label className={`${styles.labelStatus} ${styles[`ref${stateVisit.status}`]}`}>{VISIT_STATUS_NAMES[stateVisit.status]}</label>
				</TableCell>
				<TableCell>
					<Typography>{stateVisit.reason}</Typography>
					<WarningCondition severity="info" condition={!isBetweenDates(stateVisit.start_date, stateVisit.end_date, now())}>
						{formatsDate(stateVisit.start_date)} - {formatsDate(stateVisit.end_date)}
					</WarningCondition>
				</TableCell>
				<TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>
					{stateVisit.company_name}
				</TableCell>
				<TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>
					{stateVisit.branch_name}
				</TableCell>
				<TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>
					{stateVisit.gate_name}
				</TableCell>
				<TableCell align="center">
					<VisitRowActions
						setRowData={setStateVisit}
						rowData={stateVisit}
					/>
				</TableCell>
			</TableRow>
		</>
	)
}