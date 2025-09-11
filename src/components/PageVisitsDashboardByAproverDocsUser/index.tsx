"use client"

//Components
import MainSidebar from "@/components/molecules/MainSidebar";
import VisitsDashboardByApproverDocsUser from "../organisms/VisitsDashboardByApproverDocsUser";

//Interfaces and types
import { PageAuthProps } from "@/interfaces/General";

//Providers
import SessionProvider from "@/providers/SessionProvider";

export default function PageVisitsDashboardByAproverDocsUser({ userLogged }: PageAuthProps) {
	return (
		<>
			<SessionProvider serverUser={userLogged}>
				<MainSidebar>
					<VisitsDashboardByApproverDocsUser />
				</MainSidebar>
			</SessionProvider>
		</>
	)
}