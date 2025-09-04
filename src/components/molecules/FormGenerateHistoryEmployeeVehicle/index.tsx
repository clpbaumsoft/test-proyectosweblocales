
import React from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from 'dayjs';
import Grid from "@mui/material/Grid2";
import useTranslation from "@/hooks/useTranslation";
import FormMessages from "@/components/atoms/FormMessages";
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
	TextField
} from "@mui/material";
import { Download } from "@mui/icons-material";
import useFormGenerateHistoryEmployeeVehicle from "./useFormGenerateHistoryEmployeeVehicle";

//Texts
const TRANS = {
  title: {
    id: "GenerateHistoryVehicleDashboard.TitlePage.Title",
    defaultMessage: "Historial de Vehículo",
    description: "",
  },
  generateReport: {
    id: "GenerateHistoryVehicleDashboard.generateReport",
    defaultMessage: "Generar Reporte",
    description: "",
  },
	label_plate: {
    id: "GenerateHistoryVehicleDashboard.label_plate",
    defaultMessage: "Placa del Vehículo*",
    description: "",
  },
	label_start_date: {
    id: "GenerateHistoryVehicleDashboard.label_start_date",
    defaultMessage: "Fecha inicial (opcional)",
    description: "",
  },
	label_end_date: {
    id: "GenerateHistoryVehicleDashboard.label_end_date",
    defaultMessage: "Fecha final (opcional)",
    description: "",
  },
	// Table headers
	table_plate: {
    id: "GenerateHistoryVehicleDashboard.Table.Plate",
    defaultMessage: "Placa",
    description: "",
  },
	table_entry_date: {
    id: "GenerateHistoryVehicleDashboard.Table.EntryDate",
    defaultMessage: "Fecha Ingreso",
    description: "",
  },
	table_exit_date: {
    id: "GenerateHistoryVehicleDashboard.Table.ExitDate",
    defaultMessage: "Fecha Salida",
    description: "",
  },
	table_full_name: {
    id: "GenerateHistoryVehicleDashboard.Table.FullName",
    defaultMessage: "Quién dió ingreso",
    description: "",
  },
	table_inspection_points: {
    id: "GenerateHistoryVehicleDashboard.Table.InspectionPoints",
    defaultMessage: "Puntos Inspeccionados",
    description: "",
  },
	table_gate_name: {
    id: "GenerateHistoryVehicleDashboard.Table.GateName",
    defaultMessage: "Portería de Acceso",
    description: "",
  },
	table_observations: {
    id: "GenerateHistoryVehicleDashboard.Table.Observations",
    defaultMessage: "Observaciones",
    description: "",
  },
	no_data: {
    id: "GenerateHistoryVehicleDashboard.Table.NoData",
    defaultMessage: "No hay datos para mostrar",
    description: "",
  },
	export_csv: {
    id: "GenerateHistoryVehicleDashboard.ExportCSV",
    defaultMessage: "Exportar CSV",
    description: "",
  },
	export_xlsx: {
    id: "GenerateHistoryVehicleDashboard.ExportXLSX",
    defaultMessage: "Exportar XLSX",
    description: "",
  },
};

export default function FormGenerateHistoryEmployeeVehicle() {
  const TEXTS = useTranslation(TRANS);

	const {
		// Form controls
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
	} = useFormGenerateHistoryEmployeeVehicle();

	console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 ~ FormGenerateHistoryEmployeeVehicle ~ historyData:", historyData)

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            {/* Field: plate */}
            <Grid size={{ xs: 12, md: 2 }}>
              <TextField
								{...register("plate", { 
									required: true,
									minLength: 3
								})}
								label={TEXTS.label_plate}
								fullWidth
								disabled={isInnerLoading}
								error={!!errors.plate}
								helperText={errors.plate ? "Placa requerida (mín. 3 caracteres)" : ""}
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
								Historial del Vehículo ({historyData.length} registros)
							</Typography>
							<Box sx={{ display: 'flex', gap: 1 }}>
								<Button
									variant="outlined"
									startIcon={<Download />}
									onClick={exportToCSV}
									disabled={isInnerLoading}
								>
									{TEXTS.export_csv}
								</Button>
								<Button
									variant="outlined"
									startIcon={<Download />}
									onClick={exportToXLSX}
									disabled={isInnerLoading}
								>
									{TEXTS.export_xlsx}
								</Button>
							</Box>
						</Box>
						
						<TableContainer component={Paper} sx={{ maxHeight: 600, overflow: 'auto' }}>
							<Table stickyHeader sx={{ minWidth: 1200 }} aria-label="vehicle history table">
								<TableHead>
									<TableRow>
										<TableCell sx={{ fontWeight: 'bold', minWidth: 120 }}>{TEXTS.table_plate}</TableCell>
										<TableCell sx={{ fontWeight: 'bold', minWidth: 150 }}>{TEXTS.table_entry_date}</TableCell>
										<TableCell sx={{ fontWeight: 'bold', minWidth: 150 }}>{TEXTS.table_exit_date}</TableCell>
										<TableCell sx={{ fontWeight: 'bold', minWidth: 150 }}>{TEXTS.table_full_name}</TableCell>
										<TableCell sx={{ fontWeight: 'bold', minWidth: 200 }}>{TEXTS.table_inspection_points}</TableCell>
										<TableCell sx={{ fontWeight: 'bold', minWidth: 150 }}>{TEXTS.table_gate_name}</TableCell>
										<TableCell sx={{ fontWeight: 'bold', minWidth: 250 }}>{TEXTS.table_observations}</TableCell>
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
												<TableCell>{item.plate}</TableCell>
												<TableCell>
													{item.entry_date ? dayjs(item.entry_date).format('DD/MM/YYYY HH:mm') : '-'}
												</TableCell>
												<TableCell>
													{item.exit_date ? dayjs(item.exit_date).format('DD/MM/YYYY HH:mm') : '-'}
												</TableCell>
												<TableCell>{item.full_name}</TableCell>
												<TableCell>{item.inspection_points || '-'}</TableCell>
												<TableCell>{item.gate_name || '-'}</TableCell>
												<TableCell>{item.observations || '-'}</TableCell>
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