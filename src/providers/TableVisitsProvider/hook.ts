import { useContext } from "react";

//Providers
import TableVisitsProviderContext from "./context";

export default function useTableVisitsProviderHook() {
	const context = useContext(TableVisitsProviderContext)
	if (!context) {
		throw new Error("useTableVisitsProviderHook must be used within an TableVisitsProvider");
	}
	return context;
}