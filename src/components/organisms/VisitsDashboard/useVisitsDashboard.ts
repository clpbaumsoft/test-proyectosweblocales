
//React and Modules
import React, { useState, useEffect, useCallback } from "react";
import type { MouseEvent, ChangeEvent } from "react";

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
	const [allVisitsRows, setAllVisitsRows] = useState<VisitRow[]>([])
	const [allVisitsLoaded, setAllVisitsLoaded] = useState<boolean>(false)
	const [isInnerLoading, setIsInnerLoading] = useState<boolean>(false)
	const [isInnerLoadingFirstTime, setIsInnerLoadingFirstTime] = useState<boolean>(true)
	const [page, setPage] = useState<number>(0)
	const [rowsPerPage, setRowsPerPage] = useState<number>(ROWS_PER_PAGE)
	const [total, setTotal] = useState<number>(0)
	const [isLoadingNewVisit, setIsLoadingNewVisit] = useState<boolean>(false)
	const [filter, setFilter] = useState<string>('activated')
	const [visitIdFilter, setVisitIdFilter] = useState<string>('')
	const [debounce] = useDebounce()
	const [debounceFilter] = useDebounce(500) // 500ms delay for filter input

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
				
				const mappedVisits = responsePaginateVisits.data.map((visit) => {
					return {
						...visit,
						company_name: visit.company.short_description,
						branch_name: visit.branch.short_description,
						gate_name: visit.gate.description,
					}
				})
				
				setAllVisitsRows(mappedVisits)
				setVisitsRows(mappedVisits)
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

	/**
	 * Loads ALL visits (without pagination) for filtering purposes
	 */
	const loadAllVisitsForFilter = useCallback(async () => {
		if(!isLoggedIn) {
			return
		}
		
		try {
			// Request all visits with a very high per_page to get everything
			const responsePaginateVisits = await Orchestra.visitService.all(0, 99999, filter)
			
			const mappedVisits = responsePaginateVisits.data.map((visit) => {
				return {
					...visit,
					company_name: visit.company.short_description,
					branch_name: visit.branch.short_description,
					gate_name: visit.gate.description,
				}
			})
			
			setAllVisitsRows(mappedVisits)
			setAllVisitsLoaded(true)
			
			return mappedVisits
		} catch(catchError) {
			if(catchError instanceof AuthError) {
				return openModalLoginForm()
			}
			if(catchError instanceof LocalError || catchError instanceof ValidationError) {
				return showLocalError(catchError)
			}
			throw catchError
		}
	}, [isLoggedIn, filter, openModalLoginForm, showLocalError])

	
	const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
		setPage(newPage)
		setVisitIdFilter('') // Reset filter when changing page
		setAllVisitsLoaded(false) // Reset flag to reload all visits if filter is used again
		loadVisits(newPage, rowsPerPage)
	}
	const handleChangeRowsPerPage = (newRowsPerPage: number) => {
		setRowsPerPage(newRowsPerPage)
		setVisitIdFilter('') // Reset filter when changing rows per page
		setAllVisitsLoaded(false) // Reset flag to reload all visits if filter is used again
		loadVisits(page, newRowsPerPage)
	}

	/**
	 * On change event function when the select for the filter changes.
	 */
	const onChangeFilter = async (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFilter(e.target.value)
		setVisitIdFilter('') // Reset visit ID filter when changing status filter
		setAllVisitsLoaded(false) // Reset to reload all visits with new filter
		setIsInnerLoading(true)
		await loadVisitsFirstTime(e.target.value)
		setIsInnerLoading(false)
	}

	/**
	 * On change event function when the visit ID filter input changes.
	 * Loads ALL visits on first use, then filters them instantly.
	 */
	const onChangeVisitIdFilter = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setVisitIdFilter(value)
		
		// Use debounce to delay the actual filtering/loading
		debounceFilter(async () => {
			if (value === '' || value.trim() === '') {
				// If empty, restore paginated view
				setAllVisitsLoaded(false)
				setIsInnerLoading(true)
				await loadVisitsFirstTime(filter)
				setIsInnerLoading(false)
			} else {
				// Load all visits if not loaded yet
				let visitsToFilter = allVisitsRows
				
				if (!allVisitsLoaded) {
					setIsInnerLoading(true)
					const loadedVisits = await loadAllVisitsForFilter()
					setIsInnerLoading(false)
					visitsToFilter = loadedVisits || []
				}
				
				// Filter from all loaded visits using partial match (starts with)
				const filtered = visitsToFilter.filter(visit => {
					const visitIdStr = visit.id.toString()
					return visitIdStr.startsWith(value)
				})
				
				setVisitsRows(filtered)
				setTotal(filtered.length)
			}
		})
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
				
				const mappedVisits = responsePaginateVisits.data.map((visit) => {
					return {
						...visit,
						company_name: visit.company.short_description,
						branch_name: visit.branch.short_description,
						gate_name: visit.gate.description,
					}
				})
				
				setAllVisitsRows(mappedVisits)
				setVisitsRows(mappedVisits)
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
		visitIdFilter,
		handleChangePage,
		handleChangeRowsPerPage,
		onChangeFilter,
		onChangeVisitIdFilter,
	}
}