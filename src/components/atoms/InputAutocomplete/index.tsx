import {
	Autocomplete,
	Box,
	Paper,
	TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

//Components
import { InputAutocompleteProps } from "@/interfaces/Atoms";

//Constants
import { GTRANS } from "@/constants/Globals";

//Hooks
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
	console.log(selectedValue, "ASDASD")

	return (
		<Autocomplete
			getOptionLabel={(option) => option?.label || ""}
			filterOptions={(x) => x}
			slots={{
				paper: Paper,
			}}
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
			renderInput={(params) => (
				<TextField 
					{...params} 
					placeholder={typeof defaultValue === 'string' && defaultValue || TEXTS.search_dots} 
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
								<Box
									component="span"
									sx={{
										fontWeight: 'fontWeightBold',
									}}
								>
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