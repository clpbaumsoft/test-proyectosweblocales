
//Components
import SecurityTalkTrainingForm from "@/components/molecules/SecurityTalkTrainingForm";

//Hooks
import useTranslation from "@/hooks/useTranslation";

//Styles
import { TitlePage } from "@/styles/elements";

//Texts
const TRANS = {
	title: {
		id: "SecurityTrainingDashboard.TitlePage.Title",
		defaultMessage: "Charla de Seguridad",
		description: "",
	},
}

export default function SecurityTrainingDashboard() {
	
	const TEXTS = useTranslation(TRANS)
	
	return (
		<>
			<TitlePage>{TEXTS.title}</TitlePage>
			<SecurityTalkTrainingForm />
		</>
	)
}