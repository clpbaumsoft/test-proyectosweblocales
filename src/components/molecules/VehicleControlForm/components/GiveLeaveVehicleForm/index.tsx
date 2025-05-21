
import {
	Alert,
	Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ErrorMessage } from "@hookform/error-message";
import { Controller } from "react-hook-form";

//Components
import CounterTextField from "@/components/atoms/CounterTextField";
import FormMessages from "@/components/atoms/FormMessages";
import FullLoader from "@/components/atoms/FullLoader";
import GroupCheckboxInput from "@/components/atoms/GroupCheckboxInput";
import LabelForm from "@/components/atoms/LabelForm";
import SelectLoadedItems from "@/components/atoms/SelectLoadedItems";

//Constants
import { GTRANS } from "@/constants/Globals";

//Interfaces and types
import { GiveLeaveVehicleFormProps } from "@/interfaces/Molecules";

//Hooks
import useGiveLeaveVehicleForm from "./useGiveLeaveVehicleForm";
import useTranslation from "@/hooks/useTranslation";

//Styles
import { BoxButtonsForm, SpaceBtn } from "@/styles/elements";

//Texts
const TRANS = {
	label_gate: {
		id: "GiveLeaveVehicleForm.Typography.Label.Gate",
		defaultMessage: "Portería:",
		description: "",
	},
	label_vehicle_inspect_points: {
		id: "GiveLeaveVehicleForm.Typography.Label.VehicleInspectPoints",
		defaultMessage: "Puntos a inspeccionar:",
		description: "",
	},
	label_leave_comments: {
		id: "GiveLeaveVehicleForm.Typography.Label.LeaveComments",
		defaultMessage: "Observaciones:",
		description: "",
	},
	help_message_leave_comments: {
		id: "GiveLeaveVehicleForm.CounterTextField.HelperTextLeaveComments",
		defaultMessage: "Máximo 200 caracteres.",
		description: "",
	},
}

export default function GiveLeaveVehicleForm({ visitor, onCancel }: GiveLeaveVehicleFormProps) {
	
	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)
	
	const {
		isInnerLoading,
		message,
		error,
		errors,
		control,
		isValid,
		handleSubmit,
		onSubmit,
		register,
		loadGates,
		loadVehicleInspectPoints,
	} = useGiveLeaveVehicleForm(visitor, onCancel)
	
	return (
		<>
			<div>
				{
					isInnerLoading && (
						<FullLoader variant="absolute" />
					)
				}
				<form onSubmit={handleSubmit(onSubmit)}>
					<Grid container spacing={3}>
						{ /* Field: Gate */}
						<Grid size={12}>
							<LabelForm
								label={TEXTS.label_gate}
							/>
							<Controller
								name="gate"
								control={control}
								rules={{
									required: GTEXTS.required,
								}}
								render={({ field }) => (
									<SelectLoadedItems
										fetchItems={loadGates} 
										onChangeValue={(itemValue) => field.onChange(itemValue ? parseInt(String(itemValue.value)) : itemValue)}
										defaultValue={field.value}
										inputProps={{
											fullWidth: true,
											size: 'small',
										}}
									/>
								)}
							/>
							<ErrorMessage
								errors={errors}
								name="gate"
								render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
							/>
						</Grid>
						{ /* Field: Vehicle inspect options */}
						<Grid size={12}>
							<LabelForm
								label={TEXTS.label_vehicle_inspect_points}
							/>
							<Controller
								name="vehicle_inspect_points"
								control={control}
								rules={{
									required: GTEXTS.required,
								}}
								render={({ field }) => (
									<GroupCheckboxInput
										fetchItems={loadVehicleInspectPoints} 
										onChange={(itemValues) => {
											field.onChange(itemValues ? itemValues.map((item) => item.value) : [])
										}}
									/>
								)}
							/>
							<ErrorMessage
								errors={errors}
								name="vehicle_inspect_points"
								render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
							/>
						</Grid>
						{ /* Field: Leave comments */}
						<Grid size={12}>
							<LabelForm
								label={TEXTS.label_leave_comments}
							/>
							<CounterTextField
								textFieldProps={{
									id: "leave_comments",
									...register("leave_comments", { required: GTEXTS.required }),
									fullWidth: true,
									multiline: true,
									rows: 3,
								}}
								helperText={TEXTS.help_message_leave_comments}
							/>
							<ErrorMessage
								errors={errors}
								name="leave_comments"
								render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
							/>
						</Grid>
					</Grid>
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