//Constants
import { GTRANS } from "@/constants/Globals";

//Errors
import LocalError from "@/errors/LocalError";

//Hooks
import useTranslation from "@/hooks/useTranslation";

//Interfaces and types
import { Visitor } from "@/interfaces/Models";

//Sevices
import Orchestra from "@/services/Orchestra";

export default function useCardVisitorPhoto(visitor: Visitor | null) {
	
	const GTEXTS = useTranslation(GTRANS)
	
	/**
	 * Saves the photo of the visitor data.
	 */
	const onSavePhotoVisitor = (file: File) => {
		if(!visitor) {
			throw new LocalError(GTEXTS.error_something_went_wrong)
		}
		
		return Orchestra.visitorService.changePhoto(visitor.id, file)
	}
	
	return {
		onSavePhotoVisitor,
	}
}