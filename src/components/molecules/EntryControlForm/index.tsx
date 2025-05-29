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
import CardActiveEntry from "./components/CardActiveEntry";
import CardActiveEntryVehicle from "@/components/molecules/VehicleControlForm/components/CardActiveEntryVehicle";
import CardVisitorPhoto from "./components/CardVisitorPhoto";
import SearchPersonForm from "@/components/molecules/SearchPersonForm";
import VisitRowEntry from "./components/VisitRowEntry";

//Constants
import { GTRANS } from "@/constants/Globals";

//Hooks
import useEntryControlForm from "./useEntryControlForm";
import useTranslation from "@/hooks/useTranslation";
import CardActiveEntryInOtherBranch from "./components/CardActiveEntryInOtherBranch";
import { AccordeonHistoryVisits } from "./components/AccordeonHistoryVisits";

//Texts
const TRANS = {
	heading_results_for: {
		id: "EntryControlForm.Typography.H6.HeadingResultSearch",
		defaultMessage: "Resultados para [NAME]",
		description: "",
	},
	label_id: {
		id: "EntryControlForm.TableCell.ColumnNameId",
		defaultMessage: "Codigo #",
		description: "",
	},
	label_description: {
		id: "EntryControlForm.TableCell.ColumnNameVisit",
		defaultMessage: "Detalle Visita",
		description: "",
	},
	label_owner: {
		id: "EntryControlForm.TableCell.ColumnNameOwner",
		defaultMessage: "Interventor",
		description: "",
	},
	label_actions: {
		id: "EntryControlForm.TableCell.ColumnNameActions",
		defaultMessage: "Acciones",
		description: "",
	},
	no_results_visits: {
		id: "EntryControlForm.Typography.NoResultsVisits",
		defaultMessage: "Visitante no tiene visitas programadas.",
		description: "",
	},
}

export default function EntryControlForm() {
	
	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)

	const {
		hasFinished,
		visitor,
		onLoadResult,
		onSearchVisitor,
	} = useEntryControlForm()
		// console.log("✅✅✅✅✅✅✅✅✅✅✅✅✅✅ ~ EntryControlForm ~ visitor:", visitor)

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
							<CardActiveEntry visitor={visitor} />
							<CardActiveEntryInOtherBranch visitor={visitor} />
							<AccordeonHistoryVisits visitor={visitor}/>
							<CardActiveEntryVehicle visitor={visitor} />

						</Box>
						{
							visitor.visits && visitor.visits.length > 0 ? (
								<TableContainer component={Paper}>
									<Table sx={{ minWidth: 650 }} aria-label="simple table">
										<TableHead>
											<TableRow>
												<TableCell align="center"><Typography sx={{ whiteSpace: 'nowrap' }}>{TEXTS.label_id}</Typography></TableCell>
												<TableCell align="left">{TEXTS.label_description}</TableCell>
												<TableCell align="center">{TEXTS.label_owner}</TableCell>
												<TableCell align="center">{TEXTS.label_actions}</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
										{
											visitor.visits?.map((visit, index: number) => (
												<VisitRowEntry 
													key={`visitRowEntry${index}`} 
													visitor={visitor}
													visit={visit} 
												/>
											))
										}
										</TableBody>
									</Table>
								</TableContainer>
							) : (
								<Typography>{TEXTS.no_results_visits}</Typography>
							)
						}
					</>
				)
			}
		</>
	)
}