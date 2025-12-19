import {
	Button,
} from "@mui/material";
import { Controller } from "react-hook-form";
import CounterTextField from "@/components/atoms/CounterTextField";
import FullLoader from "@/components/atoms/FullLoader";
import FormMessages from "@/components/atoms/FormMessages";
import GroupCheckboxInput from "@/components/atoms/GroupCheckboxInput";
import LabelForm from "@/components/atoms/LabelForm";
import SelectLoadedItems from "@/components/atoms/SelectLoadedItems";
import { GTRANS } from "@/constants/Globals";
import useGiveEntryVehicleForm from "./useGiveEntryVehicleForm";
import useTranslation from "@/hooks/useTranslation";
import { GiveEntryVehicleFormProps } from "@/interfaces/Molecules";
import { green } from "@mui/material/colors";
import { TRANS } from "./constants";
import { Input } from "@/components/atomsv2/Input";
import FieldErrorMessage from "@/components/atomsv2/FieldErrorMessage";

export default function GiveEntryVehicleForm({ visitor, visit, isEmployee = false, onClose, onSuccessEntryVehicle }: GiveEntryVehicleFormProps) {
	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)
	
	const {
		isInnerLoading,
		errors,
		message,
		error,
		control,
		register,
		handleApprove,
		handleReject,
		loadVehicleTypes,
		loadVehicleInspectPoints,
		loadGates,
	} = useGiveEntryVehicleForm(visitor, visit, isEmployee, onSuccessEntryVehicle)

	return (
		<div className="relative">
			{isInnerLoading && (
				<FullLoader variant="absolute" />
			)}
			<form>
				<h1 className="font-inter text-[18px] font-semibold text-start mb-4">
					{TEXTS.title}
				</h1>
				<div className="flex flex-col">
					<div className="w-full">
						<LabelForm label={TEXTS.label_vehicle_number} />
						<Input 
							type="text"
							{...register("number", { required: GTEXTS.required })}
							onChange={(e) => {
								const target = e.target as HTMLInputElement;
								target.value = target.value.toUpperCase();
							}}
						/>
						<FieldErrorMessage errorMessage={errors?.number?.message} />
					</div>
					<div className="w-full">
						<LabelForm label={TEXTS.label_vehicle_type} />
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
						<FieldErrorMessage errorMessage={errors?.vehicle_type?.message} />
					</div>
					<div className="w-full">
						<LabelForm label={TEXTS.label_gate} />
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
						<FieldErrorMessage errorMessage={errors?.gate?.message} />
					</div>
					<div className="w-full">
						<LabelForm label={TEXTS.label_vehicle_inspect_points} />
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
						<FieldErrorMessage errorMessage={errors?.vehicle_inspect_points?.message} />
					</div>
					<div className="w-full">
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
						<FieldErrorMessage errorMessage={errors?.entry_comments?.message} />
					</div>
				</div>
				<FormMessages
					message={message}
					error={error}
				/>
				<div className="flex justify-end gap-2">
					<Button
						variant="contained"
						sx={{ background: "#CD181B" }}
						onClick={handleReject}
					>{TEXTS.NO_give_entry}
					</Button>
					<Button
						variant="contained"
						sx={{ background: green }}
						onClick={handleApprove}
					>{TEXTS.give_entry}
					</Button>
					<Button
						variant="outlined"
						onClick={onClose}
					>{GTEXTS.close}</Button>
				</div>
			</form>
		</div>
	)
}