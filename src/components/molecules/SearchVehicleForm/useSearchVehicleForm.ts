import { useState } from "react";
import { useForm } from "react-hook-form";

//Hooks
import useFormMessages from "@/hooks/useFormMessages";
import useTranslation from "@/hooks/useTranslation";
import useSessionProviderHook from "@/providers/SessionProvider/hooks";

//Interfaces and types
import type { SearchVehicleFormType } from "@/interfaces/Forms";
import type { EntryVehicle } from "@/interfaces/Models";

//Constants
import { GTRANS } from "@/constants/Globals";

//Errors
import AuthError from "@/errors/AuthError";
import LocalError from "@/errors/LocalError";
import ValidationError from "@/errors/ValidationError";

const TRANS = {
	validation_plate_required: {
		id: "SearchVehicleForm.Validation.PlateRequired",
		defaultMessage: "La placa del vehículo es requerida",
		description: "",
	},
	validation_plate_min: {
		id: "SearchVehicleForm.Validation.PlateMin",
		defaultMessage: "La placa debe tener al menos 3 caracteres",
		description: "",
	},
}

export default function useSearchVehicleForm(
	onSearch: (plateNumber: string) => Promise<EntryVehicle>,
	onResult: (vehicle: EntryVehicle) => void
) {

	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)

	const {
		openModalLoginForm,
		showLocalError,
	} = useSessionProviderHook()

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<SearchVehicleFormType>({
		defaultValues: {
			plateNumber: "",
		},
	})

	const [
		successMessage,
		errorMessage,
		setSuccessMessage,
		setErrorMessage,
		hideMessages,
	] = useFormMessages()

	const [isLoading, setIsLoading] = useState(false)
	const [hasFinished, setHasFinished] = useState(false)

	const onSubmit = async (data: SearchVehicleFormType) => {
		try {
			if (isLoading) {
				return
			}

			if (!data.plateNumber.trim()) {
				setErrorMessage(TEXTS.validation_plate_required)
				return
			}

			if (data.plateNumber.trim().length < 3) {
				setErrorMessage(TEXTS.validation_plate_min)
				return
			}

			setIsLoading(true)
			hideMessages()

			const vehicle = await onSearch(data.plateNumber.trim().toUpperCase())
			setIsLoading(false)
			setHasFinished(true)
			
			setSuccessMessage(GTEXTS.search_completed_successfully)
			onResult(vehicle)
			
		} catch (catchError) {
			setIsLoading(false)
			setHasFinished(true)
			
			if (catchError instanceof AuthError) {
				return openModalLoginForm()
			}
			if (catchError instanceof LocalError || catchError instanceof ValidationError) {
				return showLocalError(catchError)
			}
			showLocalError(new LocalError(GTEXTS.error_something_went_wrong))
		}
	}

	const formMessages = {
		successMessage,
		errorMessage,
	}

	return {
		isLoading,
		hasFinished,
		control,
		errors,
		formMessages,
		handleSubmit,
		onSubmit,
		reset,
		hideMessages,
	}
}
