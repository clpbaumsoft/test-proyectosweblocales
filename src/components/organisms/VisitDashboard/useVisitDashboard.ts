import { useCallback, useEffect, useState } from "react";
import type { ChangeEvent, MouseEvent } from "react";
import { ROWS_PER_PAGE } from "@/constants/Globals";
import AuthError from "@/errors/AuthError";
import LocalError from "@/errors/LocalError";
import ValidationError from "@/errors/ValidationError";
import useDebounce from "@/hooks/useDebounce";
import useSessionProviderHook from "@/providers/SessionProvider/hooks";
import { DocumentType, Visit, VisitVisitor } from "@/interfaces/Models";
import Orchestra from "@/services/Orchestra";

export default function useVisitDashboard(visit: Visit) {
	const {
		isLoggedIn,
		openModalLoginForm,
		showLocalError,
	} = useSessionProviderHook()

	const [visitorsRows, setVisitorsRows] = useState<VisitVisitor[]>([])
	const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([])
	const [isInnerLoading, setIsInnerLoading] = useState(false)
	const [isInnerLoadingFirstTime, setIsInnerLoadingFirstTime] = useState(true)
	const [page, setPage] = useState<number>(0)
	const [rowsPerPage, setRowsPerPage] = useState<number>(ROWS_PER_PAGE)
	const [total, setTotal] = useState<number>(0)
	const [debounce] = useDebounce()

	/**
	 * Loads the visits
	 */
	const loadVisitors = useCallback(async (currentPage: number, currentRowsPerPage: number) => {
		if(!isLoggedIn) return
	
		setIsInnerLoading(true)

		await debounce(async () => {
			try {
				const responsePaginateVisitors = await Orchestra.visitorService.getVisitors(visit, currentPage, currentRowsPerPage)
				const responseDocumentTypes = await Orchestra.documentTypeService.all()

				setTotal(responsePaginateVisitors.total)
				setVisitorsRows([...responsePaginateVisitors.data])
				setDocumentTypes([...responseDocumentTypes])
			} catch(catchError) {
				if(catchError instanceof AuthError) {
					openModalLoginForm()
				}
				if(catchError instanceof LocalError || catchError instanceof ValidationError) {
					showLocalError(catchError)
				}
				console.error(catchError)
			}
		})

		setIsInnerLoading(false)
	}, [isLoggedIn, visit, debounce, openModalLoginForm, showLocalError])

	/**
	 * Loads the visits
	 */
	const loadVisitorsFirstTime = useCallback(async (currentPage: number, currentRowsPerPage: number) => {
		if(!isLoggedIn) return

		await debounce(async () => {
			try {
				const responsePaginateVisitors = await Orchestra.visitorService.getVisitors(visit, currentPage, currentRowsPerPage)
				const responseDocumentTypes = await Orchestra.documentTypeService.all()

				setTotal(responsePaginateVisitors.total)
				setVisitorsRows([...responsePaginateVisitors.data])
				setDocumentTypes([...responseDocumentTypes])
			} catch(catchError) {
				if(catchError instanceof AuthError) {
					openModalLoginForm()
				}
				if(catchError instanceof LocalError || catchError instanceof ValidationError) {
					showLocalError(catchError)
				}

				console.error(catchError)
			}
		})
		
		setIsInnerLoadingFirstTime(false)
	}, [isLoggedIn, visit, debounce, openModalLoginForm, showLocalError])
	

	const handleChangePage = async (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
		setPage(newPage)
		await loadVisitors(newPage, rowsPerPage)
	}
	const handleChangeRowsPerPage = async (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const newRowsPerPage = parseInt(event.target.value)
		setRowsPerPage(newRowsPerPage)
		await loadVisitors(page, newRowsPerPage)
	}

	useEffect(() => {
		loadVisitorsFirstTime(0, ROWS_PER_PAGE)
	}, [loadVisitorsFirstTime])

	return {
		isInnerLoading,
		isInnerLoadingFirstTime,
		visitorsRows,
		page,
		rowsPerPage,
		total,
		documentTypes,
		handleChangePage,
		handleChangeRowsPerPage,
	}
}