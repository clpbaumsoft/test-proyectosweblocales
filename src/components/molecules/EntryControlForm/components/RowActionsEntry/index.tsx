import {
	Button,
} from "@mui/material";
import KeyIcon from "@mui/icons-material/Key";
import CreateEntryForm from "../CreateEntryForm";
import useRowActionsEntry from "./useRowActionsEntry";
import useTranslation from "@/hooks/useTranslation";
import { RowActionsEntryProps } from "@/interfaces/Molecules";
import { BoxButtons } from "@/styles/elements";
import Modal from "@/components/atoms/Dialog";

//Texts
const TRANS = {
	add_entry: {
		id: "RowActionsEntry.Button.AddEntry",
		defaultMessage: "Dar ingreso al visitante",
		description: "",
	},
}

export default function RowActionsEntry({ visit, visitor }: RowActionsEntryProps) {
	const TEXTS = useTranslation(TRANS)

	const {
		isOpenModalEntry,
		toggleModalEntry,
	} = useRowActionsEntry()

	return (
		<>
			<BoxButtons>
				<Button 
					variant="outlined" 
					onClick={toggleModalEntry}
					startIcon={<KeyIcon color="success" />}
					color="success"
				>{TEXTS.add_entry}</Button>
			</BoxButtons>

			<Modal show={isOpenModalEntry} onClose={toggleModalEntry}>
				<CreateEntryForm 
					visit={visit} 
					visitor={visitor} 
					onClose={toggleModalEntry}
				/>
			</Modal>
		</>
	)
}