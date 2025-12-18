import VisitRow from "./components/VisitRow";
import SkeletonVisitRow from "./components/SkeletonVisitRow";
import useVisitsDashboard from "./useVisitsDashboard";
import useTranslation from "@/hooks/useTranslation";
import TableVisitsProvider from "@/providers/TableVisitsProvider";
import LabelForm from "@/components/atoms/LabelForm";
import { TRANS } from "./constants";
import { Fragment } from "react";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/atomsv2/Table";
import { Input } from "@/components/atomsv2/Input";
import { Select } from "@/components/atomsv2/Select";
import DataTablePagination from "@/components/atomsv2/DataTablePagination";

export default function VisitsDashboard() {
	const TEXTS = useTranslation(TRANS)

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
		<VisitRow key={row.id} row={row} />
  ))

  if (isLoadingNewVisit)
    tableRows.push(<SkeletonVisitRow key="skeleton-new-visit" />)

	const hasVisits = visitsRows.length > 0;
	const isLoading = isInnerLoading || isInnerLoadingFirstTime;
	const totalPages = Math.max(1, Math.ceil(total / rowsPerPage));

	const goToPage = (nextPage: number) => {
		if (nextPage < 0 || nextPage > totalPages - 1) return;
		handleChangePage(null, nextPage);
	};

	return (
		<Fragment>
			<h1 className="text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white">
				Visitas Programadas
			</h1>
			<TableVisitsProvider>
				<div className="my-7.5 flex gap-2 items-center">
					<div className="flex flex-col gap-2">
						<LabelForm label="Estado:" required={false} />
						<Select
							value={filter}
							disabled={isInnerLoading || isInnerLoadingFirstTime}
							onChange={onChangeFilter}
						>
							{[
								{ value: "activated", label: TEXTS.option_activated },
								{ value: "cancelled", label: TEXTS.option_cancelled },
								{ value: "expired", label: TEXTS.option_expired },
							].map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
            </Select>
					</div>
					<div className="flex flex-col gap-2 ml-6">
						<LabelForm label="Código de visita:" required={false} />
						<Input 
							type="number"
							value={visitIdFilter}
							onChange={onChangeVisitIdFilter}
							disabled={isInnerLoading || isInnerLoadingFirstTime}
							placeholder="Código de visita"
						/>
					</div>
				</div>
				<section>
					{isLoading ? (
						<div className="flex flex-col items-center gap-2">
							<div
								className="
								animate-spin 
								rounded-full 
								h-8 
								w-8 
								border-b-2 
								border-proquinal-teal
							" />
							<span>Cargando resultados...</span>
						</div>
					) : hasVisits ? (
						<Table>
							<TableHead>
								<TableRow>
									{tableHeads.map((head, index) => (
										<TableHeader key={index} className="text-center">{head}</TableHeader>
									))}
								</TableRow>
							</TableHead>
							<TableBody>{tableRows}</TableBody>
						</Table>
					) : (
						<p className="text-sm text-muted-foreground dark:text-white">
							No hay visitas registradas
						</p>
					)}
				</section>
				{!isLoading && hasVisits && (
					<DataTablePagination 
						page={page}
						rowsPerPage={rowsPerPage}
						total={total}
						onChangePage={goToPage}
						onChangeRowsPerPage={handleChangeRowsPerPage}
					/>
				)}
			</TableVisitsProvider>
		</Fragment>
	)
}