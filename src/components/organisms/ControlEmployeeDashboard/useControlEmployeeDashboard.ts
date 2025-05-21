import { useState } from "react"
import type { SyntheticEvent } from "react"

export default function useControlEmployeeDashboard() {
	
	const [tabActiveIndex, setTabActiveIndex] = useState(0)
	
	/**
	 * Updates the state of the tab active.
	 */
	const onChangeTab = (event: SyntheticEvent, newIndex: number) => {
		setTabActiveIndex(newIndex)
	}
	
	return {
		tabActiveIndex,
		onChangeTab,
	}
}