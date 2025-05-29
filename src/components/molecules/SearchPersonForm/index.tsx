import { Controller } from "react-hook-form";
import {
	Alert,
	Box,
	Button,
	FormControl,
	InputLabel,
	TextField,
} from "@mui/material";

//Components
import FullLoader from "@/components/atoms/FullLoader";
import DropdownLoadedItems from "@/components/atoms/DropdownLoadedItems";

//Constants
import { GTRANS, IDENTIFICATION_TYPE_CODE_CC } from "@/constants/Globals";

//Hooks
import useSearchPersonForm from "./useSearchPersonForm";
import useTranslation from "@/hooks/useTranslation";

//Interfaces and types
import { SearchPersonFormProps } from "@/interfaces/Molecules";

//Styles
import { BoxSearchPerson, SpaceFields } from "@/styles/elements";
import { ErrorMessage } from "@hookform/error-message";

//Texts
const TRANS = {
	label_document_type: {
		id: "SearchPersonForm.InputLabel.DocumentType",
		defaultMessage: "Tipo documento",
		description: "",
	},
	label_document: {
		id: "SearchPersonForm.TextField.Label.Document",
		defaultMessage: "Documento / Nombre",
		description: "",
	},
	search: {
		id: "SearchPersonForm.Button.Search",
		defaultMessage: "Buscar",
		description: "",
	},
	help_text_document: {
		id: "SearchPersonForm.TextField.HelpTextDocument",
		defaultMessage: "Escribe aqui el documento o nombre de la persona.",
		description: "",
	},
}

export default function SearchPersonForm({ onSearch, onResult, onFail }: SearchPersonFormProps) {
	
	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)

	const {
		isInnerLoading,
		control,
		errors,
		register,
		handleSubmit,
		onSubmit,
		loadIdentificationTypes,
		getIdByCode,
	} = useSearchPersonForm(onSearch, onResult, onFail)
	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Box sx={{ position: 'relative' }}>
					{
						isInnerLoading && (
							<FullLoader variant="absolute" />
						)
					}
					<div>
						<BoxSearchPerson>
							<FormControl 
								sx={(theme) => ({
									display: 'table',
									[theme.breakpoints.down('md')]: {
										width: '100%',
									},
								})}
							>
								<InputLabel>{TEXTS.label_document_type}</InputLabel>
								<Controller
									name="document_type"
									control={control}
									rules={{
										required: GTEXTS.required,
									}}
									render={({ field }) => (
										<DropdownLoadedItems
											fetchItems={loadIdentificationTypes} 
											onChangeValue={(itemValue) => field.onChange(itemValue ? itemValue.value : itemValue)}
											defaultValue={getIdByCode(IDENTIFICATION_TYPE_CODE_CC)} 
											selectProps={{
												label: TEXTS.label_document_type,
												sx: { minWidth: '170px', width: '100%' },
												displayEmpty: false,
											}}
											skeletonProps={{
												height: '55px',
												sx: { minWidth: '170px', width: '100%' },
											}}
										/>
									)}
								/>
								<ErrorMessage
									errors={errors}
									name="document_type"
									render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
								/>
							</FormControl>
							<SpaceFields />
							<Box sx={{ width: '100%' }}>
								<TextField 
									type="search"
									label={TEXTS.label_document} 
									variant="outlined" 
									{...register("document_or_name", { required: GTEXTS.required })} 
									helperText={TEXTS.help_text_document}
									fullWidth
								/>
								<ErrorMessage
									errors={errors}
									name="document_or_name"
									render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
								/>
							</Box>
						</BoxSearchPerson>
					</div>
					<Button 
						id="search-person-button"
						type="submit" 
						variant="contained"
						fullWidth
						sx={{ mt: '15px' }}
					>{TEXTS.search}</Button>
				</Box>
			</form>
		</>
	)
}