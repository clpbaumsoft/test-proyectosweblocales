"use client"

import ControlEmployeeDashboard from "@/components/organisms/ControlEmployeeDashboard";
import { PageAuthProps } from "@/interfaces/General";

export default function PageEmployeeControl({ userLogged }: PageAuthProps) {
	return <ControlEmployeeDashboard />
}