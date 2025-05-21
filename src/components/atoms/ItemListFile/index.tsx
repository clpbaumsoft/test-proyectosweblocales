import {
	Box,
	FormControl,
	InputLabel,
	ListItemText,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";

//Interfaces and types
import { ItemListFileProps } from "@/interfaces/Atoms";

//Hooks
import useItemListFile from "./useItemListFile";
import useTranslation from "@/hooks/useTranslation";

//Texts
const TRANS = {
	label_document_type: {
		id: "ItemListFile.InputLabel.DocumentType",
		defaultMessage: "Tipo *",
		description: "",
	},
	label_description: {
		id: "ItemListFile.InputLabel.Description",
		defaultMessage: "Descripción",
		description: "",
	},
	helper_text_description: {
		id: "ItemListFile.TextField.HelperTextDescription",
		defaultMessage: "Máximo 60 caracteres.",
		description: "",
	},
}

export default function ItemListFile({
	label,
	itemsSelector,
	onChangeDescription,
	onChangeSelector,
}: ItemListFileProps) {

	const TEXTS = useTranslation(TRANS)

	const {
		descriptionValue,
		selectValue,
		onChangeDropdown,
		onChangeTextField,
	} = useItemListFile(onChangeSelector, onChangeDescription)

	return (
		<>
			<ListItemText 
				primary={
					<div>
						{label}<br/>
						<Box sx={{ display: 'flex' }}>
							<Box>
								<FormControl fullWidth size="small">
									<InputLabel>{TEXTS.label_document_type}</InputLabel>
									<Select
										value={selectValue}
										label={TEXTS.label_document_type}
										onChange={onChangeDropdown}
										sx={{ minWidth: 150 }}
									>
										{
											itemsSelector.map((itemSelector, indexItemSelector: number) => (
												<MenuItem key={`indexItemSelector${indexItemSelector}`} value={itemSelector.value}>{itemSelector.label}</MenuItem>
											))
										}
									</Select>
								</FormControl>
							</Box>
							<Box sx={{ width: 15 }}/>
							<Box>
								<TextField 
									label={TEXTS.label_description} 
									variant="outlined" 
									value={descriptionValue} 
									onChange={onChangeTextField} 
									sx={{ minWidth: 280 }}
									helperText={TEXTS.helper_text_description}
									size="small"
								/>
							</Box>
						</Box>
					</div>
				} 
			/>
		</>
	)
}