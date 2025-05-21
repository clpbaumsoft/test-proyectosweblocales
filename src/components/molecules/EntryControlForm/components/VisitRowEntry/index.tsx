import {
	Box,
	FormHelperText,
	TableCell,
	TableRow,
	Typography,
} from "@mui/material";

//Components
import RowActionsEntry from "../RowActionsEntry";

//Interfaces and types
import { VisitRowEntryProps } from "@/interfaces/Molecules";

//Lib
import { formatsDate } from "@/lib/Helpers";

export default function VisitRowEntry({ visitor, visit }: VisitRowEntryProps) {
	return (
		<>
			<TableRow
				sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
			>
				<TableCell component="th" scope="row" align="center">
					<b>{visit.id}</b>
				</TableCell>
				<TableCell>
					<Typography>{visit.reason}</Typography>
					{formatsDate(visit.start_date)} - {formatsDate(visit.end_date)}
				</TableCell>
				<TableCell component="th" scope="row" align="center">
					<Box sx={{ display: 'table', mx: 'auto' }}>
						<Typography variant="body2">{visit.creator?.fullname}</Typography>
						<FormHelperText>{visit.creator?.email}</FormHelperText>
					</Box>
				</TableCell>
				<TableCell align="center">
					<RowActionsEntry visit={visit} visitor={visitor} />
				</TableCell>
			</TableRow>
		</>
	)
}