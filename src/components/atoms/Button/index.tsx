import { ButtonProps } from "@/interfaces/Atoms";

export default function Button({ text, type, variant = "filled", icon, onClick, disabled }: ButtonProps) {
  const outlined = `
    font-inter 
    rounded-md 
    bg-white 
    px-3.5 
    py-2.5 
    text-[14px] 
    font-semibold 
    text-proquinal-teal 
    shadow-sm 
    cursor-pointer
    border 
    border-1
    hover:bg-proquinal-teal/80 
    focus-visible:outline 
    focus-visible:outline-2 
    focus-visible:outline-offset-2 
    dark:shadow-none 
    dark:bg-proquinal-teal
  `

  const filled = `
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
  `

  const disabledClasses = `
    font-inter 
    rounded-md 
    bg-[#dedede] 
    px-3.5 
    py-2.5 
    text-[14px] 
    font-semibold 
    text-[#949494] 
    shadow-sm 
    cursor-pointer
    hover:bg-proquinal-teal/80 
    focus-visible:outline 
    focus-visible:outline-2 
    focus-visible:outline-offset-2 
    dark:shadow-none
  `

  return (
    <button
      type={type || "button"}
      onClick={onClick}
      disabled={disabled}
      className={
        disabled
          ? disabledClasses
          : variant === "filled"
            ? filled
            : outlined
      }
    >
      {icon && icon}
      {text}
    </button>
  )
}
