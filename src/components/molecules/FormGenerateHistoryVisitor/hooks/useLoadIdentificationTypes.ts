import React, { useEffect, useState } from 'react'
import useFormGenerateHistoryVisitor from '../useFormGenerateHistoryVisitor';

const useLoadIdentificationTypes = () => {
  const [identificationTypes, setIdentificationTypes] = useState([]);
  const { loadIdentificationTypes } = useFormGenerateHistoryVisitor();

  useEffect(() => {
    loadIdentificationTypes().then(setIdentificationTypes);
  }, [loadIdentificationTypes]);

  return { identificationTypes };
} 

export default useLoadIdentificationTypes
