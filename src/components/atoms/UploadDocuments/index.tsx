import { Box, Typography } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

//Components
import ThumbsFiles from "@/components/atoms/ThumbsFiles";

//Hooks
import useUploadDocuments from "./useUploadDocuments";
import useTranslation from "@/hooks/useTranslation";

//Interfaces and types
import { UploadDocumentsProps } from "@/interfaces/Atoms";

//Styles
import styles from "./UploadDocuments.module.scss";

//Texts
const TRANS = {
	drop_files_here: {
		id: "UploadDocuments.Typography.P.DropFilesHere",
		defaultMessage: "Suelta los archivos aquí",
		description: "",
	},
	drag_and_drop_here: {
		id: "UploadDocuments.Typography.P.DragAndDropHere",
		defaultMessage: "Arrastre y suelte algunos archivos aquí, o haga clic para seleccionar archivos",
		description: "",
	},
	only_accept_message: {
		id: "UploadDocuments.Typography.P.OnlyAcceptMessage",
		defaultMessage: "Solo son permitidos los siguientes archivos: .jpg .png .pdf (Máximo [max] archivos)",
		description: "",
	},
}

export default function UploadDocuments({ files, actions, documentTypes, maxFiles = 10 }: UploadDocumentsProps) {
	
	const TEXTS = useTranslation(TRANS)

	const {
		isDragActive,
		getRootProps,
		getInputProps,
	} = useUploadDocuments(files, actions, maxFiles)

	return (
		<>
			<Box>
				<div {...getRootProps({ className: styles.dropZone })}>
					<input {...getInputProps()} />
					{
						isDragActive ? (
							<Typography component="p">{TEXTS.drop_files_here}</Typography>
						) : (
							<Typography component="p">{TEXTS.drag_and_drop_here}</Typography>
						)
					}
					<Typography component="p">{TEXTS.only_accept_message.replace(/\[max\]/g, String(maxFiles))}</Typography>
					<UploadFileIcon />
				</div>
				<ThumbsFiles 
					files={files} 
					actionsFiles={actions}
					documentTypes={documentTypes}
				/>
			</Box>
		</>
	)
}