"use client"

import ControlEmployeeDashboard from "@/components/organisms/ControlEmployeeDashboard";
import { PageAuthProps } from "@/interfaces/General";
import SessionProvider from "@/providers/SessionProvider";
import MainSidebarV2 from "../molecules/MainSidebarV2";

export default function PageEmployeeControl({ userLogged }: PageAuthProps) {
	return (
		<SessionProvider serverUser={userLogged}>
			<MainSidebarV2>
				<ControlEmployeeDashboard />
			</MainSidebarV2>
		</SessionProvider>
	)
}