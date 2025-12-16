import {
	Typography,
} from "@mui/material";
import RegisterTalkVisitor from "./components/RegisterTalkVisitor";
import { GTRANS } from "@/constants/Globals";
import useSecurityTalkTrainingForm from "./useSecurityTalkTrainingForm";
import useTranslation from "@/hooks/useTranslation";
import SearchPersonForm from "../SearchPersonForm";
import Divider from "@/components/atoms/Divider";

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

	return (
		<>
			<SearchPersonForm
				onSearch={onSearchVisitor}
				onResult={onLoadResult}
			/>
			<div className="my-8">
				{visitor && <Divider text={`${TEXTS.heading_results} - ${visitor.fullname}`} />}
			</div>
			{visitor && <RegisterTalkVisitor visitor={visitor} />}
			{!visitor && hasFinished && <Typography>{GTEXTS.no_results}</Typography>}
		</>
	)
}