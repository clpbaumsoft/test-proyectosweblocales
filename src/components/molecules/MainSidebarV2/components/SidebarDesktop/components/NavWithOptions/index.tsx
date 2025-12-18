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
          'text-black hover:bg-white/5 hover:text-black': !item.current,
          'group flex items-center gap-x-3 rounded-md p-2 text-sm/6 font-medium text-black w-full': true,
          'dark:text-white dark:hover:bg-white/5 dark:hover:text-white': true
        })}
      >
        <item.icon aria-hidden="true" className="size-6 shrink-0 text-zinc-500" />
        {item.name}
        <ChevronRightIcon
          aria-hidden="true"
          className="ml-auto size-3 shrink-0 text-zinc-500 group-data-[open]:rotate-90 group-data-[open]:text-zinc-500"
        />
      </DisclosureButton>
      <DisclosurePanel as="ul" className="mt-1 px-2 font-inter">
        {item.options.map((subItem) => (
          <li key={subItem.name}>
            <Link
              href={subItem.href}
              className={classNames(
                {
                  'bg-white/5 text-black': subItem.current,
                  'text-black hover:bg-white/5 hover:text-black': !subItem.current,
                  'group flex items-center gap-x-3 rounded-md p-2 text-black py-2 pl-9 pr-2 text-sm/6 w-full cursor-pointer': true,
                  'dark:text-white dark:hover:bg-white/5 dark:hover:text-white': true
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
