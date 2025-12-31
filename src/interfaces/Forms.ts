import { ItemSelector } from "./General";
import { Employee } from "./Models";

export type LoginFormType = {
	dni_type: string;
	dni: string;
	password: string;
}

export type VisitFormType = {
	id_visit?: number;
	entry_date: string;
	departure_date: string;
	reason: string;
	id_interventor_employee?: ItemSelector | string | number;
	email_approver?: string;
	company_selected: string | number;
	branch_selected: string | number;
	gate_selected: string | number;
}

export type DuplicateVisitFormType = {
	id_visit?: number;
	entry_date: string;
	departure_date: string;
	onSaved?: (data: VisitFormType) => Promise<void>;
}

export type RestrictedUserFormType = {
	id_visitor?: number;
	is_banned?: boolean | null;
	ban_comment?: string | null;
	banned_start_time?: string | null;
	banned_end_time?: string | null;
	onSaved?: (data: RestrictedUserFormType) => Promise<void>;
}

export type VisitFormToOtherBranchType = {
	visitor_id: number | string;
	id_visit?: number | string;
	company_selected?: string | number;
	branch_selected?: string | number;
	gate_selected: string | number;
}

export type RejectVisitDocumentFormType = {
	reject_reason: string;
}

export type ChangeDocumentFormType = {
	description: string;
	document: File;
	document_type: number;
}

export type SearchPersonFormType = {
	document_type: number | string;
	document_or_name: string;
}

export type RegisterTalkVisitorFormType = {
	start_date: string;
	end_date: string;
}

export type CreateEntryFormType = {
	card_number: string;
	eps: number | string | null;
	arl: number | string | null;
	emergency_name: string;
	emergency_phone: string;
}

export type GiveEntryVehicleFormType = {
	number: string;
	vehicle_type: number | string;
	gate: number | string;
	vehicle_inspect_points: number[] | string[];
	entry_comments: string;
	allowed?: boolean;
}

export type GiveLeaveVehicleFormType = {
	vehicle_inspect_points: number[] | string[];
	gate: string | number;
	leave_comments: string;
	different_person_pickup?: boolean;
	identity_number?: string | number;
	id_identity_type?: string | number;
	allowed?: boolean;
}

export type GiveEntryVehicleFormEmployeeType = {
	number: string;
	vehicle_type: number | string;
	gate: number | string;
	vehicle_inspect_points: number[] | string[];
	entry_comments: string;
	allowed?: boolean;
}

export type GiveLeaveVehicleFormEmployeeType = {
	vehicle_inspect_points: number[] | string[];
	gate: string | number;
	leave_comments: string;
	different_person_pickup?: boolean;
	identity_number?: string | number;
	id_identity_type?: string | number;
	allowed?: boolean;
}

export type FormGiveEntryEmployeeProps = {
	employee: Employee;
	onCancel?: () => void;
}

export type FormGiveEntryExternalEmployeeType = {
	card_number: string;
	company: string | number;
	code: string | number;
	document: string | number;
	identity_type: string | number;
	fullname: string;
	email: string;
	receiver: string;
	comments: string;
}

export type FormGiveEntryEmployeeType = {
	card_number: string;
	company: string | number;
	comments: string;
}

export type SearchVehicleFormType = {
	plateNumber: string;
}


