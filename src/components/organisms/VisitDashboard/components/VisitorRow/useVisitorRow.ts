import { VisitVisitor } from '@/interfaces/Models'
import Orchestra from '@/services/Orchestra'
import { useCallback, useEffect, useState } from 'react'

type LoadedData = {
  careCompany: string
  arlCompany: string
  city: string
}

const useVisitorRow = (row: VisitVisitor) => {
  const [loadedData, setLoadedData] = useState<LoadedData>()
  const arlCompanyId = row.visitor.id_arlcompany
  const careCompanyId = row.visitor.id_carecompany
  const cityId = row.visitor.id_city

  /**
	 * Loads the care companies.
	 */
	const loadCareCompanies = useCallback(async () => {
		const results = await Orchestra.careCompanyService.all()
    const careCompany = results.find((company) => company.id === careCompanyId)
		return careCompany?.name
	}, [careCompanyId])
	
	/**
	 * Loads the arl companies.
	 */
	const loadArlCompanies = useCallback(async () => {
		const results = await Orchestra.arlCompanyService.all()
    const arlCompany = results.find((company) => company.id === arlCompanyId)
		return arlCompany?.name
	}, [arlCompanyId])

  /**
   * Loads the cities.
   */
  const loadCities = useCallback(async () => {
    const results = await Orchestra.cityService.all()
    const city = results.find((city) => city.id === cityId)
    return city?.name
  }, [cityId])

  useEffect(() => {
    const loadData = async () => {
      const [careCompanyName, arlCompanyName, cityName] = await Promise.all([loadCareCompanies(), loadArlCompanies(), loadCities()])

      if (!careCompanyName || !arlCompanyName || !cityName) return
      setLoadedData({ 
        careCompany: careCompanyName, 
        arlCompany: arlCompanyName, 
        city: cityName
      })
    }
    loadData()
  }, [loadCareCompanies, loadArlCompanies, loadCities])

  return { loadedData }
}

export default useVisitorRow
