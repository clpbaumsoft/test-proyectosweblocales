"use client"

import SecurityTrainingDashboard from "@/components/organisms/SecurityTrainingDashboard";
import { PageAuthProps } from "@/interfaces/General";
import SessionProvider from "@/providers/SessionProvider";
import MainSidebarV2 from "../molecules/MainSidebarV2";

export default function PageTrainings({ userLogged }: PageAuthProps) {
	return (
		<SessionProvider serverUser={userLogged}>
			<MainSidebarV2>
				<SecurityTrainingDashboard />
			</MainSidebarV2>
		</SessionProvider>
	)
}
