import { useState } from "react";

//Interfaces and types
import { RecordStateHookType } from "@/interfaces/General";

export default function useRecordState<T>(initialState: T, onUpdate?: (newVal: T) => void) : RecordStateHookType<T> {
  const [state, setState] = useState<T>(initialState)

  /**
   * Set an attribute of the record object.
   * @param key 
   * @param newValue 
   */
  const set = (key: T extends object ? keyof T : null, newValue: unknown) => {
    setState((currentState) => {
      if(currentState && key) {
        const newState = {...currentState, [key]: newValue}
        if(onUpdate) {
          onUpdate(newState)
        }
        return newState
      }
      return currentState
    })
  }

  /**
   * Remove an attribute of the record object.
   * @param key 
   */
  const remove = (key: T extends object ? keyof T : null) => {
    setState((currentState: T) => {
      if(currentState && key) {
        const newState = {...currentState}
        delete newState[key]
        return newState
      }
      return currentState
    })
  }

  return [state, set, remove, setState]
}