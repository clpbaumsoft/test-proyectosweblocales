
import React from "react";
import { Controller } from "react-hook-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from 'dayjs';
import Grid from "@mui/material/Grid2";
import useTranslation from "@/hooks/useTranslation";
import FormMessages from "@/components/atoms/FormMessages";
import DropdownLoadedItems from "@/components/atoms/DropdownLoadedItems";
import { 
	Box, 
	Button,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	Paper,
	CircularProgress,
	Typography,
	TextField,
	FormControl,
	InputLabel,
	Alert
} from "@mui/material";
import { Download } from "@mui/icons-material";
import { ErrorMessage } from "@hookform/error-message";
import useFormGenerateHistoryVisitor from "./useFormGenerateHistoryVisitor";

//Constants
import { IDENTIFICATION_TYPE_CODE_CC } from "@/constants/Globals";

//Texts
const TRANS = {
  title: {
    id: "GenerateHistoryVisitorDashboard.TitlePage.Title",
    defaultMessage: "Historial de Visitante",
    description: "",
  },
  generateReport: {
    id: "GenerateHistoryVisitorDashboard.generateReport",
    defaultMessage: "Generar Historial",
    description: "",
  },
	label_identification_type: {
    id: "GenerateHistoryVisitorDashboard.label_identification_type",
    defaultMessage: "Tipo de Identificación*",
    description: "",
  },
	label_identification_number: {
    id: "GenerateHistoryVisitorDashboard.label_identification_number",
    defaultMessage: "Número de Identificación*",
    description: "",
  },
	label_start_date: {
    id: "GenerateHistoryVisitorDashboard.label_start_date",
    defaultMessage: "Fecha inicial (opcional)",
    description: "",
  },
	label_end_date: {
    id: "GenerateHistoryVisitorDashboard.label_end_date",
    defaultMessage: "Fecha final (opcional)",
    description: "",
  },
	// Table headers
	table_id: {
    id: "GenerateHistoryVisitorDashboard.Table.Id",
    defaultMessage: "ID",
    description: "",
  },
	table_identification_type: {
    id: "GenerateHistoryVisitorDashboard.Table.IdentificationType",
    defaultMessage: "Tipo de identificación",
    description: "",
  },
	table_identification_number: {
    id: "GenerateHistoryVisitorDashboard.Table.IdentificationNumber",
    defaultMessage: "Número de identificación",
    description: "",
  },
	table_first_name: {
    id: "GenerateHistoryVisitorDashboard.Table.FirstName",
    defaultMessage: "Primer Nombre",
    description: "",
  },
	table_middle_name: {
    id: "GenerateHistoryVisitorDashboard.Table.MiddleName",
    defaultMessage: "Segundo Nombre",
    description: "",
  },
	table_first_last_name: {
    id: "GenerateHistoryVisitorDashboard.Table.FirstLastName",
    defaultMessage: "Primer Apellido",
    description: "",
  },
	table_second_last_name: {
    id: "GenerateHistoryVisitorDashboard.Table.SecondLastName",
    defaultMessage: "Segundo Apellido",
    description: "",
  },
	table_company_entry_date: {
    id: "GenerateHistoryVisitorDashboard.Table.CompanyEntryDate",
    defaultMessage: "Fecha Entrada",
    description: "",
  },
	table_company_exit_date: {
    id: "GenerateHistoryVisitorDashboard.Table.CompanyExitDate",
    defaultMessage: "Fecha Salida",
    description: "",
  },
	table_visit_start_date: {
    id: "GenerateHistoryVisitorDashboard.Table.VisitStartDate",
    defaultMessage: "Inicio Programado",
    description: "",
  },
	table_visit_end_date: {
    id: "GenerateHistoryVisitorDashboard.Table.VisitEndDate",
    defaultMessage: "Fin Programado",
    description: "",
  },
	table_eps: {
    id: "GenerateHistoryVisitorDashboard.Table.Eps",
    defaultMessage: "EPS",
    description: "",
  },
	table_arl: {
    id: "GenerateHistoryVisitorDashboard.Table.Arl",
    defaultMessage: "ARL",
    description: "",
  },
	table_record_number: {
    id: "GenerateHistoryVisitorDashboard.Table.RecordNumber",
    defaultMessage: "Número de ficha",
    description: "",
  },
	table_emergency_contact_name: {
    id: "GenerateHistoryVisitorDashboard.Table.EmergencyContactName",
    defaultMessage: "Contacto Emergencia",
    description: "",
  },
	table_emergency_contact_phone: {
    id: "GenerateHistoryVisitorDashboard.Table.EmergencyContactPhone",
    defaultMessage: "Tel. Emergencia",
    description: "",
  },
	table_visitor_type: {
    id: "GenerateHistoryVisitorDashboard.Table.VisitorType",
    defaultMessage: "Tipo Visitante",
    description: "",
  },
	table_interventor_name: {
    id: "GenerateHistoryVisitorDashboard.Table.InterventorName",
    defaultMessage: "Interventor",
    description: "",
  },
	table_visit_id_reference: {
    id: "GenerateHistoryVisitorDashboard.Table.VisitIdReference",
    defaultMessage: "ID Visita",
    description: "",
  },
	no_data: {
    id: "GenerateHistoryVisitorDashboard.Table.NoData",
    defaultMessage: "No hay datos para mostrar",
    description: "",
  },
	export_csv: {
    id: "GenerateHistoryVisitorDashboard.ExportCSV",
    defaultMessage: "Exportar CSV",
    description: "",
  },
};

export default function FormGenerateHistoryVisitor() {
  const TEXTS = useTranslation(TRANS);

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
		loadIdentificationTypes,
		getIdByCode,
	} = useFormGenerateHistoryVisitor();

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            {/* Field: identification type */}
            <Grid size={{ xs: 12, md: 3 }}>
							<FormControl fullWidth>
								<InputLabel>{TEXTS.label_identification_type}</InputLabel>
								<Controller
									name="identification_type"
									control={control}
									rules={{
										required: "Tipo de identificación requerido",
									}}
									render={({ field }) => (
										<DropdownLoadedItems
											fetchItems={loadIdentificationTypes} 
											onChangeValue={(itemValue) => {
												console.log("🚀 ~ itemValue:", itemValue)
												return field.onChange(itemValue ? itemValue.label : itemValue)
											}}
											defaultValue={getIdByCode(IDENTIFICATION_TYPE_CODE_CC)} 
											selectProps={{
												label: TEXTS.label_identification_type,
												sx: { width: '100%' },
												displayEmpty: false,
												disabled: isInnerLoading,
												error: !!errors.identification_type,
											}}
											skeletonProps={{
												height: '55px',
												sx: { width: '100%' },
											}}
										/>
									)}
								/>
								<ErrorMessage
									errors={errors}
									name="identification_type"
									render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
								/>
							</FormControl>
            </Grid>

            {/* Field: identification number */}
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
								{...register("identification_number", { 
									required: true,
									minLength: 3
								})}
								label={TEXTS.label_identification_number}
								fullWidth
								disabled={isInnerLoading}
								error={!!errors.identification_number}
								helperText={errors.identification_number ? "Número de identificación requerido (mín. 3 caracteres)" : ""}
							/>
            </Grid>

            {/* Field: start date */}
            <Grid size={{ xs: 12, md: 2 }}>
              <DatePicker
								label={TEXTS.label_start_date}
                value={valueStart}
                onChange={(date: Dayjs | null) => {
                  setValueStart(date);
                }}
                minDate={dayjs('2020-01-01')}
								disabled={isInnerLoading}
              />
            </Grid>

            {/* Field: end date */}
            <Grid size={{ xs: 12, md: 2 }}>
              <DatePicker
							  label={TEXTS.label_end_date}
                value={valueEnd}
                onChange={(date: Dayjs | null) => {
                  setValueEnd(date);
                }}
								disabled={isInnerLoading}
              />
            </Grid>

						{/* Generate Report Button */}
						<Grid size={{ xs: 12, md: 2 }}>
              <Button
                type="submit"
                variant="contained"
								disabled={isInnerLoading}
								startIcon={isInnerLoading ? <CircularProgress size={20} /> : null}
								fullWidth
								sx={{ height: 56 }} // Match height with other form fields
              >
                {TEXTS.generateReport}
              </Button>
						</Grid>

            {/* ERROR MESSAGE */}
            {(error || message) && (
              <Grid size={{ xs: 12 }}>
                <FormMessages message={message} error={error} />
              </Grid>
            )}
          </Grid>
        </form>

				{/* Results Table */}
				{historyData.length > 0 && (
					<Box sx={{ marginTop: 4 }}>
						<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
							<Typography variant="h6">
								Historial del Visitante ({historyData.length} registros)
							</Typography>
							<Button
								variant="outlined"
								startIcon={<Download />}
								onClick={exportToCSV}
								disabled={isInnerLoading}
							>
								{TEXTS.export_csv}
							</Button>
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
    </>
  );
}