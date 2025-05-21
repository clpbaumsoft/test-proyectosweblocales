//Hooks
import useToggleBoolean from "@/hooks/useToggleBoolean";


export default function useCardActiveEntryVehicle() {

	const [isOpenGiveLeaveForm, toggleOpenGiveLeaveForm] = useToggleBoolean(false)

	return {
		isOpenGiveLeaveForm,
		toggleOpenGiveLeaveForm,
	}
}