import { useCallback, useRef } from "react";

export default function useDebounce(delay: number = 1000) {
	
	const timerOutValue = useRef<number>(null)

	const callback = useCallback((myActions: () => Promise<unknown>) => {
		return new Promise((resolve) => {
			if(timerOutValue.current) {
				clearTimeout(timerOutValue.current)
			}
			timerOutValue.current = setTimeout(async () => {
				await myActions()
				resolve('finish')
			}, delay) as unknown as number
		})
	}, [delay])
	return [
		callback
	]
}