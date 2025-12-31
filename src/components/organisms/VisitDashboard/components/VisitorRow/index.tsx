import {
	Avatar,
	Box,
	TableCell,
	TableRow,
	Typography,
} from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import VisitorRowActions from "../VisitorRowActions";
import WarningCondition from "@/components/atoms/WarningCondition";
import { VisitorRowProps } from "@/interfaces/Molecules";
import { formatsDate, mediaUrl, mInit, now } from "@/lib/Helpers";
import styles from "./VisitorRow.module.scss";
import useVisitorRow from "./useVisitorRow";


export default function VisitorRow({ row, documentTypes, visitStartDate }: VisitorRowProps) {
	// const { loadedData } = useVisitorRow(row);
	const startDateSgsst = row.visitor.startdate_sgsst;
	const endDateSgsst = row.visitor.enddate_sgsst;
	const requiredSecurityTraining = !!row.visitor.requires_security_speak ? "SI" : "NO";

	return (
		<>
			<TableRow
				className={`${styles.visitRow} relative`}
				sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
			>
				<TableCell align="center">
					<Avatar 
						alt={row.visitor.first_name}
						src={mediaUrl(row.visitor.id, 'foto-visitante')}
						sx={{ width: 60, height: 60, mx: 'auto' }}
					/>
					<Typography sx={{ mt: '10px' }}>{row.visitor_type.short_description}</Typography>
				</TableCell>
				<TableCell align="center">{`${row.visitor.identification_type.code} ${row.visitor.identification_number}`}</TableCell>
				<TableCell align="center">{`${row.visitor.fullname}`}</TableCell>
				<TableCell align="center">
					{startDateSgsst && endDateSgsst ? (
						<Box sx={{ display: 'flex', justifyContent: 'center' }}>
							<WarningCondition condition={now().startOf('day').isBefore(mInit(endDateSgsst).endOf('day'))}>
								<Box sx={{ display: 'flex' }}>
									<b>{formatsDate(startDateSgsst, 'D MMMM, YYYY')}</b><EastIcon sx={{ mx: '10px' }} /><b>{formatsDate(endDateSgsst, 'D MMMM, YYYY')}</b>
								</Box>
							</WarningCondition>
						</Box>
					) : (
						<>{requiredSecurityTraining}</>
					)}
				</TableCell>
				<TableCell align="center">
					<VisitorRowActions
						visitVisitor={row}
						documentTypes={documentTypes}
						visitStartDate={visitStartDate}
					/>
				</TableCell>
			</TableRow>
		</>
	)
}