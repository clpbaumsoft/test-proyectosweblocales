//Interfaces and types
import { LabelFormProps } from "@/interfaces/Atoms";

export default function LabelForm({ label, required = true }: LabelFormProps) {
	return (
		<label className="font-inter text-[14px] dark:text-black">
			{label}
			{required && <span aria-hidden="true" className="text-proquinal-teal">*</span>}
		</label>
	)
}