import {
	List,
} from "@mui/material";

//Components
import ItemThumbFile from "./components/ItemThumbFile";

//Interfaces and types
import { RowUploadFile, ThumbsFilesProps } from "@/interfaces/Atoms";


export default function ThumbsFiles({ files, actionsFiles, documentTypes }: ThumbsFilesProps) {
	return (
		<>
			<List>
				{
					files.map((itemFile: RowUploadFile, indexFile: number) => (
						<ItemThumbFile 
							key={`itemThumbFile${indexFile}`}
							itemFile={itemFile} 
							indexFile={indexFile}
							actionsFiles={actionsFiles}
							documentTypes={documentTypes}
						/>
					))
				}
			</List>
		</>
	)
}