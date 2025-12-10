import Image from 'next/image'
import React from 'react'
import classNames from 'classnames'
import useMainSidebar from '@/components/molecules/MainSidebar/useMainSidebar'
import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import PAGES from '@/constants/Pages'

const SidebarDesktop = () => {
  // const {
  //   loggedUser,
  //   anchorEl,
  //   menuOpen,
  //   showForm,
  //   drawerOpen,
  //   handleLogout,
  //   handleMenuClose,
  //   handleCloseForm,
  //   handleMenuClick,
  //   onClickOpenModalRegisterVisit,
  //   toggleDrawer,
  // } = useMainSidebar()

  const NAVIGATION_ITEMS = [
    { name: 'Inicio', href: PAGES.home, icon: HomeIcon, current: true },
    { name: 'Programar Visita', href: '#', icon: UsersIcon, current: false },
    { name: 'Control Ingreso', href: PAGES.dashboard_entry, icon: FolderIcon, current: false },
    { name: 'Restringir/Habilitar usuarios', href: PAGES.dashboard_restricted_users, icon: CalendarIcon, current: false },
    { name: 'Control Empleados', href: PAGES.dashboard_employees, icon: DocumentDuplicateIcon, current: false },
    { name: 'Capacitaciones', href: PAGES.trainings, icon: ChartPieIcon, current: false },
  ]

  return (
    <div className="hidden bg-proquinal-teal ring-1 ring-white/10 lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-black/10 px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center mt-2">
          <Image
            src="images/logos/logo-proquinal.png"
            alt="Your Company"
            width={140}
            height={32}
          />
        </div>
        <nav className="flex flex-1 flex-col mt-6">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-3">
                {NAVIGATION_ITEMS.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className={classNames({
                        'bg-white/5 text-white': item.current,
                        'text-white hover:bg-white/5 hover:text-white': !item.current,
                        'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-white': true
                      })}
                    >
                      <item.icon aria-hidden="true" className="size-6 shrink-0" />
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default SidebarDesktop
