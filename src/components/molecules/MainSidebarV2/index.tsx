"use client"

import {
  ArrowRightStartOnRectangleIcon,
  ChevronUpIcon,
  Cog8ToothIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  UserIcon,
} from '@heroicons/react/16/solid'
import {
  InboxIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
} from '@heroicons/react/20/solid'
import useMainSidebar from '../MainSidebar/useMainSidebar'
import { SidebarLayout } from '@/components/atomsv2/SidebarLayout'
import { 
  Navbar, 
  NavbarItem, 
  NavbarSection, 
  NavbarSpacer 
} from '@/components/atomsv2/Navbar'
import { 
  Dropdown, 
  DropdownButton, 
  DropdownDivider, 
  DropdownItem, 
  DropdownLabel, 
  DropdownMenu 
} from '@/components/atomsv2/Dropdown'
import { Avatar } from '@/components/atomsv2/Avatar'
import { 
  Sidebar, 
  SidebarBody, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarItem, 
  SidebarLabel, 
  SidebarSection, 
  SidebarSpacer 
} from '@/components/atomsv2/Sidebar'
import { constructNavigationItems } from './components/SidebarDesktop/utils'
import clsx from 'clsx'
import RegisterVisitForm from '../RegisterVisitForm'
import NavWithOptions from './components/SidebarDesktop/components/NavWithOptions'
import Image from 'next/image'
import { useMemo } from 'react'
import { NavWithOptionsProps } from '@/interfaces/Molecules'
import { usePathname, useSearchParams } from 'next/navigation'

export default function MainSidebarV2({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams()
  const currentTab = searchParams.get('tab')
  
  const { 
    loggedUser, 
    showForm,
    handleCloseForm,
    handleLogout, 
    onClickOpenModalRegisterVisit 
  } = useMainSidebar()

  const updateOptions = (options: NavWithOptionsProps['options']) => {
    return options.map(option => ({
      ...option,
      current: currentTab === option.currentTab,
    }))
  }

  const navigationItems = useMemo(() => {
    const constructedItems = constructNavigationItems(loggedUser)
    return constructedItems.map((item) => {
      if (item.options) {
        const updatedOptions = updateOptions(item.options);
        const isCurrent = updatedOptions.some(opt => opt.current);

        return {
          ...item,
          current: pathname === item.href && (currentTab === null || isCurrent),
          options: updatedOptions,
        }
      }

      return {
        ...item,
        current: item.href === pathname,
      }
    })
  }, [pathname, currentTab, loggedUser])
    
  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>
            <NavbarItem href="/search" aria-label="Search">
              <MagnifyingGlassIcon />
            </NavbarItem>
            <NavbarItem href="/inbox" aria-label="Inbox">
              <InboxIcon />
            </NavbarItem>
            <Dropdown>
              <DropdownButton as={NavbarItem}>
                <Avatar avatarLetters={loggedUser.getFirstLetters()} square />
              </DropdownButton>
              <DropdownMenu className="min-w-64" anchor="bottom end">
                <DropdownItem href="/my-profile">
                  <UserIcon />
                  <DropdownLabel>My profile</DropdownLabel>
                </DropdownItem>
                <DropdownItem href="/settings">
                  <Cog8ToothIcon />
                  <DropdownLabel>Settings</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem href="/privacy-policy">
                  <ShieldCheckIcon />
                  <DropdownLabel>Privacy policy</DropdownLabel>
                </DropdownItem>
                <DropdownItem href="/share-feedback">
                  <LightBulbIcon />
                  <DropdownLabel>Share feedback</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem href="/logout">
                  <ArrowRightStartOnRectangleIcon />
                  <DropdownLabel>Sign out</DropdownLabel>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <SidebarSection>
              <SidebarItem href="/">
                <Image 
                  src="/images/logos/logo.png"
                  alt="logo"
                  width={160}
                  height={100}
                />
              </SidebarItem>
            </SidebarSection>
          </SidebarHeader>
          <SidebarBody>
            <SidebarSection>
              {navigationItems.map((item) => (
                item.options ? (
                  <NavWithOptions key={item.name} item={item} />
                ) : (
                  <SidebarItem
                    key={item.name}
                    current={item.current}
                    className={clsx(!item.hide && 'hidden')}
                    {...(item.href ? { href: item.href } : {})}
                    {...(item.name === "Programar Visita"
                      ? { onClick: onClickOpenModalRegisterVisit }
                      : {})}
                  >
                    <item.icon />
                    <SidebarLabel>{item.name}</SidebarLabel>
                  </SidebarItem>
                )
              ))}
            </SidebarSection>
            <SidebarSpacer />
            <SidebarSection>
              <SidebarItem href="/support" disabled>
                <QuestionMarkCircleIcon />
                <SidebarLabel>Support</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/changelog" disabled>
                <SparklesIcon />
                <SidebarLabel>Changelog</SidebarLabel>
              </SidebarItem>
            </SidebarSection>
          </SidebarBody>
          <SidebarFooter className="max-lg:hidden">
            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <span className="flex min-w-0 items-center gap-3">
                  <Avatar avatarLetters={loggedUser.getFirstLetters()} className="size-10" square alt="" />
                  <span className="min-w-0">
                    <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                      {loggedUser.fullname}
                    </span>
                    <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                      {loggedUser.email}
                    </span>
                  </span>
                </span>
                <ChevronUpIcon />
              </DropdownButton>
              <DropdownMenu className="min-w-64" anchor="top start">
                <DropdownItem onClick={handleLogout}>
                  <ArrowRightStartOnRectangleIcon />
                  <DropdownLabel>Sign out</DropdownLabel>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </SidebarFooter>
        </Sidebar>
      }
    >
      <RegisterVisitForm
        open={showForm}
        onClose={handleCloseForm}
      />
      {children}
    </SidebarLayout>
  )
}