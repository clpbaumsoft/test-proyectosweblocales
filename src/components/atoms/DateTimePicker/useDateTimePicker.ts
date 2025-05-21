//React and modules
import { useEffect, useRef, useState } from "react";
import MaterialDateTimePicker from "material-datetime-picker";
import moment from "moment";

//Helpers
import { formatsDate } from "@/lib/Helpers";

//Hooks
import useTranslation from "@/hooks/useTranslation";

//Interfaces and types
import { MaterialDateTimePickerType } from "@/interfaces/General";
import type { Moment } from "moment";

//Styles
import "material-datetime-picker/dist/material-datetime-picker.css";

//Texts
const TRANS = {
	date_not_allowed: {
		id: "DateTimePicker.ErrorMessage.DateNotAllowed",
		defaultMessage: "Fecha no permitida.",
		description: "",
	}
}

export default function useDateTimePicker(defaultValue: string | Moment | null, onChange?: (date: Moment | null) => void, displayFormat?: string, minDate?: Moment | null) {
	
	const TEXTS = useTranslation(TRANS)

	const picker = useRef<MaterialDateTimePickerType>(null)
	const [value, setValue] = useState<Moment | string | null>(defaultValue)
	const [error, setError] = useState("")
	
		
	const onClickOpenPicker = () => {
		if(picker.current) {
			picker.current.open()
		}
	}
	
	const onCloseError = () => setError("")
	
	const getStrValue = (placeHolder: string) => {
		if(!value) {
			return placeHolder
		}
		return formatsDate(value, displayFormat)
	}
	
	/**
	 * Effects
	 */

	useEffect(() => {
		
		const onSelectDate = (val: Moment) => {
			const valV2 = moment(val.format('YYYY-MM-DD HH:mm:ss'))
			if(moment.isMoment(minDate)) {
				if(valV2.isSameOrBefore(minDate)) {
					setError(TEXTS.date_not_allowed)
					return
				}
			}
			setValue(valV2)
			if(onChange) {
				onChange(valV2)
			}
		}

		picker.current = new MaterialDateTimePicker({
			default: moment.isMoment(defaultValue) ? defaultValue : moment(),
		})
			.on('submit', onSelectDate)
			.on('open', onCloseError)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [minDate, defaultValue, onChange])

	return {
		error,
		onCloseError,
		getStrValue,
		onClickOpenPicker,
	}
}