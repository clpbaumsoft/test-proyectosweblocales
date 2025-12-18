import useTranslation from '@/hooks/useTranslation';
import { CardActiveEntryToOtherBranchProps } from '@/interfaces/Molecules';
import { formatsDate } from '@/lib/Helpers';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { TRANS } from './constants';

export const AccordeonHistoryVisits = ({ visitor }: CardActiveEntryToOtherBranchProps) => {
  const TEXTS = useTranslation(TRANS)
  const visitorValidations = 
    !visitor || 
    !visitor?.active_entry || 
    !visitor?.active_entry?.entry_gates || 
    visitor?.active_entry?.entry_gates?.length === 0

  if(visitorValidations) return null;
  return (
    <div className="mt-4">
      <div className="w-full max-w-full mx-auto border border-zinc-300 shadow-lg rounded-lg my-4">
        <Disclosure>
          <div className="overflow-hidden">
            <DisclosureButton className="
                flex 
                w-full 
                justify-between 
                items-center
                bg-proquinal-teal 
                px-2 
                py-1 
                text-left 
                text-sm 
                font-medium 
                text-white
                hover:bg-proquinal-teal
                focus:outline-none 
                focus-visible:ring 
                focus-visible:ring-indigo-500
                transition-colors
              ">
              <h1 className="font-inter text-[18px] p-3 bg-white text-black">
                {TEXTS.label_entry_visitor_to_other_branchs}
              </h1>
              <ChevronDownIcon
                className="h-5 w-5 text-black transition-transform duration-200"
              />
            </DisclosureButton>
            <DisclosurePanel className="
                px-4 
                pb-4 
                pt-4 
                text-sm 
                bg-white
              ">
              {visitor?.active_entry?.entry_gates?.map((item_entry_gates, index) => {

                if (!item_entry_gates || item_entry_gates.active === 1) return null
                return (
                  <div key={item_entry_gates?.entry_id || index} className='
                    flex 
                    flex-wrap 
                    gap-6 
                    text-[14px] 
                    text-zinc-500
                    [&>div]:flex-1
                    [&>div]:min-w-45
                    '
                  >
                    <div>
                      <p className='font-semibold'>{TEXTS.label_other_brachs}</p>
                      <span>{item_entry_gates?.gate?.branch?.short_description || ''}</span>
                    </div>
                    <div>
                      <p className='font-semibold'>{TEXTS.label_other_gate}</p>
                      <span>{item_entry_gates?.gate?.description || ''}</span>
                    </div>
                    <div>
                      <p className='font-semibold'>{TEXTS.label_entry_at}</p>
                      <span>{formatsDate(item_entry_gates?.creator_date || '')}</span>
                    </div>
                    <div>
                      <p className='font-semibold'>{TEXTS.label_leave_entry_at}</p>
                      <span>{formatsDate(item_entry_gates?.modifier_date || '')}</span>
                    </div>
                    <div>
                      <p className='font-semibold'>{TEXTS.label_entry_approver}</p>
                      <span>{item_entry_gates?.creator?.fullname}</span>
                    </div>
                    <div>
                      <p className='font-semibold'>{TEXTS.label_leave_approver}</p>
                      <span>{item_entry_gates?.modifier?.fullname}</span>
                    </div>
                  </div>
                )
              })}
            </DisclosurePanel>
          </div>
        </Disclosure>
      </div>
    </div>
  )
}
