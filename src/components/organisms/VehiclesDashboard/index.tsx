//Components
import VehicleControlForm from "@/components/molecules/VehicleControlForm";

//Hooks
import useTranslation from "@/hooks/useTranslation";

//Styles
import { TitlePage } from "@/styles/elements";

//Texts
const TRANS = {
	title: {
		id: "VehiclesDashboard.TitlePage.Title",
		defaultMessage: "Control de Ingreso Vehicular",
		description: "",
	},
}
export default function VehiclesDashboard() {

	const TEXTS = useTranslation(TRANS)

	return (
		<>
			<TitlePage>{TEXTS.title}</TitlePage>
			<VehicleControlForm />
		</>
	)
}