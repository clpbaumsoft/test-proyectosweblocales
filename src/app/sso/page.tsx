//React and modules
"use client"
import SSOContent from '@/components/PageSSO'
//Providers
import SessionProvider from '@/providers/SessionProvider'


export default function SSOPage() {
    return (
        <SessionProvider>
            <SSOContent />
        </SessionProvider>
    )
}

