import { notFound, redirect } from "next/navigation";
import { PageNotFoundError } from "next/dist/shared/lib/utils";


//Components
import FullScreenMessage from "@/components/organisms/FullScreenMessage";
import PageTrainings from "@/components/PageTrainings";

//Constants
import PAGES from "@/constants/Pages";

//Errors
import AccessDeniedError from "@/errors/AccessDeniedError";
import AuthError from "@/errors/AuthError";

//Interfaces and types
import { BasePageComponentProps } from "@/interfaces/General";

//Lib
import { verifyLogin } from "@/lib/Server";

export default async function Capacitaciones({  }: BasePageComponentProps) {
	// Check the session
	try {
		const userData = await verifyLogin('train_visitor', PAGES.trainings)
		return (
			<>
				<PageTrainings userLogged={userData} />
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