import { useEffect, useState } from "react";
import type { SyntheticEvent } from "react";

//Errors
import AuthError from "@/errors/AuthError";
import LocalError from "@/errors/LocalError";
import ValidationError from "@/errors/ValidationError";

//Hooks
import useDebounce from "@/hooks/useDebounce";
import useSessionProviderHook from "@/providers/SessionProvider/hooks";

//Interfaces and types
import { ItemSelector } from "@/interfaces/General";
import { InputAutocompleteProps } from "@/interfaces/Atoms";

export default function useInputAutocomplete(onChange: (newVal: ItemSelector) => void, emitGetOptions: (criteria: string) => Promise<ItemSelector[]>, defaultValue: InputAutocompleteProps["defaultValue"] = null) {

	const {
		openModalLoginForm,
		showLocalError,
	} = useSessionProviderHook()
		
	const [selectedValue, setSelectedValue] = useState<ItemSelector | null>(null)
	const [options, setOptions] = useState<ItemSelector[]>([])
	const [isInnerLoading, setIsInnerLoading] = useState(false)

	const [debounce] = useDebounce(600)

	const onChangeAutocomplete = (event: SyntheticEvent, newValue: unknown | null) => {
		const val = newValue as ItemSelector
		setOptions(newValue ? [val, ...options] : options)
		setSelectedValue(val)
		onChange(val)
	}

	const onInputChange = (event: SyntheticEvent<Element, Event>, newInputValue: string) => {
		if(newInputValue.trim().length >= 3) {
			debounce(async () => {
				try {
					setIsInnerLoading(true)
					const responseOptions = await emitGetOptions(newInputValue)
					setOptions([...responseOptions])
					setIsInnerLoading(false)
				} catch(catchError) {
					setIsInnerLoading(false)
					if(catchError instanceof AuthError) {
						return openModalLoginForm()
					}
					if(catchError instanceof LocalError || catchError instanceof ValidationError) {
						return showLocalError(catchError)
					}
					throw catchError
				}
			})
		}
	}
	
	useEffect(() => {
		if (typeof defaultValue !== 'object' && defaultValue) {
			if (options.length > 0) {
				const optionFound = options.find((option) => option.value === defaultValue)
				if (optionFound) {
					setSelectedValue(optionFound)
				}
			}
		}

		if (typeof defaultValue === 'object') {
			setSelectedValue(defaultValue)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [defaultValue])

	return {
		isInnerLoading,
		selectedValue,
		options,
		onChangeAutocomplete,
		onInputChange,
	}
}