"use client"

//Components
import MainSidebar from "@/components/molecules/MainSidebar";
import VehiclesDashboard from "@/components/organisms/VehiclesDashboard";

//Interfaces and types
import { PageAuthProps } from "@/interfaces/General";

//Providers
import SessionProvider from "@/providers/SessionProvider";

export default function PageVehicleControl({ userLogged }: PageAuthProps) {
	return (
		<>
			<SessionProvider serverUser={userLogged}>
				<MainSidebar>
					<VehiclesDashboard />
				</MainSidebar>
			</SessionProvider>
		</>
	)
}