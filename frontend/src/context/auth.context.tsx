// AuthContext.tsx

import React, {
  ReactNode,
  Reducer,
  createContext,
  useContext,
  useReducer,
} from 'react'
import authReducer, { initialState } from '../reducers/auth.reducer'
import { AuthAction } from '../reducers/types/reducer.types'
import { Account } from '../types/Account'

export type AuthState = {
  isAuthenticated?: boolean
  user?: Partial<Account> | null
}

// Define the shape of the authentication context
interface AuthContextProps {
  state?: AuthState
  dispatch?: React.Dispatch<AuthAction>
}

// Create the authentication context
const AuthContext = createContext<AuthContextProps | null>(null)

// Custom hook to use the authentication context
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Define the authentication provider
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer<Reducer<AuthState, AuthAction>>(
    authReducer,
    initialState
  )

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
