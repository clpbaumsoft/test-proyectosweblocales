import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

//Constants
import { GTRANS } from "@/constants/Globals";

//Errors
import AuthError from "@/errors/AuthError";
import LocalError from "@/errors/LocalError";
import ValidationError from "@/errors/ValidationError";

//Events
import EntryControlEvents from "@/events/EntryControlEvents";

//Hooks
import useFormMessages from "@/hooks/useFormMessages";
import useSessionProviderHook from "@/providers/SessionProvider/hooks";
import useTranslation from "@/hooks/useTranslation";

//Interfaces and types
import { GiveEntryVehicleFormType } from "@/interfaces/Forms";
import { EntryVehicle, Visit, Visitor } from "@/interfaces/Models";

//Services
import Orchestra from "@/services/Orchestra";

//Texts
const TRANS = {
	success_entry_vehicle: {
		id: "GiveEntryVehicleForm.SuccessMessage.CreateEntryVehicleSuccessfully",
		defaultMessage: "Entrada realizada exitosamente.",
		description: "",
	},
	rejection_entry_vehicle: {
		id: "GiveEntryVehicleForm.SuccessMessage.NOCreateEntryVehicleSuccessfully",
		defaultMessage: "Rechazo vehicular exitoso.",
		description: "",
	},
}

export default function useGiveEntryVehicleForm(visitor: Visitor, visit: Visit, isEmployee: boolean, onSuccessEntryVehicle?: (entryVehicle: EntryVehicle) => void) {

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
	} = useForm<GiveEntryVehicleFormType>({ defaultValues: {
		number: "",
		vehicle_type: "",
		gate: "",
		vehicle_inspect_points: [],
		entry_comments: "",
		allowed: true,
	}})

	const [okMessage, errorMessage, changeOkMessage, changeErrorMessage, hideMessages] = useFormMessages()
	const [isInnerLoading, setIsInnerLoading] = useState(false)

	/**
	 * Submits the data to give entry of a vehicle.
	 */
	const onSubmit = async (data: GiveEntryVehicleFormType) => {
		try {
			if(isInnerLoading) {
				return
			}
			setIsInnerLoading(true)
			hideMessages()

			if(visitor) {
				
				const entryVehicle = await Orchestra.entryVehicleService.give(visit.id, visitor.id, data)
				const copyVisitor = { ...visitor }
				copyVisitor.active_entry_vehicle = { ...entryVehicle }
				EntryControlEvents.updateVisitor.emit('update_visitor', copyVisitor)
				
				// Show different message based on allowed status
				const successMessage = data.allowed === false ? TEXTS.rejection_entry_vehicle : TEXTS.success_entry_vehicle
				changeOkMessage(successMessage)
				
				if(onSuccessEntryVehicle) {
					onSuccessEntryVehicle(entryVehicle)
				}
				reset()
				setIsInnerLoading(false)
			}

			else if(isEmployee) {
				const entryVehicle = await Orchestra.entryVehicleService.giveEmployeeEntryVehicle(data)
				
				// Show different message based on allowed status
				const successMessage = data.allowed === false ? TEXTS.rejection_entry_vehicle : TEXTS.success_entry_vehicle
				changeOkMessage(successMessage)
				
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
	 * Handles the approve button click (allowed: true).
	 */
	const handleApprove = handleSubmit(async (data: GiveEntryVehicleFormType) => {
		const dataWithAllowed = { ...data, allowed: true }
		await onSubmit(dataWithAllowed)
	})

	/**
	 * Handles the reject button click (allowed: false).
	 */
	const handleReject = handleSubmit(async (data: GiveEntryVehicleFormType) => {
		const dataWithAllowed = { ...data, allowed: false }
		await onSubmit(dataWithAllowed)
	})
	
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
		handleApprove,
		handleReject,
		loadVehicleTypes,
		loadVehicleInspectPoints,
		loadGates,
	}
}