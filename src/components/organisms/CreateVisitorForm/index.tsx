import {
	Alert,
	Button,
	MenuItem,
	TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import ButtonFile from "@/components/atoms/ButtonFile";
import DropdownLoadedItems from "@/components/atoms/DropdownLoadedItems";
import FormMessages from "@/components/atoms/FormMessages";
import FullLoader from "@/components/atoms/FullLoader";
import LabelForm from "@/components/atoms/LabelForm";
import SelectLoadedItems from "@/components/atoms/SelectLoadedItems";
import { GTRANS } from "@/constants/Globals";
import useCreateVisitorForm from "./useCreateVisitorForm"
import useTranslation from "@/hooks/useTranslation";
import { CreateVisitorFormProps } from "@/interfaces/Organisms";
import { BoxButtonsForm, HeadingForm, SpaceBtn } from "@/styles/elements";
import { ButtonViewRestrictedUser } from "@/components/atoms/ButtonViewRestrictedUser/ButtonViewRestrictedUser";
import { TRANS } from "./constants";

export default function CreateVisitorForm({ 
	visitId, 
	onCancel, 
	onIncreaseVisitorsCounter, 
	optionalFields = false, 
	cutomTitleForm, 
	isNewVisitorBasicForm = false }: CreateVisitorFormProps) {
	
	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)
	
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
		onBlurIdentificationNumber,
		getPhotoDefaultValue,
		loadCareCompanies,
		loadArlCompanies,
		loadCities,
		loadVisitorTypes,
		loadIdentificationTypes,
		currentVisitorData,
	} = useCreateVisitorForm(visitId, onIncreaseVisitorsCounter, isNewVisitorBasicForm)

	return (
		<>
			<div>
				{isInnerLoading && (
					<FullLoader variant="absolute" />
				)}
				<form onSubmit={handleSubmit(onSubmit, onError)}>
					<HeadingForm>{cutomTitleForm ? cutomTitleForm : TEXTS.title_form}</HeadingForm>
					<Grid container spacing={3}>
							
						{/***************************************************/}
						{/* Field: Visitor Type */}
						{
							!optionalFields &&
							<Grid size={{ xs: 12, md: 6 }}>
								<LabelForm
									label={TEXTS.label_visitor_type}
								/>
								<Controller
									name="id_visitor_type"
									control={control}
									rules={{
										required: GTEXTS.required,
									}}
									render={({ field }) => (
										<DropdownLoadedItems
											fetchItems={loadVisitorTypes} 
											onChangeValue={(itemValue) => field.onChange(itemValue ? itemValue.value : '')}
											defaultValue={field.value}
											selectProps={{
												size: 'small',
												fullWidth: true,
											}}
										/>
									)}
								/>
								<ErrorMessage
									errors={errors}
									name="id_visitor_type"
									render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
								/>
							</Grid>
						}

						
						{/***************************************************/}
						{/* Field: Identification Type */}
						<Grid size={{ xs: 12, md: 6 }}>
							<LabelForm
								label={TEXTS.label_identification_type}
							/>
							<Controller
								name="id_identity_type"
								control={control}
								rules={{
									required: GTEXTS.required,
								}}
								render={({ field }) => (
									<DropdownLoadedItems
										fetchItems={loadIdentificationTypes} 
										onChangeValue={(itemValue) => field.onChange(itemValue ? itemValue.value : '')}
										defaultValue={field.value}
										selectProps={{
											size: 'small',
											fullWidth: true,
										}}
									/>
								)}
							/>
							<ErrorMessage
								errors={errors}
								name="id_identity_type"
								render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
							/>
						</Grid>
						
						{/***************************************************/}
						{/* Field: Identification Number */}
						<Grid size={{ xs: 12, md: 6 }}>
							<LabelForm
								label={TEXTS.label_identification_number}
							/>
							<TextField 
								id="identity_number" 
								{...register("identity_number", { required: GTEXTS.required })}
								onBlur={onBlurIdentificationNumber}
								size="small"
								fullWidth
							/>
							<ErrorMessage
								errors={errors}
								name="identity_number"
								render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
							/>
						</Grid>

						{/***************************************************/}
						{/* Field:  requires security speak*/}
						<Grid size={{ xs: 12, md: 6 }}>
							<LabelForm label="¿Requiere charla de seguridad?" />
							<Controller
								name="requires_security_speak"
								control={control}
								defaultValue={1}
								rules={{
								required: GTEXTS.required,
								}}
								render={({ field }) => (
								<TextField
									select
									fullWidth
									size="small"
									{...field}
								>
									<MenuItem value="1">SI</MenuItem>
									<MenuItem value="0">NO</MenuItem>
								</TextField>
								)}
							/>
							<ErrorMessage
								errors={errors}
								name="requires_security_speak"
								render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
							/>
						</Grid>
						
						{/***************************************************/}
						{/* Field: First Name */}
						<Grid size={{ xs: 12, md: 6 }}>
							<LabelForm
								label={TEXTS.label_first_name}
							/>
							<TextField 
								id="first_name" 
								{...register("first_name", { required: GTEXTS.required })} 
								size="small"
								fullWidth
							/>
							<ErrorMessage
								errors={errors}
								name="first_name"
								render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
							/>
						</Grid>
						
						{/***************************************************/}
						{/* Field: Middle Name */}
						<Grid size={{ xs: 12, md: 6 }}>
							<LabelForm
								label={TEXTS.label_middle_name}
								required={false}
							/>
							<TextField 
								id="middle_name" 
								{...register("middle_name")} 
								size="small"
								fullWidth
							/>
							<ErrorMessage
								errors={errors}
								name="middle_name"
								render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
							/>
						</Grid>
						
						{/***************************************************/}
						{/* Field: First Last Name */}
						<Grid size={{ xs: 12, md: 6 }}>
							<LabelForm
								label={TEXTS.label_first_last_name}
							/>
							<TextField 
								id="first_last_name" 
								{...register("first_last_name", { required: GTEXTS.required })} 
								size="small"
								fullWidth
							/>
							<ErrorMessage
								errors={errors}
								name="first_last_name"
								render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
							/>
						</Grid>
						
						{/***************************************************/}
						{/* Field: Second Last Name */}
						<Grid size={{ xs: 12, md: 6 }}>
							<LabelForm
								label={TEXTS.label_second_last_name}
								required={false}
							/>
							<TextField 
								id="second_last_name" 
								{...register("second_last_name")} 
								size="small"
								fullWidth
							/>
							<ErrorMessage
								errors={errors}
								name="second_last_name"
								render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
							/>
						</Grid>

						{
							currentVisitorData?.is_currently_banned ? 
							<ButtonViewRestrictedUser 
								isLink={false}
								text={"Este visitante está actualmente restringido."}
							/>
							: ( !optionalFields &&
								<>
									{/***************************************************/}
									{/* Field: Address */}
									{/* <Grid size={12}>
										<LabelForm
											label={TEXTS.label_address}
										/>
										<TextField 
											id="address" 
											{...register("address", { required: GTEXTS.required })} 
											size="small"
											fullWidth
										/>
										<ErrorMessage
											errors={errors}
											name="address"
											render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
										/>
									</Grid> */}
									
									{/***************************************************/}
									{/* Field: City */}
									<Grid size={{ xs: 12, md: 6 }}>
										<LabelForm
											label={TEXTS.label_city}
											required={false}
										/>
										<Controller
											name="city"
											control={control}
											// rules={{
											// 	required: GTEXTS.required,
											// }}
											render={({ field }) => (
												<SelectLoadedItems
													fetchItems={loadCities} 
													onChangeValue={(itemValue) => field.onChange(itemValue ? itemValue.value : '')}
													defaultValue={field.value}
													inputProps={{
														fullWidth: true,
														size: 'small',
													}}
												/>
											)}
										/>
										<ErrorMessage
											errors={errors}
											name="city"
											render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
										/>
									</Grid>

									{/***************************************************/}
									{/* Field: Phone */}
									<Grid size={{ xs: 12, md: 6 }}>
										<LabelForm
											label={TEXTS.label_phone}
											required={false}
										/>
										<TextField 
											id="phone" 
											{...register(
												"phone", 
												// { required: GTEXTS.required }
											)} 
											size="small"
											fullWidth
										/>
										<ErrorMessage
											errors={errors}
											name="phone"
											render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
										/>
									</Grid>
									
									{/***************************************************/}
									{/* Field: Photo */}
									<Grid size={12}>
										<LabelForm
											label={TEXTS.label_photo}
											required={false}
										/>
										<Controller
											name="photo"
											control={control}
											// rules={{
											// 	required: GTEXTS.required,
											// }}
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
									</Grid>
									
									{/***************************************************/}
									{/* Field: Emergency Contact Name */}
									<Grid size={{ xs: 12, md: 6 }}>
										<LabelForm
											label={TEXTS.label_emergency_contact_name}
											required={false}
										/>
										<TextField 
											id="emergency_contact_name" 
											{...register(
												"emergency_contact_name", 
												// { required: GTEXTS.required }
											)} 
											size="small"
											fullWidth
										/>
										<ErrorMessage
											errors={errors}
											name="emergency_contact_name"
											render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
										/>
									</Grid>
									
									{/***************************************************/}
									{/* Field: Emergency Contact Phone */}
									<Grid size={{ xs: 12, md: 6 }}>
										<LabelForm
											label={TEXTS.label_emergency_contact_phone}
											required={false}
										/>
										<TextField 
											id="emergency_contact_phone" 
											{...register(
												"emergency_contact_phone", 
												// { required: GTEXTS.required }
											)} 
											size="small"
											fullWidth
										/>
										<ErrorMessage
											errors={errors}
											name="emergency_contact_phone"
											render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
										/>
									</Grid>
									
									{/***************************************************/}
									{/* Field: Social Security */}
									<Grid size={{ xs: 12, md: 6 }}>
										<LabelForm
											label={TEXTS.label_social_security}
											required={false}
										/>
										<Controller
											name="social_security"
											control={control}
											render={({ field }) => (
												<SelectLoadedItems
													fetchItems={loadCareCompanies} 
													onChangeValue={(itemValue) => field.onChange(itemValue ? itemValue.value : '')}
													defaultValue={field.value}
													inputProps={{
														fullWidth: true,
														size: 'small',
													}}
												/>
											)}
										/>
										<ErrorMessage
											errors={errors}
											name="social_security"
											render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
										/>
									</Grid>
									
									{/***************************************************/}
									{/* Field: ARL */}
									<Grid size={{ xs: 12, md: 6 }}>
										<LabelForm
											label={TEXTS.label_arl}
											required={false}
										/>
										<Controller
											name="arl"
											control={control}
											render={({ field }) => (
												<SelectLoadedItems
													fetchItems={loadArlCompanies} 
													onChangeValue={(itemValue) => field.onChange(itemValue ? itemValue.value : '')}
													defaultValue={field.value}
													inputProps={{
														fullWidth: true,
														size: 'small',
													}}
												/>
											)}
										/>
										<ErrorMessage
											errors={errors}
											name="arl"
											render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
										/>
									</Grid>
								</>
							)
						}
					</Grid>
					<FormMessages
						message={message}
						error={error}
					/>
					{
						!currentVisitorData?.is_currently_banned && (
							<BoxButtonsForm>
								<Button
									onClick={onCancel}
									variant="outlined"
								>
									{GTEXTS.close}
								</Button>
								<SpaceBtn />
								<Button
									type="submit"
									variant="contained"
									disabled={!isValidForm()}
								>
									{TEXTS.save}
								</Button>
							</BoxButtonsForm>
						)
					}
				</form>
			</div>
		</>
	)
}