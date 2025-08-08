import { useState } from "react";

//Services
import Orchestra from "@/services/Orchestra";

//Interfaces and types
import type { EntryVehicle } from "@/interfaces/Models";

//Hooks
import useFormMessages from "@/hooks/useFormMessages";

export default function useFormLeaveEmployeeVehicle() {

	const [vehicle, setVehicle] = useState<EntryVehicle | null>(null)
	const [hasFinished, setHasFinished] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	
	const [successMessage, errorMessage, setSuccessMessage, setErrorMessage, hideMessages] = useFormMessages()

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

	const onGiveLeave = async (vehicleData: EntryVehicle) => {
		try {
			setIsLoading(true)
			hideMessages()
			
			await Orchestra.entryVehicleService.leaveEmployeeVehicle(vehicleData.id)
			
			setSuccessMessage('Salida del vehículo registrada exitosamente')
			
			setVehicle(null)
			setHasFinished(false)	
			hideMessages(3000)
			
		} catch (error) {
			console.error("Error al dar salida al vehículo:", error)
			setErrorMessage('Error al registrar la salida del vehículo')
		} finally {
			setIsLoading(false)
		}
	}

	const onGiveLeaveWithData = async (vehicleData: EntryVehicle) => {
		try {
			setIsLoading(true)
			hideMessages()
			
			await Orchestra.entryVehicleService.leaveEmployeeVehicle(vehicleData.id)
			
			setSuccessMessage('Salida del vehículo registrada exitosamente')
			setVehicle(null)
			setHasFinished(false)
			hideMessages(3000)
			
		} catch (error) {
			console.error("Error al dar salida al vehículo:", error)
			setErrorMessage('Error al registrar la salida del vehículo')
		} finally {
			setIsLoading(false)
		}
	}

	return {
		vehicle,
		hasFinished,
		isLoading,
		successMessage,
		errorMessage,
		onSearchVehicle,
		onLoadResult,
		onGiveLeave,
		onGiveLeaveWithData,
	}
}
