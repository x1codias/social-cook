import {
  CREATE_INGREDIENT,
  GET_INGREDIENTS,
} from '../../actions/types';
import { Ingredient } from '../../utils/types/Ingredient';

export interface IngredientState {
  scrollData: {
    ingredients: Ingredient[] | [];
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
    page: number;
  };
}

export interface IngredientPayload {
  ingredients: Ingredient[] | [];
  total: number;
}

interface GetIngredientsAction {
  type: typeof GET_INGREDIENTS;
  payload: IngredientPayload;
}

interface CreateIngredientAction {
  type: typeof CREATE_INGREDIENT;
  payload: { ingredient: Ingredient };
}

export type IngredientActionTypes =
  | GetIngredientsAction
  | CreateIngredientAction;
