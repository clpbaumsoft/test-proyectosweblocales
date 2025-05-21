import { ChangeEvent, useState } from "react";

import { SelectChangeEvent } from "@mui/material";

export default function useItemListFile(onChangeSelector: (newItemSelectorValue: string | number) => void, onChangeDescription: (newDestiption: string) => void) {

	const [selectValue, setSelectValue] = useState<string | undefined>("")
	const [descriptionValue, setDescriptionValue] = useState<string | undefined>("")

	const onChangeDropdown = (event: SelectChangeEvent) => {
		onChangeSelector(event.target.value)
		setSelectValue(event.target.value)
	}

	const onChangeTextField = (event: ChangeEvent<HTMLInputElement>) => {
		onChangeDescription(event.target.value)
		setDescriptionValue(event.target.value)
	}
	
	return {
		descriptionValue,
		selectValue,
		setSelectValue,
		onChangeDropdown,
		onChangeTextField,
	}
}