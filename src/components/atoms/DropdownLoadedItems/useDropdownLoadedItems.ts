//React and modules
import { useEffect, useState } from "react";
import type { SelectChangeEvent } from "@mui/material";

//Constants
import { GTRANS } from "@/constants/Globals";

//Errors
import NoResultsError from "@/errors/NoResultError";
import AuthError from "@/errors/AuthError";
import LocalError from "@/errors/LocalError";
import ValidationError from "@/errors/ValidationError";

//Interfaces and types
import { ItemSelector } from "@/interfaces/General";
import { DropdownLoadedItemsProps } from "@/interfaces/Organisms";

//Hooks
import useLocalCache from "@/hooks/useLocalCache";
import useDebounce from "@/hooks/useDebounce";
import useSessionProviderHook from "@/providers/SessionProvider/hooks";
import useTranslation from "@/hooks/useTranslation";

export default function useDropdownLoadedItems(props: DropdownLoadedItemsProps) {
	
	const GTEXTS = useTranslation(GTRANS)

	const {
		defaultValue,
		cachedKey = '',
		fetchItems,
		onChangeValue,
	} = props
	
	const {
		openModalLoginForm,
		showLocalError,
	} = useSessionProviderHook()

	const [items, setItems] = useState<ItemSelector[]>([])
	const [value, setValue] = useState<ItemSelector | null>(null)
	
	const [isInnerLoading, setIsInnerLoading] = useState(true)
	const [getLocalCache, setLocalCache] = useLocalCache()
	const [debounce] = useDebounce()
	
	/**
	 * On change event function to call the onChangeValue prop just sending the value selected.
	 * @param event 
	 * @param value 
	 */
	const onChange = (event: SelectChangeEvent<unknown>) => {
		const valueEvent: number | string = typeof(event.target.value) === 'number' ? event.target.value : String(event.target.value)
		triggerChange(valueEvent)
	}

	/**
	 * Updates the value state and call the onChangeValue function
	 */
	const triggerChange = (valueEvent: number | string) => {
		const itemValue = findItem(valueEvent)
		const newValue = itemValue ? { ...itemValue } : null
		setValue(newValue)
		if(onChangeValue) {
			onChangeValue(newValue)
		}
	}

	/**
	 * Returns an ItemSelector object.
	 */
	const findItem = (valueFind: number | string) => {
		return valueFind ? items.find((item) => item.value === valueFind) : null
	}
	
	/**
	 * Function used to render the values of the select.
	 * @param selected
	 * @param description 
	 * @returns 
	 */
	const renderValueSelect = (selected: unknown) => {
		if (!selected || selected === -1 || selected === '') {
			return GTEXTS.select_option
		}
		const item = findItem(typeof(selected) === 'number' ? selected as number : String(selected))
		return item?.label || GTEXTS.select_option
	}
	
	useEffect(() => {
		/**
		 * Loads all the visitor types.
		 */
		const loadItems = async () => {
			debounce(async () => {
						
				if(items.length > 0) {
					setIsInnerLoading(false)
					return
				}
				
				try {
					let newList: ItemSelector[] = cachedKey ? getLocalCache(`${cachedKey}_dropdown_loaded_items`, '[]', true) as ItemSelector[] : []
					if(newList.length === 0) {
						newList = await fetchItems()
					}
					setItems([...newList])
					if(cachedKey) {
						setLocalCache(`${cachedKey}_dropdown_loaded_items`, [...newList])
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
			if(items.length > 0) {
				setIsInnerLoading(false)
				return
			}
		}
		loadItems()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [items.length, setItems])

	useEffect(() => {
		const valueEvent = defaultValue || ''
		const itemValue = findItem(valueEvent)
		const newValue = itemValue ? { ...itemValue } : null
		setValue(newValue)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [defaultValue])
	
	return {
		isInnerLoading,
		items,
		value,
		onChange,
		renderValueSelect,
	}
}