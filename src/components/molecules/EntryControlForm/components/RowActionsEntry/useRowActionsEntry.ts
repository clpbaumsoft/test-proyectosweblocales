
//Hooks
import useToggleBoolean from "@/hooks/useToggleBoolean";

export default function useRowActionsEntry() {
	const [isOpenModalEntry, toggleModalEntry] = useToggleBoolean(false)
	return {
		isOpenModalEntry,
		toggleModalEntry,
	}
}