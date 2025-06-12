import {
	Typography,
} from "@mui/material";

//Comoponents
import RegisterTalkVisitor from "./components/RegisterTalkVisitor";

//Constants
import { GTRANS } from "@/constants/Globals";

//Hooks
import useSecurityTalkTrainingForm from "./useSecurityTalkTrainingForm";
import useTranslation from "@/hooks/useTranslation";

//Styles
import SearchPersonForm from "../SearchPersonForm";

//Texts
const TRANS = {
	heading_results: {
		id: "SecurityTalkTrainingForm.Typography.H6.HeadingResults",
		defaultMessage: "Registrar Charla de Seguridad",
		description: "",
	},
}

export default function SecurityTalkTrainingForm() {
	
	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)
	
	const {
		visitor,
		hasFinished,
		onLoadResult,
		onSearchVisitor,
	} = useSecurityTalkTrainingForm()
	console.log("✅✅✅✅✅✅✅✅✅✅✅✅✅✅ ~ SecurityTalkTrainingForm ~ visitor SECURITY TALK VIEW:", visitor)

	return (
		<>
			<SearchPersonForm
				onSearch={onSearchVisitor}
				onResult={onLoadResult}
			/>
			<hr/>
			{
				visitor && (
					<>
						<Typography variant="h6" sx={{ mb: '10px' }}>{TEXTS.heading_results} - {visitor.fullname}</Typography>
						<RegisterTalkVisitor 
							visitor={visitor}
						/>
					</>
				)
			}
			{
				!visitor && hasFinished && (
					<Typography>{GTEXTS.no_results}</Typography>
				)
			}
		</>
	)
}