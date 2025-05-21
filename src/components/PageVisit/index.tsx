"use client"

//Components
import MainSidebar from "@/components/molecules/MainSidebar";
import VisitDashboard from "@/components/organisms/VisitDashboard";

//Interfaces and types
import { PageVisitProps } from "@/interfaces/Organisms";

//Providers
import SessionProvider from "@/providers/SessionProvider";

export default function PageVisit({ visit, userLogged }: PageVisitProps) {
	return (
		<>
			<SessionProvider serverUser={userLogged}>
				<MainSidebar>
					<VisitDashboard visit={visit} />
				</MainSidebar>
			</SessionProvider>
		</>
	)
}