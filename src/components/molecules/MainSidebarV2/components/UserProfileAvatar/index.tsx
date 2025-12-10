import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import React from 'react'
import useMainSidebar from '@/components/molecules/MainSidebar/useMainSidebar'

const UserProfileAvatar = () => {
  const { loggedUser, handleLogout } = useMainSidebar()

  const USER_NAVIGATION = [
    { name: 'Cerrar Sesión', onClick: handleLogout },
  ]

  return (
    <div className="flex flex-1 gap-x-4 self-stretch justify-end lg:gap-x-6">
      <div className="flex items-center gap-x-4 lg:gap-x-6">
        <Menu as="div" className="relative">
          <MenuButton className="relative flex items-center">
            <span className="absolute -inset-1.5" />
            <span className="sr-only">Open user menu</span>
            <div className="size-8 rounded-full bg-gray-50 outline outline-1 -outline-offset-1 outline-black/5 flex items-center justify-center dark:bg-gray-800 dark:outline-white/10">
              <span className="font-medium text-gray-900 dark:text-white font-inter">
                {loggedUser.getFirstLetters()}
              </span>
            </div>
            <span className="hidden text-start font-inter lg:flex lg:items-center">
              <span aria-hidden="true" className="ml-4 text-sm/6 font-semibold text-gray-900 dark:text-white">
                {loggedUser?.fullname}
                <span aria-hidden="true" className='block text-xs'>{loggedUser?.email}</span>
              </span>
              <ChevronDownIcon aria-hidden="true" className="ml-2 size-5 text-gray-400 dark:text-gray-500" />
            </span>
          </MenuButton>
          <MenuItems
            transition
            className="
              absolute 
              right-0 
              z-10 
              mt-2.5 
              w-32 
              origin-top-right 
              rounded-md 
              bg-white 
              py-2 
              shadow-lg 
              outline 
              outline-1 
              outline-gray-900/5 
              transition 
              data-[closed]:scale-95 
              data-[closed]:transform 
              data-[closed]:opacity-0 
              data-[enter]:duration-100 
              data-[leave]:duration-75 
              data-[enter]:ease-out 
              data-[leave]:ease-in 
              dark:bg-gray-800 
              dark:shadow-none 
              dark:-outline-offset-1 
              dark:outline-white/10
            "
          >
            {USER_NAVIGATION.map((item) => (
              <MenuItem key={item.name}>
                <button
                  onClick={item.onClick}
                  className="
                    block 
                    w-full
                    text-left
                    px-3 
                    py-1 
                    text-sm/6
                    font-inter 
                    text-gray-900 
                    data-[focus]:bg-gray-50 
                    data-[focus]:outline-none 
                    dark:text-white 
                    dark:data-[focus]:bg-white/5
                  "
                >
                  {item.name}
                </button>
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
      </div>
    </div>
  )
}

export default UserProfileAvatar
