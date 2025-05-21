import {
	Alert,
	Box,
	Button,
	TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ErrorMessage } from "@hookform/error-message";
import { Controller } from "react-hook-form";

//Components
import CounterTextField from "@/components/atoms/CounterTextField";
import FullLoader from "@/components/atoms/FullLoader";
import FormMessages from "@/components/atoms/FormMessages";
import GroupCheckboxInput from "@/components/atoms/GroupCheckboxInput";
import LabelForm from "@/components/atoms/LabelForm";
import SelectLoadedItems from "@/components/atoms/SelectLoadedItems";

//Constants
import { GTRANS } from "@/constants/Globals";

//Hooks
import useGiveEntryVehicleForm from "./useGiveEntryVehicleForm";
import useTranslation from "@/hooks/useTranslation";

//Interfaces and types
import { GiveEntryVehicleFormProps } from "@/interfaces/Molecules";

//Styles
import { BoxButtonsForm, HeadingForm, SpaceBtn } from "@/styles/elements";

//Texts
const TRANS = {
	title: {
		id: "GiveEntryVehicleForm.HeadingForm.TitleGiveEntryVehicle",
		defaultMessage: "Ingresar Vehiculo",
		description: "",
	},
	label_vehicle_number: {
		id: "GiveEntryVehicleForm.Typography.Label.VehicleNumber",
		defaultMessage: "Placa:",
		description: "",
	},
	label_vehicle_type: {
		id: "GiveEntryVehicleForm.Typography.Label.VehicleType",
		defaultMessage: "Tipo del vehiculo:",
		description: "",
	},
	label_vehicle_inspect_points: {
		id: "GiveEntryVehicleForm.Typography.Label.VehicleInspectPoints",
		defaultMessage: "Seleccione los puntos a inspeccionar:",
		description: "",
	},
	label_gate: {
		id: "GiveEntryVehicleForm.Typography.Label.Gate",
		defaultMessage: "Portería:",
		description: "",
	},
	label_entry_comments: {
		id: "GiveEntryVehicleForm.Typography.Label.EntryComments",
		defaultMessage: "Observaciones:",
		description: "",
	},
	help_message_entry_comments: {
		id: "GiveEntryVehicleForm.CounterTextField.HelpMessageEntryComments",
		defaultMessage: "Máximo 200 caracteres.",
		description: "",
	},
	give_entry: {
		id: "GiveEntryVehicleForm.Button.GiveEntryVehicle",
		defaultMessage: "Ingresar",
		description: "",
	},
}

export default function GiveEntryVehicleForm({ visitor, visit, onClose, onSuccessEntryVehicle }: GiveEntryVehicleFormProps) {

	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)
	
	const {
		isInnerLoading,
		errors,
		message,
		error,
		control,
		register,
		handleSubmit,
		onSubmit,
		loadVehicleTypes,
		loadVehicleInspectPoints,
		loadGates,
	} = useGiveEntryVehicleForm(visitor, visit, onSuccessEntryVehicle)

	return (
		<>
			<Box sx={{ position: 'relative' }}>
				{
					isInnerLoading && (
						<FullLoader variant="absolute" />
					)
				}
				<form onSubmit={handleSubmit(onSubmit)}>
					<HeadingForm>{TEXTS.title}</HeadingForm>
					<Box>
						<Grid container spacing={3}>
							{ /* Field: Vehicle number (placa) */}
							<Grid size={12}>
								<LabelForm
									label={TEXTS.label_vehicle_number}
								/>
								<TextField
									{...register("number", { required: GTEXTS.required })}
									fullWidth
									size="small"
								/>
								<ErrorMessage
									errors={errors}
									name="number"
									render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
								/>
							</Grid>
							{ /* Field: Vehicle type */}
							<Grid size={{ xs: 12, md: 12 }}>
								<LabelForm
									label={TEXTS.label_vehicle_type}
								/>
								<Controller
									name="vehicle_type"
									control={control}
									rules={{
										required: GTEXTS.required,
									}}
									render={({ field }) => (
										<SelectLoadedItems
											fetchItems={loadVehicleTypes} 
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
									name="vehicle_type"
									render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
								/>
							</Grid>
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
							{ /* Field: Entry comments */}
							<Grid size={12}>
								<LabelForm
									label={TEXTS.label_entry_comments}
									required={false}
								/>
								<CounterTextField
									textFieldProps={{
										id: "entry_comments",
										...register("entry_comments"),
										fullWidth: true,
										multiline: true,
										rows: 3,
									}}
									helperText={TEXTS.help_message_entry_comments}
								/>
								<ErrorMessage
									errors={errors}
									name="entry_comments"
									render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
								/>
							</Grid>
						</Grid>
					</Box>
					<FormMessages
						message={message}
						error={error}
					/>
					<BoxButtonsForm>
						<Button
							variant="outlined"
							onClick={onClose}
						>{GTEXTS.close}</Button>
						<SpaceBtn />
						<Button
							variant="contained"
							type="submit"
						>{TEXTS.give_entry}</Button>
					</BoxButtonsForm>
				</form>
			</Box>
		</>
	)
}