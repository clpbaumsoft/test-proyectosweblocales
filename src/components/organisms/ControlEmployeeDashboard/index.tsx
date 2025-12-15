import FormEntryEmployee from "@/components/molecules/FormEntryEmployee";
import FormGiveEntryExternalEmployee from "@/components/molecules/FormGiveEntryExternalEmployee";
import FormLeaveEmployeeVehicle from "@/components/molecules/FormLeaveEmployeeVehicle";
import GiveEntryVehicleFormEmployee from "@/components/molecules/GiveEntryVehicleFormEmployee";
import useMainSidebar from "@/components/molecules/MainSidebar/useMainSidebar";
import { constructNavigationItems } from "@/components/molecules/MainSidebarV2/components/SidebarDesktop/utils";
import { EMPLOYEE_TYPE_INTERNAL } from "@/constants/Globals";
import TableVisitsProvider from "@/providers/TableVisitsProvider";
import { useSearchParams } from "next/navigation";
import { JSX } from "react";

export default function ControlEmployeeDashboard() {
	const searchParams = useSearchParams()
	const currentTab = searchParams.get('tab')
	const { loggedUser } = useMainSidebar()
	const constructedItems = constructNavigationItems(loggedUser)
	const tabsKeys: string[] = constructedItems[4]?.options?.map(option => option.currentTab) ?? []

	const TABS: Record<string, { title: string, component: JSX.Element }> = {
		[tabsKeys[0]]: {
			title: "Ingresos Empleado",
			component: <FormEntryEmployee type={EMPLOYEE_TYPE_INTERNAL} />
		},
		[tabsKeys[1]]:{
			title: "Ingresos Empleado Externo",
			component: <FormGiveEntryExternalEmployee />
		},
		[tabsKeys[2]]: {
			title: "Salida Empleado Externo",
			component: <FormEntryEmployee hideEntry={true} />
		},
		[tabsKeys[3]]: {
			title: "Entrada Vehicular Empleado",
			component: <GiveEntryVehicleFormEmployee />
		},
		[tabsKeys[4]]: {
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