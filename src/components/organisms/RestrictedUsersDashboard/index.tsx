import { Heading } from "@/components/atomsv2/Heading";
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
			<Heading level={1} className="mb-8">
				{TEXTS.title}
			</Heading>
			<ControlFormRestrictedUsers />
		</TableVisitsProvider>
	)
}