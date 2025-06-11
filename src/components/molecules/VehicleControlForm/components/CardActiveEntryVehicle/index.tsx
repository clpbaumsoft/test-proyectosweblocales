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
	label_inspect_points: {
		id: "CardActiveEntryVehicle.Typography.Label.InspectPoints",
		defaultMessage: "Puntos a Inspeccionar:",
		description: "",
	},
	label_comments_entry: {
		id: "CardActiveEntryVehicle.BoldLabel.CommentsEntry",
		defaultMessage: "Observaciones de entrada:",
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
		defaultMessage: "Dar salida",
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

	return (
		<>
			<Box
				sx={{
					my: '20px',
					borderRadius: 'var(--mui-shape-borderRadius)',
					borderColor: 'info.light',
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
						bgcolor: 'info.light',
					}}
					variant="h6"
				>{TEXTS.label_entry_visitor}</Typography>
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
									label={TEXTS.label_entry_at}
									value={formatsDate(visitor.active_entry_vehicle.creator_date)}
								/>
							</Box>
						</Grid>
						<Grid size={{ xs: 12, md: 4 }}>
							<Box sx={{ mb: '10px' }}>
								<Typography component="label">{TEXTS.label_entry_approver}</Typography><br/>
								<Typography variant="body2" fontWeight={700}>{visitor.creator?.fullname}</Typography>
								<FormHelperText>{visitor.creator?.email}</FormHelperText>
							</Box>
						</Grid>
						<Grid size={{ xs: 12, md: 6 }}>
							<Box sx={{ mb: '10px' }}>
								<Typography component="label">{TEXTS.label_inspect_points}</Typography><br/>
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
					<BoxButtonsForm>
						<Button 
							variant="contained" 
							color="error"
							startIcon={<ExitToAppIcon />}
							onClick={toggleOpenGiveLeaveForm}
						>{TEXTS.give_leave}</Button>
					</BoxButtonsForm>
				</Box>
			</Box>

			{ /* Form used to cancel the visit. */}
			<Dialog open={isOpenGiveLeaveForm}>
				<DialogContent>
					<GiveLeaveVehicleForm 
						visitor={visitor} 
						onCancel={toggleOpenGiveLeaveForm} 
					/>
				</DialogContent>
			</Dialog>
		</>
	)
}