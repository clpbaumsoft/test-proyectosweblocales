//Lib
import { getLanguage } from "@/lib/Helpers";

export default function useLocale() {

	/**
	 * NOTE: This project has been prepared to support multilanguage. When requested, uncommet these lines to enable this feature:
	 * import { useSearchParams } from "next/navigation";
	 * const searchParams = useSearchParams()
	 * const langQuery = searchParams.get('lang')
	 * const defLang = langQuery ? langQuery : (window?.navigator?.language ? window.navigator.language : 'es')
	 */
	const defLang = 'es'
	const { lang, instance } = getLanguage(defLang)

	return {
		locale: lang && instance ? `${lang}-${instance}` : lang,
	}

}