"use client"

import Image from "next/image";
import { IntlProvider } from "react-intl";

import {
	Typography,
	Box,
} from "@mui/material";

//Assets
import Logo from "@/assets/logo.png";

//Hooks
import useLocale from "@/hooks/useLocale";

//Interfaces and types
import { FullScreenMessageProps } from "@/interfaces/Organisms";
import useTranslation from "@/hooks/useTranslation";

//Intl
import TRANSLATIONS_MESSAGES from "@/intl";

//Texts
const TRANS = {
	default_message: {
		id: "FullScreenMessage.Typography.H4.DefaultMessage",
		defaultMessage: "Oops! Esto no debió haber pasado.",
		description: "",
	},
}

export default function FullScreenMessage({ message, children }: FullScreenMessageProps) {

	const { locale } = useLocale()
	

	return (
		<>
			<IntlProvider 
				locale={locale} 
				messages={TRANSLATIONS_MESSAGES[locale]}
				onError={() => {}}
			>
				<IntlFullScreenMessage
					message={message} 
				>{children}</IntlFullScreenMessage>
			</IntlProvider>
		</>
	)
}

function IntlFullScreenMessage({ message, children }: FullScreenMessageProps) {

	const TEXTS = useTranslation(TRANS)

	return (
		<>
		<div>
				<Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
					<Image
						src={Logo}
						alt="Proquinal"
						priority={true}
						style={{
							objectFit: 'contain',
						}}
					/>
				</Box>
				<Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
					<Typography component="h4">{message || TEXTS.default_message}</Typography>
				</Box>
				<Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
					<div>{ children || ''}</div>
				</Box>
			</div>
		</>
	)
}