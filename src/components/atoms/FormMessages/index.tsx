import { Alert, Box } from "@mui/material";

//Hooks
import useFormMessages from "./useFormMessages";

//Interfaces and types
import { FormMessagesProps } from "@/interfaces/Atoms";

export default function FormMessages({ message, error }: FormMessagesProps) {
	
	const {
		isOpenSuccess,
		isOpenError,
		toggleIsOpenError,
		toggleIsOpenSuccess,
	} = useFormMessages(message, error)
	
	return (
		<>
			<Box sx={{ py: '10px' }}>
				{
					(isOpenSuccess && message) && (
						<Alert severity="success" onClose={toggleIsOpenSuccess}>{message}</Alert>
					)
				}
				{
					(isOpenError && error) && (
						<Alert severity="error" onClose={toggleIsOpenError}>{error}</Alert>
					)
				}
			</Box>
		</>
	)
}