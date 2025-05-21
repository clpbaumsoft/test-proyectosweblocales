import Image from "next/image";
import {
	Box,
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LocalSeeIcon from "@mui/icons-material/LocalSee";

//Components
import CapturePhoto from "./components/CapturePhoto";
import FormMessages from "@/components/atoms/FormMessages";
import PreviewImage from "@/components/atoms/PreviewImage";

//Constants
import { GTRANS } from "@/constants/Globals";

//Styles
import { BoxButtons, SpaceBtn, VisuallyHiddenInput } from "@/styles/elements";

//Hooks
import useTakePhoto from "./useTakePhoto";
import useTranslation from "@/hooks/useTranslation";

//Interfaces and types
import { TakePhotoProps } from "@/interfaces/Atoms";

//Texts
const TRANS = {
	select_file_image: {
		id: "TakePhoto.Button.SelectFileImage",
		defaultMessage: "Seleccionar",
		description: "",
	},
	take_photo: {
		id: "TakePhoto.Button.TakePhoto",
		defaultMessage: "Capturar",
		description: "",
	},
	take_photo_open: {
		id: "TakePhoto.Button.TakePhotoOpen",
		defaultMessage: "Tomar foto",
		description: "",
	},
	upload_photo: {
		id: "TakePhoto.Button.UploadPhoto",
		defaultMessage: "Guardar",
		description: "",
	},
}

export default function TakePhoto({ preview, onSavePhoto }: TakePhotoProps) {
	
	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)
	
	const {
		message,
		error,
		videoRef,
		canvasRef,
		imageSrc,
		filePhoto,
		isSavingPhoto,
		isLoadingPreview,
		isOpenModalTakePhoto,
		onLoadPreviewImage,
		onChangeInput,
		toggleIsOpenModalTakePhoto,
		onClickCapturePhoto,
		onClickSavePhoto,
	} = useTakePhoto(preview, onSavePhoto)
	
	return (
		<>
			<Box>
				
				{/* Preview */}
				{
					imageSrc && (
						<Box sx={{ mb: '10px' }}>
							<PreviewImage width={150}>
								{
									isLoadingPreview && (
										<span><CircularProgress size={20} /></span>
									)
								}
								<Image 
									src={imageSrc} 
									alt={""}
									priority={true}
									fill
									onLoad={onLoadPreviewImage}
								/>
							</PreviewImage>
							{
								filePhoto && (
									<Button
										variant="contained"
										color="success"
										sx={{ mx: 'auto', display: 'table' }}
										onClick={onClickSavePhoto}
									>
										{isSavingPhoto ? GTEXTS.saving_dots : TEXTS.upload_photo}
									</Button>
								)
							}
						</Box>
					)
				}
				<FormMessages
					message={message}
					error={error}
				/>
				<BoxButtons>
					<Button
						component="label"
						variant="outlined"
						startIcon={<CloudUploadIcon />}
						
					>
						{TEXTS.select_file_image}
						<VisuallyHiddenInput
							type="file"
							accept={"image/*"}
							onChange={onChangeInput}
							multiple
						/>
					</Button>
					<SpaceBtn />
						<Button
							variant="outlined"
							startIcon={<LocalSeeIcon />}	
							onClick={toggleIsOpenModalTakePhoto}
						>
							{TEXTS.take_photo_open}
						</Button>
				</BoxButtons>
			</Box>
			
			<Dialog open={isOpenModalTakePhoto}>
				<DialogContent>
					<CapturePhoto
						videoRef={videoRef}
						canvasRef={canvasRef}
					/>
					<DialogActions>
						<Button 
							variant="outlined"
							color="primary"
							onClick={toggleIsOpenModalTakePhoto}
						>{GTEXTS.close}</Button>
						<Button
							variant="contained"
							type="submit"
							onClick={onClickCapturePhoto}
						>
							{TEXTS.take_photo}
						</Button>
					</DialogActions>
				</DialogContent>
			</Dialog>
		</>
	)
}