import Modal from "@/components/atoms/Dialog";
import FormMessages from "@/components/atoms/FormMessages";
import FullLoader from "@/components/atoms/FullLoader";
import GiveEntryToOtherBranch from "@/components/molecules/GiveEntryToOtherBranch";
import GiveEntryVehicleForm from "@/components/molecules/GiveEntryVehicleForm";
import useTranslation from "@/hooks/useTranslation";
import { CardActiveEntryProps } from "@/interfaces/Molecules";
import { formatsDate } from "@/lib/Helpers";
import CarRentalIcon from "@mui/icons-material/CarRental";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import { useMemo } from "react";
import { TRANS } from "./constants";
import useCardActiveEntry from "./useCardActiveEntry";
import { Divider } from "@/components/atomsv2/Divider";
import { Button } from "@/components/atomsv2/Button";

export default function CardActiveEntry({ visitor }: CardActiveEntryProps) {
	const TEXTS = useTranslation(TRANS)
	
	const {
		loggedUser,
		isInnerLoading,
		message,
		error,
		isOpenModalEntryToOtherBranch,
		toggleModalEntryToOtherBranch,
		isOpenModalEntryVehicle,
		toggleModalEntryVehicle,
		onClickGiveLeave,
	} = useCardActiveEntry(visitor)
	
	const isEntryToOtherBranchButtonEnabled = useMemo(() => {
		const entryGates = visitor?.active_entry?.entry_gates;
		if (!entryGates || !Array.isArray(entryGates)) {
			return false;
		}
		return entryGates.some(gate => gate.active === 1);
	}, [visitor?.active_entry?.entry_gates]);

	const isAllowedCardButtonEntry = (
		visitor.active_entry_vehicle?.allowed === 0 || 
		visitor.active_entry_vehicle?.allowed === false ||
		!visitor.active_entry_vehicle
	) ? false : true

	if(!visitor?.active_entry) return null
	return (
		<>
			<div className="border border-zinc-300 shadow-lg rounded-lg mt-4">
				{isInnerLoading && (
					<FullLoader variant="absolute" />
				)}
				<h1 className="font-inter text-[18px] p-3 bg-white text-black">{TEXTS.label_entry_visitor}</h1>
				<div className="p-3">
					<div className="flex flex-wrap gap-5 [&>div]:flex-1 [&>div]:min-w-45">
						<div>
							<div className="mb-2.5 text-zinc-500 text-[14px]">
								<p className='font-semibold text-[14px] text-zinc-500'>{TEXTS.label_card_number}</p>
                <span>{visitor.active_entry.card_number}</span>
							</div>
						</div>
						<div>
							<div className="mb-2.5 text-zinc-500 text-[14px]">
								<p className='font-semibold text-[14px] text-zinc-500'>{TEXTS.label_entry_at}</p>
                <span>{formatsDate(visitor.active_entry.creator_date)}</span>
							</div>
						</div>
						<div>
							<div className="mb-2.5 text-zinc-500 text-[14px]">
								<p className='font-semibold text-[14px] text-zinc-500'>{TEXTS.label_entry_approver}</p>
                <span className="block">{visitor.creator?.fullname}</span>
                <span className="text-xs">{visitor.creator?.email}</span>
							</div>
						</div>
					</div>
					<Divider />
					<FormMessages
						message={message}
						error={error}
					/>
					<div className="flex gap-2 justify-end">
						{loggedUser.can('create_entry_vehicle') && (
							<Button 
								className="flex items-center h-9.5"
								disabled={isEntryToOtherBranchButtonEnabled}
								onClick={toggleModalEntryToOtherBranch}
							>
								<TransferWithinAStationIcon className="mr-3" />
								{TEXTS.give_entry_to_other_branch}
							</Button>
						)}
						{loggedUser.can('create_entry_vehicle') && (
							<Button
								className="flex items-center h-9.5"
								disabled={isAllowedCardButtonEntry}
								onClick={toggleModalEntryVehicle}
							>
								<CarRentalIcon className="mr-3" />
								{TEXTS.give_entry_vehicle}
							</Button>
						)}
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

			<Modal show={isOpenModalEntryToOtherBranch} onClose={toggleModalEntryToOtherBranch}>
				{visitor.active_entry?.visit_visitor?.visit && (
					<GiveEntryToOtherBranch
						visit={visitor.active_entry?.visit_visitor?.visit}
						visitor={visitor}
						onClose={toggleModalEntryToOtherBranch}
					/>
				)}
			</Modal>

			<Modal show={isOpenModalEntryVehicle} onClose={toggleModalEntryVehicle}>
				{visitor.active_entry?.visit_visitor?.visit && (
					<GiveEntryVehicleForm
						visit={visitor.active_entry?.visit_visitor?.visit}
						visitor={visitor}
						onClose={toggleModalEntryVehicle}
					/>
				)}
			</Modal>
		</>
	)
}