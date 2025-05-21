import { Avatar, Box, FormHelperText, Typography } from "@mui/material";

//Interfaces and types
import { CardVisitorProps } from "@/interfaces/Atoms";

//Lib
import { mediaUrl } from "@/lib/Helpers";

//Styles
import { BoxCard, BoxCardWrap, SpaceFields } from "@/styles/elements";

export default function CardVisitor({ children, visitor }: CardVisitorProps) {

	if(!visitor) {
		return <></>
	}

	return (
		<>
			<Box 
				sx={{
					p: '20px',
					position: 'relative',
					border: '1px solid var(--mui-palette-primary-main)',
					borderRadius: 'var(--mui-shape-borderRadius)',
				}}
			>
				<BoxCardWrap>
					<BoxCard>
						<Avatar 
							alt={visitor.fullname}
							src={mediaUrl(visitor.id, 'foto-visitante')}
							sx={{ width: 70, height: 70 }}
						/>
						<SpaceFields />
						<Box>
							<Box>
								<Typography variant="body1">{visitor.fullname}</Typography>
								<FormHelperText>{visitor.phone}</FormHelperText>
							</Box>
						</Box>
						<SpaceFields />
					</BoxCard>
					<Box>
						<Box>
							{children}
						</Box>
					</Box>
				</BoxCardWrap>
			</Box>
		</>
	)
}