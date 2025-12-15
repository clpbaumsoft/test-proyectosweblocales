"use client"

import { PageAuthProps } from "@/interfaces/General";
import SessionProvider from "@/providers/SessionProvider";
import GenerateReportsDashboard from "../organisms/GenerateReportsDashboard";
import MainSidebarV2 from "../molecules/MainSidebarV2";

export default function PageGenerateReports({ userLogged }: PageAuthProps) {
	return (
		<SessionProvider serverUser={userLogged}>
			<MainSidebarV2>
				<GenerateReportsDashboard />
			</MainSidebarV2>
		</SessionProvider>
	)
}