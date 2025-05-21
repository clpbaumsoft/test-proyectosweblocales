//React and modules
import { createContext } from "react";

//Hooks

//Interfaces and types
import { 
	ArlCompany,
	CareCompany,
	City,
	IdentificationType,
	VisitorType,
} from "@/interfaces/Models";


type TableVisitsProviderContextType = {
	listVisitorTypes: VisitorType[];
	setListVisitorTypes: (list: VisitorType[]) => void | (() => void);
	
	listIdentificationTypes: IdentificationType[];
	setListIdentificationTypes: (list: IdentificationType[]) => void | (() => void);

	listCities: City[];
	setListCities: (list: City[]) => void | (() => void);

	listArlCompanies: ArlCompany[];
	setListArlCompanies: (list: ArlCompany[]) => void | (() => void);

	listCareCompanies: CareCompany[];
	setListCareCompanies: (list: CareCompany[]) => void | (() => void);
}

const TableVisitsProviderContext = createContext<TableVisitsProviderContextType | null>(null)
export default TableVisitsProviderContext