//React and Modules
import Link from "next/link";

import {
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	CircularProgress,
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

//Components
import BoldLabel from "@/components/atoms/BoldLabel";
import VisitorRow from "./components/VisitorRow";

//Constants
import PAGES from "@/constants/Pages";
import { GTRANS } from "@/constants/Globals";
import { VISITOR_STATUS_CANCELLED } from "@/constants/Visit";

//Lib
import { formatsDate } from "@/lib/Helpers";

//Hooks
import useVisitDashboard from "./useVisitDashboard";
import useTranslation from "@/hooks/useTranslation";

//Interfaces and types
import { VisitDashboardProps } from "@/interfaces/Organisms";

//Providers
import TableVisitsProvider from "@/providers/TableVisitsProvider";

//Styles
import { TitlePage } from "@/styles/elements";

//Texts
const TRANS = {
	title: {
		id: "VisitDashboard.TitlePage.Title",
		defaultMessage: "Panel Visita",
		description: "",
	},
	go_back: {
		id: "VisitDashboard.IconButton.GoBack",
		defaultMessage: "Volver",
		description: "",
	},
	label_reason: {
		id: "VisitDashboard.BoldLabel.Reason",
		defaultMessage: "Motivo:",
		description: "",
	},
	label_start_date: {
		id: "VisitDashboard.BoldLabel.StartDate",
		defaultMessage: "Fecha inicio:",
		description: "",
	},
	label_end_date: {
		id: "VisitDashboard.BoldLabel.EndDate",
		defaultMessage: "Fecha fin:",
		description: "",
	},
	label_cancelled_reason: {
		id: "VisitDashboard.BoldLabel.CancelledReadon",
		defaultMessage: "Motivo cancelación:",
		description: "",
	},
	label_cancelled_at: {
		id: "VisitDashboard.BoldLabel.CancelledAt",
		defaultMessage: "Fecha cancelación:",
		description: "",
	},
	label_cancelled_user: {
		id: "VisitDashboard.BoldLabel.UserCanceller",
		defaultMessage: "Usuario que canceló:",
		description: "",
	},
	title_table_visitors: {
		id: "VisitDashboard.Typography.H5.Visitors",
		defaultMessage: "Visitantes",
		description: "",
	},
	label_visitor_photo: {
		id: "VisitDashboard.TableCell.Photo",
		defaultMessage: "Foto",
		description: "",
	},
	label_visitor_full_name: {
		id: "VisitDashboard.TableCell.Name",
		defaultMessage: "Nombre",
		description: "",
	},
	label_security_training: {
		id: "VisitDashboard.TableCell.SecurityTraining",
		defaultMessage: "Charla de Seguridad",
		description: "",
	},
	label_visitor_type: {
		id: "VisitDashboard.TableCell.VisitorType",
		defaultMessage: "Tipo",
		description: "",
	},
	label_visitor_dni_number: {
		id: "VisitDashboard.TableCell.DniNumber",
		defaultMessage: "Documento",
		description: "",
	},
	label_visitor_actions: {
		id: "VisitDashboard.TableCell.Actions",
		defaultMessage: "Acciones",
		description: "",
	},
	label_care_company: {
		id: "VisitDashboard.BoldLabel.CareCompany",
		defaultMessage: "EPS",
		description: "",
	},
	label_arl_company: {
		id: "VisitDashboard.BoldLabel.ArlCompany",
		defaultMessage: "ARL",
		description: "",
	},
	label_country: {
		id: "VisitDashboard.BoldLabel.Country",
		defaultMessage: "País",
		description: "",
	},
	label_city: {
		id: "VisitDashboard.BoldLabel.City",
		defaultMessage: "Ciudad",
		description: "",
	},
}

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

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					mb: '25px',
				}}
			>
				<Link href={PAGES.home} passHref>
					<IconButton
						edge="start"
						color="primary"
						aria-label={TEXTS.go_back}
						sx={{
							mr: '10px',
						}}
					>
						<HomeIcon />
					</IconButton>
				</Link>
				<TitlePage sx={{ mb: 0 }}>{TEXTS.title}</TitlePage>
			</Box>
			<Card>
				<CardContent>
					<BoldLabel
						label={TEXTS.label_reason}
						value={
							<Typography variant="h6" component="div">
								{visit.reason}
							</Typography>
						}
					/>
					<br/>
					<Grid container spacing={3}>
						<Grid size={{ xs: 12, md: 6 }}>
							<BoldLabel
								label={TEXTS.label_start_date}
								value={formatsDate(visit.start_date)}
							/>
						</Grid>
						<Grid size={{ xs: 12, md: 6 }}>
							<BoldLabel
								label={TEXTS.label_end_date}
								value={formatsDate(visit.end_date)}
							/>
						</Grid>
					</Grid>
					{
						visit.cancelled_at && visit.status === VISITOR_STATUS_CANCELLED && (
							<>
								<br/>
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
						)
					}
				</CardContent>
			</Card>
			<br/>
			<Typography variant="h5">{TEXTS.title_table_visitors}</Typography>
			<TableVisitsProvider>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell align="center">{TEXTS.label_visitor_photo}</TableCell>
								<TableCell align="center">{TEXTS.label_visitor_dni_number}</TableCell>
								<TableCell align="center">{TEXTS.label_visitor_full_name}</TableCell>
								<TableCell align="center">{TEXTS.label_security_training}</TableCell>
								<TableCell align="center">{TEXTS.label_visitor_actions}</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{
								(isInnerLoading || isInnerLoadingFirstTime) ? (
									<TableRow>
										<TableCell colSpan={8} align="center">
											<CircularProgress />
											<Typography>{GTEXTS.loading}...</Typography>
										</TableCell>
									</TableRow>
								) : (
									visitorsRows.length === 0 ? (
										<TableRow>
											<TableCell colSpan={8} align="center">{GTEXTS.no_results}</TableCell>
										</TableRow>
									) : (
										visitorsRows.map((row, index) => (
											<VisitorRow 
												key={`visitorRow${index}`} 
												row={row}
												visitStartDate={visit?.start_date}
												documentTypes={documentTypes}
											/>
										))
									)
								)
							}
						</TableBody>
						{
							(!(isInnerLoading && isInnerLoadingFirstTime) && visitorsRows.length !== 0) && (
								<TableFooter>
									<TableRow>
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
									</TableRow>
								</TableFooter>
							)
						}
					</Table>
				</TableContainer>
			</TableVisitsProvider>
		</>
	)
}