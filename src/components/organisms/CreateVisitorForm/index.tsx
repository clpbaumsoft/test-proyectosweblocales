import {
	Alert,
	Button,
	MenuItem,
	TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

//Components
import ButtonFile from "@/components/atoms/ButtonFile";
import DropdownLoadedItems from "@/components/atoms/DropdownLoadedItems";
import FormMessages from "@/components/atoms/FormMessages";
import FullLoader from "@/components/atoms/FullLoader";
import LabelForm from "@/components/atoms/LabelForm";
import SelectLoadedItems from "@/components/atoms/SelectLoadedItems";

//Constants
import { GTRANS } from "@/constants/Globals";

//Hooks
import useCreateVisitorForm from "./useCreateVisitorForm"
import useTranslation from "@/hooks/useTranslation";

//Interfaces and types
import { CreateVisitorFormProps } from "@/interfaces/Organisms";

//Styles
import { BoxButtonsForm, HeadingForm, SpaceBtn } from "@/styles/elements";
import { ButtonViewRestrictedUser } from "@/components/atoms/ButtonViewRestrictedUser/ButtonViewRestrictedUser";

//Texts
const TRANS = {
	title_form: {
		id: "CreateVisitorForm.HeadingForm.TitleForm",
		defaultMessage: "Registrar Visitante",
		description: "",
	},
	label_identity_number: {
		id: "CreateVisitorForm.Typography.Label.IdentityNumber",
		defaultMessage: "Número de identificación",
		description: "",
	},
	label_visitor_type: {
		id: "CreateVisitorForm.Typography.Label.VisitorType",
		defaultMessage: "Tipo visitante",
		description: "",
	},
	label_identification_type: {
		id: "CreateVisitorForm.Typography.Label.IdentificationType",
		defaultMessage: "Tipo identificación",
		description: "",
	},
	label_identification_number: {
		id: "CreateVisitorForm.Typography.Label.IdentificationNumber",
		defaultMessage: "Identificación",
		description: "",
	},
	label_first_name: {
		id: "CreateVisitorForm.Typography.Label.FirstName",
		defaultMessage: "Primer nombre",
		description: "",
	},
	label_middle_name: {
		id: "CreateVisitorForm.Typography.Label.MiddleName",
		defaultMessage: "Segundo nombre",
		description: "",
	},
	label_first_last_name: {
		id: "CreateVisitorForm.Typography.Label.FirstLastName",
		defaultMessage: "Primer apellido",
		description: "",
	},
	label_second_last_name: {
		id: "CreateVisitorForm.Typography.Label.SecondLastName",
		defaultMessage: "Segundo apellido",
		description: "",
	},
	label_phone: {
		id: "CreateVisitorForm.Typography.Label.Phone",
		defaultMessage: "Teléfono",
		description: "",
	},
	label_address: {
		id: "CreateVisitorForm.Typography.Label.Address",
		defaultMessage: "Dirección",
		description: "",
	},
	label_emergency_contact_name: {
		id: "CreateVisitorForm.Typography.Label.EmergencyContactName",
		defaultMessage: "Contacto de emergencia",
		description: "",
	},
	label_emergency_contact_phone: {
		id: "CreateVisitorForm.Typography.Label.EmergencyContactPhone",
		defaultMessage: "Teléfono contacto de emergencia",
		description: "",
	},
	label_country: {
		id: "CreateVisitorForm.Typography.Label.Country",
		defaultMessage: "País",
		description: "",
	},
	label_city: {
		id: "CreateVisitorForm.Typography.Label.City",
		defaultMessage: "Ciudad",
		description: "",
	},
	label_photo: {
		id: "CreateVisitorForm.Typography.Label.Photo",
		defaultMessage: "Fotografía",
		description: "",
	},
	choose_photo: {
		id: "CreateVisitorForm.ButtonFile.ChoosePhoto",
		defaultMessage: "Selecciona",
		description: "",
	},
	label_social_security: {
		id: "CreateVisitorForm.Typography.Label.SocialSecurity",
		defaultMessage: "EPS",
		description: "",
	},
	label_arl: {
		id: "CreateVisitorForm.Typography.Label.Arl",
		defaultMessage: "ARL",
		description: "",
	},
	save: {
		id: "CreateVisitorForm.Typography.Label.Save",
		defaultMessage: "Agregar",
		description: "",
	},
}


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
		countryId,
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
		setSearchTerm,
		setSearchCity,
		loadCareCompanies,
		loadArlCompanies,
		loadCountries,
		loadCities,
		loadVisitorTypes,
		loadIdentificationTypes,
		currentVisitorData,
	} = useCreateVisitorForm(visitId, onIncreaseVisitorsCounter, isNewVisitorBasicForm)

	return (
		<>
			<div>
				{
					isInnerLoading && (
						<FullLoader variant="absolute" />
					)
				}
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

									<Grid size={{ xs: 12, md: 6 }}>
										<LabelForm
											label={TEXTS.label_country}
											required={false}
										/>
										<Controller
											name="country"
											control={control}
											render={({ field }) => (
												<SelectLoadedItems
													fetchItems={loadCountries}
													onChangeValue={(itemValue) => field.onChange(itemValue ? itemValue.value : '')}
													defaultValue={field.value}
													inputProps={{
														fullWidth: true,
														size: 'small',
													}}
													onInputChange={(search) => setSearchTerm((search.target as HTMLInputElement).value)}
												/>
											)}
										/>
										<ErrorMessage
											errors={errors}
											name="country"
											render={({ message }) => <Alert icon={false} severity="error">{message}</Alert>}
										/>
									</Grid>
									<Grid size={{ xs: 12, md: 6 }}>
										<LabelForm
											label={TEXTS.label_city}
											required={false}
										/>
										<Controller
											name="city"
											control={control}
											render={({ field }) => (
												<SelectLoadedItems
													fetchItems={loadCities} 
													disabled={!countryId}
													onChangeValue={(itemValue) => field.onChange(itemValue ? itemValue.value : '')}
													defaultValue={field.value}
													inputProps={{
														fullWidth: true,
														size: 'small',
													}}
													onInputChange={(search) => setSearchCity((search.target as HTMLInputElement).value)}
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
									<Grid size={{ xs: 12, md: 12 }}>
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