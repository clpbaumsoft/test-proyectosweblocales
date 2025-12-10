"use client"

import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import NavigationItems from './components/NavitagionItems'

const SidebarMobile = ({ sidebarOpen, handleOpenSidebar }: { sidebarOpen: boolean, handleOpenSidebar: () => void }) => {
  return (
    <Dialog 
      open={sidebarOpen} 
      onClose={handleOpenSidebar} 
      className="relative z-50 lg:hidden"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-proquinal-teal transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
      />
      <div className="fixed inset-0 flex">
        <DialogPanel
          transition
          className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
        >
          <TransitionChild>
            <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
              <button type="button" onClick={handleOpenSidebar} className="-m-2.5 p-2.5">
                <span className="sr-only">Close sidebar</span>
                <XMarkIcon aria-hidden="true" className="size-6 text-white" />
              </button>
            </div>
          </TransitionChild>
          <NavigationItems />
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default SidebarMobile
