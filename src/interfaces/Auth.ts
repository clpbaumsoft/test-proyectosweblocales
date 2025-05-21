import { UserType } from "./Models";

export type UserCredentials = {
	dni: string;
	dni_type: string;
	password: string;
}

export type SessionData = {
	access_token: string | null;
	token_type: string | null;
	is_logged_in: boolean;
	user: UserType | null;
	expires_in: number;
}

export type ResetPasswordFormType = {
	new_password: string;
	confirm_new_password: string;
}