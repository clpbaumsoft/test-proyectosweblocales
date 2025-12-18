import { Typography } from "@mui/material";
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
import Table from "@/components/atoms/Table";

export default function EntryControlForm() {
	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)

	const {
		hasFinished,
		visitor,
		onLoadResult,
		onSearchVisitor,
	} = useEntryControlForm()

	const tableHeads = [
		TEXTS.label_id,
		TEXTS.visitor_type,
		TEXTS.label_description,
		TEXTS.label_owner,
		TEXTS.label_actions
	]

	const tableRows = visitor?.visits?.map((visit, index: number) => (
		<VisitRowEntry
			key={`visitRowEntry${index}`}
			visitor={visitor}
			visit={visit}
		/>
	))

	return (
		<Fragment>
			<SearchPersonForm
				onSearch={onSearchVisitor}
				onResult={onLoadResult}
			/>
			<div className="my-8">
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
						<div className="mt-12 mb-6">
							<Divider text="Visitas programadas" />
						</div>
					)}
					{!visitor.is_currently_banned && visitor.visits && visitor.visits.length > 0 ? (
							<Table
								tableHeads={tableHeads}
								tableRows={tableRows}
							/>
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