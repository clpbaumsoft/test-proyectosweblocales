"use client"

import { PageAuthProps } from "@/interfaces/General";
import RestrictedUsersDashboard from "../organisms/RestrictedUsersDashboard";
import SessionProvider from "@/providers/SessionProvider";
import MainSidebarV2 from "../molecules/MainSidebarV2";

export default function PageRestrictedUsers({ userLogged }: PageAuthProps) {
	return (
		<SessionProvider serverUser={userLogged}>
			<MainSidebarV2>
				<RestrictedUsersDashboard />
			</MainSidebarV2>
		</SessionProvider>
	)
}