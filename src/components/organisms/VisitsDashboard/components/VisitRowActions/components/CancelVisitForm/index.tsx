
import {
	Alert,
	Button,
	// TextField,
	Typography,
} from "@mui/material";
// import { ErrorMessage } from "@hookform/error-message";

//Components
import CounterTextField from "@/components/atoms/CounterTextField";
import FormMessages from "@/components/atoms/FormMessages";
import FullLoader from "@/components/atoms/FullLoader";
// import LabelForm from "@/components/atoms/LabelForm";

//Constants
import { GTRANS } from "@/constants/Globals";

//Interfaces and types
import { CancelVisitFormProps } from "@/interfaces/Molecules";

//Hooks
import useCancelVisitForm from "./useCancelVisitForm";
import useTranslation from "@/hooks/useTranslation";

//Styles
import { BoxButtonsForm, SpaceBtn } from "@/styles/elements";
import { ErrorMessage } from "@hookform/error-message";
import { useEffect } from "react";

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
		<>
			<div>
				{
					isInnerLoading && (
						<FullLoader variant="absolute" />
					)
				}
				<form  onSubmit={handleSubmit(onSubmitCancelVisit)}>
					<Typography
					variant="h6"
					paddingBottom={2}
					>
						{GTEXTS.message_confirm_noback_action}
					</Typography>
	
					<CounterTextField
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
					/>
					<BoxButtonsForm>
						<Button
							onClick={onCancel}
							variant="outlined"
						>
							{GTEXTS.no}
						</Button>
						<SpaceBtn />
						<Button
							type="submit"
							variant="contained"
							disabled={!isValid}
						>
							{GTEXTS.yes}
						</Button>
					</BoxButtonsForm>
				</form>
			</div>
		</>
	)
}