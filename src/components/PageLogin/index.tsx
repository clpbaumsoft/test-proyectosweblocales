"use client"

import {
	Box,
} from "@mui/material";
import Wallpaper from "@/assets/wallpaper.jpg";
import LoginForm from "@/components/molecules/LoginForm";
import SessionProvider from "@/providers/SessionProvider";

export default function PageLogin() {
	return (
		<>
			<SessionProvider>
				<>
					<Box sx={{ 
						display: 'flex', 
						height: '100vh',
						background: `url(${Wallpaper.src}) no-repeat center center fixed`,
						backgroundSize: 'cover',
						alignItems: 'center',
						justifyContent: 'center',
						padding: 2,
					}}>
						<LoginForm />
					</Box>
				</>
			</SessionProvider>
		</>
	)
}