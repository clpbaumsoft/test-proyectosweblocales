
//React and Modules
import { useState } from "react";

//Interfaces and types
import {
	ArlCompany,
	CareCompany,
	City,
	IdentificationType,
	VisitorType,
} from "@/interfaces/Models";

export default function useTableVisitsProvider() {

	const [listVisitorTypes, setListVisitorTypes] = useState<VisitorType[]>([])
	const [listIdentificationTypes, setListIdentificationTypes] = useState<IdentificationType[]>([])
	const [listCities, setListCities] = useState<City[]>([])
	const [listArlCompanies, setListArlCompanies] = useState<ArlCompany[]>([])
	const [listCareCompanies, setListCareCompanies] = useState<CareCompany[]>([])


	return {
		listVisitorTypes,
		setListVisitorTypes,
		
		listIdentificationTypes,
		setListIdentificationTypes,

		listCities,
		setListCities,

		listArlCompanies,
		setListArlCompanies,

		listCareCompanies,
		setListCareCompanies,
	}

}