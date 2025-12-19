import {
	Box,
	Button,
	Dialog,
	DialogContent,
	FormHelperText,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

//Components
import BoldLabel from "@/components/atoms/BoldLabel";

//Hooks
import useCardActiveEntryVehicle from "./useCardActiveEntryVehicle";
import useTranslation from "@/hooks/useTranslation";

//Interfaces and types
import { CardActiveEntryVehicleProps } from "@/interfaces/Molecules";

//Styles
import { BoxButtonsForm } from "@/styles/elements";

//Lib
import { formatsDate } from "@/lib/Helpers";
import GiveLeaveVehicleForm from "../GiveLeaveVehicleForm";

//Texts
const TRANS = {
	label_entry_visitor: {
		id: "CardActiveEntryVehicle.Typography.H6.TitleCard",
		defaultMessage: "Ingreso Vehicular - Activo",
		description: "",
	},
	label_NO_entry_visitor: {
		id: "CardRejectVehicle.Typography.H6.TitleCard",
		defaultMessage: "Rechazo Vehicular",
		description: "",
	},
	label_id: {
		id: "CardActiveEntryVehicle.BoldLabel.Label.Id",
		defaultMessage: "Código #",
		description: "",
	},
	label_car_number: {
		id: "CardActiveEntryVehicle.BoldLabel.Label.CarNumber",
		defaultMessage: "Placa #",
		description: "",
	},
	label_entry_at: {
		id: "CardActiveEntryVehicle.BoldLabel.Label.EntryAt",
		defaultMessage: "Ingresó a las:",
		description: "",
	},
	label_NO_entry_at: {
		id: "CardActiveEntryVehicle.BoldLabel.Label.NoEntryAt",
		defaultMessage: "Rechazado a las:",
		description: "",
	},
	label_gate: {
		id: "CardActiveEntryVehicle.BoldLabel.Label.Gate",
		defaultMessage: "Portería:",
		description: "",
	},
	label_entry_approver: {
		id: "CardActiveEntryVehicle.Typography.Label.UserWhoGiveEntry",
		defaultMessage: "Persona que dió el ingreso:",
		description: "",
	},
	label_NO_entry_approver: {
		id: "CardActiveEntryVehicle.Typography.Label.UserWhoNOGiveEntry",
		defaultMessage: "Persona que rechazó el ingreso:",
		description: "",
	},
	label_inspect_points: {
		id: "CardActiveEntryVehicle.Typography.Label.InspectPoints",
		defaultMessage: "Puntos a Inspeccionar:",
		description: "",
	},
	label_inspect_points_revised: {
		id: "CardActiveEntryVehicle.Typography.Label.InspectPointsRevised",
		defaultMessage: "Puntos de inspección revisados:",
		description: "",
	},
	label_comments_entry: {
		id: "CardActiveEntryVehicle.BoldLabel.CommentsEntry",
		defaultMessage: "Observaciones:",
		description: "",
	},
	no_inspect_points: {
		id: "CardActiveEntryVehicle.Typography.Label.NoInspectPoints",
		defaultMessage: "- sin puntos a inspeccionar -",
		description: "",
	},
	no_comments_entry: {
		id: "CardActiveEntryVehicle.Typography.Label.NoCommentsEntry",
		defaultMessage: "- sin observaciones -",
		description: "",
	},
	give_leave: {
		id: "CardActiveEntryVehicle.Button.GiveLeave",
		defaultMessage: "Dar salida al vehiculo",
		description: "",
	},
	rejection_reason: {
		id: "CardActiveEntryVehicle.Typography.Label.RejectionReason",
		defaultMessage: "Razón del rechazo:",
		description: "",
	},
}

export default function CardActiveEntryVehicle({ visitor }: CardActiveEntryVehicleProps) {

	const TEXTS = useTranslation(TRANS)
	
	const {
		isOpenGiveLeaveForm,
		toggleOpenGiveLeaveForm,
	} = useCardActiveEntryVehicle()

	if(!visitor?.active_entry_vehicle) {
		return <></>
	}

	const isRejected = visitor.active_entry_vehicle.allowed === 0 || visitor.active_entry_vehicle.allowed === false
	const cardColor = isRejected ? 'error.dark' : 'info.light'
	const titleText = isRejected ? TEXTS.label_NO_entry_visitor : TEXTS.label_entry_visitor
	const entryTimeLabel = isRejected ? TEXTS.label_NO_entry_at : TEXTS.label_entry_at
	const entryApproverLabel = isRejected ? TEXTS.label_NO_entry_approver : TEXTS.label_entry_approver

	return (
		<>
			<Box
				sx={{
					my: '20px',
					borderRadius: 'var(--mui-shape-borderRadius)',
					borderColor: cardColor,
					borderWidth: '1px',
					borderStyle: 'solid',
					position: 'relative',
				}}
			>
				<Typography 
					sx={{ 
						color: 'var(--mui-palette-common-white)',
						p: '10px',
						borderTopRadius: 'var(--mui-shape-borderRadius)',
						bgcolor: cardColor,
					}}
					variant="h6"
				>{titleText}</Typography>
				<Box sx={{ p: '10px' }}>
					<Grid container>
						<Grid size={{ xs: 12, md: 4 }}>
							<Box sx={{ mb: '10px' }}>
								<BoldLabel
									label={TEXTS.label_id}
									value={visitor.active_entry_vehicle.id}
								/>
							</Box>
						</Grid>
						<Grid size={{ xs: 12, md: 4 }}>
							<Box sx={{ mb: '10px' }}>
								<BoldLabel
									label={TEXTS.label_car_number}
									value={visitor.active_entry_vehicle.number}
								/>
							</Box>
						</Grid>
						{
							visitor.active_entry_vehicle.gate && (
								<Grid size={{ xs: 12, md: 4 }}>
									<Box sx={{ mb: '10px' }}>
										<BoldLabel
											label={TEXTS.label_gate}
											value={visitor.active_entry_vehicle.gate?.description}
										/>
									</Box>
								</Grid>
							)
						}
						<Grid size={{ xs: 12, md: 4 }}>
							<Box sx={{ mb: '10px' }}>
								<BoldLabel
									label={entryTimeLabel}
									value={formatsDate(visitor.active_entry_vehicle.creator_date)}
								/>
							</Box>
						</Grid>
						<Grid size={{ xs: 12, md: 4 }}>
							<Box sx={{ mb: '10px' }}>
								<Typography component="label">{entryApproverLabel}</Typography><br/>
								<Typography variant="body2" fontWeight={700}>{visitor.creator?.fullname}</Typography>
								<FormHelperText>{visitor.creator?.email}</FormHelperText>
							</Box>
						</Grid>
						<Grid size={{ xs: 12, md: 6 }}>
							<Box sx={{ mb: '10px' }}>
								<Typography component="label">{isRejected ? TEXTS.label_inspect_points_revised : TEXTS.label_inspect_points}</Typography><br/>
								<List dense>
									{
										visitor.active_entry_vehicle.inspect_points ? (
											visitor.active_entry_vehicle.inspect_points.map((ipoint, idx: number) =>(
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
											<Typography fontWeight={700}>{TEXTS.no_inspect_points}</Typography>
										)
									}
								</List>
							</Box>
						</Grid>
						<Grid size={{ xs: 12, md: 6 }}>
							<Box sx={{ mb: '10px' }}>
								<BoldLabel
									label={TEXTS.label_comments_entry}
									value={visitor.active_entry_vehicle.comments_entry ? (
										visitor.active_entry_vehicle.comments_entry
									) : (
										TEXTS.no_comments_entry
									)}
								/>
							</Box>
						</Grid>
					</Grid>
					<hr/>
					{!isRejected && (
						<BoxButtonsForm>
							<Button 
								variant="contained" 
								color="error"
								startIcon={<ExitToAppIcon />}
								onClick={toggleOpenGiveLeaveForm}
							>{TEXTS.give_leave}</Button>
						</BoxButtonsForm>
					)}
				</Box>
			</Box>

			{ /* Form used to give leave to the vehicle. Only show for approved vehicles. */}
			{!isRejected && (
				<Dialog open={isOpenGiveLeaveForm}>
					<DialogContent>
						<GiveLeaveVehicleForm 
							visitor={visitor} 
							onCancel={toggleOpenGiveLeaveForm} 
						/>
					</DialogContent>
				</Dialog>
			)}
		</>
	)
}