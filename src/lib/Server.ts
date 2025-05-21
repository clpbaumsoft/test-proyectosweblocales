import { cookies } from "next/headers";
import { redirect } from "next/navigation";

//Constants
import { GERRORS } from "@/constants/Globals";
import PAGES from "@/constants/Pages";

//Services
import Orchestra from "@/services/Orchestra";

//Errors
import AuthError from "@/errors/AuthError";
import AccessDeniedError from "@/errors/AccessDeniedError";

//Interfaces and models
import { UserType } from "@/interfaces/Models";
import User from "@/models/User";


/**
 * Returns a session token.
 * @returns string
 */
export const getSessionToken = async () => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('auth_token')?.value || ""
  return accessToken
}

/**
 * Redirects to the home or a previous page which it was tried to access it.
 * @param path 
 * @returns 
 */
const redirectToLogin = (path: string | null = null) => {
  if(path) {
    return redirect(`${PAGES.login}?r=${Buffer.from(path).toString('base64')}`)
  }
  return redirect(PAGES.login)
}

/**
 * Redirect if there's no auth token.
 */
export const verifyLogin = async (permissions: string | string[] = [], path: string | null = null) : Promise<UserType> => {
  try {
    
    const token = await getSessionToken()
    if(!token) {
      return redirectToLogin(path)
    }
    const userData = await Orchestra.authService.me(token)
    
    if(!userData) {
      return redirectToLogin(path)
    }
    
    if(permissions.length > 0) {
      const myUser = new User(userData)
      if(!myUser.can(permissions)) {
        throw new AccessDeniedError(GERRORS.access_denied)
      }
    }
    return userData
  } catch(catchError) {
    if(catchError instanceof AuthError) {
      return redirectToLogin(path)
    }
    throw catchError
  }
}