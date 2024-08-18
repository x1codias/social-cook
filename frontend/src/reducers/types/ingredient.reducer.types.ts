import {
  CREATE_INGREDIENT,
  GET_INGREDIENTS,
} from '../../actions/types';

export interface IngredientState {
  ingredients: string[] | [];
}

export interface IngredientPayload {
  ingredients: string[];
}

interface GetIngredientsAction {
  type: typeof GET_INGREDIENTS;
  payload: IngredientPayload;
}

interface CreateIngredientAction {
  type: typeof CREATE_INGREDIENT;
  payload: { ingredient: string };
}

export type IngredientActionTypes =
  | GetIngredientsAction
  | CreateIngredientAction;
