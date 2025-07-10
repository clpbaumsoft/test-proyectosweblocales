import { Typography } from "@mui/material";

//Components
import EntryDashboard from "@/components/organisms/EntryDashboard";
import SecurityTrainingDashboard from "@/components/organisms/SecurityTrainingDashboard";
import VisitsDashboard from "@/components/organisms/VisitsDashboard";

//Contants
import { GTRANS } from "@/constants/Globals";

//Hooks
import useHome from "./useHome";
import useTranslation from "@/hooks/useTranslation";
import RestrictedUsersDashboard from "../RestrictedUsersDashboard";




export default function Home() {
	
	const GTEXTS = useTranslation(GTRANS)

	const {
		loggedUser,
	} = useHome()
	
	console.log("🪪🪪🪪🪪🪪🪪🪪🪪🪪 --->  ~ Home ~ loggedUser:", loggedUser)

	if(loggedUser.can('create_entry')) {
		return <EntryDashboard />
	}

	if(loggedUser.can('restricted_users')) {
		return <RestrictedUsersDashboard />
	}

	if(loggedUser.can('read_visit')) {
		return <VisitsDashboard />
	}
	
	if(loggedUser.can('train_visitor')) {
		return <SecurityTrainingDashboard />
	}

	return (
		<>
			<Typography>{GTEXTS.error_something_went_wrong} NOOOOO</Typography>
		</>
	)
}