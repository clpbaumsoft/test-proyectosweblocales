import { useState } from "react";

//Services
import Orchestra from "@/services/Orchestra";

//Interfaces and types
import type { EntryVehicle } from "@/interfaces/Models";

export default function useFormLeaveEmployeeVehicle() {

	const [vehicle, setVehicle] = useState<EntryVehicle | null>(null)
	const [hasFinished, setHasFinished] = useState(false)

	/**
	 * Search for a vehicle by plate number
	 */
	const onSearchVehicle = async (plateNumber: string): Promise<EntryVehicle> => {
		setHasFinished(false)
		setVehicle(null)
		
		const result = await Orchestra.entryVehicleService.searchEmployeeVehicle(plateNumber)
		return result
	}

	/**
	 * Handle search result
	 */
	const onLoadResult = (vehicleData: EntryVehicle) => {
		setVehicle(vehicleData)
		setHasFinished(true)
	}

	/**
	 * Handle give leave action
	 */
	const onGiveLeave = (vehicleData: EntryVehicle) => {
		// TODO: Implementar modal o formulario para dar salida al vehículo
		console.log("Dar salida al vehículo:", vehicleData)
	}

	return {
		vehicle,
		hasFinished,
		onSearchVehicle,
		onLoadResult,
		onGiveLeave,
	}
}
