
//React and Modules
import { useState } from "react";
import type { MouseEvent } from "react";
import { useRouter } from "next/navigation";

//Constants
import PAGES from "@/constants/Pages";

//Hooks
import useSession from "@/hooks/useSession";
import useSessionProviderHook from "@/providers/SessionProvider/hooks";

export default function useMainSidebar() {

	const router = useRouter()
  const {
    isGlobalLoading,
    setIsGlobalLoading,
    getLoggedUser,
  } = useSessionProviderHook()
	const { logout } = useSession()
	
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement  | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

	const handleMenuClose = () => {
    setAnchorEl(null)
    setMenuOpen(false)
  }

	const handleCloseForm = () => {
    setShowForm(false)
  }

  const handleMenuClick = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget)
    setMenuOpen(true)
  }

  const handleLogout = async () => {
    if(isGlobalLoading) {
      return
    }
    setIsGlobalLoading(true)
    await logout()
    setIsGlobalLoading(false)
		router.push(PAGES.login)
  }

  const onClickOpenModalRegisterVisit = () => {
    setShowForm(true)
    setDrawerOpen(false)
    handleMenuClose()
  }

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open)
  }

	return {
    loggedUser: getLoggedUser(),
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
	}
}