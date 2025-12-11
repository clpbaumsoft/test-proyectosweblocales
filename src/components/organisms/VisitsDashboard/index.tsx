import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import VisitRow from "./components/VisitRow";
import SkeletonVisitRow from "./components/SkeletonVisitRow";
import { GTRANS } from "@/constants/Globals";
import useVisitsDashboard from "./useVisitsDashboard";
import useTranslation from "@/hooks/useTranslation";
import TableVisitsProvider from "@/providers/TableVisitsProvider";
import Select from "@/components/atoms/Select";
import LabelForm from "@/components/atoms/LabelForm";
import InputGroup from "@/components/atoms/InputGroup";
import { TRANS } from "./constants";
import Table from "@/components/atoms/Table";
import { Fragment } from "react";
import { TableFooter, TablePagination } from "@mui/material";

export default function VisitsDashboard() {
	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)

	const {
		total,
		page,
		rowsPerPage,
		visitsRows,
		isInnerLoading,
		isInnerLoadingFirstTime,
		isLoadingNewVisit,
		filter,
		visitIdFilter,
		handleChangePage,
		handleChangeRowsPerPage,
		onChangeFilter,
		onChangeVisitIdFilter,
	} = useVisitsDashboard()

	const tableHeads = [
    TEXTS.label_id,
    TEXTS.label_status,
    TEXTS.label_description,
    TEXTS.label_company,
    TEXTS.label_branch,
    TEXTS.label_gate,
    TEXTS.label_actions
  ]

  // Proccess table rows
  const tableRows = visitsRows.map((row) => (
    <VisitRow key={`visitRow-${row.id}`} row={row} />
  ))

  if (isLoadingNewVisit)
    tableRows.push(<SkeletonVisitRow key="skeleton-new-visit" />)

	return (
		<Fragment>
			<h1 className="font-inter text-2xl font-bold mb-8">
				Visitas Programadas
			</h1>
			<TableVisitsProvider>
				<div className="my-[30px] flex gap-2 items-center">
					<div className="flex flex-col">
						<LabelForm label="Estado:" required={false} />
						<Select 
							value={filter}
							disabled={isInnerLoading || isInnerLoadingFirstTime}
							onChange={onChangeFilter}
							options={[
								{ value: "activated", label: TEXTS.option_activated },
								{ value: "cancelled", label: TEXTS.option_cancelled },
								{ value: "expired", label: TEXTS.option_expired },
							]}
						/>
					</div>
					<div className="flex flex-col ml-6">
						<LabelForm label="Código de visita:" required={false} />
						<InputGroup
							type="number"
							value={visitIdFilter}
							onChange={onChangeVisitIdFilter}
							disabled={isInnerLoading || isInnerLoadingFirstTime}
							placeholder="Código de visita"
						/>
					</div>
				</div>
				<Table
					tableHeads={tableHeads}
					tableRows={tableRows}
					isLoading={isInnerLoading || isInnerLoadingFirstTime}
					loadingMessage="Cargando visitas..."
					emptyMessage="No hay visitas registradas"
				/>
				<table className="w-full">
					{(!(isInnerLoading || isInnerLoadingFirstTime) && visitsRows.length !== 0) && (
						<TableFooter>
							<tr>
								<TablePagination
									rowsPerPageOptions={[5, 10, 25]}
									colSpan={7}
									count={total}
									rowsPerPage={rowsPerPage}
									page={page}
									labelRowsPerPage={GTEXTS.rows_per_page}
									onPageChange={handleChangePage}
									onRowsPerPageChange={handleChangeRowsPerPage}
									ActionsComponent={TablePaginationActions}
								/>
							</tr>
						</TableFooter>
					)}
				</table>
			</TableVisitsProvider>
		</Fragment>
	)
}