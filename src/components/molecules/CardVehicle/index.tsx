import {
	Button,
	Card,
	CardContent,
	Typography,
} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

//Components
import BoldLabel from "@/components/atoms/BoldLabel";

//Interfaces and types
import { CardVehicleProps } from "@/interfaces/Molecules";

//Hooks
import useTranslation from "@/hooks/useTranslation";

//Styles
import { BoxButtonsForm } from "@/styles/elements";

//Texts
const TRANS = {
	label_vehicle_plate: {
		id: "CardVehicle.BoldLabel.VehiclePlate",
		defaultMessage: "Placa:",
		description: "",
	},
	label_vehicle_type: {
		id: "CardVehicle.BoldLabel.VehicleType",
		defaultMessage: "Tipo de vehículo:",
		description: "",
	},
	label_entry_date: {
		id: "CardVehicle.BoldLabel.EntryDate",
		defaultMessage: "Fecha de ingreso:",
		description: "",
	},
	label_entry_comments: {
		id: "CardVehicle.BoldLabel.EntryComments",
		defaultMessage: "Comentarios de ingreso:",
		description: "",
	},
	label_gate: {
		id: "CardVehicle.BoldLabel.Gate",
		defaultMessage: "Portón:",
		description: "",
	},
	give_leave: {
		id: "CardVehicle.Button.GiveLeave",
		defaultMessage: "Dar salida",
		description: "",
	},
	vehicle_found: {
		id: "CardVehicle.Typography.VehicleFound",
		defaultMessage: "Vehículo encontrado",
		description: "",
	},
}

export default function CardVehicle({ vehicle, onGiveLeave }: CardVehicleProps) {

	const TEXTS = useTranslation(TRANS)

	const formatDate = (dateString: string) => {
		try {
			return new Date(dateString).toLocaleString('es-CO', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit',
			})
		} catch {
			return dateString
		}
	}

	return (
		<Card sx={{ mt: 2, mb: 2 }}>
			<CardContent>
				<Typography variant="h6" color="primary" gutterBottom>
					<DirectionsCarIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
					{TEXTS.vehicle_found}
				</Typography>
				
				<BoldLabel label={TEXTS.label_vehicle_plate} value={vehicle.number} />
				<BoldLabel 
					label={TEXTS.label_vehicle_type} 
					value={vehicle.vehicle_type?.description || 'N/A'} 
				/>
				<BoldLabel 
					label={TEXTS.label_entry_date} 
					value={formatDate(vehicle.creator_date)} 
				/>
				<BoldLabel 
					label={TEXTS.label_gate} 
					value={vehicle.gate?.description || 'N/A'} 
				/>
				<BoldLabel 
					label={TEXTS.label_entry_comments} 
					value={vehicle.comments_entry || 'N/A'} 
				/>

				<BoxButtonsForm>
					<Button
						variant="contained"
						color="error"
						startIcon={<ExitToAppIcon />}
						onClick={() => onGiveLeave(vehicle)}
						fullWidth
					>
						{TEXTS.give_leave}
					</Button>
				</BoxButtonsForm>
			</CardContent>
		</Card>
	)
}
