"use client"
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import FullLoader from '@/components/atoms/FullLoader'
import PAGES from '@/constants/Pages'
import AuthService from '@/services/Auth'
import useSessionProviderHook from '@/providers/SessionProvider/hooks'
import { UserType } from '@/interfaces/Models'
import AuthError from '@/errors/AuthError'
import { setCookie } from '@/lib/Helpers'


export default function SSOContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { setUser, setAccessToken, setIsLoggedIn } = useSessionProviderHook()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const handleSSOLogin = async () => {
            try {
                const loginSuccessToken = searchParams.get('login_success')
                
                if (!loginSuccessToken) {
                    setError('No se encontró el token de autenticación')
                    router.push(PAGES.login)
                    return
                }
                const authService = new AuthService()
                const userData: UserType = await authService.me(loginSuccessToken)
                
                setUser(userData)
                setAccessToken(loginSuccessToken)
                setIsLoggedIn(true)

                setCookie('auth_token', loginSuccessToken)
                
                router.push(PAGES.home)
                
            } catch (catchError) {
                console.error('Error en SSO login:', catchError)
                
                let errorMessage = 'Error durante la autenticación SSO'
                
                if (catchError instanceof AuthError) {
                    errorMessage = catchError.message
                }
                
                setError(errorMessage)
                
                setTimeout(() => {
                    router.push(PAGES.login)
                }, 3000)
            } finally {
                setIsLoading(false)
            }
        }

        handleSSOLogin()
    }, [searchParams, router, setUser, setAccessToken, setIsLoggedIn])

    if (isLoading) {
        return <FullLoader />
    }

    if (error) {
        return (
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                minHeight: '100vh',
                padding: '20px',
                textAlign: 'center'
            }}>
                <h2>Error de Autenticación</h2>
                <p>{error}</p>
                <p>Redirigiendo al login...</p>
            </div>
        )
    }

    return null
}