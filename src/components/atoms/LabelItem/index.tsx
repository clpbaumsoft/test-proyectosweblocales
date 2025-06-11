import { Box, FormHelperText, Typography } from "@mui/material";

//Interfaces and types
import { LabelItemProps } from "@/interfaces/Atoms";

export default function LabelItem({ label, value, sx, pl }: LabelItemProps) {
	return (
		<>
			<Box 
				sx={{
					borderLeft: '2px solid var(--mui-palette-grey-400)',
					pl: pl ? pl : '10px',
					...sx,
				}}
			>
				<Typography component="label">{label}</Typography>
				<FormHelperText component="div" sx={{ ml: pl ? pl : '15px'}}>{value}</FormHelperText>
			</Box>
		</>
	)
}