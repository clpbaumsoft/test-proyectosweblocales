import {
	Box,
	Button,
	// FormHelperText,
	Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

//Components
import BoldLabel from "@/components/atoms/BoldLabel";
import FormMessages from "@/components/atoms/FormMessages";
import FullLoader from "@/components/atoms/FullLoader";

//Hooks

import useTranslation from "@/hooks/useTranslation";

//Interfaces and types
import { CardActiveEntryToOtherBranchProps } from "@/interfaces/Molecules";

//Styles
import { BoxButtonsForm } from "@/styles/elements";

//Lib
import { formatsDate, getTimeDiff } from "@/lib/Helpers";
import useCardActiveEntryInOtherBranch from "./useCardActiveEntryInOtherBranch";
import { useMemo } from "react";

//Texts
const TRANS = {
	label_entry_visitor: {
		id: "CardActiveEntryToOtherBranch.Typography.H6.TitleCard",
		defaultMessage: "Ingreso de otra sede activo",
		description: "",
	},
	label_other_brachs: {
		id: "CardActiveEntryToOtherBranch.BoldLabel.Label.CardNumber",
		defaultMessage: "Sede actual:",
		description: "",
	},
	label_entry_at: {
		id: "CardActiveEntryToOtherBranch.BoldLabel.Label.EntryAt",
		defaultMessage: "Ingresó a las: ",
		description: "",
	},
	label_entry_current_time: {
		id: "CardActiveEntryToOtherBranch.BoldLabel.Label.EntryAt",
		defaultMessage: "Tiempo transcurrido: ",
		description: "",
	},
	label_entry_approver: {
		id: "CardActiveEntryToOtherBranch.Typography.Label.UserWhoGiveEntry",
		defaultMessage: "Persona que dió el ingreso:",
		description: "",
	},
	give_entry_to_other_branch: {
		id: "CardActiveEntryToOtherBranch.Button.GiveEntryVehicle",
		defaultMessage: "Ingreso a sede diferente de la visita original",
		description: "",
	},
	give_entry_vehicle: {
		id: "CardActiveEntryToOtherBranch.Button.GiveEntryVehicle",
		defaultMessage: "Ingreso Vehicular",
		description: "",
	},
	give_leave: {
		id: "CardActiveEntryToOtherBranch.Button.GiveLeave",
		defaultMessage: "Dar salida",
		description: "",
	},
}

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

	if(!actualGate) {
		return <></>
	}

	return (
		<>
			<Box
				sx={{
					my: '20px',
					borderRadius: 'var(--mui-shape-borderRadius)',
					borderColor: 'var(--mui-palette-info-light)',
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
						bgcolor: 'var(--mui-palette-info-light)',
					}}
					variant="h6"
				>{TEXTS.label_entry_visitor}</Typography>
				<Box sx={{ p: '10px' }}>
					<Grid container>
						<Grid size={{ xs: 12, md: 3 }}>
							<Box sx={{ mb: '10px' }}>
								<BoldLabel
									label={TEXTS.label_other_brachs}
									value={actualGate?.gate?.branch?.short_description || ''}
								/>
							</Box>
						</Grid>
						<Grid size={{ xs: 12, md: 3 }}>
							<Box sx={{ mb: '10px' }}>
								<BoldLabel
									label={TEXTS.label_entry_at}
									value={formatsDate(actualGate?.creator_date || '' )}
								/>
							</Box>
						</Grid>
						<Grid size={{ xs: 12, md: 3 }}>
							<Box sx={{ mb: '10px' }}>
								<BoldLabel
									label={TEXTS.label_entry_current_time}
									value={getTimeDiff(actualGate?.creator_date || '' )}
								/>
							</Box>
						</Grid>
						<Grid size={{ xs: 12, md: 3 }}>
							<Box>
								<Typography component="label">{TEXTS.label_entry_approver}</Typography><br/>
								<Typography variant="body2" fontWeight={700}>{actualGate?.creator?.fullname}</Typography>
							</Box>
						</Grid>
					</Grid>
					<hr/>
					<FormMessages
						message={message}
						error={error}
					/>
					<BoxButtonsForm>
						<Button 
							variant="contained" 
							color="error"
							startIcon={<ExitToAppIcon />}
							onClick={onClickGiveLeave}
						>{TEXTS.give_leave}</Button>
					</BoxButtonsForm>
				</Box>
			</Box>

		</>
	)
}