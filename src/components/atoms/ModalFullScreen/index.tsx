//React and modules
import {
	Button,
	Dialog,
	AppBar,
	Toolbar,
	IconButton,
	Typography,
  Box,
  Container
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

//Constants
import { GTRANS } from "@/constants/Globals";

//Interfaces and types
import { ModalFullScreenProps } from "@/interfaces/Atoms";

//Hooks
import useTranslation from "@/hooks/useTranslation";


export default function ModalFullScreen({ open, handleClose, children, title, subTitle, textAction, handleAction, addFixedRowSave }: ModalFullScreenProps) {

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

        {
          addFixedRowSave && (
            <Container maxWidth={false} 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                background: 'transparent', 
                position: 'fixed',
                zIndex: '1',
                bottom: '10px',
                left: '0',
                width: '100%',
                }} >
              <Button 
                autoFocus 
                sx={{
                  background: '#ea5c1f', 
                  color: '#FFFFFF', 
                  width: '90%', 
                  maxWidth: '500px',
                  padding: '15px 0',
                  transition: 'background 0.3s ease-in-out',
                  '&:hover': {
                    background: '#d8551d',
                  }
                  }}  
                onClick={handleAction}>
                  {textAction}
              </Button>
            </Container>
          )
        }

      </Dialog>
		</>
	)
}