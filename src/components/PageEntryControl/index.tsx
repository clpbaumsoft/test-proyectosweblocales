"use client"

import EntryDashboard from "@/components/organisms/EntryDashboard";
import { PageAuthProps } from "@/interfaces/General";

export default function PageEntryControl({ userLogged }: PageAuthProps) {
	return <EntryDashboard />
}