import { ChangeEvent, useState } from "react";
import FormGenerateHistoryVisitor from "@/components/molecules/FormGenerateHistoryVisitor";
import FormGenerateVisitisReport from "@/components/molecules/FormGenerateVisitisReport";
import useTranslation from "@/hooks/useTranslation";
import TableVisitsProvider from "@/providers/TableVisitsProvider";
import FormGenerateHistoryEmployeeVehicle from "@/components/molecules/FormGenerateHistoryEmployeeVehicle";
import FormGenerateHistoryVisitorVehicle from "@/components/molecules/FormGenerateHistoryVisitorVehicle";
import FormGenerateReportEmployeesWithoutIdCards from "@/components/molecules/FormGenerateReportEmployeesWithoutIdCards";
import Select from "@/components/atoms/Select";
import { optionsReports } from "./constants";

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
	const [currentOptionReportSelected, setCurrentOptionReportSelected] = useState(optionsReports?.[0].value || "visits")

	const handleReportChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setCurrentOptionReportSelected(event.target.value)
	}

	return (
		<TableVisitsProvider>
			<h1 className="font-inter text-2xl font-bold mb-8">
				{TEXTS.title}
			</h1>
			<div className="w-full">
				<Select
					value={currentOptionReportSelected}
					onChange={handleReportChange}
					options={optionsReports}
				/>
			</div>
			<hr className="my-6" />
			{currentOptionReportSelected === "visits" && <FormGenerateVisitisReport />}
			{currentOptionReportSelected === "historyvisitor" && <FormGenerateHistoryVisitor />}
			{currentOptionReportSelected === "historyEmployeeVehicle" && <FormGenerateHistoryEmployeeVehicle />}
			{currentOptionReportSelected === "historyVisitorVehicle" && <FormGenerateHistoryVisitorVehicle />}
			{currentOptionReportSelected === "historyEmployeesWithoutIdCards" && <FormGenerateReportEmployeesWithoutIdCards />}
		</TableVisitsProvider>
	)
}