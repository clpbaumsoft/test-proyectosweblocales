import { GSTATUSES } from "./Globals"

export const VISIT_STATUS_CANCELLED = '5';
export const VISIT_STATUS_ACTIVE 		= '1';
export const VISIT_STATUS_APPROVED  = '2';
export const VISIT_STATUS_REJECTED  = '3';
export const VISIT_STATUS_PENDING   = '4';

export const VISIT_DOCUMENT_STATUS_APPROVED 	= '2'
export const VISIT_DOCUMENT_STATUS_REJECTED 	= '3'
export const VISIT_DOCUMENT_STATUS_PENDING 		= '4'

export const VISITOR_STATUS_ACTIVE 	 = '1';
export const VISITOR_STATUS_APPROVED  = '2';
export const VISITOR_STATUS_REJECTED  = '3';
export const VISITOR_STATUS_PENDING   = '4';
export const VISITOR_STATUS_CANCELLED = '5';

export const VISIT_STATUS_NAMES: Record<string, string> = Object.freeze({
	'1': GSTATUSES.visit_status_active,
	'2': GSTATUSES.visit_status_approved,
	'3': GSTATUSES.visit_status_rejected,
	'4': GSTATUSES.visit_status_pending,
	'5': GSTATUSES.visit_status_cancelled,
})

export const VISIT_DOCUMENT_STATUS_NAMES: Record<string, string> = Object.freeze({
	'2': GSTATUSES.visit_document_status_approved,
	'3': GSTATUSES.visit_document_status_rejected,
	'4': GSTATUSES.visit_document_status_pending,
})

export const VISITOR_STATUS_NAMES: Record<string, string> = Object.freeze({
	'2': GSTATUSES.visitor_status_approved,
	'3': GSTATUSES.visitor_status_rejected,
	'4': GSTATUSES.visitor_status_pending,
})