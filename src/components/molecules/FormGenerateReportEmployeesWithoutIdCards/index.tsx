
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
} from "@mui/material";
import { Download } from "@mui/icons-material";
import useFormGenerateReportEmployeesWithoutIdCards from "./useFormGenerateReportEmployeesWithoutIdCards";

//Texts
const TRANS = {
  title: {
    id: "GenerateReportEmployeesWithoutIdCards.TitlePage.Title",
    defaultMessage: "Reporte de Empleados sin Carnés",
    description: "",
  },
  generateReport: {
    id: "GenerateReportEmployeesWithoutIdCards.generateReport",
    defaultMessage: "Generar Reporte",
    description: "",
  },
	label_start_date: {
    id: "GenerateReportEmployeesWithoutIdCards.label_start_date",
    defaultMessage: "Fecha inicial*",
    description: "",
  },
	label_end_date: {
    id: "GenerateReportEmployeesWithoutIdCards.label_end_date",
    defaultMessage: "Fecha final*",
    description: "",
  },
	// Table headers
	table_identification_type: {
    id: "GenerateReportEmployeesWithoutIdCards.Table.IdentificationType",
    defaultMessage: "Tipo de Identificación",
    description: "",
  },
	table_identification_number: {
    id: "GenerateReportEmployeesWithoutIdCards.Table.IdentificationNumber",
    defaultMessage: "Número de Identificación",
    description: "",
  },
	table_full_name: {
    id: "GenerateReportEmployeesWithoutIdCards.Table.FullName",
    defaultMessage: "Nombre Completo",
    description: "",
  },
	table_entry_date: {
    id: "GenerateReportEmployeesWithoutIdCards.Table.EntryDate",
    defaultMessage: "Fecha de Ingreso a la Empresa",
    description: "",
  },
	table_exit_date: {
    id: "GenerateReportEmployeesWithoutIdCards.Table.ExitDate",
    defaultMessage: "Fecha de Salida de la Empresa",
    description: "",
  },
	table_card_number: {
    id: "GenerateReportEmployeesWithoutIdCards.Table.CardNumber",
    defaultMessage: "Número de Ficha",
    description: "",
  },
	table_employee_receiver: {
    id: "GenerateReportEmployeesWithoutIdCards.Table.EmployeeReceiver",
    defaultMessage: "Empleado que Recibe",
    description: "",
  },
	table_company: {
    id: "GenerateReportEmployeesWithoutIdCards.Table.Company",
    defaultMessage: "Empresa",
    description: "",
  },
	table_observations: {
    id: "GenerateReportEmployeesWithoutIdCards.Table.Observations",
    defaultMessage: "Observación",
    description: "",
  },
	no_data: {
    id: "GenerateReportEmployeesWithoutIdCards.Table.NoData",
    defaultMessage: "No hay datos para mostrar",
    description: "",
  },
	export_csv: {
    id: "GenerateReportEmployeesWithoutIdCards.ExportCSV",
    defaultMessage: "Exportar CSV",
    description: "",
  },
	export_xlsx: {
    id: "GenerateReportEmployeesWithoutIdCards.ExportXLSX",
    defaultMessage: "Exportar XLSX",
    description: "",
  },
};

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
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>


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
				{reportData?.length > 0 && (
					<Box sx={{ marginTop: 4 }}>
						<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
							<Typography variant="h6">
								Reporte de empleados sin carné ({reportData.length} registros)
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
    </>
  );
}