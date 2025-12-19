//React and modules
import Image from "next/image";
import { Button, CircularProgress, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

//Components
import PreviewImage from "@/components/atoms/PreviewImage";

//Hooks
import useButtonFile from "./useButtonFile";
import useTranslation from "@/hooks/useTranslation";

//Interfaces and types
import { ButtonFileProps } from "@/interfaces/Atoms";

//Styles
import { VisuallyHiddenInput } from "@/styles/elements";
import { CloseOutlined } from "@mui/icons-material";

//Texts
const TRANS = {
	alt_photo: {
		id: "ButtonFile.Image.AltTextVisitorPhoto",
		defaultMessage: "Foto visitante.",
		description: "",
	}
}

export default function ButtonFile(props: ButtonFileProps) {
	const TEXTS = useTranslation(TRANS)
	const { onChange, defaultValueImage, children, accept = "image/*", buttonProps } = props
	
	const {
		inputRef,
		imageSrc,
		preview,
		isLoadingPreview,
		onChangeInput,
		clearImage,
		onLoadPreviewImage,
	} = useButtonFile(onChange, defaultValueImage)
	
	return (
		<>
			{imageSrc && (
				<PreviewImage width={100}>
					<CloseOutlined
						sx={{
							position: "absolute",
							top: "-10px",
							right: "-10px",
							cursor: "pointer",
							zIndex: 10
						}}
						onClick={clearImage}
					/>
					{isLoadingPreview && (
						<span><CircularProgress size={20} /></span>
					)}
					<Image
						src={imageSrc}
						alt={TEXTS.alt_photo}
						priority={true}
						fill
						onLoad={onLoadPreviewImage}
					/>
				</PreviewImage>
			)}
			{
				(preview && !imageSrc) && (
					<Typography noWrap sx={{ p: "5px" }}>{preview}</Typography>
				)
			}
			<Button
				component="label"
				variant="outlined"
				startIcon={<CloudUploadIcon />}
				{...buttonProps}
			>
				{children}
				<VisuallyHiddenInput
					ref={inputRef}
					type="file"
					accept={accept}
					onChange={onChangeInput}
					multiple
				/>
			</Button>
		</>
	)
}