import { createContext, useReducer } from 'react'
import { SET_DELAY } from '../utils/actions'

const initialState = { delay: 0 }

const reducer = (state, { type, payload }) => {
  switch (type) {
    case SET_DELAY:
      return {
        ...state,
        delay: payload
      }
    default:
      return state
  }
}

export const DelayContext = createContext()

const DelayContextProvider = ({ children }) => {
  const [delay, dispatch] = useReducer(reducer, initialState)

  return (
    <DelayContext.Provider value={{ delayState: delay, setDelay: dispatch }}>
      {children}
    </DelayContext.Provider>
  )
}

export default DelayContextProvider
