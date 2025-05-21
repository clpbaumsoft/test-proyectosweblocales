import { Alert, Box, Button } from "@mui/material";

//Interfaces and types
import { CapturePhotoProps } from "@/interfaces/Atoms";

//Hooks
import useCapturePhoto from "./useCapturePhoto";
import useTranslation from "@/hooks/useTranslation";

//Texts
const TRANS = {
	request_camera_permission: {
		id: "CapturePhoto.Button.RequestCameraPermission",
		defaultMessage: "Solicitar",
		description: "",
	},
	no_camera_permissions: {
		id: "CapturePhoto.Alert.NoCameraPermission",
		defaultMessage: "Sin autorización de camara.",
		description: "",
	},
}

export default function CapturePhoto({ videoRef, canvasRef }: CapturePhotoProps) {
	
	const TEXTS = useTranslation(TRANS)
	
	const {
		isDeniedCamera,
		onRequestCameraPermission,
	} = useCapturePhoto(videoRef)
	
	return (
		<>
				{
					!isDeniedCamera ? (
						<Box 
							sx={{ 
								borderWidth: 2,
								borderStyle: 'solid',
								borderColor: 'black',
								borderRadius: 'var(--mui-shape-borderRadius)',
								aspectRatio: '4 / 3',
								width: 280,
								display: 'flex',
							}}
						>
							<video 
								ref={videoRef}
								autoPlay 
								playsInline
								style={{
									height: '100%',
									width: '100%',
									objectFit: 'cover',
								}}
							/>
							<canvas ref={canvasRef} style={{ display: 'none' }} />
						</Box>
					) : (
						<Box>
							<Alert severity="error">{TEXTS.no_camera_permissions}</Alert>
							<Button
								variant="outlined"
								onClick={onRequestCameraPermission}
								color="success"
								sx={{ mx: 'auto', display: 'table', my: '10px' }}
							>{TEXTS.request_camera_permission}</Button>
						</Box>
					)
				}
		</>
	)
}