//React and Modules

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
	Select,
	MenuItem,
	Box,
	TextField,
} from "@mui/material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";

//Components
import VisitRow from "./components/VisitRow";
import SkeletonVisitRow from "./components/SkeletonVisitRow";

//Constants
import { GTRANS } from "@/constants/Globals";

//Hooks
import useVisitsDashboard from "./useVisitsDashboard";
import useTranslation from "@/hooks/useTranslation";

//Providers
import TableVisitsProvider from "@/providers/TableVisitsProvider";

//Texts
const TRANS = {
	label_id: {
		id: "VisitsDashboard.TableCell.ID",
		defaultMessage: "Código #",
		description: "",
	},
	label_status: {
		id: "VisitsDashboard.TableCell.Status",
		defaultMessage: "Estado",
		description: "",
	},
	label_description: {
		id: "VisitsDashboard.TableCell.Description",
		defaultMessage: "Detalles",
		description: "",
	},
	label_company: {
		id: "VisitsDashboard.TableCell.Company",
		defaultMessage: "Empresa",
		description: "",
	},
	label_branch: {
		id: "VisitsDashboard.TableCell.Branch",
		defaultMessage: "Sede",
		description: "",
	},
	label_gate: {
		id: "VisitsDashboard.TableCell.Gate",
		defaultMessage: "Portería",
		description: "",
	},
	label_actions: {
		id: "VisitsDashboard.TableCell.Actions",
		defaultMessage: "Acciones",
		description: "",
	},
	option_activated: {
		id: "VisitsDashboard.Select.MenuItem.OptionActivated",
		defaultMessage: "Activas",
		description: "",
	},
	option_cancelled: {
		id: "VisitsDashboard.Select.MenuItem.OptionCancelled",
		defaultMessage: "Canceladas",
		description: "",
	},
	option_expired: {
		id: "VisitsDashboard.Select.MenuItem.OptionExpired",
		defaultMessage: "Expiradas",
		description: "",
	},
	label_visit_id: {
		id: "VisitsDashboard.Label.VisitId",
		defaultMessage: "Filtrar por código de Visita",
		description: "",
	},
}

export default function VisitsDashboard() {
	
	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)

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

	return (
		<>
			<TableVisitsProvider>
				<Box sx={{ mb: '10px', display: 'flex', gap: 2, alignItems: 'center' }}>
					<Select 
						value={filter}
						disabled={isInnerLoading || isInnerLoadingFirstTime}
						onChange={onChangeFilter}
						size="small"
					>
						<MenuItem value="activated">{TEXTS.option_activated}</MenuItem>
						<MenuItem value="cancelled">{TEXTS.option_cancelled}</MenuItem>
						<MenuItem value="expired">{TEXTS.option_expired}</MenuItem>
					</Select>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
						<TextField
							variant="outlined"
							type="number"
							label={TEXTS.label_visit_id}
							value={visitIdFilter}
							onChange={onChangeVisitIdFilter}
							disabled={isInnerLoading || isInnerLoadingFirstTime}
							size="small"
							placeholder="Ej: 129"
							// helperText="Busca en todas las visitas"
							sx={{ width: { sx: '180px' , md: '240px' } }}
						/>
					</Box>
				</Box>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell align="center"><Typography sx={{ whiteSpace: 'nowrap' }}>{TEXTS.label_id}</Typography></TableCell>
								<TableCell align="center">{TEXTS.label_status}</TableCell>
								<TableCell align="center">{TEXTS.label_description}</TableCell>
								<TableCell align="center">{TEXTS.label_company}</TableCell>
								<TableCell align="center">{TEXTS.label_branch}</TableCell>
								<TableCell align="center">{TEXTS.label_gate}</TableCell>
								<TableCell align="center">{TEXTS.label_actions}</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{
								(isInnerLoading || isInnerLoadingFirstTime) ? (
									<TableRow>
										<TableCell colSpan={7} align="center">
											<CircularProgress />
											<Typography>{GTEXTS.loading}...</Typography>
										</TableCell>
									</TableRow>
								) : (
									visitsRows.length === 0 ? (
										isLoadingNewVisit ? (
											<SkeletonVisitRow />
										) : (
											<TableRow>
												<TableCell colSpan={7} align="center">{GTEXTS.no_results}</TableCell>
											</TableRow>
										)
									) : (
										<>
											{
												visitsRows.map((row) => (
													<VisitRow key={`visitRow-${row.id}`} row={row} />
												))
											}
											{
												isLoadingNewVisit && (
													<SkeletonVisitRow />
												)
											}
										</>
									)
								)
							}
						</TableBody>
						{
							(!(isInnerLoading || isInnerLoadingFirstTime) && visitsRows.length !== 0) && (
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