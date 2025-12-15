import { useEffect, useState } from 'react'
import useCreateVisitorForm from '../useCreateVisitorForm'

interface LoadData {
  visitorTypes: { label: string; value: string | number }[]
  identificationTypes: { label: string; value: string | number }[]
  cities: { label: string; value: string | number }[]
  careCompanies: { label: string; value: string | number }[]
  arlCompanies: { label: string; value: string | number }[]
}

const useLoadData = (
  visitId: number, 
  onIncreaseVisitorsCounter: () => void, 
  isNewVisitorBasicForm: boolean
) => {
  const [loadedData, setLoadedData] = useState<LoadData>({
    visitorTypes: [],
    identificationTypes: [],
    cities: [],
    careCompanies: [],
    arlCompanies: []
  })
  
  const {
    loadArlCompanies,
    loadCities,
    loadVisitorTypes,
    loadIdentificationTypes,
    loadCareCompanies,
  } = useCreateVisitorForm(visitId, onIncreaseVisitorsCounter, isNewVisitorBasicForm)
  
  useEffect(() => {
      const loadAllOptions = async () => {
        try {
          const [
            visitorTypes,
            identificationTypes,
            cities,
            careCompanies,
            arlCompanies
          ] = await Promise.all([
            loadVisitorTypes(),
            loadIdentificationTypes(),
            loadCities(),
            loadCareCompanies(),
            loadArlCompanies()
          ])
  
          const data = {
            visitorTypes,
            identificationTypes,
            cities,
            careCompanies,
            arlCompanies
          }
  
          setLoadedData(data)
        } catch (error) {
          console.error('Error loading options:', error)
        }
      }
  
      loadAllOptions()
    }, [loadVisitorTypes, loadIdentificationTypes, loadCities, loadCareCompanies, loadArlCompanies])


  return loadedData
}

export default useLoadData
