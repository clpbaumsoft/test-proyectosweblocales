
import {
	Alert,
	Divider,
	IconButton,
	ListItem,
	Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

//Components
import ItemListFile from "@/components/atoms/ItemListFile";

//Constants
import { GTRANS } from "@/constants/Globals";

//Interfaces and types
import { ItemThumbFileProps } from "@/interfaces/Atoms";
import { DocumentType } from "@/interfaces/Models";

//Hooks
import useItemThumbFile from "./useItemThumbFile";
import useTranslation from "@/hooks/useTranslation";

//Lib
import { formatFileSize } from "@/lib/Helpers";

export default function ItemThumbFile({
	itemFile, 
	indexFile,
	actionsFiles,
	documentTypes,
}: ItemThumbFileProps) {
	
	const GTEXTS = useTranslation(GTRANS)

	const {
		onChangeDocumentDescription,
		onChangeDocumentType,
	} = useItemThumbFile(
		itemFile, 
		indexFile,
		actionsFiles
	)

	return (
		<>
			<ListItem
				secondaryAction={
					<>
						{
							(!itemFile?.isSaved || itemFile.hasError) && (
								<IconButton 
									edge="end" 
									aria-label={GTEXTS.delete}
									onClick={() => actionsFiles.remove(indexFile)}
								>
									<DeleteIcon />
								</IconButton>
							)
						}
					</>
				}
			>
				<ItemListFile
					label={
						<div>
							<Typography component="label">{`${indexFile+1}. ${itemFile.file.name} (${formatFileSize(itemFile.file.size)})`}</Typography>
							{
								(!!itemFile.isSaved && !itemFile.hasError) && (
									<TaskAltIcon color="success" sx={{ ml: "5px" }} />
								)
							}
							{
								(!!itemFile.hasError) && (
									<Alert icon={false} severity="error">{itemFile.message}</Alert>
								)
							}
						</div>
					}
					itemsSelector={documentTypes.map((docType: DocumentType) => ({ label: docType.description, value: docType.id }))}
					onChangeDescription={onChangeDocumentDescription}
					onChangeSelector={onChangeDocumentType}
				/>
			</ListItem>
			<Divider />
		</>
	)
}