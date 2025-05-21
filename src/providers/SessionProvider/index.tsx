import { IntlProvider } from "react-intl";

//Components
import ModalLocalError from "@/components/molecules/ModalLocalError";
import FullLoader from "@/components/atoms/FullLoader";
import ModalLoginForm from "@/components/molecules/ModalLoginForm";

//Context
import SessionProviderContext from "./context";

//Hooks
import useSessionProvider from "./useSessionProvider";
import useLocale from "@/hooks/useLocale";

//Intl
import TRANSLATIONS_MESSAGES from "@/intl";

//Interfaces and types
import { SessionProviderProps } from "@/interfaces/General";

export default function SessionProvider({ children, serverUser }: SessionProviderProps) {
	
	const { locale } = useLocale()
	
	return (
		<IntlProvider 
			locale={locale} 
			messages={TRANSLATIONS_MESSAGES[locale]}
			onError={() => {}}
		>
			<IntlSessionProvider 
				serverUser={serverUser} 
			>{children}</IntlSessionProvider>
		</IntlProvider>
	)
}

function IntlSessionProvider({ children, serverUser }: SessionProviderProps) {
	
	const values = useSessionProvider(serverUser)

	return (
		<>	
			<SessionProviderContext.Provider value={values}>
					{
						values.isGlobalLoading && (
							<FullLoader />
						)
					}
					{children}
					<ModalLoginForm />
					<ModalLocalError />
			</SessionProviderContext.Provider>
		</>
	)
}