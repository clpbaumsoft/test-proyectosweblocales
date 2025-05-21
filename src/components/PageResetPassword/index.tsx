"use client"
import Link from "next/link";
import { Button } from "@mui/material";

//Components
import FullScreenMessage from "@/components/organisms/FullScreenMessage";
import ResetPasswordForm from "@/components/organisms/ResetPasswordForm";

//Constants
import PAGES from "@/constants/Pages";

//Interfaces and types
import { PageResetPasswordProps } from "@/interfaces/Organisms";

//Hooks
import useTranslation from "@/hooks/useTranslation";

//Texts
const TRANS = {
	token_expired_message: {
		id: "PageResetPassword.FullScreenMessage.TokenExpiredMessage",
		defaultMessage: "El enlace para restablecer tu contraseña ha expirado. Solicita uno nuevo para continuar con el proceso.",
		description: "",
	},
	login: {
		id: "PageResetPassword.Button.RequestNewRestoreLink",
		defaultMessage: "Solicitar",
		description: "",
	},
}

export default function PageResetPassword({ accessToken, isValidToken }: PageResetPasswordProps) {

	const TEXTS = useTranslation(TRANS)

	if(!isValidToken) {
		return (
			<>
				<FullScreenMessage message={TEXTS.token_expired_message}>
					<Link className="btn" href={PAGES.login} passHref>
						<Button variant="contained">{TEXTS.login}</Button>
					</Link>
				</FullScreenMessage>
			</>
		)
	}

	return (
		<>
			<ResetPasswordForm accessToken={accessToken} />
		</>
	)
}