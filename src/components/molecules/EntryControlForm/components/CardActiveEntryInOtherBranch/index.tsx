import FormMessages from "@/components/atoms/FormMessages";
import FullLoader from "@/components/atoms/FullLoader";
import useTranslation from "@/hooks/useTranslation";
import { CardActiveEntryToOtherBranchProps } from "@/interfaces/Molecules";
import { formatsDate, getTimeDiff } from "@/lib/Helpers";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useMemo } from "react";
import { TRANS } from "./constants";
import useCardActiveEntryInOtherBranch from "./useCardActiveEntryInOtherBranch";
import { Button } from "@/components/atomsv2/Button";
import { Divider } from "@/components/atomsv2/Divider";

export default function CardActiveEntryInOtherBranch({ visitor }: CardActiveEntryToOtherBranchProps) {
	const TEXTS = useTranslation(TRANS)

	const actualGate = useMemo(() => {
		const entryGates = visitor?.active_entry?.entry_gates;
		if (!entryGates || !Array.isArray(entryGates)) {
			return null;
		}
		return entryGates?.find(gate => gate.active === 1);
	}, [visitor?.active_entry?.entry_gates]);
	
	const {
		isInnerLoading,
		message,
		error,
		onClickGiveLeave,
	} = useCardActiveEntryInOtherBranch(visitor)

	if(!actualGate) return null;
	return (
		<div className="border border-zinc-300 shadow-lg rounded-lg mt-4">
			{isInnerLoading && (
				<FullLoader variant="absolute" />
			)}
			<h1 className="font-inter text-[18px] p-3 bg-white text-black">{TEXTS.label_entry_visitor}</h1>
			<div className="p-3">
				<div className="flex flex-wrap gap-4 [&>div]:flex-1 [&>div]:min-w-45">
					<div>
						<div className="mb-2.5 text-zinc-500 text-[14px]">
							<p className='font-semibold'>{TEXTS.label_other_brachs}</p>
              <span>{actualGate?.gate?.branch?.short_description || ''}</span>
						</div>
					</div>
					<div>
						<div className="mb-2.5 text-zinc-500 text-[14px]">
							<p className='font-semibold'>{TEXTS.label_entry_at}</p>
              <span>{formatsDate(actualGate?.creator_date || '')}</span>
						</div>
					</div>
					<div>
						<div className="mb-2.5 text-zinc-500 text-[14px]">
							<p className='font-semibold'>{TEXTS.label_entry_current_time}</p>
              <span>{getTimeDiff(actualGate?.creator_date || '')}</span>
						</div>
					</div>
					<div>
						<div className="mb-2.5 text-zinc-500 text-[14px]">
							<p className='font-semibold'>{TEXTS.label_entry_approver}</p>
              <span>{actualGate?.creator?.fullname}</span>
						</div>
					</div>
				</div>
				<Divider className="mt-3 mb-0" />
				<FormMessages
					message={message}
					error={error}
				/>
				<div className="flex justify-end">
					<Button 
						className="flex items-center h-9.5"
						onClick={onClickGiveLeave}
					>
						<ExitToAppIcon className="mr-3" />
						{TEXTS.give_leave}
					</Button>
				</div>
			</div>
		</div>
	)
}