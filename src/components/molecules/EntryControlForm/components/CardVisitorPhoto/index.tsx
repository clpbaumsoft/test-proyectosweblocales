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
import { Badge } from "@/components/atomsv2/Badge";

export default function CardVisitorPhoto({ visitor }: CardVisitorProps) {
	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)
	
	const {
		onSavePhotoVisitor,
	} = useCardVisitorPhoto(visitor)
	
	if(!visitor) return null
	return (
		<>
			<div className="w-full rounded-lg overflow-hidden mb-12">
				<div className="flex w-full">
					<div className="w-[40%]">
						<TakePhoto
							isButtonActive={visitor?.is_currently_banned ? false : true}
							preview={visitor.photo_url ? mediaUrl(visitor.id, 'foto-visitante') : null}
							onSavePhoto={onSavePhotoVisitor}
						/>
					</div>
					<div className="flex flex-col align-center justify-center px-8 w-[60%] gap-4 border-l border-zinc-300">
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
						<div>
							<p className="text-[14px] font-semibold">{TEXTS.label_card_has_sgsst}</p>
							<div className="flex flex-col">
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
												<Badge color="red" className="bg-red-300">
													{GTEXTS.no}
													<EastIcon className="size-3" />
													{formatsDate(visitor.startdate_sgsst, 'D MMMM, YYYY') + ' -- ' + formatsDate(visitor.enddate_sgsst, 'D MMMM, YYYY')}
												</Badge>
											)
										}
										return (
											<Badge color="red" className="bg-red-300 mt-3 w-fit">
												{TEXTS.required_sgsst}
											</Badge>
										)
									})() :
									<p className="text-[12px] text-[#767676]">{GTEXTS.no_required}</p>
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}