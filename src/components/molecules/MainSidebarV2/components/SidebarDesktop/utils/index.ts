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
    hide: loggedUser.can('create_entry_employee')
  },
  { 
    name: 'Capacitaciones', 
    href: PAGES.trainings, 
    icon: ChartPieIcon, 
    current: false,
    hide: loggedUser.can('train_visitor')
  },
])