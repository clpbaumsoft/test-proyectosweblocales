import { Typography, Alert } from "@mui/material";

//Components
import SearchVehicleForm from "@/components/molecules/SearchVehicleForm";
import CardVehicle from "@/components/molecules/CardVehicle";

//Constants
import { GTRANS } from "@/constants/Globals";

//Hooks
import useFormLeaveEmployeeVehicle from "./useFormLeaveEmployeeVehicle";

import useTranslation from "@/hooks/useTranslation";

export default function FormLeaveEmployeeVehicle() {

	const GTEXTS = useTranslation(GTRANS)
	const {
		hasFinished,
		vehicle,
		successMessage,
		errorMessage,
		onSearchVehicle,
		onLoadResult,
		onGiveLeave,
	} = useFormLeaveEmployeeVehicle()

	return (
		<>
			<SearchVehicleForm
				onSearch={onSearchVehicle}
				onResult={onLoadResult}
			/>
			
			{/* Success Message */}
			{successMessage && (
				<Alert severity="success" sx={{ mt: 2 }}>
					{successMessage}
				</Alert>
			)}
			
			{/* Error Message */}
			{errorMessage && (
				<Alert severity="error" sx={{ mt: 2 }}>
					{errorMessage}
				</Alert>
			)}
			
			<hr/>
			{
				vehicle ? (
					<CardVehicle 
						key={`cardVehicleKey${vehicle.id}`}
						vehicle={vehicle}
						onGiveLeave={onGiveLeave}
					/>
				) : (
					hasFinished && <Typography variant="body2">{GTEXTS.no_results}</Typography>
				)
			}
		</>
	)
}
