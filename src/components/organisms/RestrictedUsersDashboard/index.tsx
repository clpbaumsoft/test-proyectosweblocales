//Components
import ControlFormRestrictedUsers from "@/components/molecules/ControlFormRestrictedUsers";

//Hooks
import useTranslation from "@/hooks/useTranslation";
import TableVisitsProvider from "@/providers/TableVisitsProvider";

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
			<TableVisitsProvider>
				<TitlePage>{TEXTS.title}</TitlePage>
				<ControlFormRestrictedUsers />
			</TableVisitsProvider>
		</>
	)
}