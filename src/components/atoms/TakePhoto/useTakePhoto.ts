import { ChangeEvent, useEffect, useRef, useState } from "react";

//Constants
import { GTRANS } from "@/constants/Globals";

//Errors
import AuthError from "@/errors/AuthError";
import LocalError from "@/errors/LocalError";
import ValidationError from "@/errors/ValidationError";

//Hooks
import useFormMessages from "@/hooks/useFormMessages";
import useToggleBoolean from "@/hooks/useToggleBoolean";
import useSessionProviderHook from "@/providers/SessionProvider/hooks";
import useTranslation from "@/hooks/useTranslation";

//Lib
import { dataURLtoFile, now } from "@/lib/Helpers";

//Texts
const TRANS = {
	success_upload_photo: {
		id: "TakePhote.SuccessMessage.PhotoHasBeenSaved",
		defaultMessage: "Foto guardada exitosamente!",
		description: "",
	}
}

export default function useTakePhoto(preview?: string | null, onSavePhoto?: (theFile: File) => Promise<void>) {
	
	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)
	
	const {
		openModalLoginForm,
	} = useSessionProviderHook()
	
	const [okMessage, errorMessage, changeOkMessage, changeErrorMessage, hideMessages] = useFormMessages()
		
	const [isLoadingPreview, setIsLoadingPreview] = useState(false)
	const [isSavingPhoto, setIsSavingPhoto] = useState(false)
	const [imageSrc, setImageSrc] = useState(preview)
	const [filePhoto, setFilePhoto] = useState<File | null>(null)
	const [isOpenModalTakePhoto, toggleIsOpenModalTakePhoto] = useToggleBoolean(false)
	
	const videoRef = useRef<HTMLVideoElement>(null)
	const canvasRef = useRef<HTMLCanvasElement>(null)
	
	/**
	 * Hides the loader when the image loads.
	 */
	const onLoadPreviewImage = () => {
		setIsLoadingPreview(false)
	}
	
	/**
	 * Function to handle the onChange event.
	 */
	const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
		if(event.target.files && event.target.files.length > 0) {
			const aFile = event.target.files[0]
			if(aFile) {
				if(aFile.type.startsWith('image/')) {
					if (imageSrc) {
						URL.revokeObjectURL(imageSrc)
					}
					const newImageUrl = URL.createObjectURL(aFile)
					setImageSrc(newImageUrl)
					setFilePhoto(aFile)
				}
			}
		}
	}
	
	
	/**
	 * Triggers the event to take the photo and saves the data in a File object.
	 */
	const onClickCapturePhoto = () => {
		
		const video = videoRef.current
    const canvas = canvasRef.current

    if (canvas && video) {
      const context = canvas.getContext('2d')
			if(context) {
				canvas.width = video.videoWidth
				canvas.height = video.videoHeight
				context.drawImage(video, 0, 0, canvas.width, canvas.height)
				const imageData = canvas.toDataURL('image/png')
				setImageSrc(imageData)
				setFilePhoto(dataURLtoFile(imageData, 'visitor_'+now().format('YYYY_MM_DD_HHmmss')))
				toggleIsOpenModalTakePhoto()
			}
    }
	}
	
	/**
	 * Call the function onSavePhoto and pass the photo taken.
	 */
	const onClickSavePhoto = async () => {
		if(isSavingPhoto) {
			return
		}
		if(filePhoto && onSavePhoto) {
			try {
				setIsSavingPhoto(true)
				hideMessages()
				await onSavePhoto(filePhoto)
				changeOkMessage(TEXTS.success_upload_photo)
				setFilePhoto(null)
				setIsSavingPhoto(false)
				// Ocultar mensaje de éxito después de 2 segundos
				setTimeout(() => {
					hideMessages()
				}, 2000)
			} catch(catchError) {
				setIsSavingPhoto(false)
				if(catchError instanceof AuthError) {
					return openModalLoginForm()
				}
				if(catchError instanceof LocalError || catchError instanceof ValidationError) {
					return changeErrorMessage(catchError.message)
				}
				changeErrorMessage(GTEXTS.error_something_went_wrong)
			}
		}
	}
	
	useEffect(() => {
		setIsLoadingPreview(true)
		setFilePhoto(null)
		if(preview) {
			setImageSrc(preview)
		} else {
			setImageSrc(null)
		}
	}, [preview])
	
	
	return {
		videoRef,
		canvasRef,
		imageSrc,
		filePhoto,
		isLoadingPreview,
		isOpenModalTakePhoto,
		isSavingPhoto,
		message: okMessage,
		error: errorMessage,
		onLoadPreviewImage,
		onChangeInput,
		toggleIsOpenModalTakePhoto,
		onClickCapturePhoto,
		onClickSavePhoto,
	}
}