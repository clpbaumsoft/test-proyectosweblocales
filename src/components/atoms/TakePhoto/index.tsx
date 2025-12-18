import Image from "next/image";
import {
	Box,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LocalSeeIcon from "@mui/icons-material/LocalSee";
import CapturePhoto from "./components/CapturePhoto";
import FormMessages from "@/components/atoms/FormMessages";
import PreviewImage from "@/components/atoms/PreviewImage";
import { GTRANS } from "@/constants/Globals";
import { SpaceBtn, VisuallyHiddenInput } from "@/styles/elements";
import useTakePhoto from "./useTakePhoto";
import useTranslation from "@/hooks/useTranslation";
import { TakePhotoProps } from "@/interfaces/Atoms";
import { Button } from "@/components/atomsv2/Button";
import { useRef } from "react";

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

export default function TakePhoto({ preview, onSavePhoto, isButtonActive = true }: TakePhotoProps) {
	const inputFileRef = useRef<HTMLInputElement>(null)
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

	const openModalSelectPhoto = () => {
		if(inputFileRef.current) {
			inputFileRef.current.click()
		}
	}
	
	return (
		<>
			<Box>
				{imageSrc && (
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
								<Button onClick={onClickSavePhoto} color="dark">
									{isSavingPhoto ? GTEXTS.saving_dots : TEXTS.upload_photo}
								</Button>
							)
						}
					</Box>
				)}
				<FormMessages
					message={message}
					error={error}
				/>
				<div className="w-full flex justify-center">
					{isButtonActive &&
						<div className="flex flex-col w-6/12">
							<Button className="flex items-center" outline onClick={openModalSelectPhoto}>
								<CloudUploadIcon />
								{TEXTS.select_file_image}
								<VisuallyHiddenInput
									ref={inputFileRef}
									type="file"
									accept={"image/*"}
									onChange={onChangeInput}
									multiple
								/>
							</Button>
							<SpaceBtn />
								<Button
									className="flex items-center"
									onClick={toggleIsOpenModalTakePhoto}
								>
									<LocalSeeIcon />
									{TEXTS.take_photo_open}
								</Button>
						</div>}
				</div>
			</Box>
			
			<Dialog open={isOpenModalTakePhoto}>
				<DialogContent>
					<CapturePhoto
						videoRef={videoRef}
						canvasRef={canvasRef}
					/>
					<DialogActions>
						<Button 
							color="dark"
							onClick={toggleIsOpenModalTakePhoto}
						>{GTEXTS.close}</Button>
						<Button
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