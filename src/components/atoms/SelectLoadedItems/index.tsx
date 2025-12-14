import {
	Autocomplete,
	Skeleton,
	TextField,
	Typography
} from "@mui/material";
import { SelectLoadedItemsProps } from "@/interfaces/Atoms";
import { GTRANS } from "@/constants/Globals";
import useSelectLoadedItems from "./useSelectLoadedItems";
import useTranslation from "@/hooks/useTranslation";

export default function SelectLoadedItems(props: SelectLoadedItemsProps) {
	const GTEXTS = useTranslation(GTRANS)
	
	const {
		isInnerLoading,
		items,
		value,
		onChange,
	} = useSelectLoadedItems(props)
	
	if (isInnerLoading) {
		return <Skeleton variant="rounded" height={40} />
	}
	
	return (
		<>
			{
				items?.length === 0 ? (
					<Typography variant="body2">{GTEXTS.no_results}</Typography>
				) : (
					<Autocomplete
						disabled={props?.disabled || false}
						value={value}
						options={items}
						onChange={onChange}
						renderInput={(params) => <TextField {...params} />}
						noOptionsText={GTEXTS.no_results}
						loadingText={GTEXTS.loading+'...'}
						slotProps={{
							popper: {
								sx: {
									zIndex: 10000,
								},
							},
						}}
						{...props.inputProps}
					/>
				)
			}
		</>
	)
}