import { useState } from "react";

//Interfaces and types
import { SearchPersonFormType } from "@/interfaces/Forms";
import { Visitor } from "@/interfaces/Models";

//Services
import Orchestra from "@/services/Orchestra";
import { Person } from "@/interfaces/General";

export default function useSecurityTalkTrainingForm() {

	const [hasFinished, setHasFinished] = useState(false)
	const [visitor, setVisitor] = useState<Visitor | null>(null)

	/**
	 * Submits the form to search a visitor data using the document information.
	 * @param data 
	 * @returns 
	 */
	const onSearchVisitor = async (data: SearchPersonFormType) : Promise<Person> => {
		return await Orchestra.visitorService.searchVisitor(data.document_type, data.document_or_name)
	}

	/**
	 * Loads the result of the visitor search.
	 * @param visitor 
	 */
	const onLoadResult = (visitor: Person) => {
		setVisitor(visitor ? { ...visitor } as Visitor : null)
		setHasFinished(true)
	}

	return {
		visitor,
		hasFinished,
		onLoadResult,
		onSearchVisitor,
	}
}