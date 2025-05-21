//Context
import TableVisitsProviderContext from "./context";

//Hooks
import useTableVisitsProvider from "./useTableVisitsProvider";

//Interfaces and types
import { BaseComponentProps } from "@/interfaces/General";

export default function TableVisitsProvider({ children }: BaseComponentProps) {
	const values = useTableVisitsProvider()
	return (
		<TableVisitsProviderContext.Provider value={values}>
			{children}
		</TableVisitsProviderContext.Provider>
	)
}