import { NAVIGATION_ITEMS } from '@/components/molecules/MainSidebarV2/constants'
import classNames from 'classnames'
import Image from 'next/image'
import React from 'react'

const NavigationItems = () => {
  return (
    <div className="relative flex grow flex-col gap-y-5 overflow-y-auto bg-proquinal-teal px-6 pb-4 ring-1 ring-white/10 dark:before:pointer-events-none dark:before:absolute dark:before:inset-0 dark:before:bg-black/10">
      <div className="relative flex h-16 shrink-0 items-center">
        <Image
          src="images/logos/logo-proquinal.png"
          alt="Your Company"
          width={32}
          height={32}
        />
      </div>
      <nav className="relative flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={classNames({
                      'bg-white/5 text-white': item.current,
                      'text-gray-400 hover:bg-white/5 hover:text-white': !item.current,
                      'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold': true
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
  )
}

export default NavigationItems
