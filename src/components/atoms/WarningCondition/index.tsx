import { Alert } from "@mui/material";

//Interfaces and types
import { WarningConditionProps } from "@/interfaces/Atoms";

export default function WarningCondition({ condition, children, severity = 'error' }: WarningConditionProps) {

	if(!condition) {
		return (
			<Alert severity={severity}>{children}</Alert>
		)
	}

	return (
		<>
			{children}
		</>
	)
}