
import React from "react";
import { Controller } from "react-hook-form";
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
	Alert
} from "@mui/material";
import { Download } from "@mui/icons-material";
import { ErrorMessage } from "@hookform/error-message";
import useFormGenerateHistoryVisitor from "./useFormGenerateHistoryVisitor";
import { IDENTIFICATION_TYPE_CODE_CC } from "@/constants/Globals";
import { TRANS } from "./constants";
import LabelForm from "@/components/atoms/LabelForm";
import Select from "@/components/atoms/Select";
import useLoadIdentificationTypes from "./hooks/useLoadIdentificationTypes";
import InputGroup from "@/components/atoms/InputGroup";
import { customStylesDatePicker } from "@/components/atoms/CustomDatePicker/constants";
import Button from "@/components/atoms/Button";

export default function FormGenerateHistoryVisitor() {
  const TEXTS = useTranslation(TRANS);
	const { identificationTypes } = useLoadIdentificationTypes();

	const {
		// Form controls
		control,
		errors,
		register,
		handleSubmit,
		onSubmit,
		
		// Date controls
		valueStart,
		setValueStart,
		valueEnd,
		setValueEnd,
		
		// Data and state
		isInnerLoading,
		historyData,
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
		getIdByCode,
	} = useFormGenerateHistoryVisitor();
	
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<form onSubmit={handleSubmit(onSubmit)} className="flex items-end gap-4">
				<div className="flex flex-col gap-1">
					<LabelForm label={TEXTS.label_identification_type} />
					<Controller
						name="identification_type"
						control={control}
						rules={{
							required: "Tipo de identificación requerido",
						}}
						render={({ field }) => (
							<Select
								{...field}
								defaultValue={getIdByCode(IDENTIFICATION_TYPE_CODE_CC)}
								options={identificationTypes}
								onChange={(itemValue) => field.onChange(itemValue)}
								disabled={isInnerLoading}
							/>
						)}
					/>
					<ErrorMessage
						errors={errors}
						name="identification_type"
						render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
					/>
				</div>
				<div className="flex flex-col gap-1 relative">
					<LabelForm label={TEXTS.label_identification_number} />
					<InputGroup
						{...register("identification_number", {
							required: true,
							minLength: 3
						})}
						type="number"
						placeholder={TEXTS.label_identification_number}
					/>
					<span className="text-red-500 text-xs absolute top-20">
						{errors.identification_number ? "Número de identificación requerido (mín. 3 caracteres)" : ""}
					</span>
				</div>
				<div className="flex flex-col gap-1">
					<LabelForm label={TEXTS.label_start_date} required={false} />
					<DatePicker
						value={valueStart}
						onChange={(date: Dayjs | null) => {
							setValueStart(date);
						}}
						minDate={dayjs('2020-01-01')}
						disabled={isInnerLoading}
						sx={customStylesDatePicker}
					/>
				</div>
				<div className="flex flex-col gap-1">
					<LabelForm label={TEXTS.label_end_date} required={false} />
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

				{/* ERROR MESSAGE */}
				{(error || message) && (
					<Grid size={{ xs: 12 }}>
						<FormMessages message={message} error={error} />
					</Grid>
				)}
			</form>

			{/* Results Table */}
			{historyData.length > 0 && (
				<Box sx={{ marginTop: 4 }}>
					<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
						<Typography variant="h6">
							Historial del Visitante ({historyData.length} registros)
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
						<Table stickyHeader sx={{ minWidth: 2000 }} aria-label="visitor history table">
							<TableHead>
								<TableRow>
									{/* <TableCell sx={{ fontWeight: 'bold', minWidth: 60 }}>{TEXTS.table_id}</TableCell> */}
									<TableCell sx={{ fontWeight: 'bold', minWidth: 80 }}>{TEXTS.table_identification_type}</TableCell>
									<TableCell sx={{ fontWeight: 'bold', minWidth: 120 }}>{TEXTS.table_identification_number}</TableCell>
									<TableCell sx={{ fontWeight: 'bold', minWidth: 120 }}>{TEXTS.table_first_name}</TableCell>
									<TableCell sx={{ fontWeight: 'bold', minWidth: 120 }}>{TEXTS.table_middle_name}</TableCell>
									<TableCell sx={{ fontWeight: 'bold', minWidth: 120 }}>{TEXTS.table_first_last_name}</TableCell>
									<TableCell sx={{ fontWeight: 'bold', minWidth: 120 }}>{TEXTS.table_second_last_name}</TableCell>
									<TableCell sx={{ fontWeight: 'bold', minWidth: 130 }}>{TEXTS.table_company_entry_date}</TableCell>
									<TableCell sx={{ fontWeight: 'bold', minWidth: 130 }}>{TEXTS.table_company_exit_date}</TableCell>
									<TableCell sx={{ fontWeight: 'bold', minWidth: 130 }}>{TEXTS.table_visit_start_date}</TableCell>
									<TableCell sx={{ fontWeight: 'bold', minWidth: 130 }}>{TEXTS.table_visit_end_date}</TableCell>
									<TableCell sx={{ fontWeight: 'bold', minWidth: 100 }}>{TEXTS.table_eps}</TableCell>
									<TableCell sx={{ fontWeight: 'bold', minWidth: 100 }}>{TEXTS.table_arl}</TableCell>
									<TableCell sx={{ fontWeight: 'bold', minWidth: 100 }}>{TEXTS.table_record_number}</TableCell>
									<TableCell sx={{ fontWeight: 'bold', minWidth: 150 }}>{TEXTS.table_emergency_contact_name}</TableCell>
									<TableCell sx={{ fontWeight: 'bold', minWidth: 130 }}>{TEXTS.table_emergency_contact_phone}</TableCell>
									<TableCell sx={{ fontWeight: 'bold', minWidth: 130 }}>{TEXTS.table_visitor_type}</TableCell>
									<TableCell sx={{ fontWeight: 'bold', minWidth: 150 }}>{TEXTS.table_interventor_name}</TableCell>
									<TableCell sx={{ fontWeight: 'bold', minWidth: 80 }}>{TEXTS.table_visit_id_reference}</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{historyData
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((item, index) => (
										<TableRow
											key={`${item.id}-${index}`}
											sx={{ '&:nth-of-type(odd)': { backgroundColor: 'action.hover' } }}
										>
											<TableCell>{item.identification_type}</TableCell>
											<TableCell>{item.identification_number}</TableCell>
											<TableCell>{item.first_name || '-'}</TableCell>
											<TableCell>{item.middle_name || '-'}</TableCell>
											<TableCell>{item.first_last_name || '-'}</TableCell>
											<TableCell>{item.second_last_name || '-'}</TableCell>
											<TableCell>
												{item.company_entry_date ? dayjs(item.company_entry_date).format('DD/MM/YYYY') : '-'}
											</TableCell>
											<TableCell>
												{item.company_exit_date ? dayjs(item.company_exit_date).format('DD/MM/YYYY') : '-'}
											</TableCell>
											<TableCell>
												{item.visit_start_date ? dayjs(item.visit_start_date).format('DD/MM/YYYY') : '-'}
											</TableCell>
											<TableCell>
												{item.visit_end_date ? dayjs(item.visit_end_date).format('DD/MM/YYYY') : '-'}
											</TableCell>
											<TableCell>{item.eps || '-'}</TableCell>
											<TableCell>{item.arl || '-'}</TableCell>
											<TableCell>{item.record_number || '-'}</TableCell>
											<TableCell>{item.emergency_contact_name || '-'}</TableCell>
											<TableCell>{item.emergency_contact_phone || '-'}</TableCell>
											<TableCell>{item.visitor_type || '-'}</TableCell>
											<TableCell>{item.interventor_name || '-'}</TableCell>
											<TableCell>{item.visit_id_reference}</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
					</TableContainer>

					<TablePagination
						rowsPerPageOptions={[5, 10, 25, 50, 100]}
						component="div"
						count={historyData.length}
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
			{!isInnerLoading && historyData.length === 0 && (message || error) && (
				<Box sx={{ marginTop: 4, textAlign: 'center' }}>
					<Typography variant="body1" color="text.secondary">
						{TEXTS.no_data}
					</Typography>
				</Box>
			)}
		</LocalizationProvider>
	);
}