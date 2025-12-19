import Modal from "@/components/atoms/Dialog";
import useTranslation from "@/hooks/useTranslation";
import { CardActiveEntryVehicleProps } from "@/interfaces/Molecules";
import { formatsDate } from "@/lib/Helpers";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText
} from "@mui/material";
import GiveLeaveVehicleForm from "../GiveLeaveVehicleForm";
import { TRANS } from "./constants";
import useCardActiveEntryVehicle from "./useCardActiveEntryVehicle";
import { Divider } from "@/components/atomsv2/Divider";
import { Button } from "@/components/atomsv2/Button";

export default function CardActiveEntryVehicle({ visitor }: CardActiveEntryVehicleProps) {
	const TEXTS = useTranslation(TRANS)
	
	const {
		isOpenGiveLeaveForm,
		toggleOpenGiveLeaveForm,
	} = useCardActiveEntryVehicle()

	const isRejected = visitor?.active_entry_vehicle?.allowed === 0 || visitor?.active_entry_vehicle?.allowed === false
	const cardColor = isRejected ? 'error.dark' : 'info.light'
	const titleText = isRejected ? TEXTS.label_NO_entry_visitor : TEXTS.label_entry_visitor
	const entryTimeLabel = isRejected ? TEXTS.label_NO_entry_at : TEXTS.label_entry_at
	const entryApproverLabel = isRejected ? TEXTS.label_NO_entry_approver : TEXTS.label_entry_approver

	if(!visitor?.active_entry_vehicle) return null;
	return (
		<>
			<div className="border border-zinc-300 shadow-lg rounded-lg mt-4">
				<h1 className="font-inter text-[18px] p-3 bg-proquinal-teal text-black">{titleText}</h1>
				<div className="p-3">
					<div className="flex flex-wrap gap-5 [&>div]:flex-1 [&>div]:min-w-45">
						<div className="mb-2.5 text-zinc-500 text-[14px]">
							<p className='font-semibold'>{TEXTS.label_id}</p>
              <span>{visitor.active_entry_vehicle.id}</span>
						</div>
						<div>
							<div className="mb-2.5 text-zinc-500 text-[14px]">
								<p className='font-semibold'>{TEXTS.label_car_number}</p>
              	<span>{visitor.active_entry_vehicle.number}</span>
							</div>
						</div>
						{visitor.active_entry_vehicle.gate && (
							<div>
								<div className="mb-2.5 text-zinc-500 text-[14px]">
									<p className='font-semibold'>{TEXTS.label_gate}</p>
              		<span>{visitor.active_entry_vehicle.gate?.description}</span>
								</div>
							</div>
						)}
						<div>
							<div className="mb-2.5 text-zinc-500 text-[14px]">
								<p className='font-semibold'>{entryTimeLabel}</p>
              	<span>{formatsDate(visitor.active_entry_vehicle.creator_date)}</span>
							</div>
						</div>
						<div>
							<div className="mb-2.5 text-zinc-500 text-[14px]">
								<p className='font-semibold'>{entryApproverLabel}</p>
                <span className="block">{visitor.creator?.fullname}</span>
                <span className="text-xs">{visitor.creator?.email}</span>
							</div>
						</div>
					</div>
					<div className="flex">
						<div className="w-6/12">
							<div className="mb-2.5 text-zinc-500 text-[14px]">
								<p className='font-semibold'>
									{isRejected ? TEXTS.label_inspect_points_revised : TEXTS.label_inspect_points}
								</p>
								<List dense>
									{visitor.active_entry_vehicle.inspect_points ? (
										visitor.active_entry_vehicle.inspect_points.map((ipoint, idx: number) => (
											<ListItem key={`itemListInspectPoint${idx}`}>
												<ListItemIcon>
													<RadioButtonCheckedIcon />
												</ListItemIcon>
												<ListItemText
													primary={ipoint.description}
												/>
											</ListItem>
										))
									) : (
										<p className='text-zinc-500 text-[14px]'>
											{TEXTS.no_inspect_points}
										</p>
									)}
								</List>
							</div>
						</div>
						<div className="w-6/12">
							<div className="mb-2.5 text-zinc-500 text-[14px]">
								<p className='font-semibold'>{TEXTS.label_comments_entry}</p>
								<span>
									{visitor.active_entry_vehicle.comments_entry ? (
										visitor.active_entry_vehicle.comments_entry
									) : (
										TEXTS.no_comments_entry
									)}
								</span>
							</div>
						</div>
					</div>
					<Divider className="mb-5" />
					{!isRejected && (
						<div className="flex gap-2 justify-end">
							<Button
								className="flex items-center h-9.5"
								onClick={toggleOpenGiveLeaveForm}
							>
								<ExitToAppIcon className="mr-3" />
								{TEXTS.give_leave}
							</Button>
						</div>
					)}
				</div>
			</div>

			{!isRejected && (
				<Modal show={isOpenGiveLeaveForm} onClose={toggleOpenGiveLeaveForm}>
					<GiveLeaveVehicleForm 
						visitor={visitor} 
						onCancel={toggleOpenGiveLeaveForm} 
					/>
				</Modal>
			)}
		</>
	)
}