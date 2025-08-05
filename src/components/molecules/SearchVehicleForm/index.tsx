import {
	Box,
	Button,
	TextField,
	Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import SearchIcon from "@mui/icons-material/Search";
import { Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

//Components
import FormMessages from "@/components/atoms/FormMessages";
import FullLoader from "@/components/atoms/FullLoader";
import LabelForm from "@/components/atoms/LabelForm";

//Hooks
import useSearchVehicleForm from "./useSearchVehicleForm";
import useTranslation from "@/hooks/useTranslation";

//Interfaces and types
import { SearchVehicleFormProps } from "@/interfaces/Molecules";

//Styles
import { BoxButtonsForm } from "@/styles/elements";

//Texts
const TRANS = {
	label_plate_number: {
		id: "SearchVehicleForm.TextField.Label.PlateNumber",
		defaultMessage: "Placa del vehículo:",
		description: "",
	},
	placeholder_plate_number: {
		id: "SearchVehicleForm.TextField.Placeholder.PlateNumber",
		defaultMessage: "Ingrese la placa del vehículo",
		description: "",
	},
	button_search: {
		id: "SearchVehicleForm.Button.Search",
		defaultMessage: "Buscar",
		description: "",
	},
	searching: {
		id: "SearchVehicleForm.Typography.Searching",
		defaultMessage: "Buscando...",
		description: "",
	},
}

export default function SearchVehicleForm({ onSearch, onResult }: SearchVehicleFormProps) {

	const TEXTS = useTranslation(TRANS)
	
	const {
		isLoading,
		control,
		errors,
		formMessages,
		handleSubmit,
		onSubmit,
	} = useSearchVehicleForm(onSearch, onResult)

	return (
		<>
			<Box component="form" onSubmit={handleSubmit(onSubmit)}>
				<Grid container spacing={3}>
					<Grid size={{ xs: 12, md: 12 }}>
						<LabelForm label={TEXTS.label_plate_number} />
						<Controller
							control={control}
							name="plateNumber"
							render={({ field }) => (
								<TextField
									{...field}
									fullWidth
									placeholder={TEXTS.placeholder_plate_number}
									error={!!errors.plateNumber}
									disabled={isLoading}
									InputProps={{
										style: { textTransform: 'uppercase' }
									}}
									onChange={(e) => field.onChange(e.target.value.toUpperCase())}
								/>
							)}
						/>
						<ErrorMessage
							errors={errors}
							name="plateNumber"
							render={({ message }) => (
								<Typography variant="caption" color="error">{message}</Typography>
							)}
						/>
					</Grid>
					<Grid size={{ xs: 12, md: 12 }}>
						<BoxButtonsForm>
							<Button
								type="submit"
								variant="contained"
								startIcon={<SearchIcon />}
								disabled={isLoading}
								fullWidth
							>
								{isLoading ? TEXTS.searching : TEXTS.button_search}
							</Button>
						</BoxButtonsForm>
					</Grid>
				</Grid>
			</Box>

			<FormMessages 
				message={formMessages.successMessage} 
				error={formMessages.errorMessage} 
			/>
			
			{isLoading && <FullLoader />}
		</>
	)
}
