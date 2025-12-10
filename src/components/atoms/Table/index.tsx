import { TableProps } from '@/interfaces/Atoms'

export default function Table({
  tableHeads,
  tableRows = [],
  isLoading = false,
  loadingMessage = 'Cargando...',
  emptyMessage = 'No hay resultados',
  loadingComponent,
  emptyComponent,
  className = ''
}: TableProps) {
  const colSpan = tableHeads.length

  return (
    <div className={`px-4 sm:px-6 lg:px-8 font-inter ${className}`}>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full divide-y divide-gray-300 rounded-lg overflow-hidden">
              <thead className="text-white bg-proquinal-teal">
                <tr className="[&>th:first-child]:rounded-tl-lg [&>th:last-child]:rounded-tr-lg">
                  {tableHeads.map((head, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="
                        px-3 
                        py-3.5 
                        text-center
                        text-sm 
                        font-semibold
                      "
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {isLoading ? (
                  <tr>
                    <td 
                      colSpan={colSpan} 
                      className="
                        py-8 
                        text-center 
                        text-sm 
                        text-gray-500
                      "
                    >
                      {loadingComponent || (
                        <div className="flex flex-col items-center gap-2">
                          <div className="
                            animate-spin 
                            rounded-full 
                            h-8 
                            w-8 
                            border-b-2 
                            border-proquinal-teal
                          " />
                          <span>{loadingMessage}</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ) : tableRows.length === 0 ? (
                  <tr>
                    <td 
                      colSpan={colSpan} 
                      className="
                        py-8 
                        text-center 
                        text-sm 
                        text-gray-500
                      "
                    >
                      {emptyComponent || emptyMessage}
                    </td>
                  </tr>
                ) : (
                  tableRows.map((row, index) => (
                    <tr key={index}>
                      {row}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}