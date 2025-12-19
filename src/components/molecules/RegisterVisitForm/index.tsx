import moment from "moment";
import type { Moment } from "moment";
import { Controller } from "react-hook-form";
import DropdownsCompany from "./components/DropdownsCompany";
import FormMessages from "@/components/atoms/FormMessages";
import FullLoader from "@/components/atoms/FullLoader";
import InputAutocomplete from "@/components/atoms/InputAutocomplete";
import LabelForm from "@/components/atoms/LabelForm";
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { GTRANS } from "@/constants/Globals";
import useTranslation from "@/hooks/useTranslation";
import useRegisterVisitForm from "./useRegisterVisitForm";
import { RegisterVisitFormProps } from "@/interfaces/Organisms";
import { TRANS } from "./constants";
import Modal from "@/components/atoms/Dialog";
import { customStylesDatePicker } from "@/components/atoms/CustomDatePicker/constants";
import { Button } from "@/components/atomsv2/Button";
import FieldErrorMessage from "@/components/atomsv2/FieldErrorMessage";

export default function RegisterVisitForm({ visitId, open, onClose, preFillFormData, onSaved }: RegisterVisitFormProps) {
	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)

	const {
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
		indexRefresh,
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
		<Modal show={open} onClose={closeForm}>
			{isInnerLoading && (
				<FullLoader variant="absolute" />
			)}
			<LocalizationProvider dateAdapter={AdapterMoment}>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
					<h1 className="font-inter text-[24px] font-semibold text-center mb-4">
						{TEXTS.title}
					</h1>
					<div className="flex gap-4 mb-4 w-full">
						<div className="w-6/12">
							<LabelForm label={TEXTS.label_entry_date} />
							<DateTimePicker
								key={`entryDatePicer${indexRefresh}`}
								defaultValue={getInputDateValue('entry_date')}
								onChange={(date: Moment | null) => onChangeInputDate('entry_date', date)}
								minDate={moment()}
								slotProps={{
									popper: {
										sx: {
											zIndex: 10000,
										},
									},
								}}
								sx={customStylesDatePicker}
							/>
							<FieldErrorMessage errorMessage={errors?.entry_date?.message} />
						</div>
						<div className="w-6/12">
							<LabelForm label={TEXTS.label_departure_date} />
							<DateTimePicker
								key={`departureDatePicer${indexRefresh}`}
								defaultValue={getInputDateValue('departure_date')}
								onChange={(date: Moment | null) => onChangeInputDate('departure_date', date)}
								minDate={minDateDeparture}
								minTime={minDateDeparture}
								slotProps={{
									popper: {
										sx: {
											zIndex: 10000,
										},
									},
								}}
								sx={customStylesDatePicker}
							/>
							<FieldErrorMessage errorMessage={errors?.departure_date?.message} />
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
								text-[14px]
								resize-none 
								focus:outline-none 
								focus:ring-2 
								focus:ring-proquinal-teal 
								focus:border-transparent
							"
							rows={3}
							placeholder={TEXTS.label_reason}
						/>
						<FieldErrorMessage errorMessage={errors?.reason?.message} />
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
							}}
						/>
						<FieldErrorMessage errorMessage={errors?.email_interventor?.message} />
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
						<Button onClick={closeForm} outline>
							{GTEXTS.close}
						</Button>
						<Button type="submit" disabled={!isValidForm()}>
							{TEXTS.save}
						</Button>
					</div>
				</form>
			</LocalizationProvider>
		</Modal>
  );
}
