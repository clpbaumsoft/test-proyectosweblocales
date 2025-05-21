//React and modules

import {
	Button,
	Dialog,
	DialogContent,
} from "@mui/material";
import CarRentalIcon from "@mui/icons-material/CarRental";

//Components
import GiveEntryVehicleForm from "@/components/molecules/GiveEntryVehicleForm";

//Hooks
import useRowActionsEntryVehicle from "./useRowActionsEntryVehicle";
import useTranslation from "@/hooks/useTranslation";

//Interfaces and types
import { RowActionsEntryProps } from "@/interfaces/Molecules";

//Styles
import { BoxButtons } from "@/styles/elements";

//Texts
const TRANS = {
	add_entry_vehicle: {
		id: "RowActionsEntry.Button.AddEntryVehicle",
		defaultMessage: "Ingresar vehiculo",
		description: "",
	},
}

export default function RowActionsEntryVehicle({ visit, visitor }: RowActionsEntryProps) {

	const TEXTS = useTranslation(TRANS)

	const {
		isOpenModalEntryVehicle,
		toggleModalEntryVehicle,
	} = useRowActionsEntryVehicle()

	return (
		<>
			<BoxButtons>
				<Button 
					variant="outlined" 
					onClick={toggleModalEntryVehicle}
					startIcon={<CarRentalIcon color="success" />}
					color="success"
				>{TEXTS.add_entry_vehicle}</Button>
			</BoxButtons>
			

			{/*  */}
			<Dialog open={isOpenModalEntryVehicle}>
				<DialogContent>
					<GiveEntryVehicleForm 
						visit={visit} 
						visitor={visitor} 
						onClose={toggleModalEntryVehicle}
					/>
				</DialogContent>
			</Dialog>
		</>
	)
}