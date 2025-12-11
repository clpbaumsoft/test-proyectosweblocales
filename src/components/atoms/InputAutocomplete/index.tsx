import {
	Autocomplete,
	Box,
	TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { InputAutocompleteProps } from "@/interfaces/Atoms";
import { GTRANS } from "@/constants/Globals";
import useInputAutocomplete from "./useInputAutocomplete";
import useTranslation from "@/hooks/useTranslation";

const TRANS = {
	search_dots: {
		id: "InputAutocomplete.TextField.PlaceholderSearchDots",
		defaultMessage: "Buscar...",
		description: "",
	},
}

export default function InputAutocomplete({
	defaultValue,
	onChange,
	emitGetOptions,
	helpText,
}: InputAutocompleteProps) {
	const GTEXTS = useTranslation(GTRANS)
	const TEXTS = useTranslation(TRANS)

	const {
		isInnerLoading,
		selectedValue,
		options,
		onChangeAutocomplete,
		onInputChange,
	} = useInputAutocomplete(onChange, emitGetOptions, defaultValue)

	return (
		<Autocomplete
			getOptionLabel={(option) => option?.label || ""}
			filterOptions={(x) => x}
			options={options}
			autoComplete
			includeInputInList
			filterSelectedOptions
			value={selectedValue}
			loading={isInnerLoading}
			loadingText={GTEXTS.loading_dots}
			noOptionsText={GTEXTS.no_results}
			onChange={onChangeAutocomplete}
			onInputChange={onInputChange}
			sx={{
				'& .MuiOutlinedInput-root': {
					borderRadius: '0.375rem',
					'&:hover .MuiOutlinedInput-notchedOutline': {
						borderColor: '#00575f',
					},
					'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
						borderColor: '#00575f',
						borderWidth: '2px',
					},
				},
				'& .MuiInputBase-input': {
					fontSize: '0.875rem',
					padding: '0.625rem 0.875rem',
				},
			}}
			slotProps={{
				paper: {
					sx: {
						borderRadius: '0.5rem',
						marginTop: '0.25rem',
						boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
					},
				},
			}}
			renderInput={(params) => (
				<TextField 
					{...params} 
					placeholder={defaultValue || TEXTS.search_dots} 
					fullWidth 
					size="small" 
					helperText={helpText}
				/>
			)}
			renderOption={(props, option) => {
				const { key, ...optionProps } = props;
				return (
					<li key={key} {...optionProps}>
						<Grid container sx={{ alignItems: 'center' }}>
							<Grid sx={{ wordWrap: 'break-word' }}>
								<Box component="span"sx={{ fontWeight: 'fontWeightBold' }}>
									{option.label}
								</Box>
							</Grid>
						</Grid>
					</li>
				);
			}}
		/>
	)
}