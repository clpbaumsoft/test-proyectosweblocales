import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'

export const NAVIGATION_ITEMS = [
  { name: 'Inicio', href: '#', icon: HomeIcon, current: true },
  { name: 'Programar Visita', href: '#', icon: UsersIcon, current: false },
  { name: 'Control Ingreso', href: '#', icon: FolderIcon, current: false },
  { name: 'Restringir/Habilitar usuarios', href: '#', icon: CalendarIcon, current: false },
  { name: 'Control Empleados', href: '#', icon: DocumentDuplicateIcon, current: false },
  { name: 'Capacitaciones', href: '#', icon: ChartPieIcon, current: false },
]

export const TEAMS = [
  { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
  { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
  { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
]