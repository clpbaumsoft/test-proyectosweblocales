import VisitRowActions from "../VisitRowActions";
import WarningCondition from "@/components/atoms/WarningCondition";
import { VISIT_STATUS_NAMES } from "@/constants/Visit";
import { formatsDate, isBetweenDates, now } from "@/lib/Helpers";
import useVisitRow from "./useVisitRow";
import { VisitRowProps } from "@/interfaces/Molecules";
import styles from "./VisitRow.module.scss";
import { Fragment } from "react";

export default function VisitRow({ row }: VisitRowProps) {
	const {
		stateVisit,
		setStateVisit,
	} = useVisitRow(row)

	return (
		<Fragment>
			<td className="text-center font-inter text-sm">
				<b className="text-sm">{stateVisit.id}</b>
			</td>
			<td className="text-center font-inter text-sm">
				<label className={`${styles.labelStatus} ${styles[`ref${stateVisit.status}`]}`}>
					{VISIT_STATUS_NAMES[stateVisit.status]}
				</label>
			</td>
			<td className="text-center font-inter text-sm">
				<span>{stateVisit.reason}</span>
				<WarningCondition severity="info" condition={!isBetweenDates(stateVisit.start_date, stateVisit.end_date, now())}>
					{formatsDate(stateVisit.start_date)} - {formatsDate(stateVisit.end_date)}
				</WarningCondition>
			</td>
			<td className="text-center font-inter text-sm">
				{stateVisit.company_name}
			</td>
			<td className="text-center font-inter text-sm">
				{stateVisit.branch_name}
			</td>
			<td className="text-center font-inter text-sm">
				{stateVisit.gate_name}
			</td>
			<td className="text-center font-inter text-sm">
				<VisitRowActions
					setRowData={setStateVisit}
					rowData={stateVisit}
				/>
			</td>
		</Fragment>
	)
}