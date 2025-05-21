import { Dialog, DialogContent } from "@mui/material";

//Components
import LoginForm from "../LoginForm";

//Hooks
import useModalLoginForm from "./useModalLoginForm";

export default function ModalLoginForm() {

	const {
		isOpen,
		onClose,
	} = useModalLoginForm()


	return (
		<>
			<Dialog open={isOpen} onClose={onClose}>
				<DialogContent>
					<LoginForm />
				</DialogContent>
			</Dialog>
		</>
	)
}