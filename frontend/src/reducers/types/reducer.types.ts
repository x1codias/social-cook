import { Account } from '../../types/Account'
import { LOGIN, LOGOUT, REGISTER } from '../auth.reducer'

export type LoginAction = {
  type: typeof LOGIN
  payload: Partial<Account>
}

export type RegisterAction = {
  type: typeof REGISTER
  payload: Partial<Account>
}

export type LogoutAction = {
  type: typeof LOGOUT
}

export type AuthAction = LoginAction | RegisterAction | LogoutAction

export type AuthReducerType = {
  state: any
  action: any
}
