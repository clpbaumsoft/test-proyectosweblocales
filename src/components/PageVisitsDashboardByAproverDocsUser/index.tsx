"use client"

import { PageAuthProps } from "@/interfaces/General";
import VisitsDashboardByApproverDocsUser from "../organisms/VisitsDashboardByApproverDocsUser";

export default function PageVisitsDashboardByAproverDocsUser({ userLogged }: PageAuthProps) {
	return (
		<VisitsDashboardByApproverDocsUser />
	)
}