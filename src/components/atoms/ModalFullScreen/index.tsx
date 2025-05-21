//React and modules
import {
	Button,
	Dialog,
	AppBar,
	Toolbar,
	IconButton,
	Typography,
  Box
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

//Constants
import { GTRANS } from "@/constants/Globals";

//Interfaces and types
import { ModalFullScreenProps } from "@/interfaces/Atoms";

//Hooks
import useTranslation from "@/hooks/useTranslation";


export default function ModalFullScreen({ open, handleClose, children, title, subTitle, textAction, handleAction }: ModalFullScreenProps) {

  const GTEXTS = useTranslation(GTRANS)

	return (
		<>
		  <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label={GTEXTS.close}
            >
              <CloseIcon />
            </IconButton>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6">{title}</Typography>
              {
                subTitle && (
                  <Typography component="p">{subTitle}</Typography>
                )
              }
            </Box>
            <Button autoFocus color="inherit" onClick={handleAction}>{textAction}</Button>
          </Toolbar>
        </AppBar>
				{children}
      </Dialog>
		</>
	)
}