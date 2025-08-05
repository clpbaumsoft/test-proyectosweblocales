import {
	Alert,
	Box,
	Button,
	// TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ErrorMessage } from "@hookform/error-message";
import { Controller } from "react-hook-form";

//Components
import FullLoader from "@/components/atoms/FullLoader";
import FormMessages from "@/components/atoms/FormMessages";
import LabelForm from "@/components/atoms/LabelForm";
import SelectLoadedItems from "@/components/atoms/SelectLoadedItems";

//Constants
import { GTRANS } from "@/constants/Globals";

//Hooks
import useTranslation from "@/hooks/useTranslation";
import useGiveEntryToOtherBranchForm from "./useGiveEntryToOtherBranchForm";

//Interfaces and types
import { GiveEntryToOtherBranchProps } from "@/interfaces/Molecules";

//Styles
import { BoxButtonsForm, HeadingForm, SpaceBtn } from "@/styles/elements";

//Texts
const TRANS = {
	title: {
		id: "GiveEntryVehicleForm.HeadingForm.TitleGiveEntryVehicle",
		defaultMessage: "Ingresa la portería de la nueva sede",
		description: "",
	},
	label_gate: {
		id: "GiveEntryVehicleForm.Typography.Label.Gate",
		defaultMessage: "Portería:",
		description: "",
	},
	give_entry: {
		id: "GiveEntryVehicleForm.Button.GiveEntryVehicle",
		defaultMessage: "Ingresar",
		description: "",
	},
}

export default function GiveEntryToOtherBranch({ visitor, visit, onClose }: GiveEntryToOtherBranchProps) {

	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)
	
	const {
		isInnerLoading,
		errors,
		message,
		error,
		control,
		// register,
		handleSubmit,
		onSubmit,
		loadGates,
	} = useGiveEntryToOtherBranchForm(visitor, visit)

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
							{ /* Field: Gate */}
							<Grid size={12}>
								<LabelForm
									label={TEXTS.label_gate}
								/>
								<Controller
									name="gate_selected"
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
									name="gate_selected"
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