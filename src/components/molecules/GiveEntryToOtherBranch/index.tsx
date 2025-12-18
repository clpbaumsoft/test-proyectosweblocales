import {
	Alert,
} from "@mui/material";
import { ErrorMessage } from "@hookform/error-message";
import { Controller } from "react-hook-form";
import FullLoader from "@/components/atoms/FullLoader";
import FormMessages from "@/components/atoms/FormMessages";
import LabelForm from "@/components/atoms/LabelForm";
import { GTRANS } from "@/constants/Globals";
import useTranslation from "@/hooks/useTranslation";
import useGiveEntryToOtherBranchForm from "./useGiveEntryToOtherBranchForm";
import { GiveEntryToOtherBranchProps } from "@/interfaces/Molecules";
import { TRANS } from "./constants";
import { Button } from "@/components/atomsv2/Button";
import { useEffect, useState } from "react";
import { Combobox, ComboboxLabel, ComboboxOption } from "@/components/atomsv2/Combobox";

export default function GiveEntryToOtherBranch({ visitor, visit, onClose }: GiveEntryToOtherBranchProps) {
	const [loadedGates, setLoadedGates] = useState<{ label: string, value: number }[]>([])
	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)
	
	const {
		isInnerLoading,
		errors,
		message,
		error,
		control,
		// register,
		handleSubmit,
		onSubmit,
		loadGates,
	} = useGiveEntryToOtherBranchForm(visitor, visit)

	useEffect(() => {
		const fetchGates = async () => {
			const gates = await loadGates()
			setLoadedGates(gates)
		}
		fetchGates()
	}, [loadGates])
	
	return (
		<div className="relative">
			{isInnerLoading && (
				<FullLoader variant="absolute" />
			)}
			<form onSubmit={handleSubmit(onSubmit)}>
				<h1 className="font-inter text-[18px] font-semibold text-start mb-4">
					{TEXTS.title}
				</h1>
				<div>
					<LabelForm label={TEXTS.label_gate} />
					<Controller
						name="gate_selected"
						control={control}
						render={({ field }) => {
							const { value, onChange, name } = field

							const selectedGate =
								loadedGates.find((g) => g.value === value) ?? null

							return (
								<Combobox
									name={name}
									value={selectedGate}
									onChange={(gate) => onChange(gate?.value ?? '')}
									options={loadedGates}
									displayValue={(gate) => gate?.label ?? ''}
								>
									{(gate) => (
										<ComboboxOption key={gate.value} value={gate}>
											<ComboboxLabel>{gate.label}</ComboboxLabel>
										</ComboboxOption>
									)}
								</Combobox>
							)
						}}
					/>
					<ErrorMessage
						errors={errors}
						name="gate_selected"
						render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
					/>
				</div>
				<FormMessages
					message={message}
					error={error}
				/>
				<div className="flex justify-end gap-2">
					<Button outline onClick={onClose}>
						{GTEXTS.close}
					</Button>
					<Button color="dark" type="submit">
						{TEXTS.give_entry}
					</Button>
				</div>
			</form>
		</div>
	)
}