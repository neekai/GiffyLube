import { createContext, useReducer } from 'react'
import { SET_CATEGORY, SET_SEARCH_VALUE } from '../utils/actions'

const initialState = { category: 'trending', query: '' }

const reducer = (state, { type, payload }) => {
  switch (type) {
    case SET_CATEGORY:
      return {
        ...state,
        category: payload
      }

    case SET_SEARCH_VALUE:
      return {
        ...state,
        query: payload
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
