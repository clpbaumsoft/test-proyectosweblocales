import FullLoader from "@/components/atoms/FullLoader";
import { GTRANS } from "@/constants/Globals";
import useTranslation from "@/hooks/useTranslation";
import { CancelVisitFormProps } from "@/interfaces/Molecules";
import { DialogTitle } from "@headlessui/react";
import { ExclamationTriangleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { TRANS } from "./constants";
import useCancelVisitForm from "./useCancelVisitForm";

export default function CancelVisitForm({ visitId, setRowData, onCancel, omitDobleCheck = false }: CancelVisitFormProps & { omitDobleCheck?: boolean }) {
	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)

	const {
		isInnerLoading,
		isValid,
		message,
		error,
		errors,
		register,
		handleSubmit,
		onSubmitCancelVisit,
	} = useCancelVisitForm(visitId, setRowData, omitDobleCheck);

   useEffect(() => {
        if (message) {
			setTimeout(() => {
            onCancel();
        	}, 800);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message]);
	
	return (
		<div>
			<div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
				<button
					type="button"
					onClick={onCancel}
					className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600"
				>
					<span className="sr-only">Close</span>
					<XMarkIcon aria-hidden="true" className="size-6" />
				</button>
			</div>
			{isInnerLoading && (
				<FullLoader variant="absolute" />
			)}
			<div className="sm:flex sm:items-start">
				<div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
					<ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" />
				</div>
				<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
					<DialogTitle as="h3" className="text-base font-semibold text-gray-900">
						Eliminar visita
					</DialogTitle>
					<div className="mt-2">
						<p className="text-sm text-gray-500">
							{GTEXTS.message_confirm_noback_action}
						</p>
					</div>
				</div>
			</div>
			<form onSubmit={handleSubmit(onSubmitCancelVisit)}>
				{/* <CounterTextField
					isHidden={true}
					textFieldProps={{
						id: "reason_cancel",
						...register("reason_cancel", { required: GTEXTS.required }),
						fullWidth: true,
						multiline: true,
						rows: 3,
					}}
					helperText={TEXTS.help_message_cancel}
				/>
				<ErrorMessage
					errors={errors}
					name="reason_cancel"
					render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
				/>
				<FormMessages
					message={message}
					error={error}
				/> */}
				<div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
					<button
						type="submit"
						className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
					>
						Eliminar
					</button>
					<button
						type="button"
						onClick={onCancel}
						className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
					>
						Cerrar
					</button>
				</div>
			</form>
		</div>
	)
}