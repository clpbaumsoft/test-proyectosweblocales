import { Box } from "@mui/material";

//Interfaces and types
import { TabPanelProps } from "@/interfaces/Atoms";

export default function TabPanel({ index, activeIndex, children }: TabPanelProps) {
	
	if(activeIndex !== index) {
		return <></>
	}
	
	return (
		<>
			<Box>{children}</Box>
		</>
	)
}