import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import React from 'react'

const Modal = ({ children, show, onClose }: { children: React.ReactNode; show: boolean; onClose: () => void }) => {
  return (
    <Dialog open={show} onClose={onClose} className="relative z-[9999] font-inter">
      <DialogBackdrop
        transition
        className="
          fixed 
          inset-0 
          bg-black/45 
          transition-opacity 
          data-[closed]:opacity-0 
          data-[enter]:duration-300
          data-[leave]:duration-200 
          data-[enter]:ease-out 
          data-[leave]:ease-in
        "
      />
      <div className="fixed inset-0 z-[9999] w-screen overflow-y-auto">
				<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="
              relative 
              transform 
              overflow-hidden
              rounded-lg 
              bg-white 
              px-4 pb-4 pt-5 
              text-left 
              shadow-xl
              max-w-[900px] 
              w-[600px]
              transition-all 
              data-[closed]:translate-y-4 
              data-[closed]:opacity-0 
              data-[enter]:duration-300 
              data-[leave]:duration-200 
              data-[enter]:ease-out 
              data-[leave]:ease-in 
              sm:my-8 sm:p-8
              data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95
            "
          >
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default Modal
