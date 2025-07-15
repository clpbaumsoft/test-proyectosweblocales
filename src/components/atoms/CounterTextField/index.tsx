import { Box, FormHelperText, TextField, Typography } from "@mui/material";

//Hooks
import useCounterTextField from "./useCounterTextField";
import useTranslation from "@/hooks/useTranslation";

//Interfaces and types
import { CounterTextFieldProps } from "@/interfaces/Atoms";
import { SpaceBtn } from "@/styles/elements";

//Texts
const TRANS = {
	label_counter: {
		id: "CounterTextField.Typography.P.NumberOfChars",
		defaultMessage: "[number] caracteres.",
		description: "",
	}
}

export default function CounterTextField({ textFieldProps, helperText, isHidden }: CounterTextFieldProps) {

	const TEXTS = useTranslation(TRANS)
	
	const {
		counter,
		handleOnChange,
	} = useCounterTextField(textFieldProps.onChange)
	return (
		<>
		{
			!isHidden &&
			<Box 
				sx={{
					position: 'relative',
				}}
			>
				<TextField 
					{...textFieldProps} 
					onChange={handleOnChange}
				/>
				<Box
					sx={(theme) => ({
						pt: '3px',
						[theme.breakpoints.up('md')]: {
							display: 'flex',
							justifyContent: 'space-between',
						},
					})}
				>
					{
						helperText && (
							<>
								<FormHelperText sx={{ mt: 0 }}>{helperText}</FormHelperText>
								<SpaceBtn />
							</>
						)
					}
					<div />
					<Typography
						component="p"
						sx={(theme) => ({
							fontSize: '0.8rem',
							marginLeft: 'auto',
							display: 'table',
							[theme.breakpoints.up('md')]: {
								marginLeft: 0,
							},
						})}
					>{TEXTS.label_counter.replace('[number]', String(counter))}</Typography>
				</Box>
			</Box>
		}
		</>
	)
}