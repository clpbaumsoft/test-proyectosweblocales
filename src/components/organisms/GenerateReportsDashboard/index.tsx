import { useState } from "react";

//Components
import FormGenerateHistoryVisitor from "@/components/molecules/FormGenerateHistoryVisitor";
import FormGenerateVisitisReport from "@/components/molecules/FormGenerateVisitisReport";

//Hooks
import useTranslation from "@/hooks/useTranslation";
import TableVisitsProvider from "@/providers/TableVisitsProvider";

//Styles
import { TitlePage } from "@/styles/elements";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import Grid from "@mui/material/Grid2";
import FormGenerateHistoryEmployeeVehicle from "@/components/molecules/FormGenerateHistoryEmployeeVehicle";
import FormGenerateHistoryVisitorVehicle from "@/components/molecules/FormGenerateHistoryVisitorVehicle";
import FormGenerateReportEmployeesWithoutIdCards from "@/components/molecules/FormGenerateReportEmployeesWithoutIdCards";

//Texts
const TRANS = {
	title: {
		id: "GenerateReportsDashboard.TitlePage.Title",
		defaultMessage: "Generar Reportes",
		description: "",
	},
}
export default function GenerateReportsDashboard() {
	const TEXTS = useTranslation(TRANS)

	const optionsReports = [
		{
			value: "visits",
			label: "Reporte de visitas"
		},
		{
			value: "historyvisitor",
			label: "Reporte de historial visitante"
		},
		{
			value: "historyEmployeeVehicle",
			label: "Reporte vehícular de empleados"
		},
		{
			value: "historyVisitorVehicle",
			label: "Reporte vehícular de visitantes"
		},
		{
			value: "historyEmployeesWithoutIdCards",
			label: "Reporte de empleados sin carnet"
		}
	]

	const [currentOptionReportSelected, setCurrentOptionReportSelected] = useState(optionsReports?.[0].value || "visits")

	const handleReportChange = (event: SelectChangeEvent<string>) => {
		setCurrentOptionReportSelected(event.target.value)
	}

	return (
		<> 
			<TableVisitsProvider>
				<TitlePage>{TEXTS.title}</TitlePage>
				<Grid size={{ xs: 12, md: 2 }}>
					<Select
						label="Seleccionar"
						value={currentOptionReportSelected}
						onChange={handleReportChange}
						sx={{ width: '100%' }}
					>
						{
							optionsReports?.map(option => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))
						}
					</Select>
				</Grid>
				<hr style={{margin: '16px 0 32px 0'}}/>


				{currentOptionReportSelected === "visits" && <FormGenerateVisitisReport />}
				{currentOptionReportSelected === "historyvisitor" && <FormGenerateHistoryVisitor />}
				{currentOptionReportSelected === "historyEmployeeVehicle" && <FormGenerateHistoryEmployeeVehicle />}
				{currentOptionReportSelected === "historyVisitorVehicle" && <FormGenerateHistoryVisitorVehicle />}
				{currentOptionReportSelected === "historyEmployeesWithoutIdCards" && <FormGenerateReportEmployeesWithoutIdCards />}

			</TableVisitsProvider>
		</>
	)
}