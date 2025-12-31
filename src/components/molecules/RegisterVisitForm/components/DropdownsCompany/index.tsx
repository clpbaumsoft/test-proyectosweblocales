import { Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import {
	Alert,
	MenuItem,
	Select,
	Skeleton,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

//Components
import LabelForm from "@/components/atoms/LabelForm";

//Constants
import { GTRANS } from "@/constants/Globals";

//Hooks
import useTranslation from "@/hooks/useTranslation";

//Interfaces and types
import { DropdownsCompanyProps } from "@/interfaces/Molecules"
import { Branch, Company, Gate } from "@/interfaces/Models";

//Texts
const TRANS = {
	no_companies: {
		id: "RegisterVisitForm.P.NoCompanies",
		defaultMessage: "No hay empresas disponibles.",
		description: "",
	},
	no_branches: {
		id: "RegisterVisitForm.P.NoBranches",
		defaultMessage: "No hay sedes.",
		description: "",
	},
	no_gates: {
		id: "RegisterVisitForm.P.NoGate",
		defaultMessage: "No hay porterias.",
		description: "",
	},
	label_company: {
		id: "RegisterVisitForm.Typography.Label.Company",
		defaultMessage: "Empresa:",
		description: "",
	},
	label_branch: {
		id: "RegisterVisitForm.Typography.Label.Branch",
		defaultMessage: "Sede:",
		description: "",
	},
	label_gate: {
		id: "RegisterVisitForm.Typography.Label.Gate",
		defaultMessage: "Portería/Área:",
		description: "",
	},
}

export default function DropdownsCompany({
	isLoadingCompanies,
	errors,
	control,
	companies,
	company_selected,
	branch_selected,
	renderValueDropdown,
	getCompany,
	getBranches,
	getBranch,
	getGates,
	getGate,
}: DropdownsCompanyProps) {

	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)

	if(isLoadingCompanies) {
		return (
			<>
				<Grid size={12}>
					<LabelForm
						label={TEXTS.label_company}
					/>
					<Skeleton variant="rounded" height={40} />
				</Grid>
			</>
		)
	}

	return (
		<>
			{/* Field: Company */}
			<Grid size={12}>
				<LabelForm
					label={TEXTS.label_company}
				/>
				{
					companies.length > 0 ? (
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
										displayEmpty
										fullWidth
										size="small"
										renderValue={(selected) => renderValueDropdown(selected, getCompany().short_description)}
									>
										{
											companies.map((company: Company, index: number) => (
												<MenuItem key={index} value={company.id}>
													{company.short_description}
												</MenuItem>
											))
										}
									</Select>
								)}
							/>
					) : (
						<p>{TEXTS.no_companies}</p>
					)
				}
				<ErrorMessage
					errors={errors}
					name="company_selected"
					render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
				/>
			</Grid>
			
			{
				company_selected !== '' && (
					<>
						{ /* Field: Branch */}
						<Grid size={{ xs: 12, md: 6 }}>
							<LabelForm
								label={TEXTS.label_branch}
							/>
							{
								getBranches().length > 0 ? (
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
													displayEmpty
													fullWidth
													size="small"
													renderValue={(selected) => renderValueDropdown(selected, getBranch().short_description)}
												>
													{
														getBranches().map((branch: Branch, index: number) => (
															<MenuItem key={index} value={branch.id}>
																{branch.short_description}
															</MenuItem>
														))
													}
												</Select>
											)}
										/>
										<ErrorMessage
											errors={errors}
											name="branch_selected"
											render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
										/>
									</>
								) : (
									<p>{TEXTS.no_branches}</p>
								)
							}
						</Grid>
						{
							branch_selected !== '' && (
								<>
									{ /* Field: Gate */}
									<Grid size={{ xs: 12, md: 6 }}>
										<LabelForm
											label={TEXTS.label_gate}
										/>
										{
											getGates().length > 0 ? (
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
																displayEmpty
																fullWidth
																size="small"
																renderValue={(selected) => renderValueDropdown(selected, getGate().description)}
															>
															{
																getGates().map((gate: Gate, index: number) => (
																	<MenuItem key={index} value={gate.id}>
																		{gate.description}
																	</MenuItem>
																))
															}
															</Select>
														)}
													/>
													<ErrorMessage
														errors={errors}
														name="gate_selected"
														render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
													/>
												</>
											) : (
												<p>{TEXTS.no_gates}</p>
											)
										}
									</Grid>
								</>
							)
						}
					</>
				)
			}
		</>
	)
}