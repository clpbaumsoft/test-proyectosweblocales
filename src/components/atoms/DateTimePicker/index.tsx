// //React and modules
// import {
// 	Alert,
// 	Box,
// 	Button,
// } from "@mui/material"
// import ScheduleIcon from '@mui/icons-material/Schedule';

// //Hooks
// import useDateTimePicker from "./useDateTimePicker"
// import useTranslation from "@/hooks/useTranslation";

// //Interfaces and types
// import { DateTimePickerProps } from "@/interfaces/Atoms";

// //Texts
// const TRANS = {
// 	select: {
// 		id: "DateTimePicker.Button.Select",
// 		defaultMessage: "Selecciona",
// 		description: "",
// 	}
// }

// export default function DateTimePicker({ defaultValue, onChange, displayFormat, minDate = null }: DateTimePickerProps) {

// 	const TEXTS = useTranslation(TRANS)
	
// 	const {
// 		error,
// 		onCloseError,
// 		getStrValue,
// 		onClickOpenPicker,
// 	} = useDateTimePicker(defaultValue, onChange, displayFormat, minDate)

// 	return (
// 		<>
// 			<Box sx={{ width: '100%' }}>
// 				<div>
// 					<Button 
// 						onClick={onClickOpenPicker}
// 						color="inherit"
// 						variant="outlined"
// 						fullWidth
// 						endIcon={<ScheduleIcon />}
// 					>
// 						{ getStrValue(TEXTS.select) }
// 					</Button>
// 					{
// 						error && (
// 							<Alert icon={false} severity="error" onClose={onCloseError}>{error}</Alert>
// 						)
// 					}
// 				</div>
// 			</Box>
// 		</>
// 	)
// }