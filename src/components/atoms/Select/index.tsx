import { SelectProps } from '@/interfaces/Atoms'
import { ChevronDownIcon } from '@heroicons/react/16/solid'

export default function Select({ name, value, disabled, options, onChange, ...props }: SelectProps) {
  return (
    <div className="mt-2 grid grid-cols-1 font-inter">
      <select
        id={name}
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
        className={`
          col-start-1 
          row-start-1 
          w-full 
          appearance-none 
          rounded-md 
          py-1.5 
          pl-3 
          pr-8 
          text-base
          sm:text-sm
          font-inter 

          /* light */
          bg-white 
          text-black
          border
          border-gray-300

          /* dark */
          dark:bg-white
          dark:text-black
        `}
        {...props}
      >
        <option value="" disabled>Seleccione una opción</option>
        {options && options.map(({ label, value }) => (
          <option key={value} value={value} className="text-black dark:text-black">
            {label}
          </option>
        ))}
      </select>

      <ChevronDownIcon
        aria-hidden="true"
        className="
          pointer-events-none 
          col-start-1 
          row-start-1 
          mr-2 
          size-5 
          self-center 
          justify-self-end 
          text-gray-500 
          sm:size-4 
          dark:text-gray-400
        "
      />
    </div>
  )
}
