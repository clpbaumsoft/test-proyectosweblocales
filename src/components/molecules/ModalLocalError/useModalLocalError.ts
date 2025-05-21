
//Hooks
import useSessionProviderHook from "@/providers/SessionProvider/hooks";

export default function useModalLocalError() {

	const { localErrorMessage, showLocalError, closeLocalError } = useSessionProviderHook()

	return {
		message: localErrorMessage,
		onShow: showLocalError,
		onClose: closeLocalError,
	}
}