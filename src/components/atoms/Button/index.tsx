import { ButtonProps } from "./models";

export default function Button({ text, type, icon, onClick, disabled }: ButtonProps) {
  return (
    <button
      type={type || "button"}
      onClick={onClick}
      disabled={disabled}
      className="
        font-inter 
        rounded-md 
        bg-proquinal-teal 
        px-3.5 
        py-2.5 
        text-sm 
        font-semibold 
        text-white 
        shadow-sm 
        cursor-pointer
        hover:bg-proquinal-teal/80 
        focus-visible:outline 
        focus-visible:outline-2 
        focus-visible:outline-offset-2 
        focus-visible:outline-indigo-600 
        dark:bg-indigo-500 
        dark:shadow-none 
        dark:hover:bg-indigo-400 
        dark:focus-visible:outline-indigo-500
      "
    >
      {icon && icon}
      {text}
    </button>
  )
}
