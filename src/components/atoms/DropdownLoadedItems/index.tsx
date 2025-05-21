//React and modules
import {
	MenuItem,
	Select,
	Skeleton,
	Typography,
} from "@mui/material";

//Constants
import { GTRANS } from "@/constants/Globals";

//Hooks
import useDropdownLoadedItems from "./useDropdownLoadedItems";
import useTranslation from "@/hooks/useTranslation";

//Interfaces and types
import { DropdownLoadedItemsProps } from "@/interfaces/Organisms";

export default function DropdownLoadedItems(props: DropdownLoadedItemsProps) {
	
	const GTEXTS = useTranslation(GTRANS)

	const {
		isInnerLoading,
		items,
		value,
		onChange,
		renderValueSelect,
	} = useDropdownLoadedItems(props)
	
	if(isInnerLoading) {
		return (
			<>
				<Skeleton variant="rounded" height={40} {...props.skeletonProps} />
			</>
		)	
	}
	
	return (
		<>
			{
				items.length === 0 ? (
					<Typography variant="body2">{GTEXTS.no_results}</Typography>
				) : (
					<Select 
						displayEmpty
						{...props.selectProps} 
						onChange={onChange} 
						renderValue={renderValueSelect} 
						value={value ? value.value : ""}
					>
						{
							items.map((item, index: number) => (
								<MenuItem key={`itemDropdownLoaded${index}`} value={item.value}>{item.label}</MenuItem>
							))
						}
					</Select>
				)
			}
		</>
	)
}