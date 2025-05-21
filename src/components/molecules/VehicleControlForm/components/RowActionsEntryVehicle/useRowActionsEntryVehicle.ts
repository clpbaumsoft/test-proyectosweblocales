//Hooks
import useToggleBoolean from "@/hooks/useToggleBoolean";

export default function useRowActionsEntryVehicle() {
	const [isOpenModalEntryVehicle, toggleModalEntryVehicle] = useToggleBoolean(false)

	return {
		isOpenModalEntryVehicle,
		toggleModalEntryVehicle,
	}
}