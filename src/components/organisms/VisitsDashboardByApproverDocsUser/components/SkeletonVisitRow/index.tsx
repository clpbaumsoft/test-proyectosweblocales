import {
	Skeleton,
	TableCell,
	TableRow,
} from "@mui/material";

//Styles
import { BoxButtonsForm, SpaceBtn } from "@/styles/elements";

export default function SkeletonVisitRow() {
	return (
		<>
			<TableRow
				sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
			>
				<TableCell component="th" scope="row" align="center">
					<Skeleton variant="text" sx={{ fontSize: '1rem' }} />
				</TableCell>
				<TableCell component="th" scope="row" align="center">
					<Skeleton variant="rounded" height={30} />
				</TableCell>
				<TableCell>
					<Skeleton variant="text" width={'80%'} sx={{ fontSize: '1rem' }} />
					<Skeleton variant="text" sx={{ fontSize: '1rem' }} />
				</TableCell>
				<TableCell align="center">
					<Skeleton variant="text" sx={{ fontSize: '1rem' }} />
				</TableCell>
				<TableCell align="center">
					<Skeleton variant="text" sx={{ fontSize: '1rem' }} />
				</TableCell>
				<TableCell align="center">
					<Skeleton variant="text" sx={{ fontSize: '1rem' }} />
				</TableCell>
				<TableCell align="center">
					<BoxButtonsForm>
						<Skeleton variant="rounded" width={100} height={40} />
						<SpaceBtn />
						<Skeleton variant="rounded" width={100} height={40} />
						<SpaceBtn />
						<Skeleton variant="rounded" width={100} height={40} />
						<SpaceBtn />
						<Skeleton variant="rounded" width={100} height={40} />
					</BoxButtonsForm>
				</TableCell>
			</TableRow>
		</>
	)
}