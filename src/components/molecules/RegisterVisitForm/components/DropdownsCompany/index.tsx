import { Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import {
	Alert,
	Skeleton,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import LabelForm from "@/components/atoms/LabelForm";
import { GTRANS } from "@/constants/Globals";
import useTranslation from "@/hooks/useTranslation";
import { DropdownsCompanyProps } from "@/interfaces/Molecules"
import { Branch, Company, Gate } from "@/interfaces/Models";
import { TRANS } from "./constants";
import Select from "@/components/atoms/Select";

export default function DropdownsCompany({
	isLoadingCompanies,
	errors,
	control,
	companies,
	company_selected,
	branch_selected,
	// renderValueDropdown,
	// getCompany,
	getBranches,
	// getBranch,
	getGates,
	// getGate,
}: DropdownsCompanyProps) {
	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)

	if(isLoadingCompanies) {
		return (
			<Grid size={12}>
				<LabelForm label={TEXTS.label_company} />
				<Skeleton variant="rounded" height={40} />
			</Grid>
		)
	}

	return (
		<>
			{/* Field: Company */}
			<div className="w-full">
				<LabelForm label={TEXTS.label_company} />
				{companies.length > 0 ? (
					<Controller
						name="company_selected"
						control={control}
						rules={{
							required: GTEXTS.required,
						}}
						render={({ field }) => (
							<Select 
								value={field.value}
								onChange={(itemValue) => field.onChange(itemValue)}
								options={companies.map((company: Company) => ({ label: company.short_description, value: company.id }))}
							/>
						)}
					/>
				) : (
					<p className="font-inter text-sm mt-2">{TEXTS.no_companies}</p>
				)
				}
				<ErrorMessage
					errors={errors}
					name="company_selected"
					render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
				/>
			</div>
			
			{company_selected !== '' && (
				<>
					{ /* Field: Branch */}
					<div className="w-full">
						<LabelForm label={TEXTS.label_branch} />
						{getBranches().length > 0 ? (
							<>
								<Controller
									name="branch_selected"
									control={control}
									rules={{
										required: GTEXTS.required,
									}}
									render={({ field }) => (
										<Select
											value={field.value}
											onChange={(itemValue) => field.onChange(itemValue)}
											options={getBranches().map((branch: Branch) => ({ label: branch.short_description, value: branch.id }))}
										/>
									)}
								/>
								<ErrorMessage
									errors={errors}
									name="branch_selected"
									render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
								/>
							</>
						) : (
							<p className="font-inter text-sm mt-2">{TEXTS.no_branches}</p>
						)
						}
					</div>
					{branch_selected !== '' && (
						<div className="w-full">
							<LabelForm label={TEXTS.label_gate} />
							{getGates().length > 0 ? (
									<>
										<Controller
											name="gate_selected"
											control={control}
											rules={{
												required: GTEXTS.required,
											}}
											render={({ field }) => (
												<Select
													value={field.value}
													onChange={(itemValue) => field.onChange(itemValue)}
													options={getGates().map((gate: Gate) => ({ label: gate.description, value: gate.id }))}
												/>
											)}
										/>
										<ErrorMessage
											errors={errors}
											name="gate_selected"
											render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
										/>
									</>
								) : (
									<p className="font-inter text-sm mt-2">{TEXTS.no_gates}</p>
								)
							}
						</div>
					)}
				</>
			)}
		</>
	)
}