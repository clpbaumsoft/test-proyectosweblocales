import Link from "next/link";
import {
	Typography,
	TablePagination,
	TableFooter,
	Card,
	CardContent,
	FormHelperText,
	Box,
	IconButton,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import HomeIcon from "@mui/icons-material/Home";
import BoldLabel from "@/components/atoms/BoldLabel";
import VisitorRow from "./components/VisitorRow";
import PAGES from "@/constants/Pages";
import { GTRANS } from "@/constants/Globals";
import { VISITOR_STATUS_CANCELLED } from "@/constants/Visit";
import { formatsDate } from "@/lib/Helpers";
import useVisitDashboard from "./useVisitDashboard";
import useTranslation from "@/hooks/useTranslation";
import { VisitDashboardProps } from "@/interfaces/Organisms";
import TableVisitsProvider from "@/providers/TableVisitsProvider";
import { TRANS } from "./constants";
import { Fragment } from "react";
import Table from "@/components/atoms/Table";

export default function VisitDashboard({ visit }: VisitDashboardProps) {
	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)

	const {
		isInnerLoading,
		isInnerLoadingFirstTime,
		visitorsRows,
		total,
		page,
		rowsPerPage,
		documentTypes,
		handleChangePage,
		handleChangeRowsPerPage,
	} = useVisitDashboard(visit)

	const tableHeads = [
		TEXTS.label_visitor_photo,
		TEXTS.label_visitor_dni_number,
		TEXTS.label_visitor_full_name,
		TEXTS.label_security_training,
		TEXTS.label_visitor_actions
	]

	const tableRows = visitorsRows.map((row, index) => (
		<VisitorRow
			key={`visitorRow${index}`}
			row={row}
			visitStartDate={visit?.start_date}
			documentTypes={documentTypes}
		/>
	))

	return (
		<Fragment>
			<div className="flex items-center mb-8">
				<Link href={PAGES.home} passHref>
					<IconButton
						color="primary"
						aria-label={TEXTS.go_back}
						sx={{
							mr: '10px',
						}}
					>
						<HomeIcon />
					</IconButton>
				</Link>
				<h1 className="font-inter text-2xl font-bold">
					{TEXTS.title}
				</h1>
			</div>
			<Card>
				<CardContent>
					<div className="mb-[10px] text-gray-600">
						<p className='font-semibold text-[16px]'>{TEXTS.label_reason}</p>
						<span>{visit.reason}</span>
					</div>
					<br/>
					<div className="flex flex-wrap">
						<div className="mb-[10px] text-gray-600 w-6/12">
							<p className='font-semibold text-[16px]'>{TEXTS.label_start_date}</p>
							<span>{formatsDate(visit.start_date)}</span>
						</div>
						<div className="mb-[10px] text-gray-600">
							<p className='font-semibold text-[16px]'>{TEXTS.label_end_date}</p>
							<span>{formatsDate(visit.end_date)}</span>
						</div>
					</div>
					{visit.cancelled_at && visit.status === VISITOR_STATUS_CANCELLED && (
						<>
							<br />
							<Box
								sx={{
									border: '1px dashed var(--mui-palette-error-main)',
									borderRadius: 'var(--mui-shape-borderRadius)',
									p: '10px',
								}}
							>
								<BoldLabel
									label={TEXTS.label_cancelled_reason}
									value={visit.reason_cancel}
								/>
								<Grid container spacing={3}>
									{
										visit.canceller && (
											<Grid size={{ xs: 12, md: 6 }}>
												<BoldLabel
													label={TEXTS.label_cancelled_user}
													value={(
														<Typography variant="h6" component="div">
															<Box sx={{ display: 'table', ml: '10px' }}>
																<Typography variant="body2">{visit.canceller?.fullname}</Typography>
																<FormHelperText>{visit.canceller?.email}</FormHelperText>
															</Box>
														</Typography>
													)}
												/>
											</Grid>
										)
									}
									<Grid size={{ xs: 12, md: 6 }}>
										<BoldLabel
											label={TEXTS.label_cancelled_at}
											value={formatsDate(visit.cancelled_at)}
										/>
									</Grid>
								</Grid>
							</Box>
						</>
					)}
				</CardContent>
			</Card>
			<br/>
			<h1 className="font-inter text-2xl font-bold">
				{TEXTS.title_table_visitors}
			</h1>
			<TableVisitsProvider>
				<Table
					tableHeads={tableHeads}
					tableRows={tableRows}
					isLoading={isInnerLoading || isInnerLoadingFirstTime}
					loadingMessage="Cargando visitas..."
					emptyMessage="No hay visitas registradas"
				/>
				<table className="w-full">
					{(!(isInnerLoading || isInnerLoadingFirstTime) && visitorsRows.length !== 0) && (
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