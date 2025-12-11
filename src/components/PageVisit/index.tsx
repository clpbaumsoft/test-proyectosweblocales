"use client"

import VisitDashboard from "@/components/organisms/VisitDashboard";
import { PageVisitProps } from "@/interfaces/Organisms";
import SessionProvider from "@/providers/SessionProvider";
import MainSidebarV2 from "../molecules/MainSidebarV2";

export default function PageVisit({ visit, userLogged }: PageVisitProps) {
	return (
		<SessionProvider serverUser={userLogged}>
			<MainSidebarV2>
				<VisitDashboard visit={visit} />
			</MainSidebarV2>
		</SessionProvider>
	)
}