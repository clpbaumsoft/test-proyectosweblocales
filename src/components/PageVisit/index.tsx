"use client"

import VisitDashboard from "@/components/organisms/VisitDashboard";
import { PageVisitProps } from "@/interfaces/Organisms";

export default function PageVisit({ visit }: PageVisitProps) {
	return <VisitDashboard visit={visit} />
}