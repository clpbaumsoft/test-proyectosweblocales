
//React and Modules
import { useState, useEffect, useCallback } from "react";
import type { MouseEvent, ChangeEvent } from "react";
import type { SelectChangeEvent } from "@mui/material";


//Constants
import { ROWS_PER_PAGE } from "@/constants/Globals";

//Errors
import AuthError from "@/errors/AuthError";
import LocalError from "@/errors/LocalError";
import ValidationError from "@/errors/ValidationError";

//Interfaces and types
import { VisitRow } from "@/interfaces/Atoms";

//Hooks
import useDebounce from "@/hooks/useDebounce";
import useSessionProviderHook from "@/providers/SessionProvider/hooks";

//Services
import Orchestra from "@/services/Orchestra";

export default function useVisitsDashboard() {

	const {
		isLoggedIn,
		openModalLoginForm,
		showLocalError,
	} = useSessionProviderHook()

	const [visitsRows, setVisitsRows] = useState<VisitRow[]>([])
	const [isInnerLoading, setIsInnerLoading] = useState<boolean>(false)
	const [isInnerLoadingFirstTime, setIsInnerLoadingFirstTime] = useState<boolean>(true)
	const [page, setPage] = useState<number>(0)
	const [rowsPerPage, setRowsPerPage] = useState<number>(ROWS_PER_PAGE)
	const [total, setTotal] = useState<number>(0)
	const [isLoadingNewVisit, setIsLoadingNewVisit] = useState<boolean>(false)
	const [filter, setFilter] = useState<string>('activated')
	const [debounce] = useDebounce()

	const loadVisits = useCallback(async (currentPage: number, currentRowsPerPage: number) => {
		if(!isLoggedIn) {
			return
		}
		if(isInnerLoading) {
			return
		}
		setIsInnerLoading(true)
		debounce(async () => {
			try {
				const responsePaginateVisits = await Orchestra.visitService.all(currentPage, currentRowsPerPage, filter)
				setTotal(responsePaginateVisits.total)
				setVisitsRows(responsePaginateVisits.data.map((visit) => {
					return {
						...visit,
						company_name: visit.company.short_description,
						branch_name: visit.branch.short_description,
						gate_name: visit.gate.description,
					}
				}))
				setIsInnerLoading(false)
			} catch(catchError) {
				setIsInnerLoading(false)
				if(catchError instanceof AuthError) {
					return openModalLoginForm()
				}
				if(catchError instanceof LocalError || catchError instanceof ValidationError) {
					return showLocalError(catchError)
				}
				throw catchError
			}
		})
	}, [isLoggedIn, isInnerLoading, filter, debounce, openModalLoginForm, showLocalError])

	
	const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
		setPage(newPage)
		loadVisits(newPage, rowsPerPage)
	}
	const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const newRowsPerPage = parseInt(event.target.value)
		setRowsPerPage(newRowsPerPage)
		loadVisits(page, newRowsPerPage)
	}

	/**
	 * On change event function when the select for the filter changes.
	 */
	const onChangeFilter = async (e: SelectChangeEvent<string>) => {
		setFilter(e.target.value)
		setIsInnerLoading(true)
		await loadVisitsFirstTime(e.target.value)
		setIsInnerLoading(false)
	}

	/**
	 * Loads the visits first time
	 */
	const loadVisitsFirstTime = async (filter: string = 'activated') => {
		if(!isLoggedIn) {
			return
		}
		await debounce(async () => {
			try {
				const responsePaginateVisits = await Orchestra.visitService.all(page, rowsPerPage, filter)
				setTotal(responsePaginateVisits.total)
				setVisitsRows(responsePaginateVisits.data.map((visit) => {
					return {
						...visit,
						company_name: visit.company.short_description,
						branch_name: visit.branch.short_description,
						gate_name: visit.gate.description,
					}
				}))
				setIsInnerLoadingFirstTime(false)
			} catch(catchError) {
				setIsInnerLoadingFirstTime(false)
				if(catchError instanceof AuthError) {
					return openModalLoginForm()
				}
				if(catchError instanceof LocalError || catchError instanceof ValidationError) {
					return showLocalError(catchError)
				}
				throw catchError
			}
		})
	}

	
	useEffect(() => {
		loadVisitsFirstTime()
		const triggerLoadVisits = async () => {
			setIsLoadingNewVisit(true)
			await loadVisitsFirstTime()
			setIsLoadingNewVisit(false)
		}
		if(window) {
			window.removeEventListener("VisitsDashboardLoadVisits", triggerLoadVisits)
			window.addEventListener("VisitsDashboardLoadVisits", triggerLoadVisits)
		}
		return () => {
			if(window) {
				window.removeEventListener("VisitsDashboardLoadVisits", triggerLoadVisits)
			}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return {
		total,
		page,
		rowsPerPage,
		visitsRows,
		isInnerLoading,
		isInnerLoadingFirstTime,
		isLoadingNewVisit,
		filter,
		handleChangePage,
		handleChangeRowsPerPage,
		onChangeFilter,
	}
}