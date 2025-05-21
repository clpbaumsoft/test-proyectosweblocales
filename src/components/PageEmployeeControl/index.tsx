"use client"

//Components
import MainSidebar from "@/components/molecules/MainSidebar";
import ControlEmployeeDashboard from "@/components/organisms/ControlEmployeeDashboard";

//Interfaces and types
import { PageAuthProps } from "@/interfaces/General";

//Providers
import SessionProvider from "@/providers/SessionProvider";

export default function PageEmployeeControl({ userLogged }: PageAuthProps) {
	return (
		<>
			<SessionProvider serverUser={userLogged}>
				<MainSidebar>
					<ControlEmployeeDashboard />
				</MainSidebar>
			</SessionProvider>
		</>
	)
}