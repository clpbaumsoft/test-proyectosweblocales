//Components
import EntryControlForm from "@/components/molecules/EntryControlForm";

//Hooks
import useTranslation from "@/hooks/useTranslation";
import TableVisitsProvider from "@/providers/TableVisitsProvider";

//Styles
import { TitlePage } from "@/styles/elements";

//Texts
const TRANS = {
	title: {
		id: "EntryDashboard.TitlePage.Title",
		defaultMessage: "Control de Ingreso",
		description: "",
	},
}
export default function EntryDashboard() {

	const TEXTS = useTranslation(TRANS)

	return (
		<> 
			<TableVisitsProvider>
				<TitlePage>{TEXTS.title}</TitlePage>
				<EntryControlForm />
			</TableVisitsProvider>
		</>
	)
}