import { Role, UserType } from "@/interfaces/Models";

export default class User implements UserType {
	
	public identification_number: string;
	public fullname: string;
	public first_name: string;
	public middle_name: string | null;
	public first_last_name: string;
	public second_last_name: string | null;
	public phone: string;
	public email: string;
	public role: Role;
	public unique_permissions: string[] = [];

	public creator_date: string;
	public id_creator_user: number;
	public modifier_date: string | null;
	public id_modifier_user: number | null;
	public soft_delete: string;
	public status: string;

	constructor(data: UserType) {
		this.identification_number = data.identification_number;
		this.fullname = data.fullname
		this.first_name = data.first_name
		this.middle_name = data.middle_name
		this.first_last_name = data.first_last_name
		this.second_last_name = data.second_last_name
		this.phone = data.phone
		this.email = data.email
		this.role = data.role
		this.creator_date = data.creator_date
		this.id_creator_user = data.id_creator_user
		this.modifier_date = data.modifier_date
		this.id_modifier_user = data.id_modifier_user
		this.soft_delete = data.soft_delete
		this.status = data.status
		this.unique_permissions = data.unique_permissions || [];
	}
	
	public getFirstLetters() {
		try {
			return this.first_name.toLocaleUpperCase().replace(/\s+/g, '').substring(0, 1)+''+this.first_last_name.toLocaleUpperCase().replace(/\s+/g, '').substring(0, 1)
		} catch {
			return ""
		}
	}

	public can(keysPermissions: string | string[]) {
		
		console.log("🐍🐍🐍🐍🐍🐍🐍🐍🐍 ~ User ~ can ~ keysPermissions:", keysPermissions)

		if(!Array.isArray(keysPermissions)) {
			keysPermissions = [keysPermissions]
		}
		return keysPermissions.every(permission => this?.unique_permissions?.includes(permission));
  }

	public canOr(keysPermissions: string | string[]) {
		if(!Array.isArray(keysPermissions)) {
			keysPermissions = [keysPermissions]
		}
		return keysPermissions.some(permission => this?.unique_permissions?.includes(permission));
  }
}