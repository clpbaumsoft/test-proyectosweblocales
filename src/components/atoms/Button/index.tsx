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
        text-[14px] 
        font-semibold 
        text-white 
        shadow-sm 
        cursor-pointer
        hover:bg-proquinal-teal/80 
        focus-visible:outline 
        focus-visible:outline-2 
        focus-visible:outline-offset-2 
        dark:shadow-none 
      "
    >
      {icon && icon}
      {text}
    </button>
  )
}
