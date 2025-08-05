import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

//Constants
import { GTRANS } from "@/constants/Globals"

//Errors
import AuthError from "@/errors/AuthError";
import LocalError from "@/errors/LocalError";
import ValidationError from "@/errors/ValidationError";

//Events
import EntryControlEvents from "@/events/EntryControlEvents";

//Hooks
import useSessionProviderHook from "@/providers/SessionProvider/hooks";
import useFormMessages from "@/hooks/useFormMessages";
import useTranslation from "@/hooks/useTranslation";

//Interfaces and types
import { GiveLeaveVehicleFormType } from "@/interfaces/Forms";
import { Visitor } from "@/interfaces/Models";

//Packages
import { mcm } from "@/packages/mui-confirm-modal/src";

//Services
import Orchestra from "@/services/Orchestra";
import NoResultsError from "@/errors/NoResultError";
import useTableVisitsProviderHook from "@/providers/TableVisitsProvider/hook";

//Texts
const TRANS = {
	success_give_leave: {
		id: "GiveLeaveVehicleForm.SuccessMessage.VisitCancelled",
		defaultMessage: "Salida exitosa.",
		description: "",
	},
}

export default function useGiveLeaveVehicleForm(visitor: Visitor, onCancel: () => void) {
	
	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)

	const {
		openModalLoginForm,
		showLocalError,
	} = useSessionProviderHook()

	const {
		control,
		reset,
		register,
		handleSubmit,
		getValues,
		watch,
		// setValue,
		formState: { errors, isValid },
	} = useForm<GiveLeaveVehicleFormType>({ defaultValues: {
		gate: visitor?.active_entry_vehicle?.gate?.id || "",
		vehicle_inspect_points: [],
		leave_comments: "",
		different_person_pickup: false,
		id_identity_type: "",
		identity_number: "",
	} })

	const {
		listIdentificationTypes,
		setListIdentificationTypes,
	} = useTableVisitsProviderHook()
	
	const [isInnerLoading, setIsInnerLoading] = useState(false)
	const [currentVisitorData, setCurrentVisitorData] = useState<Visitor>()
	console.log("❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️ ~ useGiveLeaveVehicleForm ~ currentVisitorData:", currentVisitorData)

	const [okMessage, errorMessage, changeOkMessage, changeErrorMessage, hideMessages] = useFormMessages()
	
	/**
	 * Submits the data to give leave to a vehicle.
	 * 
	 */
	const onSubmit = async (data: GiveLeaveVehicleFormType) => {
		try {
			if(isInnerLoading) {
				return
			}
			const confirmed = await mcm.confirm(GTEXTS.message_confirm_noback_action)
			if(!confirmed) {
				return
			}
			
			setIsInnerLoading(true)
			
			hideMessages()
			
			await Orchestra.entryVehicleService.leave(visitor ? visitor.id : 0, data)
			reset()
			changeOkMessage(TEXTS.success_give_leave)
			hideMessages(5*1000, () => {

				if (visitor) {
					visitor.id_active_entry_vehicle = null
					visitor.active_entry_vehicle = null
					EntryControlEvents.updateVisitor.emit('update_visitor', { ...visitor })
				}
				onCancel()
				
			}) 
			setIsInnerLoading(false)
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
	 * Loads the gates.
	 */
	const loadGates = useCallback(async () => {
		const results = await Orchestra.gateService.all()
		return results.map((gate) => {
			return ({ label: `${gate.description} - ${gate?.branch?.company?.short_description || ""}`, value: gate.id })
		})
	}, [])
	
	/**
	 * Loads the vehicle inspect points.
	 */
	const loadVehicleInspectPoints = useCallback(async () => {
		if(!visitor?.active_entry_vehicle?.inspect_points) {
			return []
		}
		return visitor?.active_entry_vehicle?.inspect_points?.map((vehicleInspectPoint) => ({ label: vehicleInspectPoint.description, value: vehicleInspectPoint.id }))
	}, [visitor?.active_entry_vehicle?.inspect_points])


	/**
	 * Loads the identification types.
	 */
	const loadIdentificationTypes = useCallback(async () => {
		if(listIdentificationTypes.length > 0) {
			return listIdentificationTypes.map((itype) => ({ label: itype.code, value: itype.id }))
		}
		const results = await Orchestra.identificationTypeService.all()
		setListIdentificationTypes([...results])
		return results.map((itype) => ({ label: itype.code, value: itype.id }))
	}, [listIdentificationTypes, setListIdentificationTypes])

		/**
	 * On blur event for the field "identity_number" to check if the visitor already exists and it is then, the form will be filled with the data.
	 */
	const onBlurIdentificationNumber = async () => {
		
		try {
			const idIdentificationType = getValues('id_identity_type')
			const identificationNumber = getValues('identity_number')
			
			if(!identificationNumber || !idIdentificationType || isInnerLoading) {
				return
			}
			setIsInnerLoading(true)
			const visitor = await Orchestra.visitorService.get(identificationNumber, idIdentificationType)
			setCurrentVisitorData(visitor)
			setIsInnerLoading(false)
		} catch(catchError) {
			setIsInnerLoading(false)
			if(catchError instanceof NoResultsError) {
				alert('Usuario no encontrado, debe registarlo a una visita para actiavrlo')
				return
			}
			if(catchError instanceof AuthError) {
				return openModalLoginForm()
			}
			if(catchError instanceof LocalError || catchError instanceof ValidationError) {
				return showLocalError(catchError)
			}
			throw catchError
		}
	}
	
	return {
		isValid,
		isInnerLoading,
		message: okMessage,
		error: errorMessage,
		errors,
		control,
		watch,
		onSubmit,
		handleSubmit,
		register,
		loadGates,
		loadVehicleInspectPoints,
		onBlurIdentificationNumber,
		loadIdentificationTypes
	}
}