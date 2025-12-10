'use client'

import { Bars3Icon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import SidebarDesktop from './components/SidebarDesktop'
import SidebarMobile from './components/SidebarMobile'
import UserProfileAvatar from './components/UserProfileAvatar'

export default function MainSidebarV2({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleOpenSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div>
      <SidebarMobile
        sidebarOpen={sidebarOpen}
        handleOpenSidebar={handleOpenSidebar}
      />
      <SidebarDesktop />
      <div className="lg:pl-72 bg-white">
        <div
          className="
            sticky 
            top-0 
            z-40 
            flex 
            h-16 
            shrink-0 
            items-center 
            gap-x-4 
            border-b 
            border-gray-200 
            bg-[#dedede] 
            px-4 
            shadow-sm 
            sm:gap-x-6 
            sm:px-6 
            lg:px-8
          "
        >
          <button
            type="button"
            onClick={handleOpenSidebar}
            className="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900 lg:hidden dark:text-gray-400 dark:hover:text-white"
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
          <div aria-hidden="true" className="h-6 w-px bg-gray-900/10 lg:hidden dark:bg-white/10" />
          <UserProfileAvatar />
        </div>
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
