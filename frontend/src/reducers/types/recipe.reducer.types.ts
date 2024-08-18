import {
  GET_RECIPE,
  GET_RECIPES,
  CREATE_RECIPE,
  DELETE_RECIPE,
} from '../../actions/types';
import { Recipe } from '../../types/Recipe';

export interface RecipeState {
  recipes: Recipe[] | [];
  recipe: Recipe | null;
}

export interface RecipePayload {
  recipes: Recipe[];
}

interface GetRecipesAction {
  type: typeof GET_RECIPES;
  payload: { recipes: Recipe[] };
}

interface GetRecipeAction {
  type: typeof GET_RECIPE;
  payload: { recipe: Recipe };
}

interface CreateRecipeAction {
  type: typeof CREATE_RECIPE;
  payload: { recipe: Recipe };
}

interface DeleteRecipeAction {
  type: typeof DELETE_RECIPE;
  payload: { id: number };
}

export type RecipeActionTypes =
  | GetRecipeAction
  | GetRecipesAction
  | CreateRecipeAction
  | DeleteRecipeAction;
