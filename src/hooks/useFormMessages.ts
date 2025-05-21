import { useCallback, useRef, useState } from "react"

//Interfaces and types
import { FormMessageHookType } from "@/interfaces/General"

export default function useFormMessages() : FormMessageHookType {

	const [successMessage, setSuccessMessage] = useState<null | string>('')
	const [errorMessage, setErrorMessage] = useState<null | string>('')

	const refHideTimerOut = useRef<number>(null)

	const hide = useCallback((delay: number = 0, callback?: () => void) => {
		if(delay > 0) {
			if(refHideTimerOut.current) {
				clearTimeout(refHideTimerOut.current)
			}
			refHideTimerOut.current = setTimeout(() => {
				setErrorMessage(null)
				setSuccessMessage(null)
				if(callback) {
					callback()
				}
			}, delay) as unknown as number
		} else {
			setErrorMessage(null)
			setSuccessMessage(null)
		}
	}, [])

	return [
		successMessage,
		errorMessage,
		setSuccessMessage,
		setErrorMessage,
		hide,
	]
}