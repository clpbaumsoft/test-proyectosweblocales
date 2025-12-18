"use client"

import SecurityTrainingDashboard from "@/components/organisms/SecurityTrainingDashboard";
import { PageAuthProps } from "@/interfaces/General";

export default function PageTrainings({ userLogged }: PageAuthProps) {
	return <SecurityTrainingDashboard />
}
