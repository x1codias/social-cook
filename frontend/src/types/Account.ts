import { Recipe } from './Recipe'

export type Account = {
  email: string
  username: string
  password: string
  recipes: Partial<Recipe>[]
}
