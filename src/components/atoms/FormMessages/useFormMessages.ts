//Hooks
import useToggleBoolean from "@/hooks/useToggleBoolean";
import { useEffect } from "react";

export default function useFormMessages(message: string | null, error: string | null) {
	
	const [isOpenSuccess, toggleIsOpenSuccess, setIsOpenSuccess] = useToggleBoolean(false)
	const [isOpenError, toggleIsOpenError, setIsOpenError] = useToggleBoolean(false)
	
	useEffect(() => {
		if(message) {
			setIsOpenSuccess(true)
		}
	}, [message, setIsOpenSuccess])
	
	useEffect(() => {
		if(error) {
			setIsOpenError(true)
		}
	}, [error, setIsOpenError])
	
	return {
		isOpenSuccess,
		isOpenError,
		toggleIsOpenError,
		toggleIsOpenSuccess,
	}
}