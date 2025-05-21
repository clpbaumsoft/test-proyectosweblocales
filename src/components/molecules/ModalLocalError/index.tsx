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
import useModalLocalError from "./useModalLocalError";
import useTranslation from "@/hooks/useTranslation";

export default function ModalLocalError() {
	
	const GTEXTS = useTranslation(GTRANS)

	const { message, onClose } = useModalLocalError()

	return (
		<>
			<Dialog open={!!message}>
				<DialogContent>
					<Box sx={{ textAlign: 'center' }}><Typography variant="h6">{message}</Typography></Box>
				</DialogContent>
				<DialogActions>
          <Button onClick={onClose}>{GTEXTS.close}</Button>
        </DialogActions>
			</Dialog>
		</>
	)
}