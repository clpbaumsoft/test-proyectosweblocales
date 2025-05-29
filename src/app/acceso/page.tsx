import { redirect } from "next/navigation";

//Components
import PageLogin from "@/components/PageLogin";

//Constants
import PAGES from "@/constants/Pages";

//Lib
import { getSessionToken } from "@/lib/Server";

//Services
import Orchestra from "@/services/Orchestra";

export default async function Acceso() {

	// Check the session
	const token = await getSessionToken()
	if(token) {
		const userData = await Orchestra.authService.me(token)
		
		if(userData) {
			return redirect(PAGES.home)
		}
	}

	return (
		<>
			<PageLogin />
		</>
	)
}