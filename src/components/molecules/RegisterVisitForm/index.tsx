import moment from "moment";
import type { Moment } from "moment";
import { ErrorMessage } from "@hookform/error-message";
import { Controller } from "react-hook-form";
import { Alert } from "@mui/material";
import DropdownsCompany from "./components/DropdownsCompany";
import FormMessages from "@/components/atoms/FormMessages";
import FullLoader from "@/components/atoms/FullLoader";
import InputAutocomplete from "@/components/atoms/InputAutocomplete";
import LabelForm from "@/components/atoms/LabelForm";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { GTRANS } from "@/constants/Globals";
import useTranslation from "@/hooks/useTranslation";
import useRegisterVisitForm from "./useRegisterVisitForm";
import { RegisterVisitFormProps } from "@/interfaces/Organisms";
import { TRANS } from "./constants";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Button from "@/components/atoms/Button";
import CustomDatePicker from "@/components/atoms/CustomDatePicker";

export default function RegisterVisitForm({ visitId, open, onClose, preFillFormData, onSaved }: RegisterVisitFormProps) {
	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)

	const {
		indexRefresh,
		company_selected,
		branch_selected,
		isInnerLoading,
		minDateDeparture,
		errors,
		companies,
		message,
		error,
		control,
		isLoadingCompanies,
		closeForm,
		handleSubmit,
		onSubmit,
		register,
		getInputDateValue,
		onChangeInputDate,
		renderValueDropdown,
		getCompany,
		getBranch,
		getGate,
		getBranches,
		getGates,
		isValidForm,
		emitGetOptionsInterventor,
	} = useRegisterVisitForm(onClose, preFillFormData, visitId, onSaved)

  return (
		<Dialog open={open} onClose={closeForm} className="relative z-10 font-inter">
			<DialogBackdrop
				transition
				className="
					fixed 
					inset-0 
					bg-black/45 
					transition-opacity 
					data-[closed]:opacity-0 
					data-[enter]:duration-300
					data-[leave]:duration-200 
					data-[enter]:ease-out 
					data-[leave]:ease-in
				"
			/>
			{isInnerLoading && (
				<FullLoader variant="absolute" />
			)}
			<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
				<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
					<DialogPanel
						transition
						className="
							relative 
							transform 
							overflow-hidden
							rounded-lg 
							bg-white 
							px-4 pb-4 pt-5 
							text-left 
							shadow-xl
							max-w-[900px] 
							w-full
							transition-all 
							data-[closed]:translate-y-4 
							data-[closed]:opacity-0 
							data-[enter]:duration-300 
							data-[leave]:duration-200 
							data-[enter]:ease-out 
							data-[leave]:ease-in 
							sm:my-8 sm:w-full sm:max-w-lg sm:p-8
							data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
					>
						<LocalizationProvider dateAdapter={AdapterMoment}>
							<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
								<h1 className="font-inter text-[24px] font-semibold text-center mb-4">
									{TEXTS.title}
								</h1>
								<div className="flex gap-4 mb-4 sm:flex-row flex-col">
									<div>
										<LabelForm label={TEXTS.label_entry_date} />
										<CustomDatePicker
											key={`entryDatePicer${indexRefresh}`}
											defaultValue={getInputDateValue('entry_date')}
											onChange={(date: Moment | null) => onChangeInputDate('entry_date', date)}
											minDate={moment()}
										/>
									</div>
									<div>
										<LabelForm label={TEXTS.label_departure_date} />
										<CustomDatePicker
											key={`departureDatePicer${indexRefresh}`}
											defaultValue={getInputDateValue('departure_date')}
											onChange={(date: Moment | null) => onChangeInputDate('departure_date', date)}
											minDate={minDateDeparture}
										/>
									</div>
								</div>
								<div className="w-full">
									<LabelForm label={TEXTS.label_reason} />
									<textarea 
										{...register("reason", { required: TEXTS.required })}
										className="
											w-full 
											border 
											border-gray-300 
											rounded-md 
											p-2 
											resize-none 
											focus:outline-none 
											focus:ring-2 
											focus:ring-proquinal-teal 
											focus:border-transparent
										"
										rows={3}
									/>
									<ErrorMessage
										errors={errors}
										name="reason"
										render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
									/>
								</div>
								<div className="w-full">
									<LabelForm label={TEXTS.label_interventor} required={true} />
									<Controller
										name="email_interventor"
										control={control}
										rules={{ required: TEXTS.required }}
										render={({ field }) => {
												return (
													<InputAutocomplete
														onChange={(val) => field.onChange(val ? val.value : field.value)}
														emitGetOptions={emitGetOptionsInterventor}
														helpText={TEXTS.help_text_search_interventor}
														defaultValue={field.value}
													/>
												)
											}
										}
									/>
									<ErrorMessage
										errors={errors}
										name="reason"
										render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
									/>
								</div>
								{ /* Field: Approver - temporal disabled */}
								{/* <Grid size={12}>
								<LabelForm
									label={TEXTS.label_approver}
									required={false}
								/>
								<Controller
									name="email_approver"
									control={control}
									render={({ field }) => (
										<InputAutocomplete
											onChange={(val) => field.onChange(val ? val.value : "")}
											emitGetOptions={emitGetOptionsApprovers}
											helpText={TEXTS.help_text_search_approver}
											defaultValue={field.value}
										/>
									)}
								/>
								<ErrorMessage
									errors={errors}
									name="reason"
									render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
								/>
								</Grid> */}
								<DropdownsCompany
									isLoadingCompanies={isLoadingCompanies}
									errors={errors}
									control={control}
									companies={companies}
									company_selected={company_selected}
									branch_selected={branch_selected}
									renderValueDropdown={renderValueDropdown}
									getCompany={getCompany}
									getBranches={getBranches}
									getBranch={getBranch}
									getGates={getGates}
									getGate={getGate}
								/>
								<FormMessages
									message={message}
									error={error}
								/>
								<div className="flex justify-end gap-2">
									<Button
										text={GTEXTS.close}
										onClick={closeForm}
										variant="outlined"
									/>
									<Button
										type="submit"
										text={TEXTS.save}
										disabled={!isValidForm()}
									/>
								</div>
							</form>
						</LocalizationProvider>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
  );
}
