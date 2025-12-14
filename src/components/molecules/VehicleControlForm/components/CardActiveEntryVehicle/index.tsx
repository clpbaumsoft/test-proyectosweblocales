import Button from "@/components/atoms/Button";
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
			<div className="border-2 border-proquinal-teal rounded-lg mt-4">
				<h1 className="font-inter text-[18px] p-3 bg-proquinal-teal text-white">{titleText}</h1>
				<div className="p-3">
					<div className="flex flex-wrap justify-between">
						<div className="mb-[10px] text-gray-600">
							<p className='font-semibold text-[16px]'>{TEXTS.label_id}</p>
              <span>{visitor.active_entry_vehicle.id}</span>
						</div>
						<div>
							<div className="mb-[10px] text-gray-600">
								<p className='font-semibold text-[16px]'>{TEXTS.label_car_number}</p>
              	<span>{visitor.active_entry_vehicle.number}</span>
							</div>
						</div>
						{visitor.active_entry_vehicle.gate && (
							<div>
								<div className="mb-[10px] text-gray-600">
									<p className='font-semibold text-[16px]'>{TEXTS.label_gate}</p>
              		<span>{visitor.active_entry_vehicle.gate?.description}</span>
								</div>
							</div>
						)}
						<div>
							<div className="mb-[10px] text-gray-600">
								<p className='font-semibold text-[16px]'>{entryTimeLabel}</p>
              	<span>{formatsDate(visitor.active_entry_vehicle.creator_date)}</span>
							</div>
						</div>
						<div>
							<div className="mb-[10px] text-gray-600">
								<p className='font-semibold text-[16px]'>{entryApproverLabel}</p>
                <span className="block">{visitor.creator?.fullname}</span>
                <span className="text-xs">{visitor.creator?.email}</span>
							</div>
						</div>
					</div>
					<div className="flex">
						<div className="w-6/12">
							<div className="mb-[10px] text-gray-600">
								<p className='font-semibold text-[16px]'>
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
										<p className='font-semibold text-[16px]'>
											{TEXTS.no_inspect_points}
										</p>
									)}
								</List>
							</div>
						</div>
						<div className="w-6/12">
							<div className="mb-[10px] text-gray-600">
								<p className='font-semibold text-[16px]'>{TEXTS.label_comments_entry}</p>
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
					<hr/>
					{!isRejected && (
						<div className="flex gap-2 justify-end">
							<Button
								className="flex items-center h-[38px]"
								icon={<ExitToAppIcon className="mr-3" />}
								text={TEXTS.give_leave}
								onClick={toggleOpenGiveLeaveForm}
							/>
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