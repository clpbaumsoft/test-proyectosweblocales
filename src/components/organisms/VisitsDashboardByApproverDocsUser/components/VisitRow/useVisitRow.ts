//Hooks
import useRecordState from "@/hooks/useRecordState";

//Interfaces and types
import { VisitRow } from "@/interfaces/Atoms";

export default function useVisitRow(row: VisitRow) {

	const [ stateVisit, setStateVisit ] = useRecordState<VisitRow>({ ...row })

	return {
		stateVisit,
		setStateVisit,
	}
}