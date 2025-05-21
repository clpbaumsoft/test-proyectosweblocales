
import {
	Alert,
	Button,
} from "@mui/material";
import { ErrorMessage } from "@hookform/error-message";

//Components
import CounterTextField from "@/components/atoms/CounterTextField";
import FormMessages from "@/components/atoms/FormMessages";
import FullLoader from "@/components/atoms/FullLoader";
import LabelForm from "@/components/atoms/LabelForm";

//Constants
import { GTRANS } from "@/constants/Globals";

//Interfaces and types
import { CancelVisitFormProps } from "@/interfaces/Molecules";

//Hooks
import useCancelVisitForm from "./useCancelVisitForm";
import useTranslation from "@/hooks/useTranslation";

//Styles
import { BoxButtonsForm, SpaceBtn } from "@/styles/elements";

//Texts
const TRANS = {
	label_reason_cancel: {
		id: "CancelVisitForm.LabelForm.ReasonCancel",
		defaultMessage: "Escribe el motivo de la cancelación:",
		description: "",
	},
	help_message_cancel: {
		id: "CancelVisitForm.CounterTextField.HelpMessageCancel",
		defaultMessage: "Máximo 200 caracteres.",
		description: "",
	},
}

export default function CancelVisitForm({ visitId, setRowData, onCancel }: CancelVisitFormProps) {
	
	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)
	
	const {
		isInnerLoading,
		message,
		error,
		errors,
		isValid,
		handleSubmit,
		onSubmit,
		register,
	} = useCancelVisitForm(visitId, setRowData)
	
	return (
		<>
			<div>
				{
					isInnerLoading && (
						<FullLoader variant="absolute" />
					)
				}
				<form  onSubmit={handleSubmit(onSubmit)}>
					<LabelForm
						label={TEXTS.label_reason_cancel}
					/>
					<CounterTextField
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
					/>
					<BoxButtonsForm>
						<Button
							onClick={onCancel}
							variant="outlined"
						>
							{GTEXTS.close}
						</Button>
						<SpaceBtn />
						<Button
							type="submit"
							variant="contained"
							disabled={!isValid}
						>
							{GTEXTS.save}
						</Button>
					</BoxButtonsForm>
				</form>
			</div>
		</>
	)
}