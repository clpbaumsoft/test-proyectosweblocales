import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import CardActiveEntry from "./components/CardActiveEntry";
import CardActiveEntryVehicle from "@/components/molecules/VehicleControlForm/components/CardActiveEntryVehicle";
import CardVisitorPhoto from "./components/CardVisitorPhoto";
import SearchPersonForm from "@/components/molecules/SearchPersonForm";
import VisitRowEntry from "./components/VisitRowEntry";
import { GTRANS } from "@/constants/Globals";
import useEntryControlForm from "./useEntryControlForm";
import useTranslation from "@/hooks/useTranslation";
import CardActiveEntryInOtherBranch from "./components/CardActiveEntryInOtherBranch";
import { AccordeonHistoryVisits } from "./components/AccordeonHistoryVisits";
import { ButtonViewRestrictedUser } from "@/components/atoms/ButtonViewRestrictedUser/ButtonViewRestrictedUser";
import { TRANS } from "./constants";
import Divider from "@/components/atoms/Divider";
import { Fragment } from "react";

export default function EntryControlForm() {
	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)

	const {
		hasFinished,
		visitor,
		onLoadResult,
		onSearchVisitor,
	} = useEntryControlForm()

	return (
		<Fragment>
			<SearchPersonForm
				onSearch={onSearchVisitor}
				onResult={onLoadResult}
			/>
			<div className="my-4">
				{visitor && <Divider text={TEXTS.heading_results_for.replace('[NAME]', visitor.fullname)} />}
			</div>
			{!visitor ? (
				hasFinished && (
					<Typography>{GTEXTS.no_results}</Typography>
				)
			) : (
				<Fragment>
					<div>
						<CardVisitorPhoto visitor={visitor} />
						{visitor.is_currently_banned ?
							<div className="flex justify-center">
								<ButtonViewRestrictedUser />
							</div>
							: (
								<>
									<CardActiveEntry visitor={visitor} />
									<CardActiveEntryInOtherBranch visitor={visitor} />
									<AccordeonHistoryVisits visitor={visitor} />
									<CardActiveEntryVehicle visitor={visitor} />
								</>
							)}
					</div>
					{visitor.visits && visitor.visits.length > 0 && (
						<div className="my-4">
							<Divider text="Visitas programadas" />
						</div>
					)}
					{!visitor.is_currently_banned && visitor.visits && visitor.visits.length > 0 ? (
						<TableContainer component={Paper}>
							<Table sx={{ minWidth: 650 }} aria-label="simple table">
								<TableHead>
									<TableRow sx={{
										fontSize: "14px"
									}}>
										<TableCell align="center">{TEXTS.label_id}</TableCell>
										<TableCell align="left">{TEXTS.visitor_type}</TableCell>
										<TableCell align="left">{TEXTS.label_description}</TableCell>
										<TableCell align="center">{TEXTS.label_owner}</TableCell>
										<TableCell align="center">{TEXTS.label_actions}</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{
										visitor.visits?.map((visit, index: number) => (
											<VisitRowEntry
												key={`visitRowEntry${index}`}
												visitor={visitor}
												visit={visit}
											/>
										))
									}
								</TableBody>
							</Table>
						</TableContainer>
					) : (
						<div className="my-4">
							<Divider text={TEXTS.no_results_visits} />
						</div>
					)}
				</Fragment>
			)}
		</Fragment>
	)
}