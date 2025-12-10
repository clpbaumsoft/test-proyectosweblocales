"use client"

import EntryDashboard from "@/components/organisms/EntryDashboard";
import { PageAuthProps } from "@/interfaces/General";
import SessionProvider from "@/providers/SessionProvider";
import MainSidebarV2 from "../molecules/MainSidebarV2";

export default function PageEntryControl({ userLogged }: PageAuthProps) {
	return (
		<SessionProvider serverUser={userLogged}>
			<MainSidebarV2>
				<EntryDashboard />
			</MainSidebarV2>
		</SessionProvider>
	)
}