const PAGES: Record<string, string> = Object.freeze({
	home: "/",
	login: "/acceso",
	sso: "/sso",
	visits_id: "/visitas/[id]",
	visitor_id_files: "/archivos/[id]/documento-visita",
	dashboard_entry: "/control-ingreso",
	dashboard_restricted_users: "/usuarios-restringidos",
	trainings: "/capacitaciones",
	dashboard_entry_vehicle: "/control-vehiculos",
	dashboard_employees: "/control-empleados",
	dashboard_generate_reports: "/reportes",
})
export default PAGES