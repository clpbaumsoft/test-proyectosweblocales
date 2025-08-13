"use client"

//Components
import MainSidebar from "@/components/molecules/MainSidebar";


//Interfaces and types
import { PageAuthProps } from "@/interfaces/General";

//Providers
import SessionProvider from "@/providers/SessionProvider";
import GenerateReportsDashboard from "../organisms/GenerateReportsDashboard";

export default function PageGenerateReports({ userLogged }: PageAuthProps) {
	return (
		<>
			<SessionProvider serverUser={userLogged}>
				<MainSidebar>
					<GenerateReportsDashboard />
				</MainSidebar>
			</SessionProvider>
		</>
	)
}