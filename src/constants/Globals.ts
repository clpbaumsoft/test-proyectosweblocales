export const ROWS_PER_PAGE = 10

export const IDENTIFICATION_TYPE_CODE_CC = 'CC'
export const IDENTIFICATION_TYPE_CODE_TI = 'TI'
export const IDENTIFICATION_TYPE_CODE_CE = 'CE'
export const IDENTIFICATION_TYPE_CODE_NI = 'NI'
export const IDENTIFICATION_TYPE_CODE_OE = 'OE'
export const IDENTIFICATION_TYPE_CODE_PA = 'PA'
export const IDENTIFICATION_TYPE_CODE_PT = 'PT'

export const EMPLOYEE_TYPE_EXTERNAL = 'E'
export const EMPLOYEE_TYPE_INTERNAL = 'I'

export const GTRANS = {
	error_something_went_wrong: {
		id: "Globals.ErrorSomethingWentWrong",
		defaultMessage: "Algo salió mal.",
		description: "",
	},
	no_results: {
		id: "Globals.NoResults",
		defaultMessage: "No hay resultados.",
		description: "",
	},
	your_session_has_finished: {
		id: "Globals.YourSessionHasFinished",
		defaultMessage: "Tu sesión ha terminado. Ingresa nuevamente.",
		description: "",
	},
	link_has_expired: {
		id: "Globals.LinkHasExpired",
		defaultMessage: "El enlace para restablecer tu contraseña ha expirado.",
		description: "",
	},
	error_login_failed: {
		id: "Globals.ErrorLoginFailed",
		defaultMessage: "Falló el inicio de sesión.",
		description: "",
	},
	error_bad_credentials: {
		id: "Globals.ErrorBadCredentials",
		defaultMessage: "Usuario o contraseña incorrectos.",
		description: "",
	},
	loading: {
		id: "Globals.Loading",
		defaultMessage: "Cargando",
		description: "",
	},
	loading_dots: {
		id: "GlobalsDots.LoadingDots",
		defaultMessage: "Cargando...",
		description: "",
	},
	saving_dots: {
		id: "Globals.SavingDots",
		defaultMessage: "Guardando...",
		description: "",
	},
	required: {
		id: "Globals.Required",
		defaultMessage: "Requerido.",
		description: "",
	},
	no_required: {
		id: "Globals.noRequired",
		defaultMessage: "No es requerido.",
		description: "",
	},
	select_option: {
		id: "Globals.SelectAnOption",
		defaultMessage: "- Selecciona una opción -",
		description: "",
	},
	cancel: {
		id: "Globals.Cancel",
		defaultMessage: "Cancelar",
		description: "",
	},
	page_not_found: {
		id: "Globals.PageNotFound",
		defaultMessage: "Página no encontrada.",
		description: "",
	},
	error: {
		id: "Globals.Error",
		defaultMessage: "Error",
		description: "",
	},
	close: {
		id: "Globals.Close",
		defaultMessage: "Cerrar",
		description: "",
	},
	unknown_document: {
		id: "Globals.UnknownDocument",
		defaultMessage: "Documento desconocido",
		description: "",
	},
	check_it_out: {
		id: "Globals.See",
		defaultMessage: "Ver",
		description: "",
	},
	access_denied: {
		id: "Globals.AccessDenied",
		defaultMessage: "Acceso denegado.",
		description: "",
	},
	save: {
		id: "Globals.Save",
		defaultMessage: "Guardar",
		description: "",
	},
	delete: {
		id: "Globals.Delete",
		defaultMessage: "Borrar",
		description: "",
	},
	send: {
		id: "Globals.Send",
		defaultMessage: "Enviar",
		description: "",
	},
	copied: {
		id: "Globals.Copied",
		defaultMessage: "Copiado!",
		description: "",
	},
	yes: {
		id: "Globals.Yes",
		defaultMessage: "Si",
		description: "",
	},
	no: {
		id: "Globals.No",
		defaultMessage: "No",
		description: "",
	},
	session_expired_message: {
		id: "Globals.SessionExpiredMessage",
		defaultMessage: "Tu sesión ha expirado.",
		description: "",
	},
	message_confirm_noback_action: {
		id: "Globals.MessageConfirmNoBackAction",
		defaultMessage: "Esta acción es irreversible. ¿Desea continuar?",
		description: "",
	},
	
	visit_status_active: {
		id: "Globals.VisitStatusActive",
		defaultMessage: "Activa",
		description: "",
	},
	visit_status_cancelled: {
		id: "Globals.VisitStatusCancelled",
		defaultMessage: "Cancelada",
		description: "",
	},
	visit_status_pending: {
		id: "Globals.VisitStatusPending",
		defaultMessage: "Pendiente",
		description: "",
	},
	visit_status_approved: {
		id: "Globals.VisitStatusApproved",
		defaultMessage: "Aprobada",
		description: "",
	},
	visit_status_rejected: {
		id: "Globals.VisitStatusRejected",
		defaultMessage: "Rechazado",
		description: "",
	},
	
	visit_document_status_approved: {
		id: "Globals.VisitDocumentStatusApproved",
		defaultMessage: "Aprobado",
		description: "",
	},
	visit_document_status_rejected: {
		id: "Globals.VisitDocumentStatusRejected",
		defaultMessage: "Rechazado",
		description: "",
	},
	visit_document_status_pending: {
		id: "Globals.VisitDocumentStatusPending",
		defaultMessage: "Pendiente",
		description: "",
	},

	visitor_status_approved: {
		id: "Globals.VisitorStatusApproved",
		defaultMessage: "Aprobado",
		description: "",
	},
	visitor_status_rejected: {
		id: "Globals.VisitorStatusRejected",
		defaultMessage: "Rechazado",
		description: "",
	},
	visitor_status_pending: {
		id: "Globals.VisitorStatusPending",
		defaultMessage: "Pendiente",
		description: "",
	},
	rows_per_page: {
		id: "Globals.RowsPerPage",
		defaultMessage: "Filas por página",
		description: "",
	}
}


export const GERRORS = {
	error_something_went_wrong: "Algo salió mal.",
	no_results: "No hay resultados.",
	your_session_has_finished: "Tu sesión ha terminado. Ingresa nuevamente.",
	link_has_expired: "El enlace para restablecer tu contraseña ha expirado.",
	session_has_not_started: "Debes iniciar sesión.",
	page_not_found: "Página no encontrada.",
	check_it_out: "Ver",
	access_denied: "Acceso denegado.",
	session_expired_message: "Tu sesión ha expirado.",
}

export const GSTATUSES = {
	visit_status_active: "Activa",
	visit_status_cancelled: "Cancelada",
	visit_status_pending: "Pendiente",
	visit_status_approved: "Aprobada",
	visit_status_rejected: "Rechazado",
	
	visit_document_status_approved: "Aprobado",
	visit_document_status_rejected: "Rechazado",
	visit_document_status_pending: "Pendiente",

	visitor_status_approved: "Aprobado",
	visitor_status_rejected: "Rechazado",
	visitor_status_pending: "Pendiente",
}

export const BASE_URL_BACKEND = process.env.NEXT_PUBLIC_BASE_URL_BACKEND
export const BASE_URL_API = `${BASE_URL_BACKEND}/api`