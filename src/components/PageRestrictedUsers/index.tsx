"use client"

import { PageAuthProps } from "@/interfaces/General";
import RestrictedUsersDashboard from "../organisms/RestrictedUsersDashboard";

export default function PageRestrictedUsers({ userLogged }: PageAuthProps) {
	return <RestrictedUsersDashboard />
}