import { NavWithOptionsProps } from '@/interfaces/Molecules'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'

const NavWithOptions = ({ item }: { item: NavWithOptionsProps }) => {
  return (
    <Disclosure as="div" className="w-full font-inter" defaultOpen={item.current}>
      <DisclosureButton
        className={classNames({
          'text-white hover:bg-white/5 hover:text-white': !item.current,
          'group flex items-center gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-white  w-full': true
        })}
      >
        <item.icon aria-hidden="true" className="size-6 shrink-0 text-white" />
        {item.name}
        <ChevronRightIcon
          aria-hidden="true"
          className="ml-auto size-4 shrink-0 text-white group-data-[open]:rotate-90 group-data-[open]:text-white"
        />
      </DisclosureButton>
      <DisclosurePanel as="ul" className="mt-1 px-2 font-inter">
        {item.options.map((subItem) => (
          <li key={subItem.name}>
            <Link
              href={subItem.href}
              className={classNames(
                {
                  'bg-white/5 text-white': subItem.current,
                  'text-white hover:bg-white/5 hover:text-white': !subItem.current,
                  'group flex items-center gap-x-3 rounded-md p-2 text-white py-2 pl-9 pr-2 text-sm/6 w-full cursor-pointer': true
                }
              )}
            >
              {subItem.name}
            </Link>
          </li>
        ))}
      </DisclosurePanel>
    </Disclosure>
  )
}

export default NavWithOptions
