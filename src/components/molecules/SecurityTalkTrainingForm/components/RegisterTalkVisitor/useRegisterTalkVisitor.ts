import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { Moment } from "moment";

//Constants
import { GTRANS } from "@/constants/Globals";

//Errors
import AuthError from "@/errors/AuthError";
import LocalError from "@/errors/LocalError";
import ValidationError from "@/errors/ValidationError";

//Interfaces and types
import { RegisterTalkVisitorFormType } from "@/interfaces/Forms";
import { Visitor } from "@/interfaces/Models";

//Lib
import { mInit, now } from "@/lib/Helpers";

//Hooks
import useFormMessages from "@/hooks/useFormMessages";
import useSessionProviderHook from "@/providers/SessionProvider/hooks";
import useRecordState from "@/hooks/useRecordState";
import useTranslation from "@/hooks/useTranslation";

//Services
import Orchestra from "@/services/Orchestra";


//Texts
const TRANS = {
	success_set_dates: {
		id: "RegisterTalkVisitor.SuccessMessage.SetDatesSuccessfully",
		defaultMessage: "Se registraron con éxito las fechas de la charla de seguridad.",
		description: "",
	},
	error_invalid_dates: {
		id: "RegisterTalkVisitor.ErrorMessage.InvalidDates",
		defaultMessage: "Las fechas seleccionadas no son válidas.",
		description: "",
	},
}

export default function useRegisterTalkVisitor(visitor: Visitor) {

	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)

	const {
		openModalLoginForm,
	} = useSessionProviderHook()

	const {
		formState: { errors },
		register,
		handleSubmit,
		setValue,
	} = useForm<RegisterTalkVisitorFormType>()

	const [isInnerLoading, setIsInnerLoading] = useState(false)
	const [okMessage, errorMessage, changeOkMessage, changeErrorMessage, hideMessages] = useFormMessages()
	const [isOpenTooltip, setIsOpenTooltip] = useState(false)
	const [stateVisitor, setKeyStateVisitor, , setStateVisitor] = useRecordState<Visitor>({ ...visitor })

	/**
	 * Submit funtion to send the start and end date of the person received the security training.
	 * @param data 
	 * @returns 
	 */
	const onSubmit = async (data: RegisterTalkVisitorFormType) => {
		try {
			const momentStartDate = mInit(data.start_date).endOf('day')
			const momentEndDate = mInit(data.end_date).endOf('day')

			if(!data.start_date || !data.end_date || momentStartDate.isBefore(now()) || momentEndDate.isSameOrBefore(momentStartDate)) {
				return changeErrorMessage(TEXTS.error_invalid_dates)
			}

			if(isInnerLoading) {
				return
			}
			setIsInnerLoading(true)
			hideMessages()

			await Orchestra.visitorService.saveSecurityTraining(visitor.id, data)
			changeOkMessage(TEXTS.success_set_dates)
			setKeyStateVisitor('startdate_sgsst', data.start_date)
			setKeyStateVisitor('enddate_sgsst', data.end_date)
			setIsInnerLoading(false)
		} catch(catchError) {
			setIsInnerLoading(false)
			if(catchError instanceof AuthError) {
				return openModalLoginForm()
			}
			if(catchError instanceof LocalError || catchError instanceof ValidationError) {
				return changeErrorMessage(catchError.message)
			}
			changeErrorMessage(GTEXTS.error_something_went_wrong)
		}
	}

	/**
	 * Updates the value of the field start date.
	 * @param value 
	 */
	const onChangeStartDate = (value: Moment | null) => {
		setValue('start_date', value?.format('YYYY-MM-DD') || '')
	}

	/**
	 * Updates the value of the field end date.
	 * @param value 
	 */
	const onChangeEndDate = (value: Moment | null) => {
		setValue('end_date', value?.format('YYYY-MM-DD') || '')
	}
	
	const handleTooltipClose = () => {
		setIsOpenTooltip(false)
	}
	const handleTooltipOpen = () => {
		setIsOpenTooltip(true)
	}

	useEffect(() => {
		setStateVisitor({ ...visitor })
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [visitor])

	return {
		isInnerLoading,
		errors,
		message: okMessage,
		error: errorMessage,
		isOpenTooltip,
		stateVisitor,
		register,
		handleSubmit,
		onSubmit,
		onChangeStartDate,
		onChangeEndDate,
		handleTooltipClose,
		handleTooltipOpen,
	}
}