import { Box } from "@mui/material";
import { PreviewImageProps } from "@/interfaces/Atoms";
import styles from "./PreviewImage.module.scss";

export default function PreviewImage({ children, width }: PreviewImageProps) {
	return (
		<Box className={styles.previewImage} sx={{ width: width, height: width }}>
			{children}
		</Box>
	)
}