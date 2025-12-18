import { PreviewImageProps } from "@/interfaces/Atoms";
import styles from "./PreviewImage.module.scss";

export default function PreviewImage({ children, width }: PreviewImageProps) {
	return (
		<div className={styles.previewImage} style={{ width: width, height: width }}>
			{children}
		</div>
	)
}