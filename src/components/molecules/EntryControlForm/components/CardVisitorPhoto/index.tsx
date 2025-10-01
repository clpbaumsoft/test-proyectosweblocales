import { Box, Typography } from "@mui/material";
import EastIcon from "@mui/icons-material/East";

//Components
import LabelItem from "@/components/atoms/LabelItem";
import TakePhoto from "@/components/atoms/TakePhoto";
import WarningCondition from "@/components/atoms/WarningCondition";

//Constants
import { GTRANS } from "@/constants/Globals";

//Hooks
import useCardVisitorPhoto from "./useCardVisitorPhoto";
import useTranslation from "@/hooks/useTranslation";

//Interfaces and types
import { CardVisitorProps } from "@/interfaces/Atoms";

//Lib
import { formatsDate, isBetweenDates, mediaUrl, now } from "@/lib/Helpers";

//Styles
import { SpaceFields } from "@/styles/elements";

//Texts
const TRANS = {
	label_card_visitor_type: {
		id: "EntryControlForm.LabelItem.Label.labelCardVisitorType",
		defaultMessage: "Tipo de visitante:",
		description: "",
	},
	label_card_id: {
		id: "EntryControlForm.LabelItem.Label.LabelCardId",
		defaultMessage: "Documento #:",
		description: "",
	},
	label_card_phone: {
		id: "EntryControlForm.LabelItem.Label.LabelCardPhone",
		defaultMessage: "Teléfono:",
		description: "",
	},
	label_card_address: {
		id: "EntryControlForm.LabelItem.Label.LabelCardAddress",
		defaultMessage: "Dirección:",
		description: "",
	},
	label_card_has_sgsst: {
		id: "EntryControlForm.LabelItem.Label.LabelHasSgsst",
		defaultMessage: "¿Tiene charla de seguridad vigente?",
		description: "",
	},
	required_sgsst: {
		id: "EntryControlForm.LabelItem.Label.LabelHasSgsst",
		defaultMessage: "No, debe hacerla cuanto antes",
		description: "",
	},
}

export default function CardVisitorPhoto({ visitor }: CardVisitorProps) {
	
	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)
	
	const {
		onSavePhotoVisitor,
	} = useCardVisitorPhoto(visitor)
	
	if(!visitor) {
		return <></>
	}
	
	return (
		<>
			<Box 
				sx={(theme) => ({
					border: '1px solid var(--mui-palette-primary-main)',
					borderRadius: 'var(--mui-shape-borderRadius)',
					display: 'table',
					p: '15px',
					m: '15px auto',
					width: '100%',
					[theme.breakpoints.up('md')]: {
						width: 'auto',
					},
				})}
			>
				<Box 
					sx={(theme) => ({
						display: 'table',
						mx: 'auto',
						[theme.breakpoints.up('md')]: {
							display: 'flex',
						},
					})}
				>
					<Box sx={{ mb: '15px' }}>
						<Box sx={{ display: 'table', minWidth:'260px' }}>
							<TakePhoto
								isButtonActive={visitor?.is_currently_banned ? false : true}
								preview={visitor.photo_url ? mediaUrl(visitor.id, 'foto-visitante') : null}
								onSavePhoto={onSavePhotoVisitor}
							/>
						</Box>
					</Box>
					<Box
						sx={(theme) => ({
							display: 'block',
							[theme.breakpoints.up('md')]: {
								display: 'flex',
								alignItems: 'center',
								minWidth: '250px',
								ml: '15px',
							},
						})}
					>
						<div>
							<Typography variant="h5">{visitor.fullname}</Typography><br/>
							
							{/* <LabelItem 
								sx={{ mb: '15px' }} 
								label={TEXTS.label_card_visitor_type} 
								value={visitor?.visits?.[0]?.pivot?.visitor_type_description || ''} 
							/> */}

							<LabelItem sx={{ mb: '15px' }} label={TEXTS.label_card_id} value={visitor.identification_number} />
							{
								(visitor.address === 'No registra' || visitor.address === 'SN' || visitor.address === '') ? "" : (
									<LabelItem sx={{ mb: '15px' }} pl="5px" label={TEXTS.label_card_address} value={visitor.address} />
								)
							}
							{/* <LabelItem sx={{ mb: '15px' }} label={TEXTS.label_card_address} value={visitor.address} /> */}
							
							<LabelItem 
								sx={{ mb: '15px' }} 
								label={TEXTS.label_card_phone} 
								value={visitor.phone} 
							/>

							<LabelItem sx={{ mb: '15px' }} 
								label={TEXTS.label_card_has_sgsst} 
								value={
								<Box sx={{ display: 'flex' }}>
									{
										visitor?.requires_security_speak ?
										(() => {
											if(isBetweenDates(visitor.startdate_sgsst, visitor.enddate_sgsst, now())) {
												return (
													<>
														{GTEXTS.yes}
														<SpaceFields />
														<EastIcon fontSize="small" />
														<SpaceFields />
														{formatsDate(visitor.startdate_sgsst, 'D MMMM, YYYY')+' -- '+formatsDate(visitor.enddate_sgsst, 'D MMMM, YYYY')}
													</>
												)
											} else if(visitor.startdate_sgsst && visitor.enddate_sgsst) {
												return (
													<WarningCondition condition={false}>
														{GTEXTS.no}
														<SpaceFields />
														<EastIcon fontSize="small" />
														<SpaceFields />
														{formatsDate(visitor.startdate_sgsst, 'D MMMM, YYYY')+' -- '+formatsDate(visitor.enddate_sgsst, 'D MMMM, YYYY')}
													</WarningCondition>
												)
											}
											return (
												<WarningCondition condition={false}>
													{TEXTS.required_sgsst}
												</WarningCondition>
											)
										})() :
										<p>{GTEXTS.no_required}</p>
									}
								</Box>
							}
							/>
						</div>
					</Box>
					
				</Box>
			</Box>
		</>
	)
}