import { useEffect, useState } from "react"

import { mcm } from "../core";

export default function useMuiConfirmModal() {
	
	const [isOpen, setIsOpen] = useState(false)
	const [message, setMessage] = useState("")
	const [handleYes, setHandleYes] = useState<(() => void) | null>(null)
	const [handleNo, setHandleNo] = useState<(() => void) | null>(null)
	
	
	useEffect(() => {
		mcm.init(setIsOpen, setMessage, setHandleYes, setHandleNo)
	}, []);
	
	return {
		isOpen,
		message,
		handleYes,
		handleNo,
	}
}