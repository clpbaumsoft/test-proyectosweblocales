import VisitRowActions from "../VisitRowActions";
import { VISIT_STATUS_NAMES } from "@/constants/Visit";
import { formatsDate } from "@/lib/Helpers";
import useVisitRow from "./useVisitRow";
import { VisitRowProps } from "@/interfaces/Molecules";
import styles from "./VisitRow.module.scss";
import { Fragment } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

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
			<td className="text-start font-inter text-sm py-4">
				<span>{stateVisit.reason}</span>
				<div className="rounded-md bg-blue-50 px-4 py-2">
					<div className="flex">
						<div className="shrink-0">
							<InformationCircleIcon aria-hidden="true" className="size-4 text-blue-400" />
						</div>
						<div className="ml-3 flex-1 md:flex md:justify-between">
							<p className="text-xs text-blue-700">
								{formatsDate(stateVisit.start_date)} - {formatsDate(stateVisit.end_date)}
							</p>
						</div>
					</div>
				</div>
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