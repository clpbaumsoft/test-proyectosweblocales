import { Alert } from "@mui/material";

//Interfaces and types
import { WarningConditionProps } from "@/interfaces/Atoms";

export default function WarningCondition({ condition, children, severity = 'error', ...props }: WarningConditionProps) {

	if(!condition) {
		return (
			<Alert severity={severity} {...props}>{children}</Alert>
		)
	}

	return (
		<>
			{children}
		</>
	)
}