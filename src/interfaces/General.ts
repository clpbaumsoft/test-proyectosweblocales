import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { Moment } from "moment";
import { Employee, UserType, Visitor } from "./Models";

export type BaseComponentProps = {
	key?: string | number;
	className?: string;
	children?: ReactNode;
}

export type PageAuthProps = BaseComponentProps & {
	userLogged?: UserType;
}

export type MaterialDateTimePickerType = {
	open: () => void;
	set: (val: Moment) => void;
}

export type ErrorResponseDataType = {
	error?: string;
	message?: string;
}

export type BasePageComponentProps = {
	searchParams: Promise<Record<string, string | string[] | undefined>>;
	params: Promise<Record<string, string | string[] | undefined>>;
}

export type FormMessageHookType = [
	string | null, 
	string | null, 
	Dispatch<SetStateAction<string | null>>, 
	Dispatch<SetStateAction<string | null>>, 
	(delay?: number, callback?: () => void) => void
]

export type RecordStateHookType<T> = [
	T,
	(key: T extends object ? keyof T : null, newValue: unknown) => void,
	(key: T extends object ? keyof T : null) => void,
	Dispatch<SetStateAction<T>>, 
]

export type ArrayActionsType<T> = {
	add: (newValue: T) => T[];
	remove: (idx: number) => T[];
	set: (idx: number | string, newValue: T) => T[];
	change: (values: T[]) => void;
	exists: <T, K extends keyof T>(state: T[], value: T, attribute: K | null) => boolean;
	find: <T, K extends keyof T>(state: T[], value: T, attribute: K | null) => number;
}

export type ArrayStateHookType<T> = [
	T[],
	ArrayActionsType<T>,
]

export type GlobalErrorProps = BaseComponentProps & {
	error: Error;
}

export type ItemSelector = {
	value: string | number;
	label: string;
}

export type SessionProviderProps = BaseComponentProps & {
	serverUser?: UserType;
}

export type ToggleBooleanType = [
	boolean,
	() => void,
	(newValue: boolean) => void,
]

export type LocalCacheHookType = [
	(key: string, def?: string, parsed?: boolean) => string | object,
	(key: string, value: string | object) => void,
	(key: string) => void,
]

export type Person = Visitor | Employee | null