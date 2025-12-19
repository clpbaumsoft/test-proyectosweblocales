import { SidebarItem } from '@/components/atomsv2/Sidebar'
import { NavWithOptionsProps } from '@/interfaces/Molecules'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'

const NavWithOptions = ({ item }: { item: NavWithOptionsProps }) => {
  return (
    <Disclosure as="div" className="w-full font-inter group" defaultOpen={item.current}>
      <DisclosureButton
        className={classNames({
          'text-black hover:bg-white/5 hover:text-black': !item.current,
          'group flex items-center gap-x-3 rounded-md p-2 text-sm/6 font-medium text-black w-full': true,
          'dark:text-white dark:hover:bg-white/5 dark:hover:text-white': true
        })}
      >
        <item.icon aria-hidden="true" className="size-6 text-zinc-500 shrink-0 group-hover:text-black" />
        {item.name}
        <ChevronRightIcon
          aria-hidden="true"
          className="ml-auto size-3 shrink-0 text-zinc-500 group-data-[open]:rotate-90 group-data-[open]:text-zinc-500"
        />
      </DisclosureButton>
      <DisclosurePanel as="ul" className="mt-1 px-2 font-inter">
        {item.options.map((subItem) => (
          <SidebarItem key={subItem.name} current={subItem.current} href={subItem.href}>
            <Link
              href={subItem.href}
              className="pl-9 text-sm/4 font-normal"
            >
              {subItem.name}
            </Link>
          </SidebarItem>
        ))}
      </DisclosurePanel>
    </Disclosure>
  )
}

export default NavWithOptions
