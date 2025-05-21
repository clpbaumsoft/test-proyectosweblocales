"use client"

import { IntlProvider } from "react-intl";

//Error
import LocalError from "@/errors/LocalError";

//Components
import FullScreenMessage from "@/components/organisms/FullScreenMessage";

//Constants
import { GTRANS } from "@/constants/Globals";

//Hooks
import useLocale from "@/hooks/useLocale";
import useTranslation from "@/hooks/useTranslation";

//Intl
import TRANSLATIONS_MESSAGES from "@/intl";

//Interfaces and types
import { GlobalErrorProps } from "@/interfaces/General";


export default function GlobalError({ error }: GlobalErrorProps) {
	
	const { locale } = useLocale()

	
	return (
		<>
			<IntlProvider 
				locale={locale} 
				messages={TRANSLATIONS_MESSAGES[locale]}
				onError={() => {}}
			>
				<IntlGlobarError error={error} />
			</IntlProvider>
		</>
	)
}


function IntlGlobarError({ error }: GlobalErrorProps) {

	const GTEXTS = useTranslation(GTRANS)

	return (
		<>
			<FullScreenMessage message={error instanceof LocalError ? error.message : GTEXTS.error_something_went_wrong}/>
		</>
	)
}