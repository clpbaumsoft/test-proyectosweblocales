//Components
import ControlFormRestrictedUsers from "@/components/molecules/ControlFormRestrictedUsers";

//Hooks
import useTranslation from "@/hooks/useTranslation";

//Styles
import { TitlePage } from "@/styles/elements";

//Texts
const TRANS = {
	title: {
		id: "RestrictedUsersDashboard.TitlePage.Title",
		defaultMessage: "Restringir/Habilitar usuarios",
		description: "",
	},
}
export default function RestrictedUsersDashboard() {

	const TEXTS = useTranslation(TRANS)

	return (
		<> 
			<TitlePage>{TEXTS.title}</TitlePage>
			<ControlFormRestrictedUsers />
		</>
	)
}