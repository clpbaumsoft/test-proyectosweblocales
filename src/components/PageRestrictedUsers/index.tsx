"use client"

//Components
import MainSidebar from "@/components/molecules/MainSidebar";


//Interfaces and types
import { PageAuthProps } from "@/interfaces/General";
import RestrictedUsersDashboard from "../organisms/RestrictedUsersDashboard";

//Providers
import SessionProvider from "@/providers/SessionProvider";

export default function PageRestrictedUsers({ userLogged }: PageAuthProps) {
	return (
		<>
			<SessionProvider serverUser={userLogged}>
				<MainSidebar>
					<RestrictedUsersDashboard />
				</MainSidebar>
			</SessionProvider>
		</>
	)
}