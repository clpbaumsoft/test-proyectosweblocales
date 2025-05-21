import { useEffect, useState } from "react";
import type { RefObject } from "react";
import { toast } from "react-toastify";

//Hooks
import useTranslation from "@/hooks/useTranslation";

//Texts
const TRANS = {
	no_given_camera_permission: {
		id: "CapturePhoto.ErrorMessage.CameraPermissionDenied",
		defaultMessage: "Uso de la camara denegado.",
		description: "",
	}
}

export default function useCapturePhoto(videoRef: RefObject<HTMLVideoElement | null>) {
	
	const TEXTS = useTranslation(TRANS)
	
	const [isDeniedCamera, setIsDeniedCamera] = useState(false)
	
	/**
	 * Requests the camera permission.
	 */
	const onRequestCameraPermission = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
			if (videoRef.current) {
				videoRef.current.srcObject = stream
			}
			setIsDeniedCamera(false)
		} catch {
			setIsDeniedCamera(true)
			toast(TEXTS.no_given_camera_permission, { autoClose: 3000, pauseOnHover: false, hideProgressBar: true })
		}
	}
	
	useEffect(() => {
		const refCurrent = videoRef.current
    onRequestCameraPermission()
		
		return () => {
			if (refCurrent?.srcObject) {
				const stream = refCurrent.srcObject as MediaStream
				const tracks = stream.getTracks()
				tracks.forEach(track => track.stop())
				refCurrent.srcObject = null
			}
		}
		
	// eslint-disable-next-line react-hooks/exhaustive-deps	
	}, [videoRef])
	
	
	return {
		isDeniedCamera,
		onRequestCameraPermission,
	}
}