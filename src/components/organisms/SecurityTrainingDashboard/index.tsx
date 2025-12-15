import SecurityTalkTrainingForm from "@/components/molecules/SecurityTalkTrainingForm";
import useTranslation from "@/hooks/useTranslation";

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
			<h1 className="font-inter text-2xl font-bold mb-8">
				{TEXTS.title}
			</h1>
			<SecurityTalkTrainingForm />
		</>
	)
}