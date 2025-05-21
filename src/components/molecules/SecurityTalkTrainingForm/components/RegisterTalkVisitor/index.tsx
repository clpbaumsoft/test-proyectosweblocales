import {
	Avatar,
	Box,
	Button,
	ClickAwayListener,
	FormHelperText,
	Tooltip,
	Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import EastIcon from "@mui/icons-material/East";

//Components
import CustomDatePicker from "@/components/atoms/CustomDatePicker";
import LabelForm from "@/components/atoms/LabelForm";
import FormMessages from "@/components/atoms/FormMessages";
import FullLoader from "@/components/atoms/FullLoader";
import WarningCondition from "@/components/atoms/WarningCondition";

//Constants
import { GTRANS } from "@/constants/Globals";

//Interfaces and types
import { RegisterTalkVisitorProps } from "@/interfaces/Molecules";

//Hooks
import useRegisterTalkVisitor from "./useRegisterTalkVisitor";
import useTranslation from "@/hooks/useTranslation";

//Lib
import { formatsDate, mediaUrl, mInit, now } from "@/lib/Helpers";

//Styles
import { BoxButtonsForm } from "@/styles/elements";

//Texts
const TRANS = {
	label_startdate_sgsst: {
		id: "RegisterTalkVisitor.LabelForm.StartDateSgsst",
		defaultMessage: "Fecha vigencia de la charla de seguridad:",
		description: "",
	},
	tooltip_startdate_sgsst: {
		id: "RegisterTalkVisitor.Tooltip.StartDateSgsst",
		defaultMessage: "El tiempo de vigencia de la charla de seguridad.",
		description: "",
	},
	label_startdate_field: {
		id: "RegisterTalkVisitor.CustomDatePicker.Label.StartDate",
		defaultMessage: "Inicio",
		description: "",
	},
	label_enddate_field: {
		id: "RegisterTalkVisitor.CustomDatePicker.Label.EndDate",
		defaultMessage: "Fin",
		description: "",
	},
	label_selectdates: {
		id: "RegisterTalkVisitor.LabelForm.SelectDates",
		defaultMessage: "Selecciona la fecha inicio y fin:",
		description: "",
	},
	help_text_form: {
		id: "RegisterTalkVisitor.FormHelperText.HelpTextDatesField",
		defaultMessage: "Este rango de fecha corresponde al tiempo de duración que tendrá vigencia la charla de seguridad.",
		description: "",
	},
}

export default function RegisterTalkVisitor({ visitor }: RegisterTalkVisitorProps) {
	
	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)

	const {
		isInnerLoading,
		stateVisitor,
		message,
		error,
		isOpenTooltip,
		handleSubmit,
		onSubmit,
		onChangeStartDate,
		onChangeEndDate,
		handleTooltipClose,
		handleTooltipOpen,
	} = useRegisterTalkVisitor(visitor)
	return (
		<>
			<Box 
				sx={{
					p: '20px',
					position: 'relative',
					border: '1px solid var(--mui-palette-primary-main)',
					borderRadius: 'var(--mui-shape-borderRadius)',
				}}
			>
				{
					isInnerLoading && (
						<FullLoader variant="absolute" />
					)
				}
				<form onSubmit={handleSubmit(onSubmit)}>
					<Box>
						<Box sx={{ mb: '10px' }}>
							<Box sx={{ mb: '5px' }}>
								<Avatar 
									alt={stateVisitor.first_name}
									src={mediaUrl(stateVisitor.id, 'foto-visitante')}
									sx={{ width: 70, height: 70 }}
								/>
								<Typography>{stateVisitor.fullname}</Typography>
							</Box>
							{
								stateVisitor.startdate_sgsst && (
									<>
										<LabelForm
											label={TEXTS.label_startdate_sgsst}
											required={false}
										/>
										<Box sx={{ display: 'flex', alignItems: 'center' }}>
											<WarningCondition condition={now().startOf('day').isBefore(mInit(stateVisitor.enddate_sgsst).endOf('day'))}>
												<Box sx={{ display: 'flex' }}>
													<b>{formatsDate(stateVisitor.startdate_sgsst, 'D MMMM, YYYY')}</b><EastIcon sx={{ mx: '10px' }} /><b>{formatsDate(stateVisitor.enddate_sgsst, 'D MMMM, YYYY')}</b>
												</Box>
											</WarningCondition>
											<ClickAwayListener onClickAway={handleTooltipClose}>
												<div>
													<Tooltip
														onClose={handleTooltipClose}
														open={isOpenTooltip}
														disableFocusListener
														disableHoverListener
														disableTouchListener
														title={TEXTS.tooltip_startdate_sgsst}
														slotProps={{
															popper: {
																disablePortal: true,
															},
														}}
														placement="top"
													>
														<Button onClick={handleTooltipOpen}><InfoIcon /></Button>
													</Tooltip>
												</div>
											</ClickAwayListener>
										</Box>
									</>
								)
							}
						</Box>
						<LabelForm
							label={TEXTS.label_selectdates}
							required={false}
						/>
						<Box sx={{ display: 'flex' }}>
							<CustomDatePicker 
								label={TEXTS.label_startdate_field}
								onChange={onChangeStartDate}
								inputProps={{ size: 'small' }}
							/>
							<Box sx={{ width: '10px'}} />
							<CustomDatePicker 
								label={TEXTS.label_enddate_field}
								onChange={onChangeEndDate}
								inputProps={{ size: 'small' }}
							/>
						</Box>
						<FormHelperText>{TEXTS.help_text_form}</FormHelperText>
						<FormMessages
							message={message}
							error={error}
						/>
					</Box>
					<BoxButtonsForm>
						<Button 
							variant="contained"
							type="submit"
						>{GTEXTS.save}</Button>
					</BoxButtonsForm>
				</form>
			</Box>
		</>
	)
}