"use client"

//React and modules
import Image from "next/image";

import {
	Box,
} from "@mui/material";

//Assets
import Wallpaper from "@/assets/wallpaper.jpg";

//Components
import LoginForm from "@/components/molecules/LoginForm";

//Providers
import SessionProvider from "@/providers/SessionProvider";


export default function PageLogin() {
	
	return (
		<>
			<SessionProvider>
				<>
					<Box sx={{ display: 'flex', height: '95vh', padding: 2 }}>
						<LoginForm />
						{/* Right image */}
						<Box
							sx={{
								width: '55%',
								height: '100%',
								objectFit: 'cover',
								marginLeft: 2,
								borderRadius: 2,
								position: 'relative',
								overflow: 'hidden',
							}}
						>
							<Image
								src={Wallpaper}
								alt="Proquinal wallpaper"
								priority={true}
								fill
								style={{
									objectFit: 'cover',
								}}
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							/>
						</Box>
					</Box>
				</>
			</SessionProvider>
		</>
	)
}