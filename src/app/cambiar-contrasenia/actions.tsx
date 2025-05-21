
//Services
import Orchestra from "@/services/Orchestra";


/**
 * Returns if the token given is valid and active.
 * @param token 
 * @returns 
 */
export const verifyToken = async (token: string) => {
	return await Orchestra.authService.isValidToken(token)
}


export const getRestoreToken = (tokenParam: string) => {
	const restoreToken: string | null = tokenParam || null
	return restoreToken ? Buffer.from(restoreToken, 'base64').toString() : null
}