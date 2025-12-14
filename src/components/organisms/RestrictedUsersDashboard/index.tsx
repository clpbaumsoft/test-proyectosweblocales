import ControlFormRestrictedUsers from "@/components/molecules/ControlFormRestrictedUsers";
import useTranslation from "@/hooks/useTranslation";
import TableVisitsProvider from "@/providers/TableVisitsProvider";

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
		<TableVisitsProvider>
			<h1 className="font-inter text-2xl font-bold mb-8">
				{TEXTS.title}
			</h1>
			<ControlFormRestrictedUsers />
		</TableVisitsProvider>
	)
}