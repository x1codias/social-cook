import {
  CREATE_INGREDIENT,
  GET_INGREDIENTS,
} from '../../actions/types';

export interface IngredientState {
  scrollData: {
    ingredients: string[] | [];
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

export interface IngredientPayload {
  ingredients: string[] | [];
  total: number;
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
