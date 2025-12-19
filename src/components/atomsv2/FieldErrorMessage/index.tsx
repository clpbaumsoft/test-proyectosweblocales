import React from 'react'

const FieldErrorMessage = ({ errorMessage, className }: { errorMessage: string | undefined, className?: string }) => {
  return (
    errorMessage && <span className={`block text-red-500 text-xs ${className}`}>
      {errorMessage}
    </span>
  )
}

export default FieldErrorMessage
