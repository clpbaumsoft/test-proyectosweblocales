"use client"

import Wallpaper from "@/assets/wallpaper.jpg";
import LoginForm from "@/components/molecules/LoginForm";
import SessionProvider from "@/providers/SessionProvider";

export default function PageLogin() {
	return (
		<SessionProvider>
			<div className="flex h-screen bg-white" style={{
				background: `url(${Wallpaper.src}) no-repeat center center fixed`,
				backgroundSize: 'cover',
			}}>
				<LoginForm />
			</div>
		</SessionProvider>
	)
}