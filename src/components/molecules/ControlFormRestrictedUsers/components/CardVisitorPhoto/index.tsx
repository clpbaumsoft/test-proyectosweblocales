import { Box, Button, Typography } from "@mui/material";
import PersonOffIcon from '@mui/icons-material/PersonOff';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';


//Components
import LabelItem from "@/components/atoms/LabelItem";
import TakePhoto from "@/components/atoms/TakePhoto";
import ModalRestrictedUserForm from "../ModalRestrictedUserForm";

//Constants


//Hooks

import useTranslation from "@/hooks/useTranslation";

//Interfaces and types
import { CardVisitorProps } from "@/interfaces/Atoms";

//Lib
import { formatsDate, mediaUrl } from "@/lib/Helpers";
import useCardVisitorPhotoRestrictedUser from "./useCardVisitorPhotoRestrictedUser";
import { useState } from "react";

//Styles


//Texts
const TRANS = {
	label_card_visitor_type: {
		id: "CardVisitorPhotoRestrictedUser.LabelItem.Label.labelCardVisitorType",
		defaultMessage: "Tipo de visitante:",
		description: "",
	},
	label_card_id: {
		id: "CardVisitorPhotoRestrictedUser.LabelItem.Label.LabelCardId",
		defaultMessage: "Documento #:",
		description: "",
	},
	label_card_phone: {
		id: "CardVisitorPhotoRestrictedUser.LabelItem.Label.LabelCardPhone",
		defaultMessage: "Teléfono:",
		description: "",
	},
	label_card_address: {
		id: "CardVisitorPhotoRestrictedUser.LabelItem.Label.LabelCardAddress",
		defaultMessage: "Dirección:",
		description: "",
	},
	label_is_restricted_user: {
		id: "CardVisitorPhotoRestrictedUser.LabelItem.Label.LabelHasSgsst",
		defaultMessage: "Estado de restricción:",
		description: "",
	},
	label_comment_banned_user: {
		id: "CardVisitorPhotoRestrictedUser.LabelItem.Label.LabelHasSgsst",
		defaultMessage: "Razón de restricción:",
		description: "",
	},
	label_button_action_restricted_user: {
		id: "CardVisitorPhotoRestrictedUser.LabelItem.Label.LabelHasSgsst",
		defaultMessage: "Restringir usuario",
		description: "",
	},
	label_button_action_available_user: {
		id: "CardVisitorPhotoRestrictedUser.LabelItem.Label.LabelHasSgsst",
		defaultMessage: "Habilitar usuario",
		description: "",
	},
}

export default function CardVisitorPhotoRestrictedUser({ visitor }: CardVisitorProps) {
		
	const TEXTS = useTranslation(TRANS)

	const [isOpenModalRestrictedUser, setIsOpenModalRestrictedUser] = useState(false)
	
	const toggleModalRestrictedUser = () => {
		setIsOpenModalRestrictedUser(!isOpenModalRestrictedUser)
	}

	const {
		onSavePhotoVisitor,
	} = useCardVisitorPhotoRestrictedUser(visitor)
	
	if(!visitor) {
		return <></>
	}
	
	return (
		<>
			<Box 
				sx={(theme) => ({
					border: visitor?.is_currently_banned ? '2px solid #EA5C1F' : '2px solid green',
					borderRadius: 'var(--mui-shape-borderRadius)',
					display: 'table',
					p: '15px',
					m: '15px auto',
					width: '100%',
					[theme.breakpoints.up('md')]: {
						width: 'auto',
						minWidth: '800px',
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
					{/* cargar o tomar foto */}
					<Box sx={{ mb: '15px' }}>
						<Box sx={{ display: 'table' }}>
							<TakePhoto
								preview={visitor.photo_url ? mediaUrl(visitor.id, 'foto-visitante') : null}
								isButtonActive={false}
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
								minWidth: '315px',
								width: '100%',
								ml: '15px',
							},
						})}
					>
						<Box sx={{
								display: "flex", 
								flexDirection: "column", 
								justifyContent: "flex-start", 
								alignItems: "center", 
								width: '100%',
								gap: '8px',
							}}>
							<Typography paddingBottom={1} variant="h5">{visitor.fullname} ({visitor?.is_currently_banned ? 'RESTRINGIDO' : 'HABILITADO'})</Typography>
							<Box sx={{
								display: "flex", 
								flexDirection: { xs: 'column', md: 'row' }, 
								justifyContent: "flex-start", 
								alignItems: { xs: 'stretch', md: 'center' }, 
								gap: { xs: '8px', md: '25px' }, 
								width: '100%'
							}}>
								<LabelItem sx={{ mb: '0px', width: { xs: '100%', md: "33%" } }} pl="5px" label={TEXTS.label_card_id} value={visitor.identification_number} />
								
								<LabelItem sx={{ mb: '0px', width: { xs: '100%', md: "33%" } }} pl="5px" label={TEXTS.label_card_address} value={visitor.address} />

								{/* <LabelItem 
									sx={{ mb: '0px', width: { xs: '100%', md: "33%" } }}  pl="5px"
									label={TEXTS.label_card_visitor_type} 
									value={visitor?.visits?.[0]?.pivot?.id_visitor_type === 1 ? "Proveedor" : "Contratista"} 
								/> */}

								<LabelItem sx={{ mb: '0px', width: { xs: '100%', md: "33%" } }} pl="5px" label={TEXTS.label_card_phone} value={visitor.phone} />
							</Box>

							<Box sx={{
								display: "flex", 
								flexDirection: { xs: 'column', md: 'row' }, 
								justifyContent: "flex-start", 
								alignItems: { xs: 'stretch', md: 'center' }, 
								gap: { xs: '8px', md: '25px' }, 
								width: '100%'
							}}>
								<LabelItem sx={{ mb: '0px', width: { xs: '100%', md: "33%" } }} pl="5px" label={TEXTS.label_is_restricted_user} value={visitor?.is_currently_banned ? 'Restringido' : 'Habilitado' } />
								<LabelItem sx={{ mb: '0px', width: { xs: '100%', md: "33%" } }} pl="5px" label={TEXTS.date_start_ban || 'Fecha inicio:'} value={visitor?.banned_start_time ? formatsDate(visitor?.banned_start_time) : '' } />
								<LabelItem sx={{ mb: '0px', width: { xs: '100%', md: "33%" } }} pl="5px" label={TEXTS.date_end_ban || 'Fecha fin:'} value={visitor?.banned_end_time ? formatsDate(visitor?.banned_end_time) : '' } />
							</Box>

							<Box sx={{
								display: "flex", 
								flexDirection: { xs: 'column', md: 'row' }, 
								justifyContent: "flex-start", 
								alignItems: { xs: 'stretch', md: 'center' }, 
								gap: { xs: '8px', md: '25px' }, 
								width: '100%'
							}}>
								<LabelItem 
									sx={{ mb: '0px', width: { xs: '100%' } }} pl="5px" 
									label={TEXTS.label_comment_banned_user} 
									value={visitor?.ban_comment ? visitor?.ban_comment : '' } 
								/>
							</Box>

							<Button
								sx={{ width: '100%', marginTop: '1rem' }}
								variant="contained" 
								color={visitor?.is_currently_banned ? "success" : "error"}
								startIcon={visitor?.is_currently_banned ? <VerifiedUserIcon /> : <PersonOffIcon />}
								onClick={toggleModalRestrictedUser}
							>{visitor?.is_currently_banned ? TEXTS.label_button_action_available_user : TEXTS.label_button_action_restricted_user}
							</Button>
						</Box>
					</Box>
				</Box>
			</Box>

			{
				isOpenModalRestrictedUser &&
				<ModalRestrictedUserForm 
					open={isOpenModalRestrictedUser}
					visitor={visitor} 
					onClose={toggleModalRestrictedUser}
					// preFillFormDataRestrictedUser={{
					// 	banned_start_time: visitor.banned_start_time || '',
					// 	banned_end_time: visitor.banned_end_time || '',
					// 	is_banned: visitor.is_banned || false,
					// }}
				/>
			}
		</>
	)
}