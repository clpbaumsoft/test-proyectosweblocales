
//React and Modules
import { useCallback, useState } from "react";

//Constants
import { GTRANS } from "@/constants/Globals";

//Errors
import AuthError from "@/errors/AuthError";

//Hooks
import useUser from "@/hooks/useUser";
import LocalError from "@/errors/LocalError";
import useTranslation from "@/hooks/useTranslation";

//Interfaces
import { UserType } from "@/interfaces/Models";


export default function useSessionProvider(serverUser?: UserType) {
	
	const GTEXTS = useTranslation(GTRANS)
	
	const {
		user,
		isLoadingUser,
		isLoggedIn,
		setUser,
		loadUser,
		setIsLoggedIn,
	} = useUser(serverUser)

	const [accessToken, setAccessToken] = useState<string | null>(null)
	const [isGlobalLoading, setIsGlobalLoading] = useState<boolean>(false)
	const [isOpenModalLoginForm, setIsOpenModalLoginForm] = useState<boolean>(false)
	const [localErrorMessage, setLocalErrorMessage] = useState<string>("")
	

	const openModalLoginForm = useCallback(() => {
		setIsOpenModalLoginForm(true)
	}, [])
	const closeModalLoginForm = () => {
		setIsOpenModalLoginForm(false)
	}
	
	const showLocalError = useCallback((error: LocalError) => {
		setLocalErrorMessage(error.message)
	}, [])
	const closeLocalError = () => {
		setLocalErrorMessage("")
	}

	const getLoggedUser = () => {
		if(!user) {
			throw new AuthError(GTEXTS.access_denied)
		}
		return user
	}
	
	return {
		user,
		setUser,
		loadUser,
		isLoadingUser,
		isLoggedIn,
		setIsLoggedIn,
		accessToken,
		setAccessToken,
		isGlobalLoading,
		setIsGlobalLoading,
		isOpenModalLoginForm,
		openModalLoginForm,
		closeModalLoginForm,
		localErrorMessage,
		showLocalError,
		closeLocalError,
		getLoggedUser,
	}

}