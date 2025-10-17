//React and modules

import {
	Button,
	Dialog,
	DialogContent,
} from "@mui/material";
import KeyIcon from "@mui/icons-material/Key";

//Components
import CreateEntryForm from "../CreateEntryForm";

//Hooks
import useRowActionsEntry from "./useRowActionsEntry";
import useTranslation from "@/hooks/useTranslation";

//Interfaces and types
import { RowActionsEntryProps } from "@/interfaces/Molecules";

//Styles
import { BoxButtons } from "@/styles/elements";

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
			

			{/*  */}
			<Dialog open={isOpenModalEntry} onClose={toggleModalEntry}>
				<DialogContent>
					<CreateEntryForm 
						visit={visit} 
						visitor={visitor} 
						onClose={toggleModalEntry}
					/>
				</DialogContent>
			</Dialog>
		</>
	)
}