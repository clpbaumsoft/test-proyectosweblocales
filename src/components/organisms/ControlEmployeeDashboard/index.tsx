import FormEntryEmployee from "@/components/molecules/FormEntryEmployee";
import FormGiveEntryExternalEmployee from "@/components/molecules/FormGiveEntryExternalEmployee";
import FormLeaveEmployeeVehicle from "@/components/molecules/FormLeaveEmployeeVehicle";
import GiveEntryVehicleFormEmployee from "@/components/molecules/GiveEntryVehicleFormEmployee";
import { EMPLOYEE_TYPE_INTERNAL } from "@/constants/Globals";
import TableVisitsProvider from "@/providers/TableVisitsProvider";
import { useSearchParams } from "next/navigation";

export default function ControlEmployeeDashboard() {
	// const TEXTS = useTranslation(TRANS)
	const searchParams = useSearchParams()
	const currentTab = searchParams.get('tab')


	const TABS = {
		'ingresos': {
			title: "Ingresos Empleado",
			component: <FormEntryEmployee type={EMPLOYEE_TYPE_INTERNAL} />
		},
		'ingresosEmpleadoExterno':{
			title: "Ingresos Empleado Externo",
			component: <FormGiveEntryExternalEmployee />
		},
		'salidaEmpleadoExterno': {
			title: "Salida Empleado Externo",
			component: <FormEntryEmployee hideEntry={true} />
		},
		'entradaVehicularEmpleado': {
			title: "Entrada Vehicular Empleado",
			component: <GiveEntryVehicleFormEmployee />
		},
		'salidaVehicularEmpleado': {
			title: "Salida Vehicular Empleado",
			component: <FormLeaveEmployeeVehicle />
		}
	}

	return (
		<TableVisitsProvider>
			<h1 className="font-inter text-2xl font-bold mb-8">
				{TABS[currentTab || 'ingresos'].title}
			</h1>
			<div className="p-4">
				{TABS[currentTab || 'ingresos'].component}
			</div>
		</TableVisitsProvider>
	)
}