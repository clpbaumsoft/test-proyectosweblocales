
export interface ButtonProps {
  type?: "button" | "submit" | "reset";
  text?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}