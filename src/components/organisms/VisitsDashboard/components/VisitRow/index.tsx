import VisitRowActions from "../VisitRowActions";
import { VISIT_STATUS_NAMES } from "@/constants/Visit";
import { formatsDate } from "@/lib/Helpers";
import useVisitRow from "./useVisitRow";
import { VisitRowProps } from "@/interfaces/Molecules";
import styles from "./VisitRow.module.scss";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { TableCell, TableRow } from "@/components/atomsv2/Table";

export default function VisitRow({ row }: VisitRowProps) {
	const {
		stateVisit,
		setStateVisit,
	} = useVisitRow(row)

	return (
		<TableRow className="text-center">
			<TableCell>
				<b className="text-sm">{stateVisit.id}</b>
			</TableCell>
			<TableCell>
				<label className={`${styles.labelStatus} ${styles[`ref${stateVisit.status}`]}`}>
					{VISIT_STATUS_NAMES[stateVisit.status]}
				</label>
			</TableCell>
			<TableCell className="text-start">
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
			</TableCell>
			<TableCell>
				{stateVisit.company_name}
			</TableCell>
			<TableCell>
				{stateVisit.branch_name}
			</TableCell>
			<TableCell>
				{stateVisit.gate_name}
			</TableCell>
			<TableCell>
				<VisitRowActions
					setRowData={setStateVisit}
					rowData={stateVisit}
				/>
			</TableCell>
		</TableRow>
	)
}