//React and modules
import { useEffect, useState } from "react";
import type { SyntheticEvent } from "react";

//Errors
import AuthError from "@/errors/AuthError";
import LocalError from "@/errors/LocalError";
import ValidationError from "@/errors/ValidationError";
import NoResultsError from "@/errors/NoResultError";

//Hooks
import useSessionProviderHook from "@/providers/SessionProvider/hooks";
import useDebounce from "@/hooks/useDebounce";
import useLocalCache from "@/hooks/useLocalCache";

//Interfaces and types
import { ItemSelector } from "@/interfaces/General";
import { SelectLoadedItemsProps } from "@/interfaces/Atoms";


export default function useSelectLoadedItems(props: SelectLoadedItemsProps) {
	
	const {
		fetchItems,
		onChangeValue,
		defaultValue,
		cachedKey,
	} = props

	const {
		openModalLoginForm,
		showLocalError,
	} = useSessionProviderHook()

	const [items, setItems] = useState<ItemSelector[]>([])
	
	const [isInnerLoading, setIsInnerLoading] = useState(true)
	const [value, setValue] = useState<ItemSelector | null>(null)
	const [getLocalCache, setLocalCache] = useLocalCache()

	const [debounce] = useDebounce()
	
	/**
	 * On change event function to call the onChangeValue prop just sending the value selected.
	 * @param event 
	 * @param value 
	 */
	const onChange = (event: SyntheticEvent, value: ItemSelector | null) => {
		setValue(value)
		if(onChangeValue) {
			onChangeValue(value)
		}
	}
	
	useEffect(() => {
		/**
		 * Loads all the dropdown items.
		 */
		const loadItems = async () => {
			debounce(async () => {
			
				if(items.length > 0) {
					setIsInnerLoading(false)
					return
				}
				
				try {
					let newList: ItemSelector[] = cachedKey ? getLocalCache(`${cachedKey}_select_loaded_items`, '[]', true) as ItemSelector[] : []
					if(newList.length === 0) {
						newList = await fetchItems()
					}
					setItems([...newList])
					if(cachedKey) {
						setLocalCache(`${cachedKey}_select_loaded_items`, [...newList])
					}
					if(defaultValue) {
						const itemFound = newList.find((item) => item.value === defaultValue)
						if(itemFound) {
							setValue(itemFound)
						}
					}
					setIsInnerLoading(false)
				} catch(catchError) {
					setIsInnerLoading(false)
					if(catchError instanceof NoResultsError) {
						setItems([])
						setValue(null)
						return
					}
					if(catchError instanceof AuthError) {
						return openModalLoginForm()
					}
					if(catchError instanceof LocalError || catchError instanceof ValidationError) {
						return showLocalError(catchError)
					}
				}
			})
			
		}
		loadItems()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [items.length, setItems, fetchItems, openModalLoginForm, showLocalError, defaultValue])
	
	useEffect(() => {
		if(defaultValue) {
			if(items.length > 0) {
				const itemFound = items.find((item) => item.value === defaultValue)
				if(itemFound) {
					setValue(itemFound)
				}
			}
		} else {
			setValue(null)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [defaultValue])
	
	return {
		isInnerLoading,
		value,
		items,
		onChange,
	}
}