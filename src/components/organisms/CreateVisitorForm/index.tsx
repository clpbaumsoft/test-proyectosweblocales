import { Alert } from "@mui/material";
import { Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import ButtonFile from "@/components/atoms/ButtonFile";
import FormMessages from "@/components/atoms/FormMessages";
import FullLoader from "@/components/atoms/FullLoader";
import LabelForm from "@/components/atoms/LabelForm";
import { GTRANS } from "@/constants/Globals";
import useCreateVisitorForm from "./useCreateVisitorForm"
import useTranslation from "@/hooks/useTranslation";
import { CreateVisitorFormProps } from "@/interfaces/Organisms";
import { ButtonViewRestrictedUser } from "@/components/atoms/ButtonViewRestrictedUser/ButtonViewRestrictedUser";
import { TRANS } from "./constants";
import Select from "@/components/atoms/Select";
import useLoadData from "./hooks/useLoadData";
import InputGroup from "@/components/atoms/InputGroup";
import Button from "@/components/atoms/Button";

export default function CreateVisitorForm({ 
	visitId, 
	onCancel, 
	onIncreaseVisitorsCounter, 
	optionalFields = false, 
	cutomTitleForm, 
	isNewVisitorBasicForm = false 
}: CreateVisitorFormProps) {
	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)
	const loadedData = useLoadData(visitId, onIncreaseVisitorsCounter, isNewVisitorBasicForm)
	
	const {
		message,
		error,
		isInnerLoading,
		errors,
		control,
		register,
		handleSubmit,
		onSubmit,
		onError,
		isValidForm,
		getPhotoDefaultValue,
		currentVisitorData,
	} = useCreateVisitorForm(visitId, onIncreaseVisitorsCounter, isNewVisitorBasicForm)

	return (
		<div>
			{isInnerLoading && (
				<FullLoader variant="absolute" />
			)}
			<form onSubmit={handleSubmit(onSubmit, onError)}>
				<h1 className="font-inter text-[24px] font-semibold text-center mb-6">
					{cutomTitleForm ? cutomTitleForm : TEXTS.title_form}
				</h1>
				<div className="flex flex-col flex-wrap gap-4">
					<section className="flex gap-6">
						{!optionalFields && (
							<div className="w-6/12">
								<LabelForm label={TEXTS.label_visitor_type} />
								<Controller
									name="id_visitor_type"
									control={control}
									rules={{
										required: GTEXTS.required,
									}}
									render={({ field }) => (
										<Select
											{...field}
											options={loadedData.visitorTypes.map((option) => ({
												label: option.label,
												value: option.value
											}))}
											onChange={(itemValue) => field.onChange(itemValue)}
											defaultValue={field.value}
										/>
									)}
								/>
								<ErrorMessage
									errors={errors}
									name="id_visitor_type"
									render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
								/>
							</div>
						)}
						<div className="w-6/12">
							<LabelForm label={TEXTS.label_identification_type} />
							<Controller
								name="id_identity_type"
								control={control}
								rules={{
									required: GTEXTS.required,
								}}
								render={({ field }) => (
									<Select
										{...field}
										options={loadedData.identificationTypes.map((option) => ({
											label: option.label,
											value: option.value
										}))}
										onChange={(itemValue) => field.onChange(itemValue)}
										defaultValue={field.value}
									/>
								)}
							/>
							<ErrorMessage
								errors={errors}
								name="id_identity_type"
								render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
							/>
						</div>
					</section>
					<section className="flex gap-6">
						<div className="w-full">
							<LabelForm label={TEXTS.label_identification_number} />
							<InputGroup
								{...register("identity_number", { required: GTEXTS.required })}
								type="number"
							/>
							<ErrorMessage
								errors={errors}
								name="identity_number"
								render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
							/>
						</div>
						<div className="w-full">
							<LabelForm label="¿Requiere charla de seguridad?" />
							<Controller
								name="requires_security_speak"
								control={control}
								rules={{ required: GTEXTS.required }}
								render={({ field }) => (
									<Select
										{...field}
										options={[{ label: "SI", value: 1 }, { label: "NO", value: 0 }].map((option) => ({
											label: option.label,
											value: option.value
										}))}
										onChange={(itemValue) => field.onChange(itemValue)}
										defaultValue={1}
									/>
								)}
							/>
							<ErrorMessage
								errors={errors}
								name="requires_security_speak"
								render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
							/>
						</div>
					</section>
					<section className="flex gap-6">
						<div className="w-full">
							<LabelForm label={TEXTS.label_first_name} />
							<InputGroup
								{...register("first_name", { required: GTEXTS.required })}
								type="text"
							/>
							<ErrorMessage
								errors={errors}
								name="first_name"
								render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
							/>
						</div>
						<div className="w-full">
							<LabelForm label={TEXTS.label_middle_name} required={false} />
							<InputGroup
								{...register("middle_name", { required: GTEXTS.required })}
								type="text"
							/>
							<ErrorMessage
								errors={errors}
								name="middle_name"
								render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
							/>
						</div>
					</section>
					<section className="flex gap-6">
						<div className="w-full">
							<LabelForm label={TEXTS.label_first_last_name} />
							<InputGroup
								{...register("first_last_name", { required: GTEXTS.required })}
								type="text"
							/>
							<ErrorMessage
								errors={errors}
								name="first_last_name"
								render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
							/>
						</div>
						<div className="w-full">
							<LabelForm label={TEXTS.label_second_last_name} required={false} />
							<InputGroup
								{...register("second_last_name", { required: GTEXTS.required })}
								type="text"
							/>
							<ErrorMessage
								errors={errors}
								name="second_last_name"
								render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
							/>
						</div>
					</section>
					{currentVisitorData?.is_currently_banned ?
						<ButtonViewRestrictedUser
							isLink={false}
							text={"Este visitante está actualmente restringido."}
						/>
						: (!optionalFields &&
							<>
								<section className="flex gap-6">
									<div className="w-full">
										<LabelForm label={TEXTS.label_city} required={false} />
										<Controller
											name="city"
											control={control}
											render={({ field }) => (
												<Select
													{...field}
													options={loadedData.cities.map((option) => ({
														label: option.label,
														value: option.value
													}))}
													onChange={(itemValue) => field.onChange(itemValue)}
												/>
											)}
										/>
										<ErrorMessage
											errors={errors}
											name="city"
											render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
										/>
									</div>
									<div className="w-full">
										<LabelForm label={TEXTS.label_phone} required={false} />
										<InputGroup
											{...register("phone")}
											type="number"
										/>
										<ErrorMessage
											errors={errors}
											name="phone"
											render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
										/>
									</div>
								</section>
								<div className="w-full">
									<LabelForm label={TEXTS.label_photo} required={false} />
									<Controller
										name="photo"
										control={control}
										render={({ field }) => (
											<ButtonFile
												onChange={field.onChange}
												defaultValueImage={getPhotoDefaultValue()}
												buttonProps={{
													fullWidth: true,
												}}
											>{TEXTS.choose_photo}</ButtonFile>
										)}
									/>
									<ErrorMessage
										errors={errors}
										name="photo"
										render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
									/>
								</div>
								<section className="flex gap-6">
									<div className="w-full">
										<LabelForm label={TEXTS.label_emergency_contact_name} required={false} />
										<InputGroup
											{...register("emergency_contact_name")}
											type="text"
										/>
										<ErrorMessage
											errors={errors}
											name="emergency_contact_name"
											render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
										/>
									</div>
									<div className="w-full">
										<LabelForm label={TEXTS.label_emergency_contact_phone} required={false} />
										<InputGroup
											{...register("emergency_contact_phone")}
											type="number"
										/>
										<ErrorMessage
											errors={errors}
											name="emergency_contact_phone"
											render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
										/>
									</div>
								</section>
								<section className="flex gap-6">
									<div className="w-full">
										<LabelForm label={TEXTS.label_social_security} required={false} />
										<Controller
											name="social_security"
											control={control}
											render={({ field }) => (
												<Select
													{...field}
													options={loadedData.careCompanies.map((option) => ({
														label: option.label,
														value: option.value
													}))}
													onChange={(itemValue) => field.onChange(itemValue)}
												/>
											)}
										/>
										<ErrorMessage
											errors={errors}
											name="social_security"
											render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
										/>
									</div>
									<div className="w-full">
										<LabelForm label={TEXTS.label_arl} required={false} />
										<Controller
											name="arl"
											control={control}
											render={({ field }) => (
												<Select
													{...field}
													options={loadedData.arlCompanies.map((option) => ({
														label: option.label,
														value: option.value
													}))}
													onChange={(itemValue) => field.onChange(itemValue)}
												/>
											)}
										/>
										<ErrorMessage
											errors={errors}
											name="arl"
											render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
										/>
									</div>
								</section>
							</>
						)}
				</div>
				<FormMessages
					message={message}
					error={error}
				/>
				{!currentVisitorData?.is_currently_banned && (
					<div className="flex gap-4 justify-end mt-4">
						<Button variant="outlined" text={GTEXTS.close} onClick={onCancel} />
						<Button text={TEXTS.save} type="submit" disabled={!isValidForm()} />
					</div>
				)}
			</form>
		</div>
	)
}