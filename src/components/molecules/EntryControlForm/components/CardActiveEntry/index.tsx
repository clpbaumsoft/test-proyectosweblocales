import {
	Box,
	Button,
	Dialog,
	DialogContent,
	FormHelperText,
	Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import CarRentalIcon from "@mui/icons-material/CarRental";

//Components
import BoldLabel from "@/components/atoms/BoldLabel";
import FormMessages from "@/components/atoms/FormMessages";
import FullLoader from "@/components/atoms/FullLoader";
import GiveEntryVehicleForm from "@/components/molecules/GiveEntryVehicleForm";

//Hooks
import useCardActiveEntry from "./useCardActiveEntry";
import useTranslation from "@/hooks/useTranslation";

//Interfaces and types
import { CardActiveEntryProps } from "@/interfaces/Molecules";

//Styles
import { BoxButtonsForm, SpaceBtn } from "@/styles/elements";

//Lib
import { formatsDate } from "@/lib/Helpers";
import GiveEntryToOtherBranch from "@/components/molecules/GiveEntryToOtherBranch";
import { useMemo } from "react";

//Texts
const TRANS = {
	label_entry_visitor: {
		id: "CardActiveEntry.Typography.H6.TitleCard",
		defaultMessage: "Ingreso Activo",
		description: "",
	},
	label_card_number: {
		id: "CardActiveEntry.BoldLabel.Label.CardNumber",
		defaultMessage: "Ficha #",
		description: "",
	},
	label_entry_at: {
		id: "CardActiveEntry.BoldLabel.Label.EntryAt",
		defaultMessage: "Ingresó a las:",
		description: "",
	},
	label_entry_approver: {
		id: "CardActiveEntry.Typography.Label.UserWhoGiveEntry",
		defaultMessage: "Persona que dió el ingreso:",
		description: "",
	},
	give_entry_to_other_branch: {
		id: "CardActiveEntry.Button.GiveEntryVehicle",
		defaultMessage: "Ingreso a sede diferente de la visita original",
		description: "",
	},
	give_entry_vehicle: {
		id: "CardActiveEntry.Button.GiveEntryVehicle",
		defaultMessage: "Ingreso Vehicular",
		description: "",
	},
	give_leave: {
		id: "CardActiveEntry.Button.GiveLeave",
		defaultMessage: "Dar salida",
		description: "",
	},
}

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

	if(!visitor?.active_entry) {
		return <></>
	}

	const isAllowedCardButtonEntry = (
		visitor.active_entry_vehicle?.allowed === 0 || 
		visitor.active_entry_vehicle?.allowed === false ||
		!visitor.active_entry_vehicle
	) ? false : true

	return (
		<>
			<Box
				sx={{
					my: '20px',
					borderRadius: 'var(--mui-shape-borderRadius)',
					borderColor: 'success.light',
					borderWidth: '1px',
					borderStyle: 'solid',
					position: 'relative',
				}}
			>
				{
					isInnerLoading && (
						<FullLoader variant="absolute" />
					)
				}
				<Typography 
					sx={{ 
						color: 'var(--mui-palette-common-white)',
						p: '10px',
						borderTopRadius: 'var(--mui-shape-borderRadius)',
						bgcolor: 'success.light',
					}}
					variant="h6"
				>{TEXTS.label_entry_visitor}</Typography>
				<Box sx={{ p: '10px' }}>
					<Grid container>
						<Grid size={{ xs: 12, md: 4 }}>
							<Box sx={{ mb: '10px' }}>
								<BoldLabel
									label={TEXTS.label_card_number}
									value={visitor.active_entry.card_number}
								/>
							</Box>
						</Grid>
						
						{/* <Grid size={{ xs: 12, md: 3 }}>
							<Box sx={{ mb: '10px' }}>
								<BoldLabel
									label={TEXTS.label_card_number + 'Potería'}
									value={visitor.active_entry.card_number}
								/>
							</Box>
						</Grid> */}

						<Grid size={{ xs: 12, md: 4 }}>
							<Box sx={{ mb: '10px' }}>
								<BoldLabel
									label={TEXTS.label_entry_at}
									value={formatsDate(visitor.active_entry.creator_date)}
								/>
							</Box>
						</Grid>
						<Grid size={{ xs: 12, md: 4 }}>
							<Box>
								<Typography component="label">{TEXTS.label_entry_approver}</Typography><br/>
								<Typography variant="body2" fontWeight={700}>{visitor.creator?.fullname}</Typography>
								<FormHelperText>{visitor.creator?.email}</FormHelperText>
							</Box>
						</Grid>
					</Grid>
					<hr/>
					<FormMessages
						message={message}
						error={error}
					/>
					<BoxButtonsForm>
						{
							loggedUser.can('create_entry_vehicle') && (
								<>
									<Button
										disabled={isEntryToOtherBranchButtonEnabled} 
										variant="contained" 
										color="info"
										startIcon={<TransferWithinAStationIcon />}
										onClick={toggleModalEntryToOtherBranch}
									>{TEXTS.give_entry_to_other_branch}</Button>
									<SpaceBtn />
								</>
							)
						}

						{
							loggedUser.can('create_entry_vehicle') && (
								<>
									<Button 
										disabled={isAllowedCardButtonEntry}
										variant="contained"
										color="primary"
										startIcon={<CarRentalIcon />}
										onClick={toggleModalEntryVehicle}
									>{TEXTS.give_entry_vehicle}</Button>
									<SpaceBtn />
								</>
							)
						}
						<Button 
							variant="contained" 
							color="error"
							startIcon={<ExitToAppIcon />}
							onClick={onClickGiveLeave}
						>{TEXTS.give_leave}</Button>
					</BoxButtonsForm>
				</Box>
			</Box>


			{/* MODAL ENTRY TO OTHER BRANCH */}
			<Dialog open={isOpenModalEntryToOtherBranch}>
				<DialogContent>
					{
						visitor.active_entry?.visit_visitor?.visit && (
							<>
								<GiveEntryToOtherBranch 
									visit={visitor.active_entry?.visit_visitor?.visit} 
									visitor={visitor} 
									onClose={toggleModalEntryToOtherBranch}
								/>
							</>
						)
					}
				</DialogContent>
			</Dialog>


			{/* MODAL ENTRY VEHICLE */}
			<Dialog open={isOpenModalEntryVehicle}>
				<DialogContent>
					{
						visitor.active_entry?.visit_visitor?.visit && (
							<GiveEntryVehicleForm 
								visit={visitor.active_entry?.visit_visitor?.visit} 
								visitor={visitor} 
								onClose={toggleModalEntryVehicle}
							/>
						)
					}
				</DialogContent>
			</Dialog>
		</>
	)
}