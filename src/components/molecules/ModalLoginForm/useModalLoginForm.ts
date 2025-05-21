
//Hooks
import useSessionProviderHook from "@/providers/SessionProvider/hooks";

export default function useModalLoginForm() {

	const { isOpenModalLoginForm, closeModalLoginForm } = useSessionProviderHook()

	return {
		isOpen: isOpenModalLoginForm,
		onClose: closeModalLoginForm,
	}
}