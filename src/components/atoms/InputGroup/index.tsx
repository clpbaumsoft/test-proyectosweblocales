import { InputGroupProps } from "@/interfaces/Atoms";
import { EyeIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

export default function InputGroup({ name, type, placeholder, ...props }: InputGroupProps) {
  const isPasswordType = type === "password";
  const [showPassword, setShowPassword] = useState(false);

  const onClickTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mt-2 grid grid-cols-1">
      <input
        id={name}
        name={name}
        type={isPasswordType && showPassword ? "text" : type}
        placeholder={placeholder}
        className="
          col-start-1 
          row-start-1
          block 
          w-full 
          rounded-md 
          bg-white 
          px-3 
          py-1.5 
          text-base
          font-inter 
          text-gray-900 
          outline 
          outline-1 
          -outline-offset-1 
          outline-gray-300 
          placeholder:text-gray-400 
          focus:outline 
          focus:outline-2 
          focus:-outline-offset-2 
          focus:outline-proquinal-teal 
          sm:text-sm/6 
          dark:bg-white/5 
          dark:text-white 
          dark:outline-white/10 
          dark:placeholder:text-gray-500 
          dark:focus:outline-indigo-500
        "
        {...props}
      />
      {isPasswordType && (
        <EyeIcon
          aria-hidden="true"
          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4 dark:text-gray-400 z-10 cursor-pointer"
          onClick={onClickTogglePassword}
        />
      )}
    </div>
  )
}
