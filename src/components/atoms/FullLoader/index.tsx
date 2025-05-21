//Interfaces and types
import { FullLoaderProps } from "@/interfaces/Atoms";

//Styles
import styles from "./FullLoader.module.scss";

export default function FullLoader({ variant = 'full', size = 'normal' }: FullLoaderProps) {
	return (
		<>
			<div className={`${styles.fullLoader} ${styles[variant]}`}>
				<div className={`${styles.backBlocker} bg-white`}></div>
				<div className={`${styles.loader} ${styles[size]}`}></div>
			</div>
		</>
	)
}