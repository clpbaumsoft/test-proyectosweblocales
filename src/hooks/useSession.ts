import type { AxiosError } from "axios";

//Constants
import { GTRANS } from "@/constants/Globals";

//Errors
import AuthError from "@/errors/AuthError";
import LocalError from "@/errors/LocalError";

//Hooks
import useSessionProviderHook from "@/providers/SessionProvider/hooks";
import useTranslation from "./useTranslation";

//Interfaces and types
import { UserCredentials, SessionData } from "@/interfaces/Auth";
import { ErrorResponseDataType } from "@/interfaces/General";

//Libs
import apiRequest from "@/lib/ApiRequest";
import { removeCookie, setCookie } from "@/lib/Helpers";

export default function useSession() {
	
	const GTEXTS = useTranslation(GTRANS)

	const { setIsLoggedIn, setUser } = useSessionProviderHook()

	/**
	 * Perfoms the logout request.
	 * @returns 
	 */
	const doLogout = async () => {
		try {
			await apiRequest().post("/logout")
		} catch {
			setIsLoggedIn(false)
			removeCookie('auth_token')
		} finally {
			setIsLoggedIn(false)
			removeCookie('auth_token')
		}
	}

	/**
	 * Perfoms the login request.
	 * @returns 
	 */
	async function doLogin(arg: UserCredentials) : Promise<SessionData>  {
		try {
			const response = await apiRequest().post("/login", arg)
			setCookie('auth_token', response.data.access_token)
			setUser(response.data.user)
			setIsLoggedIn(true)
			return response.data
		} catch(catchError) {
			const error = catchError as AxiosError
			const status = error?.status || 500
			const dataResponse = (error?.response?.data as ErrorResponseDataType) || { error: "" }
			const message = dataResponse.error || GTEXTS.error_login_failed
			if(status === 404) {
				throw new AuthError(GTEXTS.error_bad_credentials)
			}
			throw new LocalError(message)
		}
	}


  return {
		login: doLogin,
		logout: doLogout,
	}
}