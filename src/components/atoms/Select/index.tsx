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
        className={`
          col-start-1 
          row-start-1 
          w-full 
          appearance-none 
          rounded-md 
          bg-white 
          py-1.5 
          pl-3 
          pr-8 
          text-base
          font-inter 
          text-black
          outline 
          outline-1 
          -outline-offset-1 
          outline-gray-300 
          focus-visible:outline 
          focus-visible:outline-2 
          focus-visible:-outline-offset-2 
          focus-visible:outline-proquinal-teal 
          sm:text-sm/6 
          dark:bg-white/5 
          dark:text-white 
          dark:outline-white/10 
          dark:*:bg-gray-800 
        `}
        {...props}
        onChange={onChange}
      >
        <option value="" disabled>Seleccione una opción</option>
        {options && options.map(({ label, value }) => (
          <option key={value} value={value} className='text-black'>
            {label}
          </option>
        ))}
      </select>
      <ChevronDownIcon
        aria-hidden="true"
        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4 dark:text-gray-400"
      />
    </div>
  )
}
