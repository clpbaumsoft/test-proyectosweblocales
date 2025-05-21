import { styled } from "@mui/material";


export const BoxSearchPerson = styled('div')(({ theme }) => ({
	display: 'block',
	[theme.breakpoints.up('md')]: {
		display: 'flex',
	},
}))

export const SpaceFields = styled('div')(({ }) => ({
	height: '20px',
	width: '10px',
}))

export const BoxButtons = styled('div')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
  [theme.breakpoints.up('md')]: {
		flexDirection: 'row',
		justifyContent: 'center',
		whiteSpace: 'nowrap',
  },
}))

export const BoxButtonsForm = styled('div')(({ theme }) => ({
	display: 'block',
	marginTop: '10px',
	[theme.breakpoints.up('sm')]: {
		marginTop: '5px',
    display: 'flex',
		justifyContent: 'flex-end',
  },
}))

export const SpaceBtn = styled('div')(({ }) => ({
	height: '10px',
	width: '10px',
}))

export const VisuallyHiddenInput = styled('input')({
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	height: 1,
	overflow: 'hidden',
	position: 'absolute',
	bottom: 0,
	left: 0,
	whiteSpace: 'nowrap',
	width: 1,
});

export const BoxCardWrap = styled('div')(({ theme }) => ({
	display: 'block',
	[theme.breakpoints.up('md')]: {
		display: 'flex',
		justifyContent: 'space-between',
  },
}))

export const BoxCard = styled('div')(({ theme }) => ({
	display: 'block',
	[theme.breakpoints.up('md')]: {
		display: 'flex',
  },
}))

export const HeadingForm = styled('h3')(({ theme }) => ({
	fontFamily: theme.typography.fontFamily,
	margin: '0 0 10px 0',
}))

export const TitlePage = styled('h1')(({ theme }) => ({
	fontFamily: theme.typography.fontFamily,
	fontSize: '1.3rem',
	margin: '0 0 25px 0',
}))