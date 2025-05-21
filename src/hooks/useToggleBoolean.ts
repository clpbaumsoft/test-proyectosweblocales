import { useCallback, useState } from "react"

//Interfaces and types
import { ToggleBooleanType } from "@/interfaces/General"

export default function useToggleBoolean(initValue: boolean = false) : ToggleBooleanType {

	const [value, set] = useState<boolean>(initValue)
	const toggle = useCallback(() => {
		set(!value)
	}, [value])

	return [
		value,
		toggle,
		set,
	]
}