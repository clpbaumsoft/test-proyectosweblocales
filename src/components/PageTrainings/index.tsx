"use client"

//Components
import MainSidebar from "@/components/molecules/MainSidebar";
import SecurityTrainingDashboard from "@/components/organisms/SecurityTrainingDashboard";

//Interfaces and types
import { PageAuthProps } from "@/interfaces/General";

//Providers
import SessionProvider from "@/providers/SessionProvider";

export default function PageTrainings({ userLogged }: PageAuthProps) {
	return (
		<>
			<SessionProvider serverUser={userLogged}>
				<MainSidebar>
					<SecurityTrainingDashboard />
				</MainSidebar>
			</SessionProvider>
		</>
	)
}
