
import React from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from 'dayjs';
import Grid from "@mui/material/Grid2";
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
	Typography,
} from "@mui/material";
import { Download } from "@mui/icons-material";
import useFormGenerateReportEmployeesWithoutIdCards from "./useFormGenerateReportEmployeesWithoutIdCards";
import { TRANS } from "./constants";
import { customStylesDatePicker } from "@/components/atoms/CustomDatePicker/constants";
import LabelForm from "@/components/atoms/LabelForm";
import Button from "@/components/atoms/Button";

export default function FormGenerateReportEmployeesWithoutIdCards() {
  const TEXTS = useTranslation(TRANS);

	const {
		// Form controls
		handleSubmit,
		onSubmit,
		
		// Date controls
		valueStart,
		setValueStart,
		valueEnd,
		setValueEnd,
		
		// Data and state
		isInnerLoading,
		reportData,
		page,
		rowsPerPage,
		
		// Messages
		message,
		error,
		
		// Functions
		handleChangePage,
		handleChangeRowsPerPage,
		exportToCSV,
		exportToXLSX,
	} = useFormGenerateReportEmployeesWithoutIdCards();

  return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 items-end">
				<div className="flex flex-col gap-1">
					<LabelForm label={TEXTS.label_start_date} />
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
					<LabelForm label={TEXTS.label_end_date} />
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
				<div>
					<Button
						type="submit"
						disabled={isInnerLoading}
						text={TEXTS.generateReport}
					/>
				</div>

				{/* ERROR MESSAGE */}
				{(error || message) && (
					<Grid size={{ xs: 12 }}>
						<FormMessages message={message} error={error} />
					</Grid>
				)}
			</form>

			{/* Results Table */}
			{reportData?.length > 0 && (
				<Box sx={{ marginTop: 4 }}>
					<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
						<Typography variant="h6">
							Reporte de empleados sin carné ({reportData.length} registros)
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
						<Table stickyHeader sx={{ minWidth: 1500 }} aria-label="employee report table">
							<TableHead>
								<TableRow>
									<TableCell sx={{ fontWeight: 'bold', minWidth: 150 }}>{TEXTS.table_identification_type}</TableCell>
									<TableCell sx={{ fontWeight: 'bold', minWidth: 150 }}>{TEXTS.table_identification_number}</TableCell>
									<TableCell sx={{ fontWeight: 'bold', minWidth: 200 }}>{TEXTS.table_full_name}</TableCell>
									<TableCell sx={{ fontWeight: 'bold', minWidth: 180 }}>{TEXTS.table_entry_date}</TableCell>
									<TableCell sx={{ fontWeight: 'bold', minWidth: 180 }}>{TEXTS.table_exit_date}</TableCell>
									<TableCell sx={{ fontWeight: 'bold', minWidth: 120 }}>{TEXTS.table_card_number}</TableCell>
									<TableCell sx={{ fontWeight: 'bold', minWidth: 200 }}>{TEXTS.table_employee_receiver}</TableCell>
									<TableCell sx={{ fontWeight: 'bold', minWidth: 150 }}>{TEXTS.table_company}</TableCell>
									<TableCell sx={{ fontWeight: 'bold', minWidth: 250 }}>{TEXTS.table_observations}</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{reportData
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((item, index) => (
										<TableRow
											key={`${item.id}-${index}`}
											sx={{ '&:nth-of-type(odd)': { backgroundColor: 'action.hover' } }}
										>
											<TableCell>{item.identification_type}</TableCell>
											<TableCell>{item.identification_number}</TableCell>
											<TableCell>{item.full_name}</TableCell>
											<TableCell>
												{item.entry_date ? dayjs(item.entry_date).format('DD/MM/YYYY HH:mm') : '-'}
											</TableCell>
											<TableCell>
												{item.exit_date ? dayjs(item.exit_date).format('DD/MM/YYYY HH:mm') : '-'}
											</TableCell>
											<TableCell>{item.card_number}</TableCell>
											<TableCell>{item.employee_receiver || '-'}</TableCell>
											<TableCell>{item.company}</TableCell>
											<TableCell>{item.observations || '-'}</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
					</TableContainer>

					<TablePagination
						rowsPerPageOptions={[5, 10, 25, 50, 100]}
						component="div"
						count={reportData.length}
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
			{!isInnerLoading && reportData.length === 0 && (message || error) && (
				<Box sx={{ marginTop: 4, textAlign: 'center' }}>
					<Typography variant="body1" color="text.secondary">
						{TEXTS.no_data}
					</Typography>
				</Box>
			)}
		</LocalizationProvider>
  );
}