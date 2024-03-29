import { AuthState } from '../context/auth.context'
import { Account } from '../types/Account'
import { AuthAction } from './types/reducer.types'

// Define action types
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const REGISTER = 'REGISTER'

// Define action creators
export const login = (userData: Partial<Account>) => ({
  type: LOGIN,
  payload: userData,
})

export const logout = () => ({
  type: LOGOUT,
})

// Define initial state
export const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
}

// Define reducer function
const authReducer = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case REGISTER:
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      }
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      }
    default:
      return state
  }
}

export default authReducer
