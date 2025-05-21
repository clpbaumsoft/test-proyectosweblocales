//Interfaces and types
import { ArrayActionsType } from "@/interfaces/General";
import { RowUploadFile } from "@/interfaces/Atoms";

export default function useItemThumbFile(itemFile: RowUploadFile, indexFile: number, actionsFiles: ArrayActionsType<RowUploadFile>) {

	const onChangeDocumentType = (newDocumentType: number | string) => {
		if(newDocumentType) {
			actionsFiles.set(indexFile, {...itemFile, document_type: newDocumentType as number})
		}
	}
	
	const onChangeDocumentDescription = (newDescription: string) => {
		actionsFiles.set(indexFile, {...itemFile, description: newDescription})
	}

	return {
		onChangeDocumentType,
		onChangeDocumentDescription,
	}
}