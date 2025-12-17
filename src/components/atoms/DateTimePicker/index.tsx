'use client'
import { forwardRef } from 'react'
import { CalendarIcon } from '@heroicons/react/24/outline'
import moment, { Moment } from 'moment'

interface DateTimePickerProps {
  value?: Moment | null
  onChange?: (value: Moment | null) => void
  minDate?: Moment | null
  maxDate?: Moment | null
  label?: string
  error?: string
  disabled?: boolean
  className?: string
}

const DateTimePicker = forwardRef<HTMLInputElement, DateTimePickerProps>(
  ({ value, onChange, minDate, maxDate, error, disabled, className = '' }, ref) => {

    const momentToInputValue = (momentValue: Moment | null): string => {
      if (!momentValue || !moment.isMoment(momentValue)) return ''
      // Formato: "2024-12-16T14:30"
      return momentValue.format('YYYY-MM-DDTHH:mm')
    }

    const inputValueToMoment = (inputValue: string): Moment | null => {
      if (!inputValue) return null
      return moment(inputValue, 'YYYY-MM-DDTHH:mm')
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value
      const momentValue = inputValueToMoment(inputValue)
      onChange?.(momentValue)
    }

    return (
      <div className="w-full">
        <div className="relative">
          <input
            ref={ref}
            type="datetime-local"
            value={momentToInputValue(value)}
            onChange={handleChange}
            min={momentToInputValue(minDate)}
            max={momentToInputValue(maxDate)}
            disabled={disabled}
            className={`
              block
              w-full
              rounded-md
              border
              ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-proquinal-teal focus:ring-proquinal-teal'}
              bg-white
              px-3
              py-2
              pr-10
              h-[36px]
              text-sm
              text-gray-600
              focus:outline-none
              focus:ring-2
              disabled:bg-gray-100
              disabled:cursor-not-allowed
              [&::-webkit-calendar-picker-indicator]:absolute
              [&::-webkit-calendar-picker-indicator]:right-0
              [&::-webkit-calendar-picker-indicator]:w-10
              [&::-webkit-calendar-picker-indicator]:h-full
              [&::-webkit-calendar-picker-indicator]:opacity-0
              [&::-webkit-calendar-picker-indicator]:cursor-pointer
              ${className}
            `}
          />
          <CalendarIcon className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    )
  }
)

DateTimePicker.displayName = 'DateTimePicker'
export default DateTimePicker