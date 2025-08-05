import { Typography } from "@mui/material";

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
