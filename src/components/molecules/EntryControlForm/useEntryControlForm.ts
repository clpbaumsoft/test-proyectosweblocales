import { useEffect, useState } from "react";

//Events
import EntryControlEvents from "@/events/EntryControlEvents";

//Interfaces and types
import { SearchPersonFormType } from "@/interfaces/Forms";
import { Visitor } from "@/interfaces/Models";

//Services
import Orchestra from "@/services/Orchestra";
import { Person } from "@/interfaces/General";

export default function useEntryControlForm() {
	
	const [visitor, setVisitor] = useState<Visitor | null>(null)
	const [hasFinished, setHasFinished] = useState(false)

	/**
	 * Submits the form to search the active visits of a visitor.
	 * @param data 
	 * @returns 
	 */
	const onSearchVisitor = async (data: SearchPersonFormType) : Promise<Visitor | null> => {
		return await Orchestra.visitorService.searchVisitor(data.document_type, data.document_or_name, [
			'active_visits',
			'active_entry',
			'active_entry.visit_visitor.visit',
			'active_entry_vehicle',
			'active_entry_vehicle.gate',
			'active_entry_vehicle.inspect_points',
			'creator',
		])
	}

	/**
	 * Loads the result of the visitor search.
	 * @param visitor 
	 */
	const onLoadResult = (visitor: Person) => {
		setVisitor(visitor ? { ...visitor } as Visitor : null)
		setHasFinished(true)
	}
	
	useEffect(() => {
    const handlerUpdateVisitor = (visitor: Visitor) => {
			setVisitor({ ...visitor })
    }

    EntryControlEvents.updateVisitor.on('update_visitor', handlerUpdateVisitor)

    return () => {
      EntryControlEvents.updateVisitor.off('update_visitor', handlerUpdateVisitor)
    }
  }, [])

	return {
		hasFinished,
		visitor,
		onLoadResult,
		onSearchVisitor,
	}
}