import { Heading } from "@/components/atomsv2/Heading";
import SecurityTalkTrainingForm from "@/components/molecules/SecurityTalkTrainingForm";
import useTranslation from "@/hooks/useTranslation";
import { Fragment } from "react";

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
		<Fragment>
			<Heading level={1} className="mb-8">
				{TEXTS.title}
			</Heading>
			<SecurityTalkTrainingForm />
		</Fragment>
	)
}