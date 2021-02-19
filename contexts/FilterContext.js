import { createContext, useState, useReducer } from 'react'
import { SET_CATEGORY, SET_RATING } from 'react'

const initialState = { category: 'trending', rating: '' }

const reducer = (state, { type, payload }) => {
  switch (type) {
    case SET_CATEGORY:
      return {
        ...state,
        category: payload
      }
    case SET_RATING:
      return {
        ...state,
        rating: payload
      }
    default:
      return state
  }
}

export const FilterContext = createContext()

const FilterContextProvider = ({ children }) => {
  const [filter, dispatch] = useReducer(reducer, initialState)

  return (
    <FilterContext.Provider
      value={{ filterState: filter, setFilter: dispatch }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export default FilterContextProvider
