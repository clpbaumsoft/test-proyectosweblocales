import type { Control, FieldErrors } from "react-hook-form";
import { VisitRow } from "./Atoms";
import { SearchPersonFormType, VisitFormType } from "./Forms";
import { BaseComponentProps, Person } from "./General";
import { Branch, Company, DocumentType, Employee, EntryVehicle, Gate, Visit, VisitDocument, VisitVisitor, Visitor } from "./Models";

export type RenderErrorProps = BaseComponentProps & {
	error: object | string | string[] | null | Error;
}

export type VisitRowProps = BaseComponentProps & {
	row: VisitRow;
}

export type VisitRowActionsProps = BaseComponentProps & {
	rowData: VisitRow;
	setRowData: (key: keyof VisitRow, newValue: unknown) => void;
}

export type CancelVisitFormProps = BaseComponentProps & {
	visitId: number;
	onCancel: () => void;
	setRowData: (key: keyof VisitRow, newValue: unknown) => void;
}

export type CancelVisitFormType = {
	reason_cancel: string;
}

export type PaginateType = {
	current_page: number;
	next_page_url: string | null;
	prev_page_url: string | null;
	path: string | null;
	per_page: number;
	to: number;
	total: number;
}

export type PaginateVisits = PaginateType & {
	data: Visit[];
}

export type PaginateVisitors = PaginateType & {
	data: VisitVisitor[];
}

export type VisitorRowProps = BaseComponentProps & {
	row: VisitVisitor;
	documentTypes: DocumentType[];
}

export type VisitorRowActionsProps = BaseComponentProps & {
	visitVisitor: VisitVisitor;
	documentTypes: DocumentType[];	
}

export type ListVisitVisitorDocsProps = BaseComponentProps & {
	visitVisitor: VisitVisitor;
	documentTypes: DocumentType[];
	onChangeStatusVisitor?: (newStatus: string) => void;
}

export type ItemListVisitVisitorDocProps = BaseComponentProps & {
	prefix: string;
	itemVisitDoc: VisitDocument;
	documentTypes: DocumentType[];
	onChangeItemDoc?: (newDoc: VisitDocument) => void;
}

export type RegisterTalkVisitorProps = BaseComponentProps & {
	visitor: Visitor;
}

export type VisitRowEntryProps = BaseComponentProps & {
	visitor: Visitor;
	visit: Visit;
}

export type RowActionsEntryProps = BaseComponentProps & {
	visitor: Visitor;
	visit: Visit;
}

export type CardActiveEntryProps = BaseComponentProps & {
	visitor: Visitor;
}

export type CardActiveEntryToOtherBranchProps = BaseComponentProps & {
	visitor: Visitor;
}

export type CreateEntryFormProps = BaseComponentProps & {
	visitor: Visitor;
	visit: Visit;
	onClose?: () => void;
}

export type FormRestictedUserProps = BaseComponentProps & {
	visitor: Visitor;
	onClose?: () => void;
}

export type SearchPersonFormProps = BaseComponentProps & {
	onSearch: (dataSearch: SearchPersonFormType) => Promise<Person>;
	onResult: (person: Person) => void;
	onFail?: (error: unknown) => void;
}

export type GiveEntryVehicleFormProps = BaseComponentProps & {
	visitor: Visitor;
	visit: Visit;
	onClose?: () => void;
	onSuccessEntryVehicle?: (entryVehicle: EntryVehicle) => void
}

export type GiveEntryToOtherBranchProps = BaseComponentProps & {
	visitor: Visitor;
	visit: Visit;
	onClose?: () => void;
}

export type CardActiveEntryVehicleProps = BaseComponentProps & {
	visitor: Visitor;
}

export type GiveLeaveVehicleFormProps = BaseComponentProps & {
	visitor: Visitor;
	onCancel: () => void;
}

export type CardEmployeeProps = BaseComponentProps & {
	employee: Employee;
	hideEntry?: boolean;
}

export type FormEntryEmployeeProps = BaseComponentProps & {
	type?: string;
	hideEntry?: boolean;
}

export type DropdownsCompanyProps = BaseComponentProps & {
	isLoadingCompanies: boolean;
	errors: FieldErrors<VisitFormType>;
	control: Control<VisitFormType>;
	companies: Company[];
	company_selected: string | number;
	branch_selected: string | number;
	renderValueDropdown: (selected: unknown, description: string) => string;
	getCompany: () => Company | { short_description: string };
	getBranches: () => Branch[];
	getBranch: () => Branch | { short_description: string };
	getGates: () => Gate[];
	getGate: () => Gate | { description: string };
}