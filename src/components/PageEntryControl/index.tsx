"use client"

//Components
import MainSidebar from "@/components/molecules/MainSidebar";
import EntryDashboard from "@/components/organisms/EntryDashboard";

//Interfaces and types
import { PageAuthProps } from "@/interfaces/General";

//Providers
import SessionProvider from "@/providers/SessionProvider";

export default function PageEntryControl({ userLogged }: PageAuthProps) {
	return (
		<>
			<SessionProvider serverUser={userLogged}>
				<MainSidebar>
					<EntryDashboard />
				</MainSidebar>
			</SessionProvider>
		</>
	)
}