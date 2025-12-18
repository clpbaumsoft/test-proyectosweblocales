"use client"

import VehiclesDashboard from "@/components/organisms/VehiclesDashboard";
import { PageAuthProps } from "@/interfaces/General";

export default function PageVehicleControl({ userLogged }: PageAuthProps) {
	return <VehiclesDashboard />
}