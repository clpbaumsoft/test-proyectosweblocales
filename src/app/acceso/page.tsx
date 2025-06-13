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
    try {
        // Check the session
        const token = await getSessionToken()
        if(token) {
            try {
                const userData = await Orchestra.authService.me(token)
                if(userData) {
                    return redirect(PAGES.home)
                }
            } catch (error) {
                // If there's an auth error, continue to login page
                console.error('Auth error:', error)
            }
        }

        return (
            <>
                <PageLogin />
            </>
        )
    } catch (error) {
        console.error('Login page error:', error)
        return (
            <>
                <PageLogin />
            </>
        )
    }
}