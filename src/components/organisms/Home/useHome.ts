//Hooks
import useSessionProviderHook from "@/providers/SessionProvider/hooks"

export default function useHome() {

	const {
		getLoggedUser,
	} = useSessionProviderHook()

	return {
		loggedUser: getLoggedUser(),
	}
}