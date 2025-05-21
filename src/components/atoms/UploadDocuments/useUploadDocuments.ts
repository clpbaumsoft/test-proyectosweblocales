import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

//Interfaces and types
import { ArrayActionsType } from "@/interfaces/General";
import { RowUploadFile } from "@/interfaces/Atoms";

export default function useUploadDocuments(files: RowUploadFile[], actions: ArrayActionsType<RowUploadFile>, limit: number = 10) {

	const onDrop = useCallback((acceptedFiles: File[]) => {
		if(files.length + acceptedFiles.length > limit) {
			return
		}
		for(const nF of acceptedFiles) {
			actions.add({ file: nF, document_type: null, description: null })
		}
	}, [files.length, limit, actions])

	const { acceptedFiles, fileRejections, getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: {
      "image/png": [],
      "image/jpeg": [],
      "application/pdf": []
    },
		onDrop,
		maxFiles: limit,
	})

	return {
		files,
		acceptedFiles,
		fileRejections,
		isDragActive,
		getRootProps,
		getInputProps,
	}
}