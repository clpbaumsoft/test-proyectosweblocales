import PageVisit from "@/components/PageVisit";
import { BasePageComponentProps } from "@/interfaces/General";
import { getSessionToken } from "@/lib/Server";
import Orchestra from "@/services/Orchestra";

export default async function Visitas({ params }: BasePageComponentProps) {
	const { id } = await params
	const visitId = !id || id instanceof Array ? 0 : id

	const token = await getSessionToken()
	const visit = await Orchestra.visitService.get(visitId, token)

	return <PageVisit visit={visit} />
}