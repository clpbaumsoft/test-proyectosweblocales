export type BaseModel = {
	id: number;
	creator_date: string;
	id_creator_user: number;
	creator?: UserType;
	modifier_date: string | null;
	id_modifier_user: number | null;
	soft_delete: string;
	status: string;
}

//-------- Pivots ----
export type VisitVisitorPivot = BaseModel & {
	id_visit: number;
	id_visitor: number;
	id_visitor_type: number;
	visitor_type?: VisitorType;
	visitor_type_description?: string;
}

//----------------------------

export type Gate = BaseModel & {
	description: string;
	for_vehicles_only: number;
	branch?: BranchByGate | null;
}

export interface BranchByGate {
  id: number
  short_description: string
  long_description: string
  id_company: number
  status: string
  soft_delete: boolean
  id_creator_user: number
  creator_date: string
  id_modifier_user: number
  modifier_date: string
  company: CompanyByGate
}

export interface CompanyByGate {
  id: number
  nit: string
  short_description: string
  long_description: string
  address: string
  email: string
  status: string
  soft_delete: boolean
  id_creator_user: number
  creator_date: string
  id_modifier_user: number
  modifier_date: string
}



export type Branch = BaseModel & {
	short_description: string;
	long_description: string;
	gates?: Gate[];
}

export type Company = BaseModel & {
	short_description: string;
	long_description: string;
	branches?: Branch[];
}

export type Visit = BaseModel & {
	start_date: string;
	end_date: string;
	reason: string;
	reason_cancel: string | null;
	id_cancelled_user: number | null;
	cancelled_at: string | null;
	company: Company;
	branch: Branch;
	gate: Gate;
	approver_docs?: UserType | null;
	canceller?: UserType | null;
	visitors_count?: number;
	pivot?: VisitVisitorPivot;
	interventor?: InterventorType;
}

export type InterventorType = {
  identification_number: string
  first_name: string | null
  middle_name: string | null
  first_last_name: string | null
  second_last_name: string | null
  phone: string | null
  email: string | null
  id_identification_type: number | null
  status: string | null
  soft_delete: boolean | null
  id_creator_user: number | null
  creator_date: string | null
  id_modifier_user: number | null
  modifier_date: string | null
  is_admin: number | null
  fullname: string | null
  unique_permissions: string[] | null
}


export type VisitorType = BaseModel & {
	short_description: string;
	long_description: string;
	requirements: string | null;
}

export type IdentificationType = BaseModel & {
	code: string;
	description: string;
}

export type VisitVisitor = BaseModel & {
	id_visit: number;
	id_visitor: number;
	id_visitor_type: number;
	visitor: Visitor;
	visitor_type: VisitorType;
	visit: Visit;
}

export type Visitor = BaseModel & {
	fullname: string;
	first_name: string;
	middle_name: string;
	first_last_name: string;
	second_last_name: string;
	address: string;
	phone: string;
	emergency_contact_name: string;
	emergency_contact_phone: string;
	startdate_sgsst: string;
	enddate_sgsst: string;
	id_carecompany: number | null;
	id_arlcompany: number | null;
	id_city: number | null;
	photo_url: string;
	identification_number: string;
	id_identification_type: number;
	identification_type: IdentificationType;
	visits?: Visit[];
	id_active_entry: number | null;
	id_active_entry_vehicle: number | null;
	active_entry?: Entry | null;
	active_entry_vehicle?: EntryVehicle | null;

	is_banned: boolean | null;
	is_currently_banned: boolean| null;
	ban_comment: string | null;
	banned_at: string | null; 
	banned_by?: {
		creator_date: string | null;
		email:  string | null;
		first_last_name: string | null;
		first_name: string | null;
		fullname: string | null;
		id_creator_user: number | null;
		id_identification_type: number | null;
		id_modifier_user: number | null;
		id_role: number | null;
		identification_number: string | null;
		is_admin: number | null;
		middle_name: string | null;
		modifier_date: string | null;
		phone: string | null;
		second_last_name: string | null;
		soft_delete: boolean | null;
		status: string | null;
	} | null;
	banned_by_user_id: number | null;
	banned_end_time: string | null;
	banned_start_time: string | null;

	requires_security_speak?: number | null;
}

export type DocumentType = BaseModel & {
	description: string;
}

export type VisitDocument = BaseModel & {
	description: string;
	document_url: string;
	file_location: string;
	approver_observations: string;
	id_visit: number;
	id_visitor: number;
	id_document_type: number;
	id_approver_user: number;
	document_type: DocumentType;
}

export type UserType = Omit<BaseModel, 'id'> & {
	identification_number: string;
	fullname: string;
	first_name: string;
	middle_name: string | null;
	first_last_name: string;
	second_last_name: string | null;
	phone: string;
	email: string;
	role: Role;
	unique_permissions: string[];
}

export type EmployeeType = Omit<BaseModel, 'id'> & {
	identification_number: string;
	name: string;
	id: number;
}


export type Permission = BaseModel & {
	name: string;
	uuid: string;
}

export type Role = BaseModel & {
	name: string;
	description: string | null;
	permissions?: Permission[];
	list_permissions?: string[];
}

export type Country = BaseModel & {
	name: string;
	id: number;
}

export type City = BaseModel & {
	name: string;
}

export type ArlCompany = BaseModel & {
	name: string;
}

export type CareCompany = BaseModel & {
	name: string;
}

export type Entry = BaseModel & {
	entry_gates?: EntryGates[] | null;
	card_number: string;
	left_at: string | null;
	emergency_contact_name: string;
	emergency_contact_phone: string;
	id_carecompany: number;
	id_arlcompany: number;
	id_gaveleave_user: number;
	id_visit_visitor: number;
	visit_visitor?: VisitVisitor;
}

export interface EntryGates {
    entry_id: number;
    gate_id: number;
    active: number;
    status: string;
    soft_delete: boolean;
    id_creator_user: number;
    creator_date: string;
    id_modifier_user: number | null;
    modifier_date: string;
    creator: Creator;
    modifier: {
        first_name: string;
        first_last_name: string;
        fullname: string;
	} | null;
    gate: EntryGateToOtherBranchs | null;
};

export interface EntryGateToOtherBranchs {
	branch?: {
		company: {
			short_description?: string;
			id: number;
		}
		id: number;
		short_description: string;
	} | null;
	description: string;
	id: number;
}

export interface Creator {
    first_name: string;
    first_last_name: string;
    fullname: string;
}


export type EntryVehicle = BaseModel & {
	number: string;
	left_at: string;
	comments_entry: string;
	comments_leave: string;
	id_vehicle_type: number;
	id_visit_visitor: number;
	id_gate: number;
	id_gaveleave_user: number;
	gate?: Gate;
	vehicle_type?: VehicleType;
	inspect_points?: VehicleInspectPoint[];
	visit_visitor?: VisitVisitor;
	allowed?: boolean | number | string | null;
}

export type VehicleType = BaseModel & {
	description: string;
}

export type VehicleInspectPoint = BaseModel & {
	description: string;
}

export type EntryEmployee = BaseModel & {
	employee_code: string | null;
	employee_document: string | null;
	employee_name: string;
	left_at: string | null;
	comments: string | null;
	id_employee_receiver: number | null;
	id_company: number;
	id_gaveleave_user: number | null;
	gaveleave_user?: UserType | null;
	receiver?: Employee | null;
	company?: Company | null;
}

export type Employee = BaseModel & {
	code: string | null;
	identification_number: string;
	name: string;
	id_identification_type: number;
	identification_type?: IdentificationType | null;
	active_entry_employee?: EntryEmployee | null;
}