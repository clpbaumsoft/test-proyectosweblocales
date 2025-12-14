import PAGES from "@/constants/Pages";
import User from "@/models/User";
import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import ArticleIcon from '@mui/icons-material/Article';

export const constructNavigationItems = (loggedUser: User) => ([
  { 
    name: 'Inicio', 
    href: PAGES.home, 
    icon: HomeIcon, 
    current: true, 
    hide: loggedUser.can('create_visit') 
  },
  { 
    name: 'Programar Visita', 
    href: '#', 
    icon: UsersIcon, 
    current: false, 
    hide: loggedUser.can('create_entry') },
  { 
    name: 'Control Ingreso', 
    href: PAGES.dashboard_entry, 
    icon: FolderIcon, 
    current: false, 
    hide: false
  },
  { 
    name: 'Restringir/Habilitar usuarios', 
    href: PAGES.dashboard_restricted_users, 
    icon: CalendarIcon, 
    current: false,
    hide: loggedUser.can('restricted_users') || loggedUser.can('create_entry')  
  },
  { 
    name: 'Control Empleados', 
    href: PAGES.dashboard_employees, 
    icon: DocumentDuplicateIcon, 
    current: false,
    hide: loggedUser.can('create_entry_employee'),
    options: [
      {
        name: 'Ingreso Empleado',
        href: `${PAGES.dashboard_employees}?tab=ingresos`,
        currentTab: 'ingresos',
        current: false,
      },
      {
        name: 'Ingreso Empleado Externo',
        href: `${PAGES.dashboard_employees}?tab=ingresosEmpleadoExterno`,
        currentTab: 'ingresosEmpleadoExterno',
        current: false,
      },
      {
        name: 'Salida Empleado Externo o Interno',
        href: `${PAGES.dashboard_employees}?tab=salidaEmpleadoExterno`,
        currentTab: 'salidaEmpleadoExterno',
        current: false,
      },
      {
        name: 'Entrada Vehicular Empleado',
        href: `${PAGES.dashboard_employees}?tab=entradaVehicularEmpleado`,
        currentTab: 'entradaVehicularEmpleado',
        current: false,
      },
      {
        name: 'Salida Vehicular Empleado',
        href: `${PAGES.dashboard_employees}?tab=salidaVehicularEmpleado`,
        currentTab: 'salidaVehicularEmpleado',
        current: false,
      }
    ]
  },
  { 
    name: 'Capacitaciones', 
    href: PAGES.trainings, 
    icon: ChartPieIcon, 
    current: false,
    hide: loggedUser.can('train_visitor')
  },
  { 
    name: 'Generar Reportes', 
    href: PAGES.dashboard_generate_reports, 
    icon: ArticleIcon, 
    current: false,
    hide: loggedUser.can('generate_reports') || loggedUser.can('create_entry')
  },
])