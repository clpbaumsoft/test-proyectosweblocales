//React and modules
import { useCallback, useState } from "react";

//Constants
import { GTRANS } from "@/constants/Globals";

//Errors
import AuthError from "@/errors/AuthError";

//Hooks
import useTranslation from "./useTranslation";

//Interfaces and types
import { UserType } from "@/interfaces/Models";

//Libs
import apiRequest from "@/lib/ApiRequest";

//Models
import User from "@/models/User";


export default function useUser(serverUser: UserType | null = null) {
	
	const GTEXTS = useTranslation(GTRANS)
	
	const userInstance = serverUser ? new User(serverUser) : null
	
	const [user, setStateUser] = useState<User | null>(userInstance)
	const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true)
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!serverUser)


	const setUser = (dataUser: UserType | null) => {
		setStateUser(dataUser ? new User(dataUser) : null)
	}
	
	const loadUser = useCallback(async () => {
		try {
			if(user) {
				return
			}
			setIsLoadingUser(true)
			const res = await apiRequest().get("/me")
			setUser(res.data.user)
			setIsLoggedIn(true)
		} catch {
			setUser(null)
			setIsLoggedIn(false)
			throw new AuthError(GTEXTS.error_something_went_wrong)
		} finally {
			setIsLoadingUser(false)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user])

  return {
		isLoadingUser,
    user,
		setUser,
		loadUser,
		isLoggedIn,
		setIsLoggedIn,
  }
}