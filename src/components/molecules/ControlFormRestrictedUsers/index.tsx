import {
	Box,
	Typography,
} from "@mui/material";

//Components
import CardVisitorPhoto from "./components/CardVisitorPhoto";
import SearchPersonForm from "@/components/molecules/SearchPersonForm";

//Constants
import { GTRANS } from "@/constants/Globals";

//Hooks

import useTranslation from "@/hooks/useTranslation";
import useControlFormRestrictedUsers from "./useControlFormRestrictedUsers";

//Texts
const TRANS = {
	heading_results_for: {
		id: "ControlFormRestrictedUsers.Typography.H6.HeadingResultSearch",
		defaultMessage: "Resultados para [NAME]",
		description: "",
	},
	label_id: {
		id: "ControlFormRestrictedUsers.TableCell.ColumnNameId",
		defaultMessage: "Codigo #",
		description: "",
	},
	label_description: {
		id: "ControlFormRestrictedUsers.TableCell.ColumnNameVisit",
		defaultMessage: "Detalle Visita",
		description: "",
	},
	label_owner: {
		id: "ControlFormRestrictedUsers.TableCell.ColumnNameOwner",
		defaultMessage: "Interventor",
		description: "",
	},
	label_actions: {
		id: "ControlFormRestrictedUsers.TableCell.ColumnNameActions",
		defaultMessage: "Acciones",
		description: "",
	},
	no_results_visits: {
		id: "ControlFormRestrictedUsers.Typography.NoResultsVisits",
		defaultMessage: "Visitante no tiene visitas programadas.",
		description: "",
	},
}

export default function ControlFormRestrictedUsers() {
	
	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)

	const {
		hasFinished,
		visitor,
		onLoadResult,
		onSearchVisitor,
	} = useControlFormRestrictedUsers()
		console.log("✅✅✅✅✅✅✅✅✅✅✅✅✅✅ ~ ControlFormRestrictedUsers ~ visitor:", visitor)

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
						</Box>
					</>
				)
			}
		</>
	)
}