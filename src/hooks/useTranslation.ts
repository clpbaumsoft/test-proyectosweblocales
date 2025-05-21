import { defineMessages, useIntl } from "react-intl";

export default function useTranslation(definitions: Record<string, Record<string, string>>) {
	const intl = useIntl()

	const TRANS = defineMessages(definitions)

	const listMessages: Record<string, string> = {}
	for(const key in definitions) {
		listMessages[key] = intl.formatMessage(TRANS[key])
	}

	return listMessages
}