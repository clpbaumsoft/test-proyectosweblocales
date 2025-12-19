import PAGES from "@/constants/Pages";
import User from "@/models/User";
import { DocumentDuplicateIcon } from "@heroicons/react/16/solid";
import {
  CalendarIcon,
  ChartPieIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  NewspaperIcon,
} from '@heroicons/react/24/solid'

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
    href: undefined, 
    icon: UsersIcon, 
    current: false, 
    hide: loggedUser.can('create_entry') 
  },
  { 
    name: 'Control Ingreso', 
    href: PAGES.dashboard_entry, 
    icon: FolderIcon, 
    current: false, 
    hide: true
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
    icon: NewspaperIcon,
    current: false,
    hide: loggedUser.can('generate_reports') || loggedUser.can('create_entry')
  },
])