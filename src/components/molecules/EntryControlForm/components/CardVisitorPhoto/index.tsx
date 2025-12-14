import TakePhoto from "@/components/atoms/TakePhoto";
import WarningCondition from "@/components/atoms/WarningCondition";
import { GTRANS } from "@/constants/Globals";
import useTranslation from "@/hooks/useTranslation";
import { CardVisitorProps } from "@/interfaces/Atoms";
import { formatsDate, isBetweenDates, mediaUrl, now } from "@/lib/Helpers";
import { SpaceFields } from "@/styles/elements";
import EastIcon from "@mui/icons-material/East";
import { TRANS } from "./constants";
import useCardVisitorPhoto from "./useCardVisitorPhoto";

export default function CardVisitorPhoto({ visitor }: CardVisitorProps) {
	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)
	
	const {
		onSavePhotoVisitor,
	} = useCardVisitorPhoto(visitor)
	
	if(!visitor) return null
	return (
		<>
			<div className="w-[750px] mx-auto mt-8 border-2 border-[var(--proquinal-dark-teal)] rounded-lg overflow-hidden py-4">
				<div className="flex">
					<div className="w-[50%]">
						<TakePhoto
							isButtonActive={visitor?.is_currently_banned ? false : true}
							preview={visitor.photo_url ? mediaUrl(visitor.id, 'foto-visitante') : null}
							onSavePhoto={onSavePhotoVisitor}
						/>
					</div>
					<div className="flex flex-col align-center justify-center px-4 w-[50%] gap-2 border-l-[1px] border-proquinal-teal">
						<h1 className="text-[24px] font-semibold font-inter">{visitor.fullname}</h1>
						<div>
							<p className="text-[14px] font-semibold">{TEXTS.label_card_id}</p>
							<p className="text-[12px] text-[#767676]">{visitor.identification_number}</p>
						</div>
						{(visitor.address === 'No registra' || visitor.address === 'SN' || visitor.address === '') ? "" : (
							<div>
								<p className="text-[14px] font-semibold">{TEXTS.label_card_address}</p>
								<p className="text-[12px] text-[#767676]">{visitor.address}</p>
							</div>
						)}
						<div>
							<p className="text-[14px] font-semibold">{TEXTS.label_card_phone}</p>
							<p className="text-[12px] text-[#767676]">{visitor.phone}</p>
						</div>
						<p className="text-[14px]">{TEXTS.label_card_has_sgsst}</p>
						<div className="flex">
							{visitor?.requires_security_speak ?
								(() => {
									if (isBetweenDates(visitor.startdate_sgsst, visitor.enddate_sgsst, now())) {
										return (
											<>
												{GTEXTS.yes}
												<SpaceFields />
												<EastIcon fontSize="small" />
												<SpaceFields />
												{formatsDate(visitor.startdate_sgsst, 'D MMMM, YYYY') + ' -- ' + formatsDate(visitor.enddate_sgsst, 'D MMMM, YYYY')}
											</>
										)
									} else if (visitor.startdate_sgsst && visitor.enddate_sgsst) {
										return (
											<WarningCondition condition={false}>
												{GTEXTS.no}
												<EastIcon fontSize="small" />
												{formatsDate(visitor.startdate_sgsst, 'D MMMM, YYYY') + ' -- ' + formatsDate(visitor.enddate_sgsst, 'D MMMM, YYYY')}
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
						</div>
					</div>
				</div>
			</div>
		</>
	)
}