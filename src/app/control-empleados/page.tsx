import { notFound, redirect } from "next/navigation";
import { PageNotFoundError } from "next/dist/shared/lib/utils";


//Components
import PageEmployeeControl from "@/components/PageEmployeeControl";
import FullScreenMessage from "@/components/organisms/FullScreenMessage";

//Constants
import PAGES from "@/constants/Pages";

//Errors
import AuthError from "@/errors/AuthError";
import AccessDeniedError from "@/errors/AccessDeniedError";

//Interfaces and types
import { BasePageComponentProps } from "@/interfaces/General";

//Lib
import { verifyLogin } from "@/lib/Server";


export default async function ControlEmpleados({  }: BasePageComponentProps) {

	// Check the session
	const user = await verifyLogin([], PAGES.dashboard_employees)

	try {
	
		return (
			<>
				<PageEmployeeControl userLogged={user} />
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