//React and modules
import { Box } from "@mui/material";

//Interfaces and types
import { PreviewImageProps } from "@/interfaces/Atoms";

//Styles
import styles from "./PreviewImage.module.scss";

export default function PreviewImage({ children, width }: PreviewImageProps) {
	return (
		<>
			<Box 
				className={styles.previewImage} 
				sx={{ width: width, height: width, borderRadius: "10px", position: "relative", overflow: "visible" }}>
				{children}
			</Box>
		</>
	)
}