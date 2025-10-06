//React and Modules

import {
	Avatar,
	Box,
	TableCell,
	TableRow,
	Typography,
} from "@mui/material";
import EastIcon from "@mui/icons-material/East";

//Components
import VisitorRowActions from "../VisitorRowActions";
import WarningCondition from "@/components/atoms/WarningCondition";

//Interfaces and types
import { VisitorRowProps } from "@/interfaces/Molecules";

//Lib
import { formatsDate, mediaUrl, mInit, now } from "@/lib/Helpers";

//Styles
import styles from "./VisitorRow.module.scss";


export default function VisitorRow({ row, documentTypes, visitStartDate }: VisitorRowProps) {

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
					{
						row.visitor.startdate_sgsst && row.visitor.enddate_sgsst ? (
							<Box sx={{ display: 'flex', justifyContent: 'center' }}>
								<WarningCondition condition={now().startOf('day').isBefore(mInit(row.visitor.enddate_sgsst).endOf('day'))}>
									<Box sx={{ display: 'flex' }}>
										<b>{formatsDate(row.visitor.startdate_sgsst, 'D MMMM, YYYY')}</b><EastIcon sx={{ mx: '10px' }} /><b>{formatsDate(row.visitor.enddate_sgsst, 'D MMMM, YYYY')}</b>
									</Box>
								</WarningCondition>
							</Box>
						) : (
							<>- - -</>
						)
					}
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