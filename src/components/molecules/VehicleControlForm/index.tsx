import {
	Box,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";


//Components
import SearchPersonForm from "@/components/molecules/SearchPersonForm";
import VisitRowEntryVehicle from "./components/VisitRowEntryVehicle";
import CardActiveEntryVehicle from "./components/CardActiveEntryVehicle";
import CardVisitorPhoto from "@/components/molecules/EntryControlForm/components/CardVisitorPhoto";

//Constants
import { GTRANS } from "@/constants/Globals";

//Hooks
import useVehicleControlForm from "./useVehicleControlForm";
import useTranslation from "@/hooks/useTranslation";

//Texts
const TRANS = {
	heading_results_for: {
		id: "VehicleControlForm.Typography.H6.HeadingResultSearch",
		defaultMessage: "Resultados para [NAME]",
		description: "",
	},
	label_id: {
		id: "VehicleControlForm.TableCell.ColumnNameId",
		defaultMessage: "Codigo #",
		description: "",
	},
	label_description: {
		id: "VehicleControlForm.TableCell.ColumnNameVisit",
		defaultMessage: "Detalle Visita",
		description: "",
	},
	label_visitor_type: {
		id: "VehicleControlForm.TableCell.ColumnNameVisitorType",
		defaultMessage: "Tipo visitante",
		description: "",
	},
	label_owner: {
		id: "VehicleControlForm.TableCell.ColumnNameOwner",
		defaultMessage: "Interventor",
		description: "",
	},
	label_actions: {
		id: "VehicleControlForm.TableCell.ColumnNameActions",
		defaultMessage: "Acciones",
		description: "",
	},
	give_entry: {
    id: "VehicleControlForm.Button.ActionGiveEntryVehicle",
    defaultMessage: "Ingresar",
    description: "",
  },
}

export default function VehicleControlForm() {

	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)

	const {
		hasFinished,
		visitor,
		onSearchVisitor,
		onLoadResult,
	} = useVehicleControlForm()


	return (
		<>
			<SearchPersonForm
				onSearch={onSearchVisitor}
				onResult={onLoadResult}
			/>
			<hr/>
			{
				
				!visitor ? (
					hasFinished && (
						<Typography>{GTEXTS.no_results}</Typography>
					)
				) : (
					<>
						<Typography variant="h6" sx={{ mb: '10px' }}>{TEXTS.heading_results_for.replace('[NAME]', visitor.fullname)}</Typography>
						<Box>
							<CardVisitorPhoto visitor={visitor} />
							<CardActiveEntryVehicle visitor={visitor} />
						</Box>
						{
							visitor?.visits && visitor?.visits?.length > 0 ? (
								<TableContainer component={Paper}>
									<Table sx={{ minWidth: 650 }} aria-label="simple table">
										<TableHead>
											<TableRow>
												<TableCell align="center"><Typography sx={{ whiteSpace: 'nowrap' }}>{TEXTS.label_id}</Typography></TableCell>
												<TableCell align="left">{TEXTS.label_description}</TableCell>
												<TableCell align="left">{TEXTS.label_visitor_type}</TableCell>
												<TableCell align="center">{TEXTS.label_owner}</TableCell>
												<TableCell align="center">{TEXTS.label_actions}</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
										{
											visitor.visits?.map((visit, index: number) => (
												<VisitRowEntryVehicle 
													key={`visitRowEntryVehicle${index}`} 
													visitor={visitor}
													visit={visit} 
												/>
											))
										}
										</TableBody>
									</Table>
								</TableContainer>
							) : (
								<Typography>{GTEXTS.no_results}</Typography>
							)
						}
					</>
				)
			}
		</>
	)
}