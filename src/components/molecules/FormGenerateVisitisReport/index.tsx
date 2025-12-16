import React from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from 'dayjs';
import useTranslation from "@/hooks/useTranslation";
import FormMessages from "@/components/atoms/FormMessages";
import { 
	Box, 
	Button as MUIButton,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	Paper,
	Typography
} from "@mui/material";
import { Download } from "@mui/icons-material";
import useFormGenerateVisitisReport from "./useFormGenerateVisitisReport";
import { TRANS } from "./constants";
import { customStylesDatePicker } from "@/components/atoms/CustomDatePicker/constants";
import LabelForm from "@/components/atoms/LabelForm";
import Button from "@/components/atoms/Button";

export default function FormGenerateVisitisReport() {
  const TEXTS = useTranslation(TRANS);

	const {
		valueStart,
		setValueStart,
		valueEnd,
		setValueEnd,
		isInnerLoading,
		visitsData,
		page,
		rowsPerPage,
		message,
		error,
		onSubmit,
		handleChangePage,
		handleChangeRowsPerPage,
		exportToCSV,
		exportToXLSX,
	} = useFormGenerateVisitisReport();

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<form onSubmit={onSubmit} className="flex gap-4 items-end">
				<div className="flex flex-col gap-1">
					<LabelForm label={TEXTS.label_banned_start_time} />
					<DatePicker
						value={valueStart}
						onChange={(date: Dayjs | null) => {
							setValueStart(date);
						}}
						minDate={dayjs('2022-01-01')}
						disabled={isInnerLoading}
						sx={customStylesDatePicker}
					/>
				</div>
				<div className="flex flex-col gap-1">
					<LabelForm label={TEXTS.label_banned_end_time} />
					<DatePicker
						value={valueEnd}
						onChange={(date: Dayjs | null) => {
							setValueEnd(date);
						}}
						disabled={isInnerLoading}
						sx={customStylesDatePicker}
					/>
				</div>
				<div>
					<Button 
						type="submit"
						disabled={isInnerLoading}
						text={TEXTS.generateReport}
					/>
				</div>

			</form>
			{(error || message) && (
				<div className="w-full">
					<FormMessages message={message} error={error} />
				</div>
			)}
			{/* Results Table */}
			{visitsData.length > 0 && (
				<Box sx={{ marginTop: 4 }}>
					<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
						<Typography variant="h6">
							Resultados del Reporte ({visitsData.length} registros)
						</Typography>
						<Box sx={{ display: 'flex', gap: 1 }}>
							<MUIButton
								variant="outlined"
								startIcon={<Download />}
								onClick={exportToCSV}
								disabled={isInnerLoading}
							>
								{TEXTS.export_csv}
							</MUIButton>
							<MUIButton
								variant="outlined"
								startIcon={<Download />}
								onClick={exportToXLSX}
								disabled={isInnerLoading}
							>
								{TEXTS.export_xlsx}
							</MUIButton>
						</Box>
					</Box>

					<TableContainer component={Paper} sx={{ maxHeight: 600, overflow: 'auto' }}>
						<Table stickyHeader sx={{ minWidth: 1200 }} aria-label="visits table">
							<TableHead>
								<TableRow>
									<TableCell sx={{ fontWeight: 'bold', minWidth: 80 }}>{TEXTS.table_visit_id}</TableCell>
									<TableCell sx={{ fontWeight: 'bold', minWidth: 140 }}>{TEXTS.table_created_at}</TableCell>
									<TableCell sx={{ fontWeight: 'bold', minWidth: 200 }}>{TEXTS.table_description}</TableCell>
									<TableCell sx={{ fontWeight: 'bold', minWidth: 100 }}>{TEXTS.table_status}</TableCell>
									<TableCell sx={{ fontWeight: 'bold', minWidth: 120 }}>{TEXTS.table_start_date}</TableCell>
									<TableCell sx={{ fontWeight: 'bold', minWidth: 120 }}>{TEXTS.table_end_date}</TableCell>
									<TableCell sx={{ fontWeight: 'bold', minWidth: 150 }}>{TEXTS.table_interventor}</TableCell>
									<TableCell sx={{ fontWeight: 'bold', minWidth: 100 }}>{TEXTS.table_visitors_count}</TableCell>
									<TableCell sx={{ fontWeight: 'bold', minWidth: 150 }}>{TEXTS.table_approver}</TableCell>
									<TableCell sx={{ fontWeight: 'bold', minWidth: 150 }}>{TEXTS.table_document_verifier}</TableCell>
									<TableCell sx={{ fontWeight: 'bold', minWidth: 130 }}>{TEXTS.table_visitor_first_name}</TableCell>
									<TableCell sx={{ fontWeight: 'bold', minWidth: 130 }}>{TEXTS.table_visitor_middle_name}</TableCell>
									<TableCell sx={{ fontWeight: 'bold', minWidth: 130 }}>{TEXTS.table_visitor_first_last_name}</TableCell>
									<TableCell sx={{ fontWeight: 'bold', minWidth: 130 }}>{TEXTS.table_visitor_second_last_name}</TableCell>
									<TableCell sx={{ fontWeight: 'bold', minWidth: 140 }}>{TEXTS.table_identification_type}</TableCell>
									<TableCell sx={{ fontWeight: 'bold', minWidth: 140 }}>{TEXTS.table_identification_number}</TableCell>
									<TableCell sx={{ fontWeight: 'bold', minWidth: 130 }}>{TEXTS.table_visitor_type}</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{visitsData
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((visit, index) => (
										<TableRow
											key={`${visit.id}-${index}`}
											sx={{ '&:nth-of-type(odd)': { backgroundColor: 'action.hover' } }}
										>
											<TableCell>{visit.id}</TableCell>
											<TableCell>
												{visit.created_at ? dayjs(visit.created_at).format('DD/MM/YYYY HH:mm') : '-'}
											</TableCell>
											<TableCell sx={{ maxWidth: 200, wordBreak: 'break-word' }}>
												{visit.reason || '-'}
											</TableCell>
											<TableCell>{visit.status || '-'}</TableCell>
											<TableCell>
												{visit.start_date ? dayjs(visit.start_date).format('DD/MM/YYYY') : '-'}
											</TableCell>
											<TableCell>
												{visit.end_date ? dayjs(visit.end_date).format('DD/MM/YYYY') : '-'}
											</TableCell>
											<TableCell>{visit.interventor_name || '-'}</TableCell>
											<TableCell align="center">{visit.visitors_count}</TableCell>
											<TableCell>{visit.approver_name || '-'}</TableCell>
											<TableCell>{visit.document_verifier_name || '-'}</TableCell>
											<TableCell>{visit.visitor_first_name || '-'}</TableCell>
											<TableCell>{visit.visitor_middle_name || '-'}</TableCell>
											<TableCell>{visit.visitor_first_last_name || '-'}</TableCell>
											<TableCell>{visit.visitor_second_last_name || '-'}</TableCell>
											<TableCell>{visit.identification_type || '-'}</TableCell>
											<TableCell>{visit.identification_number || '-'}</TableCell>
											<TableCell>{visit.visitor_type || '-'}</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
					</TableContainer>

					<TablePagination
						rowsPerPageOptions={[5, 10, 25, 50, 100]}
						component="div"
						count={visitsData.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
						labelRowsPerPage="Filas por página:"
						labelDisplayedRows={({ from, to, count }) =>
							`${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
						}
						sx={{
							borderTop: 1,
							borderColor: 'divider',
							'& .MuiTablePagination-toolbar': {
								paddingLeft: 2,
								paddingRight: 2,
							}
						}}
					/>
				</Box>
			)}

			{/* No data message */}
			{!isInnerLoading && visitsData.length === 0 && (message || error) && (
				<Box sx={{ marginTop: 4, textAlign: 'center' }}>
					<Typography variant="body1" color="text.secondary">
						{TEXTS.no_data}
					</Typography>
				</Box>
			)}
		</LocalizationProvider>
	);
}
