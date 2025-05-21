"use client"

import { IntlProvider } from "react-intl";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	Typography,
} from "@mui/material";

//Constants
import { GTRANS } from "@/constants/Globals";

//Hooks
import useMuiConfirmModal from "../hooks/useMuiConfirmModal";
import useTranslation from "@/hooks/useTranslation";
import useLocale from "@/hooks/useLocale";

//Intl
import TRANSLATIONS_MESSAGES from "@/intl";


export default function MuiConfimModal() {
	
	const { locale } = useLocale()
	
	const {
		isOpen,
		message,
		handleYes,
		handleNo,
	} = useMuiConfirmModal()
	
	return (
		<>
			<IntlProvider 
				locale={locale} 
				messages={TRANSLATIONS_MESSAGES[locale]}
				onError={() => {}}
			>
				<Dialog open={isOpen}>
					<DialogContent>
						<Box sx={{ textAlign: 'center' }}><Typography variant="h6">{message}</Typography></Box>
					</DialogContent>
					<DialogActions>
						<MuiConfirmModalButtons handleYes={handleYes} handleNo={handleNo} />
					</DialogActions>
				</Dialog>
			</IntlProvider>
		</>
	)
}

type MuiConfirmModalButtonsProps = {
	handleYes: (() => void) | null;
	handleNo: (() => void) | null;
}
function MuiConfirmModalButtons({ handleYes, handleNo }: MuiConfirmModalButtonsProps)  {
	
	const GTEXTS = useTranslation(GTRANS)

	return (
		<>
		{
			handleNo && (
				<Button 
					variant="outlined"
					color="primary"
					onClick={handleNo}
					>{GTEXTS.no}</Button>
				)
			}
		{
			handleYes && (
				<Button 
					variant="contained"
					color="primary"
					onClick={handleYes}
				>{GTEXTS.yes}</Button>
			)
		}
		</>
	)
}