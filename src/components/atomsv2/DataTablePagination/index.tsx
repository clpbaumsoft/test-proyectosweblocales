import * as React from "react"
import { Pagination, PaginationNext, PaginationPrevious } from "../Pagination"

type DataTablePaginationProps = {
  /** Página actual (0-based) */
  page: number
  /** Filas por página */
  rowsPerPage: number
  /** Total de registros */
  total: number

  /** Cambio de página (ya normalizado a solo número) */
  onChangePage: (page: number) => void

  /** Cambio de filas por página */
  onChangeRowsPerPage?: (rowsPerPage: number) => void

  /** Opciones del select de filas por página */
  rowsPerPageOptions?: number[]

  /** Label para "Filas por página" (i18n) */
  labelRowsPerPage?: string

  /** Ocultar si solo hay una página */
  hideOnSinglePage?: boolean

  className?: string
}

export default function DataTablePagination({
  page,
  rowsPerPage,
  total,
  onChangePage,
  onChangeRowsPerPage,
  rowsPerPageOptions = [5, 10, 25],
  labelRowsPerPage = "Filas por página",
  hideOnSinglePage = false,
  className,
}: DataTablePaginationProps) {
  if (total === 0) return null

  const totalPages = Math.max(1, Math.ceil(total / rowsPerPage))

  if (hideOnSinglePage && totalPages <= 1) return null

  const isFirstPage = page <= 0
  const isLastPage = page >= totalPages - 1

  const startEntry = total === 0 ? 0 : page * rowsPerPage + 1
  const endEntry = Math.min(total, (page + 1) * rowsPerPage)

  const handlePrev = () => {
    if (!isFirstPage) onChangePage(page - 1)
  }

  const handleNext = () => {
    if (!isLastPage) onChangePage(page + 1)
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(event.target.value)
    onChangeRowsPerPage?.(value)
  }

  const rootClassName = [
    "mt-4 flex flex-col items-center justify-between gap-4 sm:flex-row",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div className={rootClassName}>
      <div className="flex items-center gap-4 text-sm text-muted-foreground dark:text-zinc-200">
        <div className="flex items-center gap-2">
          <span>{labelRowsPerPage}</span>
          <select
            className="h-8 rounded-md border border-zinc-200 bg-background px-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
            value={rowsPerPage}
            onChange={handleSelectChange}
          >
            {rowsPerPageOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <span>
          {startEntry}–{endEntry} de {total}
        </span>
      </div>

      <Pagination>
        <PaginationPrevious
          href="#"
          onClick={e => {
            e.preventDefault()
            handlePrev()
          }}
          aria-disabled={isFirstPage}
          className={isFirstPage ? "pointer-events-none opacity-50" : ""}
        />

        <span className="text-xs text-muted-foreground dark:text-zinc-300">
          Página {page + 1} de {totalPages}
        </span>

        <PaginationNext
          href="#"
          onClick={e => {
            e.preventDefault()
            handleNext()
          }}
          aria-disabled={isLastPage}
          className={isLastPage ? "pointer-events-none opacity-50" : ""}
        />
      </Pagination>
    </div>
  )
}
