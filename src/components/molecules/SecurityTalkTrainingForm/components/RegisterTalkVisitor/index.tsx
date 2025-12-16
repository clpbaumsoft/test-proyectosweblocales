import {
	Avatar,
	Box,
	Button,
	ClickAwayListener,
	Tooltip,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import EastIcon from "@mui/icons-material/East";
import CustomDatePicker from "@/components/atoms/CustomDatePicker";
import LabelForm from "@/components/atoms/LabelForm";
import FormMessages from "@/components/atoms/FormMessages";
import FullLoader from "@/components/atoms/FullLoader";
import WarningCondition from "@/components/atoms/WarningCondition";
import { GTRANS } from "@/constants/Globals";
import { RegisterTalkVisitorProps } from "@/interfaces/Molecules";
import useRegisterTalkVisitor from "./useRegisterTalkVisitor";
import useTranslation from "@/hooks/useTranslation";
import { formatsDate, mediaUrl, mInit, now } from "@/lib/Helpers";
import { BoxButtonsForm } from "@/styles/elements";
import { TRANS } from "./constants";

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
		<div className="mt-8 w-[550px] font-inter">
			{isInnerLoading && (
				<FullLoader variant="absolute" />
			)}
			<form onSubmit={handleSubmit(onSubmit)}>
				<section>
					<div className="mb-[10px]">
						<div className="flex items-center gap-6">
							<Avatar
								className="!font-bold !w-[60px] !h-[60px] !text-black"
								alt={stateVisitor?.first_name}
								src={mediaUrl(stateVisitor?.id ? stateVisitor?.id : 0, 'foto-visitante')}
							/>
							<h1 className="text-[18px] font-inter font-bold text-black">{stateVisitor?.fullname}</h1>
						</div>
						<div className="my-8">
							<h1 className="text-[18px] font-inter font-semibold text-black">
								{TEXTS.range_dates_validity}
							</h1>
							<p className="mt-4 text-[14px]">
								{TEXTS.select_period_dates}
							</p>
						</div>
						{stateVisitor?.startdate_sgsst && (
							<>
								<LabelForm label={TEXTS.label_startdate_sgsst} required={false}/>
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
						)}
					</div>
					<div className="flex gap-8">
						<div>
							<LabelForm
								label={TEXTS.label_startdate_field}
								required={false}
							/>
							<CustomDatePicker
								onChange={onChangeStartDate}
								inputProps={{ size: 'small' }}
							/>
						</div>
						<div>
							<LabelForm
								label={TEXTS.label_enddate_field}
								required={false}
							/>
							<CustomDatePicker
								onChange={onChangeEndDate}
								inputProps={{ size: 'small' }}
							/>
						</div>
					</div>
					<FormMessages
						message={message}
						error={error}
					/>
				</section>
				<BoxButtonsForm>
					<Button
						variant="contained"
						type="submit"
					>{GTEXTS.save}</Button>
				</BoxButtonsForm>
			</form>
		</div>
	)
}