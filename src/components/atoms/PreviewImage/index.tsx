//React and modules
import { Box } from "@mui/material";

//Interfaces and types
import { PreviewImageProps } from "@/interfaces/Atoms";

//Styles
import styles from "./PreviewImage.module.scss";

export default function PreviewImage({ children, width }: PreviewImageProps) {
	return (
		<>
			<Box className={styles.previewImage} sx={{ width: width, height: width, border: 1, borderRadius: "10px" }}>
				{children}
			</Box>
		</>
	)
}