import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

//Constants
import { GTRANS } from "@/constants/Globals";

//Errors
import AuthError from "@/errors/AuthError";
import LocalError from "@/errors/LocalError";
import ValidationError from "@/errors/ValidationError";

//Hooks
import useFormMessages from "@/hooks/useFormMessages";
import useSessionProviderHook from "@/providers/SessionProvider/hooks";
import useTranslation from "@/hooks/useTranslation";

//Interfaces and types
import { GiveEntryVehicleFormEmployeeType } from "@/interfaces/Forms";
import { EntryVehicle} from "@/interfaces/Models";

//Services
import Orchestra from "@/services/Orchestra";

//Texts
const TRANS = {
	success_entry_vehicle: {
		id: "GiveEntryVehicleFormEmployee.SuccessMessage.CreateEntryVehicleSuccessfully",
		defaultMessage: "Entrada realizada exitosamente.",
		description: "",
	},
}

export default function useGiveEntryVehicleFormEmployee(onSuccessEntryVehicle?: (entryVehicle: EntryVehicle) => void) {

	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)

	const {
		openModalLoginForm,
	} = useSessionProviderHook()
	
	const {
		control,
		formState: { errors },
		reset,
		register,
		handleSubmit,
	} = useForm<GiveEntryVehicleFormEmployeeType>({ defaultValues: {
		number: "",
		vehicle_type: "",
		gate: "",
		vehicle_inspect_points: [],
		entry_comments: "",
	}})

	const [okMessage, errorMessage, changeOkMessage, changeErrorMessage, hideMessages] = useFormMessages()
	const [isInnerLoading, setIsInnerLoading] = useState(false)

	/**
	 * Submits the data to give entry of a vehicle.
	 */
	const onSubmit = async (data: GiveEntryVehicleFormEmployeeType) => {
		try {
			if(isInnerLoading) {
				return
			}
			setIsInnerLoading(true)
			hideMessages()
			if(data) {
				const entryVehicle = await Orchestra.entryVehicleService.giveEmployeeEntryVehicle(data)
				changeOkMessage(TEXTS.success_entry_vehicle)
				if(onSuccessEntryVehicle) {
					onSuccessEntryVehicle(entryVehicle)
				}
				reset()
				setIsInnerLoading(false)
			}
		} catch(catchError) {
			setIsInnerLoading(false)
			if(catchError instanceof AuthError) {
				return openModalLoginForm()
			}
			if(catchError instanceof LocalError || catchError instanceof ValidationError) {
				changeErrorMessage(catchError.message)
			} else {
				changeErrorMessage(GTEXTS.error_something_went_wrong)
			}
		}
	}
	
	/**
	 * Loads the vehicle types.
	 */
	const loadVehicleTypes = useCallback(async () => {
		const results = await Orchestra.vehicleTypeService.all()
		return results.map((vehicleType) => ({ label: vehicleType.description, value: vehicleType.id }))
	}, [])

	/**
	 * Loads the vehicle inspect points.
	 */
	const loadVehicleInspectPoints = useCallback(async () => {
		const results = await Orchestra.vehicleInspectPointService.all()
		return results.map((vehicleInspectPoint) => ({ label: vehicleInspectPoint.description, value: vehicleInspectPoint.id }))
	}, [])

	/**
	 * Loads the gates.
	 */
	const loadGates = useCallback(async () => {
		const results = await Orchestra.gateService.all()
		return results.map((gate) => {
			return ({ label: `${gate.description} - ${gate?.branch?.company?.short_description || ""}`, value: gate.id })
		})
	}, [])
		
	return {
		isInnerLoading,
		message: okMessage,
		error: errorMessage,
		errors,
		control,
		register,
		handleSubmit,
		onSubmit,
		loadVehicleTypes,
		loadVehicleInspectPoints,
		loadGates,
	}
}