import type { MouseEvent } from "react";
import { BaseComponentProps, ItemSelector, PageAuthProps } from "./General";
import { VisitFormType } from "./Forms";
import { Visit, Visitor } from "./Models";
import type { SelectProps, SkeletonProps } from "@mui/material";

export type RegisterVisitFormProps = BaseComponentProps & {
	visitId?: number;
	open: boolean;
	preFillFormData?: VisitFormType;
	onClose: () => void;
	onSaved?: (data: VisitFormType) => Promise<void>;
}

export type DuplicateVisitFormProps = BaseComponentProps & {
	visitId?: number;
	open?: boolean | null;
	preFillFormData?: VisitFormType;
	onClose: () => void;
	onSaved?: (data: VisitFormType) => Promise<void>;
}

export type ModalRestrictedUserProps = BaseComponentProps & {
	visitId?: number;
	visitor: Visitor;
	open?: boolean | null;
	preFillFormDataRestrictedUser?: {
		banned_end_time?: string | null;
		banned_start_time?: string | null;
		is_banned?: boolean | null;
	};
	onClose: () => void;
	onSaved?: (data: VisitFormType) => Promise<void>;
}

export type VisitorFormType = {
	id_visitor_type: number | string;
	identity_number: string;
	id_identity_type: number | string;
	first_name: string;
	middle_name: string;
	first_last_name: string;
	second_last_name: string;
	phone: string;
	address: string;
	emergency_contact_name: string;
	emergency_contact_phone: string;
	photo: null | File | string;
	city: string | number;
	social_security: string | number;
	arl: string | number;
}

export type createVisitorWithBasicData = {
	id_identification_type: number | string;
	identification_number: number | string;
	first_name: string;
	middle_name: string;
	first_last_name: string;
	second_last_name: string;
}

export type CreateVisitorFormProps = BaseComponentProps & {
	visitId: number;
	onCancel: () => void;
	onIncreaseVisitorsCounter: () => void;
	cutomTitleForm?: string;
	optionalFields?: boolean;
	isNewVisitorBasicForm?: boolean;
}

export type RestorePasswordFormType = {
	dni_type: string;
	dni: string;
	email: string;
}

export type RestorePasswordFormProps = BaseComponentProps & {
	onCancel: (e: MouseEvent<HTMLButtonElement>) => void,
}

export type FullScreenMessageProps = BaseComponentProps & {
	message: string;
}

export type ResetPasswordFormProps = BaseComponentProps & {
	accessToken: string;
}

export type PageResetPasswordProps = BaseComponentProps & ResetPasswordFormProps & {
	isValidToken: boolean;
}

export type VisitDashboardProps = BaseComponentProps & {
	visit: Visit;
}

export type PageVisitProps = PageAuthProps & VisitDashboardProps

export type DropdownLoadedItemsProps = BaseComponentProps & {
	fetchItems: () => Promise<ItemSelector[]>;
	onChangeValue: (value: ItemSelector | null) => void;
	defaultValue?: string | number | null;
	selectProps?: SelectProps;
	skeletonProps?: SkeletonProps;
	cachedKey?: string;
}