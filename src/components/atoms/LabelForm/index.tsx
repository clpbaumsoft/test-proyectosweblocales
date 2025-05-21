import { Box, Typography } from "@mui/material";

//Interfaces and types
import { LabelFormProps } from "@/interfaces/Atoms";

export default function LabelForm({ label, required = true }: LabelFormProps) {
	return (
		<>
			<Typography component="label" variant="body2">
				{label} {required && <Box component="span" sx={{ color: 'error.main' }}>*</Box>}
			</Typography>
		</>
	)
}