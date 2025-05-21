import { redirect } from "next/navigation";

//Actions
import { getRestoreToken, verifyToken } from "./actions";

//Components
import PageResetPassword from "@/components/PageResetPassword";

//Constants
import PAGES from "@/constants/Pages";

//Interfaces and types
import { BasePageComponentProps } from "@/interfaces/General";


export default async function CambiarContrasenia({ searchParams }: BasePageComponentProps) {

	const { rt } = await searchParams
	// Get the token
	const token = getRestoreToken(rt as string)

	// Redirect if the token is null
	if(!token) {
		return redirect(PAGES.login)
	}
	
	// Verify if the token is valid and active
	const isValidToken = await verifyToken(token)

	return (
		<>
			<PageResetPassword accessToken={token} isValidToken={isValidToken} />
		</>
	)
}