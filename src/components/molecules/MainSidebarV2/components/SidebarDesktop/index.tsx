import useMainSidebar from '@/components/molecules/MainSidebar/useMainSidebar'
import RegisterVisitForm from '@/components/molecules/RegisterVisitForm'
import classNames from 'classnames'
import Image from 'next/image'
import { constructNavigationItems } from './utils'
import NavWithOptions from './components/NavWithOptions'
import { usePathname, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import Link from 'next/link'
import { NavWithOptionsProps } from '@/interfaces/Molecules'

const SidebarDesktop = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams()
  const currentTab = searchParams.get('tab')

  const {
    loggedUser,
    showForm,
    handleCloseForm,
    onClickOpenModalRegisterVisit,
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
    <div className="
      hidden 
      bg-proquinal-teal 
      ring-1 
      ring-white/10 
      lg:fixed 
      lg:inset-y-0 
      lg:z-50 
      lg:flex 
      lg:w-72 
      lg:flex-col
    ">
      <RegisterVisitForm 
        open={showForm} 
        onClose={handleCloseForm} 
      />
      <div className="
        flex 
        grow 
        flex-col 
        gap-y-5 
        overflow-y-auto 
        bg-black/10 
        px-6 
        pb-4
      ">
        <div className="flex h-16 shrink-0 items-center mt-2">
          <Image
            src="/images/logos/logo-proquinal.png"
            alt="Your Company"
            width={140}
            height={32}
          />
        </div>
        <nav className="flex flex-1 flex-col mt-6">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-3">
                {navigationItems.map((item) => (
                  <li key={item.name} className='font-inter'>
                    {item.options ? (
                      <NavWithOptions item={item} />
                    ) : item.name === 'Programar Visita' ? (
                      <button
                        onClick={onClickOpenModalRegisterVisit}
                        className={classNames(
                          'w-full text-left group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-white',
                          item.current
                            ? 'bg-white/5 text-white'
                            : 'text-white hover:bg-white/5 hover:text-white'
                        )}
                      >
                        <item.icon aria-hidden="true" className="size-6 shrink-0" />
                        {item.name}
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className={classNames(
                          'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-white',
                          item.current
                            ? 'bg-white/5 text-white'
                            : 'text-white hover:bg-white/5 hover:text-white'
                        )}
                      >
                        <item.icon aria-hidden="true" className="size-6 shrink-0" />
                        {item.name}
                      </Link>
                    )}
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
