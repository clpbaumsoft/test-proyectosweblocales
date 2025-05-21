//React and modules
import { useEffect, useState } from "react";

//Errors
import AuthError from "@/errors/AuthError";
import LocalError from "@/errors/LocalError";
import ValidationError from "@/errors/ValidationError";
import NoResultsError from "@/errors/NoResultError";

//Hooks
import useSessionProviderHook from "@/providers/SessionProvider/hooks";
import useArrayState from "@/hooks/useArrayState";
import useDebounce from "@/hooks/useDebounce";
import useLocalCache from "@/hooks/useLocalCache";

//Interfaces and types
import { ItemSelector } from "@/interfaces/General";
import { GroupCheckboxInputProps } from "@/interfaces/Atoms";


export default function useGroupCheckboxInput(props: GroupCheckboxInputProps) {
	
	const {
		defaultValues,
		fetchItems,
		onChange,
		onAddItemValue,
		onRemoveItemValue,
		cachedKey,
	} = props

	const {
		openModalLoginForm,
		showLocalError,
	} = useSessionProviderHook()

	const [items, setItems] = useState<ItemSelector[]>([])
	
	const [isInnerLoading, setIsInnerLoading] = useState(true)
	const [values, actions] = useArrayState<ItemSelector>([])
	const [getLocalCache, setLocalCache] = useLocalCache()
	const [debounce] = useDebounce()

	/**
	 * 
	 */
	const onChangeCheckbox = (item: ItemSelector) => {
		let vals = []
		const indexFound = actions.find(values, item, 'value')
		if(indexFound !== -1) {
			vals = actions.remove(indexFound)
			if(onRemoveItemValue) {
				onRemoveItemValue(indexFound)
			}
		} else {
			vals = actions.add(item)
			if(onAddItemValue) {
				onAddItemValue(item)
			}
		}
		if(onChange) {
			onChange(vals)
		}
	}

	/**
	 * Checks if an item exits
	 */
	const exists = (item: ItemSelector) => {
		return defaultValues ? defaultValues.findIndex((df) => df === item.value) !== -1 : false
	}
	
	useEffect(() => {
		/**
		 * Loads all the dropdown items.
		 */
		const loadItems = () => {
			debounce(async () => {
			
				if(items.length > 0) {
					setIsInnerLoading(false)
					return
				}
				
				try {
					let newList: ItemSelector[] = cachedKey ? getLocalCache(`${cachedKey}_group_checkbox_input`, '[]', true) as ItemSelector[] : []
					if(newList.length === 0) {
						newList = await fetchItems()
					}
					setItems([...newList])
					if(cachedKey) {
						setLocalCache(`${cachedKey}_group_checkbox_input`, [...newList])
					}
					if(defaultValues) {
						const itemsFound = newList.filter((item) => defaultValues.includes(item.value as string))
						if(itemsFound.length > 0) {
							actions.change(itemsFound)
						}
					}
				} catch(catchError) {
					if(catchError instanceof NoResultsError) {
						setItems([])
						actions.change([])
						return
					}
					if(catchError instanceof AuthError) {
						return openModalLoginForm()
					}
					if(catchError instanceof LocalError || catchError instanceof ValidationError) {
						return showLocalError(catchError)
					}
				} finally {
					setIsInnerLoading(false)
				}
			})
			
		}
		loadItems()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [items.length, setItems, fetchItems, openModalLoginForm, showLocalError, debounce, defaultValues])
	
	return {
		isInnerLoading,
		items,
		exists,
		onChangeCheckbox,
	}
}