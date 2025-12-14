import TakePhoto from "@/components/atoms/TakePhoto";
import useTranslation from "@/hooks/useTranslation";
import { CardVisitorProps } from "@/interfaces/Atoms";
import { formatsDate, mediaUrl } from "@/lib/Helpers";
import PersonOffIcon from '@mui/icons-material/PersonOff';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { Button } from "@mui/material";
import { useState } from "react";
import ModalRestrictedUserForm from "../ModalRestrictedUserForm";
import { TRANS } from "./constants";
import useCardVisitorPhotoRestrictedUser from "./useCardVisitorPhotoRestrictedUser";

export default function CardVisitorPhotoRestrictedUser({ visitor }: CardVisitorProps) {
	const TEXTS = useTranslation(TRANS)
	const [isOpenModalRestrictedUser, setIsOpenModalRestrictedUser] = useState(false)
	
	const toggleModalRestrictedUser = () => {
		setIsOpenModalRestrictedUser(!isOpenModalRestrictedUser)
	}

	const {
		onSavePhotoVisitor,
	} = useCardVisitorPhotoRestrictedUser(visitor)
	
	if(!visitor) return null;
	return (
		<div className="overflow-hidden rounded-lg bg-white shadow max-w-[740px] mx-auto mt-10">
			<div className="px-4 py-5 sm:p-6 border">
				<div className="mb-[15px] flex">
					<TakePhoto
						preview={visitor.photo_url ? mediaUrl(visitor.id, 'foto-visitante') : null}
						isButtonActive={false}
						onSavePhoto={onSavePhotoVisitor}
					/>
				</div>
				<div>
					<div>
						<div className="flex justify-between items-center">
							<div>
								<h1 className="text-[24px] font-semibold font-inter">{visitor.fullname}</h1>
								<div>
									<p className="text-[16px] font-semibold">{TEXTS.label_card_id}</p>
									<p className="text-[12px] text-[#767676]">{visitor.identification_number}</p>
								</div>
							</div>
							<span className="inline-flex items-center gap-x-1.5 rounded-full bg-green-100 px-2 text-xs font-medium text-green-700">
								<svg viewBox="0 0 6 6" aria-hidden="true" className="size-1.5 fill-green-500">
									<circle r={3} cx={3} cy={3} />
								</svg>
								{visitor?.is_currently_banned ? 'RESTRINGIDO' : 'HABILITADO'}
							</span>
						</div>
						<hr className="my-4" />
						<section className="flex">
							<div className="w-6/12">
								<div className="mb-[10px] text-gray-600">
									<p className='font-semibold text-[16px]'>{TEXTS.label_card_address}</p>
									<span>{visitor.address}</span>
								</div>
							</div>
							<div className="w-6/12">
								<div className="mb-[10px] text-gray-600">
									<p className='font-semibold text-[16px]'>{TEXTS.label_card_phone}</p>
									<span>{visitor.phone}</span>
								</div>
							</div>
						</section>
						<section className="flex">
							<div className="w-6/12">
								<div className="mb-[10px] text-gray-600">
									<p className='font-semibold text-[16px]'>{TEXTS.label_is_restricted_user}</p>
									<span>{visitor?.is_currently_banned ? 'Restringido' : 'Habilitado'}</span>
								</div>
							</div>
							<div className="w-6/12">
								<div className="mb-[10px] text-gray-600">
									<p className='font-semibold text-[16px]'>{TEXTS.label_comment_banned_user}</p>
									<span>{visitor?.ban_comment ? visitor?.ban_comment : '-'}</span>
								</div>
							</div>
						</section>
						<section className="flex">
							<div className="w-6/12">
								<div className="mb-[10px] text-gray-600">
									<p className='font-semibold text-[16px]'>{TEXTS.date_start_ban || 'Fecha inicio:'}</p>
									<span>{visitor?.banned_start_time ? formatsDate(visitor?.banned_start_time) : '-'}</span>
								</div>
							</div>
							<div className="w-6/12">
								<div className="mb-[10px] text-gray-600">
									<p className='font-semibold text-[16px]'>{TEXTS.date_end_ban || 'Fecha fin:'}</p>
									<span>{visitor?.banned_end_time ? formatsDate(visitor?.banned_end_time) : '-'}</span>
								</div>
							</div>
						</section>
						<Button
							sx={{ width: '100%', marginTop: '1rem' }}
							variant="contained"
							color={visitor?.is_currently_banned ? "success" : "error"}
							startIcon={visitor?.is_currently_banned ? <VerifiedUserIcon /> : <PersonOffIcon />}
							onClick={toggleModalRestrictedUser}
						>{visitor?.is_currently_banned ? TEXTS.label_button_action_available_user : TEXTS.label_button_action_restricted_user}
						</Button>
					</div>
				</div>
			</div>

			{isOpenModalRestrictedUser &&
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
		</div>
	)
}