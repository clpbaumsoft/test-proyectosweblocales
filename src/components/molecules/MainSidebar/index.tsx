"use client"

//React and Modules
import Link from "next/link";
import { toast } from "react-toastify";

import {
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  Box,
  Avatar,
  IconButton,
  Drawer,
	Typography,
	FormHelperText
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import EventIcon from "@mui/icons-material/Event";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import ModelTrainingIcon from "@mui/icons-material/ModelTraining";
import BadgeIcon from "@mui/icons-material/Badge";

//Components
import RegisterVisitForm from "@/components/molecules/RegisterVisitForm";

//Constants
import { GTRANS } from "@/constants/Globals";
import PAGES from "@/constants/Pages";

//Hooks
import useMainSidebar from "./useMainSidebar";
import useTranslation from "@/hooks/useTranslation";

//Interfaces and types
import { BaseComponentProps } from "@/interfaces/General";

//Styles
import { SpaceBtn } from "@/styles/elements";

//Texts
const TRANS = {
	logout: {
		id: "MainSidebar.MenuItem.Logout",
		defaultMessage: "Cerrar Sesión",
		description: "",
	},
	open_menu: {
		id: "MainSidebar.IconButton.Open",
		defaultMessage: "Abrir menú",
		description: "",
	},
	create_visit: {
		id: "MainSidebar.Button.CreateVisit",
		defaultMessage: "Programar Visita",
		description: "",
	},
	home_visits: {
		id: "MainSidebar.Button.HomeVisits",
		defaultMessage: "Inicio",
		description: "",
	},
	control_entry: {
		id: "MainSidebar.Button.ControlEntry",
		defaultMessage: "Control Ingreso",
		description: "",
	},
	control_employees: {
		id: "MainSidebar.Button.ControlEmployees",
		defaultMessage: "Control Empleados",
		description: "",
	},
	trainings: {
		id: "MainSidebar.Button.Trainings",
		defaultMessage: "Capacitaciones",
		description: "",
	},
	control_vehicles: {
		id: "MainSidebar.Button.ControlVehicles",
		defaultMessage: "Control Vehicular",
		description: "",
	},
}

export default function MainSidebar({ children }: BaseComponentProps) {
	
	const TEXTS = useTranslation(TRANS)
	const GTEXTS = useTranslation(GTRANS)

	const {
		loggedUser,
		anchorEl,
		menuOpen,
		showForm,
		drawerOpen,
		handleLogout,
		handleMenuClose,
		handleCloseForm,
		handleMenuClick,
		onClickOpenModalRegisterVisit,
		toggleDrawer,
	} = useMainSidebar()

	return (
		<>
			<AppBar position="static" sx={{ backgroundColor: 'transparent' }}>
				<Toolbar>
					<IconButton 
						onClick={toggleDrawer(true)} 
						sx={{ color: 'black' }}
						aria-label={TEXTS.open_menu}
					>
						<MenuIcon />
					</IconButton>
					<Box 
						sx={{
							display: 'flex',
							justifyContent: 'flex-end',
							alignItems: 'center',
							flexGrow: 1,
						}}
					>
						<Box>
							<Box
								sx={(theme) => ({
									display: 'block',
									[theme.breakpoints.up('md')]: {
										display: 'flex',
									},
								})}
							>
								<Typography 
									color="black" 
									fontWeight={700}
									sx={{
										display: 'block',
										whiteSpace: 'nowrap',
										overflow: 'hidden',
										textOverflow: 'ellipsis',
										maxWidth: '185px',
									}}
								>{loggedUser?.fullname}</Typography>
								<Typography
									color="black" 
									fontWeight={700}
									sx={(theme) => ({
										display: 'none',
										ml: '5px',
										[theme.breakpoints.up('md')]: {
											display: 'block',
										},
									})}
								>({loggedUser?.role?.name})</Typography>
							</Box>
							<FormHelperText 
								sx={(theme) => ({
									display: 'block',
									[theme.breakpoints.up('md')]: {
										display: 'none',
									},
								})}
							>{loggedUser?.role?.name}</FormHelperText>
							<FormHelperText 
								sx={(theme) => ({
									cursor: 'pointer',
									display: 'none',
									[theme.breakpoints.up('md')]: {
										display: 'block',
									},
								})}
								onClick={() => {
									navigator.clipboard.writeText(loggedUser.email)
									toast(GTEXTS.copied, { autoClose: 1000, pauseOnHover: false, hideProgressBar: true })
								}}
							>{loggedUser.email}</FormHelperText>
						</Box>
						<SpaceBtn />
						<Box>
							<Avatar
								onMouseEnter={handleMenuClick}
								sx={{ bgcolor: 'primary.main', cursor: 'pointer' }}
							>{loggedUser.getFirstLetters()}</Avatar>
							<Menu
								anchorEl={anchorEl}
								open={menuOpen}
								onClose={handleMenuClose}
								onMouseLeave={handleMenuClose}
							>
								<MenuItem onClick={handleLogout} sx={{ justifyContent: 'flex-start', color: 'black', fontFamily: 'inherit' }}>
									{TEXTS.logout}
								</MenuItem>
							</Menu>
						</Box>
					</Box>
				</Toolbar>
			</AppBar> 

			<RegisterVisitForm open={showForm} onClose={handleCloseForm} />
			<Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
				<Box sx={{ width: 240 }}>
					<Box
						sx={{ display: 'flex', justifyContent: 'center', alignSelf: 'center', paddingY: 2, }}
					>
						<Avatar
							component="div"
							sx={{ bgcolor: 'primary.main', width: '80px', height: '80px', }}
						/>
					</Box>
					<Link className="btn" href={PAGES.home} passHref>
						<Button 
							fullWidth 
							onClick={toggleDrawer(false)} 
							sx={{ justifyContent: 'flex-start', color: 'black', fontWeight: 'bold' }}
							startIcon={<HomeIcon />}
							>{TEXTS.home_visits}</Button>
					</Link>
					{
						loggedUser.can('create_visit') && (
							<Button 
								fullWidth 
								onClick={onClickOpenModalRegisterVisit} 
								sx={{ justifyContent: 'flex-start', color: 'black', fontWeight: 'bold' }}
								startIcon={<EventIcon />}
							>{TEXTS.create_visit}</Button>
						)
					}
					{
						loggedUser.can('create_entry') && (
							<Link className="btn" href={PAGES.dashboard_entry} passHref>
								<Button 
									fullWidth 
									sx={{ justifyContent: 'flex-start', color: 'black', fontWeight: 'bold' }}
									startIcon={<MeetingRoomIcon />}
								>{TEXTS.control_entry}</Button>
							</Link>
						)
					}
					{
						loggedUser.can('create_entry_employee') && (
							<Link className="btn" href={PAGES.dashboard_employees} passHref>
								<Button 
									fullWidth 
									sx={{ justifyContent: 'flex-start', color: 'black', fontWeight: 'bold' }}
									startIcon={<BadgeIcon />}
								>{TEXTS.control_employees}</Button>
							</Link>
						)
					}
					{
						loggedUser.can('train_visitor') && (
							<Link className="btn" href={PAGES.trainings} passHref>
								<Button 
									fullWidth 
									sx={{ justifyContent: 'flex-start', color: 'black', fontWeight: 'bold' }}
									startIcon={<ModelTrainingIcon />}
								>{TEXTS.trainings}</Button>
							</Link>
						)
					}
				</Box>
			</Drawer>
			<Box sx={{ padding: 5 }}>
				{ children ? children : <></> }
			</Box>
		</>
	)
}