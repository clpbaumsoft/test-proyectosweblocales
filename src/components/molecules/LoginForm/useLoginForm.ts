//React and modules
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import { useForm } from "react-hook-form";

//Constants
import PAGES from "@/constants/Pages";
import { GTRANS, IDENTIFICATION_TYPE_CODE_CC } from "@/constants/Globals";

//Errors
import AuthError from "@/errors/AuthError";
import LocalError from "@/errors/LocalError";

//Hooks
import useSession from "@/hooks/useSession";
import useSessionProviderHook from "@/providers/SessionProvider/hooks";
import useTranslation from "@/hooks/useTranslation";

//Interfaces and types
import { UserCredentials } from "@/interfaces/Auth";
import { LoginFormType } from "@/interfaces/Forms";


export default function useLoginForm() {
	
	const GTEXTS = useTranslation(GTRANS)

	const router = useRouter()

	const { login } = useSession()

	const searchParams = useSearchParams()

	const {
		isOpenModalLoginForm,
		closeModalLoginForm,
		loadUser,
	} = useSessionProviderHook()
	
	const {
		formState: { errors, isValid },
		register,
		handleSubmit,
	} = useForm<LoginFormType>({
		defaultValues: {
			dni_type: IDENTIFICATION_TYPE_CODE_CC,
			dni: "",
			password: "",
		}
	})
	
	const [isVisibleErrorMessage, setIsVisibleErrorMessage] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [openRecovery, setOpenRecovery] = useState(false)
	const [isInnerLoading, setIsInnerLoading] = useState(true)
	const [showPassword, setSetShowPassword] = useState(false)

	/**
	 * Function to handle the form submit event and log in the user with credentials.
	 * @param data 
	 */
	const onSubmit = async (data: LoginFormType) => {
				
		setIsInnerLoading(true)
		setIsVisibleErrorMessage(false)

		try {
			const userData: UserCredentials = {
				dni: data.dni,
				dni_type: data.dni_type,
				password: data.password,
			}
			
			await login(userData)

			if(isOpenModalLoginForm) {
				closeModalLoginForm()
			} else {
				redirectAfterLogin()
			}

		} catch(error) {
			if(error instanceof AuthError) {
				setErrorMessage(error.message || GTEXTS.error_something_went_wrong)
			} else if(error instanceof LocalError) {
				setErrorMessage(error.message || GTEXTS.error_something_went_wrong)
			} else {
				setErrorMessage(GTEXTS.error_something_went_wrong)
			}
			setIsVisibleErrorMessage(true)
		} finally {
			setIsInnerLoading(false)
		}
	}

	/**
	 * Redirects to the home or a previous page which it was tried to access it.
	 */
	const redirectAfterLogin = () => {
		const redirectPath = searchParams.get('r')
		if(redirectPath) {
			const path = Buffer.from(redirectPath, 'base64').toString()
			router.push(path)
		} else {
			router.push(PAGES.home)
		}
	}

	const handleOpenRecovery = () => {
		setOpenRecovery(true)
	}

	const handleCloseRecovery = () => {
		setOpenRecovery(false)
	}

	const isValidForm = () => {
		return isValid && !isInnerLoading
	}
	
	const onClickTogglePassword = () => setSetShowPassword(!showPassword)
	
	/**
	 * Effects
	 */

	useEffect(() => {
		
		const checkAuthentication = async () => {
			try {
				await loadUser()
			} catch {} finally {
				setIsInnerLoading(false)
			}
		}

		checkAuthentication()
	}, [loadUser])


	return {
		errors,
		isVisibleErrorMessage,
		errorMessage,
		isInnerLoading,
		openRecovery,
		showPassword,
		isValidForm,
		onSubmit,
		handleOpenRecovery,
		handleCloseRecovery,
		handleSubmit,
		register,
		setIsVisibleErrorMessage,
		onClickTogglePassword,
	}
}