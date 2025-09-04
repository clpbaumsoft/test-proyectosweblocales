import React from "react";
// import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
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
	Typography
} from "@mui/material";
import { Download } from "@mui/icons-material";
import useFormGenerateVisitisReport from "./useFormGenerateVisitisReport";

//Texts
const TRANS = {
  title: {
    id: "GenerateReportsDashboard.TitlePage.Title",
    defaultMessage: "Generar Reportes",
    description: "",
  },
  generateReport: {
    id: "GenerateReportsDashboard.generateReport",
    defaultMessage: "Generar Reporte",
    description: "",
  },
	label_banned_start_time: {
    id: "GenerateReportsDashboard.label_banned_start_time.Search",
    defaultMessage: "Fecha inicial*",
    description: "",
  },
	label_banned_end_time: {
    id: "GenerateReportsDashboard.label_banned_end_time.Search",
    defaultMessage: "Fecha final*",
    description: "",
  },
	// Table headers
	table_visit_id: {
    id: "GenerateReportsDashboard.Table.VisitId",
    defaultMessage: "ID Visita",
    description: "",
  },
	table_created_at: {
    id: "GenerateReportsDashboard.Table.CreatedAt",
    defaultMessage: "Fecha Creación",
    description: "",
  },
	table_description: {
    id: "GenerateReportsDashboard.Table.Description",
    defaultMessage: "Descripción",
    description: "",
  },
	table_status: {
    id: "GenerateReportsDashboard.Table.Status",
    defaultMessage: "Estado",
    description: "",
  },
	table_start_date: {
    id: "GenerateReportsDashboard.Table.StartDate",
    defaultMessage: "Fecha Inicial",
    description: "",
  },
	table_end_date: {
    id: "GenerateReportsDashboard.Table.EndDate",
    defaultMessage: "Fecha Final",
    description: "",
  },
	table_interventor: {
    id: "GenerateReportsDashboard.Table.Interventor",
    defaultMessage: "Interventor",
    description: "",
  },
	table_visitors_count: {
    id: "GenerateReportsDashboard.Table.VisitorsCount",
    defaultMessage: "Cant. Visitantes",
    description: "",
  },
	table_approver: {
    id: "GenerateReportsDashboard.Table.Approver",
    defaultMessage: "Aprobó",
    description: "",
  },
	table_document_verifier: {
    id: "GenerateReportsDashboard.Table.DocumentVerifier",
    defaultMessage: "Verificador Docs",
    description: "",
  },
	table_visitor_first_name: {
    id: "GenerateReportsDashboard.Table.VisitorFirstName",
    defaultMessage: "Primer Nombre",
    description: "",
  },
	table_visitor_middle_name: {
    id: "GenerateReportsDashboard.Table.VisitorMiddleName",
    defaultMessage: "Segundo Nombre",
    description: "",
  },
	table_visitor_first_last_name: {
    id: "GenerateReportsDashboard.Table.VisitorFirstLastName",
    defaultMessage: "Primer Apellido",
    description: "",
  },
	table_visitor_second_last_name: {
    id: "GenerateReportsDashboard.Table.VisitorSecondLastName",
    defaultMessage: "Segundo Apellido",
    description: "",
  },
	table_identification_type: {
    id: "GenerateReportsDashboard.Table.IdentificationType",
    defaultMessage: "Tipo Identificación",
    description: "",
  },
	table_identification_number: {
    id: "GenerateReportsDashboard.Table.IdentificationNumber",
    defaultMessage: "Número Identificación",
    description: "",
  },
	table_visitor_type: {
    id: "GenerateReportsDashboard.Table.VisitorType",
    defaultMessage: "Tipo Visitante",
    description: "",
  },
	no_data: {
    id: "GenerateReportsDashboard.Table.NoData",
    defaultMessage: "No hay datos para mostrar",
    description: "",
  },
	export_csv: {
    id: "GenerateReportsDashboard.ExportCSV",
    defaultMessage: "Exportar CSV",
    description: "",
  },
	export_xlsx: {
    id: "GenerateReportsDashboard.ExportXLSX",
    defaultMessage: "Exportar XLSX",
    description: "",
  },
};

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
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form onSubmit={onSubmit}>
          <Grid container spacing={3}>
            {/* Field: start date */}
            <Grid size={{ xs: 12, md: 2 }}>
              <DatePicker
								label={TEXTS.label_banned_start_time}
                value={valueStart}
                onChange={(date: Dayjs | null) => {
                  setValueStart(date);
                }}
                minDate={dayjs('2022-01-01')}
								disabled={isInnerLoading}
              />
            </Grid>

            {/* Field: end date */}
            <Grid size={{ xs: 12, md: 2 }}>
              <DatePicker
							  label={TEXTS.label_banned_end_time}
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
                sx={{ height: '100%' }}
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
				{visitsData.length > 0 && (
					<Box sx={{ marginTop: 4 }}>
						<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
							<Typography variant="h6">
								Resultados del Reporte ({visitsData.length} registros)
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
    </>
  );
}
