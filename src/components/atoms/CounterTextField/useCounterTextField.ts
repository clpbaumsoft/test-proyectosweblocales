import { useCallback, useState } from "react";
import type { ChangeEvent } from "react";
import type { InputProps } from "@mui/material";

export default function useCounterTextField(inputOnChange: InputProps['onChange']) {

	const [counter, setCounter] = useState(0)

	/**
	 * Function used to count the number of characters of the text field.
	 */
	const handleOnChange = useCallback((event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setCounter(event.target.value.trim().length)
		if(inputOnChange) {
			inputOnChange(event)
		}
	}, [inputOnChange])

	return {
		counter,
		handleOnChange,
	}
}