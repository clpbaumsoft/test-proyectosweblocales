import { useState } from "react";

//Interfaces and types
import { ArrayStateHookType } from "@/interfaces/General";

export default function useArrayState<T>(initialState = []) : ArrayStateHookType<T> {
  const [state, setState] = useState<T[]>(initialState)

  const add = (newValue: T) => {
    let returnVal: T[] = []
    setState((currentState: T[]) => {
      returnVal = [...currentState, newValue]
      return returnVal
    })
    return returnVal
  }
  
  const remove = (index: number) => {
    let returnVal: T[] = []
    setState((currentState) => {
      const newState = [...currentState]
      newState.splice(index, 1)
      returnVal = [...newState]
      return [...newState]
    })
    return returnVal
  }

  const set = (index: number | string, newValue: T) => {
    if(typeof(index) === 'string') {
      index = parseInt(index)
    }
    let returnVal: T[] = []
    setState((prevItems) => {
      returnVal = prevItems.map((item: T, idx: number) =>
        idx === index ? { ...newValue } : item
      )
      return returnVal
    }
      
    )
    return returnVal
  }

  const change = (values: T[]) => {
    setState([ ...values ])
  }

  const find = <T, K extends keyof T>(state: T[], value: T, attribute: K | null = null): number => {
    if (attribute !== null) {
      return state.findIndex(item => item[attribute] === value[attribute])
    }
    return state.findIndex(item => item === value)
  }

  const exists = <T, K extends keyof T>(state: T[], value: T, attribute: K | null = null): boolean => {
    return find(state, value, attribute) !== -1
  }

  return [state, {add, remove, set, change, exists, find}]
}