import {
	Box,
	FormHelperText,
	TableCell,
	Typography,
} from "@mui/material";
import RowActionsEntry from "../RowActionsEntry";
import { VisitRowEntryProps } from "@/interfaces/Molecules";
import { formatsDate } from "@/lib/Helpers";

export default function VisitRowEntry({ visitor, visit }: VisitRowEntryProps) {
	return (
		<>
			<TableCell component="th" scope="row" align="center">
				<b>{visit.id}</b>
			</TableCell>

			<TableCell component="th" align="left">
				<Typography variant="body2">{visit.pivot?.visitor_type_description || ""}</Typography>
			</TableCell>

			<TableCell>
				<Typography className="!text-[14px]">{visit?.reason}</Typography>
				<span className="text-[12px]">{formatsDate(visit.start_date)} - {formatsDate(visit.end_date)}</span>
			</TableCell>

			<TableCell component="th" scope="row" align="center">
				<Box sx={{ display: 'table', mx: 'auto' }}>
					<Typography variant="body2">{visit.interventor?.fullname}</Typography>
					<FormHelperText>{visit.interventor?.email}</FormHelperText>
				</Box>
			</TableCell>

			<TableCell align="center">
				<RowActionsEntry visit={visit} visitor={visitor} />
			</TableCell>
		</>
	)
}