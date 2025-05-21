import {
	Checkbox,
	FormControlLabel,
	FormGroup,
	LinearProgress,
} from "@mui/material";

//Hooks
import useGroupCheckboxInput from "./useGroupCheckboxInput";

//Interfaces and types
import { GroupCheckboxInputProps } from "@/interfaces/Atoms";

export default function GroupCheckboxInput(props: GroupCheckboxInputProps) {

	const {
		isInnerLoading,
		items,
		exists,
		onChangeCheckbox,
	} = useGroupCheckboxInput(props)

	if(isInnerLoading) {
		return (
			<>
				<LinearProgress />
			</>
		)	
	}

	return (
		<>
			<FormGroup 
				sx={{
					borderWidth: '1px',
					borderStyle: 'solid',
					borderColor: 'var(--mui-palette-grey-400)',
					borderRadius: 'var(--mui-shape-borderRadius)',
					p: '10px',
				}}
			>
				{
					items.map((item, index: number) => (
						<FormControlLabel 
							key={`itemFormControlLabel${index}`}
							control={<Checkbox defaultChecked={exists(item)} />} 
							label={item.label} 
							value={item.value}
							onChange={() => onChangeCheckbox(item)}
						/>
					))
				}
			</FormGroup>
		</>
	)
}