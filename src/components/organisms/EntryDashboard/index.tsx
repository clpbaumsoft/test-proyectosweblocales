import EntryControlForm from "@/components/molecules/EntryControlForm";
import useTranslation from "@/hooks/useTranslation";
import TableVisitsProvider from "@/providers/TableVisitsProvider";

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
		<TableVisitsProvider>
			<h1 className="font-inter text-2xl font-bold mb-8 dark:text-white">
				{TEXTS.title}
			</h1>
			<EntryControlForm />
		</TableVisitsProvider>
	)
}