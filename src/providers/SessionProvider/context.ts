//React and modules
import { createContext } from "react";

//Errors
import LocalError from "@/errors/LocalError";

//Interfaces and types
import User from "@/models/User";
import { UserType } from "@/interfaces/Models";


type SessionProviderContextType = {
	isGlobalLoading: boolean;
	setIsGlobalLoading: (val: boolean) => void | (() => void);
	user: User | null;
	setUser: (user: UserType | null) => void | (() => void);
	loadUser: () => Promise<void>;
	isLoadingUser: boolean;
	isLoggedIn: boolean;
	setIsLoggedIn: (val: boolean) => void | (() => void);
	accessToken: string | null;
	setAccessToken: (token: string | null) => void | (() => void);
	isOpenModalLoginForm: boolean;
	openModalLoginForm: () => void;
	closeModalLoginForm: () => void;
	localErrorMessage: string;
	showLocalError: (error: LocalError) => void;
	closeLocalError: () => void;
	getLoggedUser: () => User;
}

const SessionProviderContext = createContext<SessionProviderContextType | null>(null)
export default SessionProviderContext