import { notFound, redirect } from "next/navigation";
import { PageNotFoundError } from "next/dist/shared/lib/utils";


//Components
import PageVisit from "@/components/PageVisit";
import FullScreenMessage from "@/components/organisms/FullScreenMessage";

//Constants
import PAGES from "@/constants/Pages";

//Errors
import AccessDeniedError from "@/errors/AccessDeniedError";
import AuthError from "@/errors/AuthError";

//Interfaces and types
import { BasePageComponentProps } from "@/interfaces/General";

//Lib
import { getSessionToken, verifyLogin } from "@/lib/Server";

//Services
import Orchestra from "@/services/Orchestra";


export default async function Visitas({ params }: BasePageComponentProps) {
	const { id } = await params
	const visitId = !id || id instanceof Array ? 0 : id

	
	try {
		// Check the session
		const user = await verifyLogin([], PAGES.visits_id.replace('[id]', String(visitId)))

		const token = await getSessionToken()
		const visit = await Orchestra.visitService.get(visitId, token)
	
		return (
			<>
				<PageVisit visit={visit} userLogged={user} />
			</>
		)
	} catch(catchError) {
		if(catchError instanceof AuthError) {
			return redirect(PAGES.login)
		}
		if(catchError instanceof AccessDeniedError) {
			return <FullScreenMessage message={catchError.message} />
		}
		if(catchError instanceof PageNotFoundError) {
			return notFound()
		}
		throw catchError
	}

}