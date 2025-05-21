import { Box, Typography } from "@mui/material";

//Interfaces and types
import { LabelItemProps } from "@/interfaces/Atoms";

export default function BoldLabel({ label, value, sx }: LabelItemProps) {
	return (
		<>
			<Box sx={sx}>
				<Typography component="label">{label}</Typography><br/>
				<Typography component="div" fontWeight={700}>{value}</Typography>
			</Box>
		</>
	)
}