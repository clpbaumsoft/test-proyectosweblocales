
//Interfaces and types
import { LocalCacheHookType } from "@/interfaces/General";

export default function useLocalCache() : LocalCacheHookType {
	
	const get = (key: string, defaultValue: string = '', parsed = false) => {
		let dataLocal = localStorage.getItem(key)
		if(!dataLocal) {
			dataLocal = defaultValue
		}
		return parsed ? JSON.parse(dataLocal) : dataLocal
	}

	const set = (key: string, value: string | object) => {
		localStorage.setItem(
			key,
			typeof value === 'string' ? value : JSON.stringify(value)
		)
	}

	const del = (key: string) => {
		localStorage.removeItem(key)
	}
	return [
		get,
		set,
		del,
	]
}