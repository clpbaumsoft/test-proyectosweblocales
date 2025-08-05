import {
	Box,
	Tab,
	Tabs,
} from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";
import PublicIcon from "@mui/icons-material/Public";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import CarRentalIcon from "@mui/icons-material/CarRental";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

//Components
import FormEntryEmployee from "@/components/molecules/FormEntryEmployee";
import FormGiveEntryExternalEmployee from "@/components/molecules/FormGiveEntryExternalEmployee";
import TabPanel from "@/components/atoms/TabPanel";

//Constants
import { EMPLOYEE_TYPE_INTERNAL } from "@/constants/Globals";

//Hooks
import useControlEmployeeDashboard from "./useControlEmployeeDashboard";
import useTranslation from "@/hooks/useTranslation";

//Styles
import { TitlePage } from "@/styles/elements";
import TableVisitsProvider from "@/providers/TableVisitsProvider";
import GiveEntryVehicleFormEmployee from "@/components/molecules/GiveEntryVehicleFormEmployee";
import FormLeaveEmployeeVehicle from "@/components/molecules/FormLeaveEmployeeVehicle";

//Texts
const TRANS = {
	title: {
		id: "ControlEmployeeDashboard.TitlePage.Title",
		defaultMessage: "Control Empleados",
		description: "",
	},
	tab1_title: {
		id: "ControlEmployeeDashboard.TitlePage.Tab1Title",
		defaultMessage: "Ingreso Empleado",
		description: "",
	},
	tab2_title: {
		id: "ControlEmployeeDashboard.TitlePage.Tab2Title",
		defaultMessage: "Ingreso Empleado Externo",
		description: "",
	},
	tab3_title: {
		id: "ControlEmployeeDashboard.TitlePage.Tab3Title",
		defaultMessage: "Salida Empleado Externo o Interno",
		description: "",
	},
	tab4_title: {
		id: "ControlEmployeeDashboard.TitlePage.Tab4Title",
		defaultMessage: "Entrada Vehicular Empleado",
		description: "",
	},
	tab5_title: {
		id: "ControlEmployeeDashboard.TitlePage.Tab5Title",
		defaultMessage: "Salida Vehicular Empleado",
		description: "",
	},
}

export default function ControlEmployeeDashboard() {

	const TEXTS = useTranslation(TRANS)
	
	const {
		tabActiveIndex,
		onChangeTab,
	} = useControlEmployeeDashboard()

	return (
		<>
			<TableVisitsProvider>
				<TitlePage>{TEXTS.title}</TitlePage>
				<Box 
					sx={{
						borderBottom: 0,
						borderColor: 'divider',
						mb: '30px',
					}}
				>
					<Tabs 
						value={tabActiveIndex} 
						onChange={onChangeTab}
						variant="scrollable"
							scrollButtons="auto"
					>
						<Tab 
							icon={<BadgeIcon />}
							iconPosition="start" 
							label={TEXTS.tab1_title}
						/>
						<Tab 
							icon={<PublicIcon />}
							iconPosition="start" 
							label={TEXTS.tab2_title}
						/>
						<Tab 
							icon={<MeetingRoomIcon />}
							iconPosition="start" 
							label={TEXTS.tab3_title}
						/>
						<Tab 
							icon={<CarRentalIcon />}
							iconPosition="start" 
							label={TEXTS.tab4_title}
						/>
						<Tab 
							icon={<DirectionsCarIcon />}
							iconPosition="start" 
							label={TEXTS.tab5_title}
						/>
					</Tabs>
				</Box>
				<Box sx={{ p: '15px' }}>
					<TabPanel activeIndex={tabActiveIndex} index={0}>
						<FormEntryEmployee type={EMPLOYEE_TYPE_INTERNAL} />
					</TabPanel>
					<TabPanel activeIndex={tabActiveIndex} index={1}>
						<FormGiveEntryExternalEmployee />
					</TabPanel>
					<TabPanel activeIndex={tabActiveIndex} index={2}>
						<FormEntryEmployee hideEntry={true} />
					</TabPanel>
					<TabPanel activeIndex={tabActiveIndex} index={3}>
						<GiveEntryVehicleFormEmployee />
					</TabPanel>
					<TabPanel activeIndex={tabActiveIndex} index={4}>
						<FormLeaveEmployeeVehicle />
					</TabPanel>
				</Box>
			</TableVisitsProvider>
		</>
	)
}