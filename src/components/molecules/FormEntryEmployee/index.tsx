import { Typography } from "@mui/material";

//Components
import SearchPersonForm from "@/components/molecules/SearchPersonForm";
import CardEmployee from "@/components/molecules/CardEmployee";

//Constants
import { GTRANS } from "@/constants/Globals";

//Hooks
import useFormEntryEmployee from "./useFormEntryEmployee";
import useTranslation from "@/hooks/useTranslation";

//Interfaces and types
import { FormEntryEmployeeProps } from "@/interfaces/Molecules";

export default function FormEntryEmployee({ type, hideEntry }: FormEntryEmployeeProps) {

	const GTEXTS = useTranslation(GTRANS)
	const {
		hasFinished,
		employee,
		onSearchEmployee,
		onLoadResult,
	} = useFormEntryEmployee(type)

	return (
		<>
			<SearchPersonForm
				onSearch={onSearchEmployee}
				onResult={onLoadResult}
			/>
			<hr/>
			{
				employee ? (
					<CardEmployee 
						key={`cardEmployeeKey${employee.id}`}
						employee={employee}
						hideEntry={hideEntry}
					/>
				) : (
					hasFinished && <Typography variant="body2">{GTEXTS.no_results}</Typography>
				)
			}
		</>
	)
}