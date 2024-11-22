import {
  GET_RECIPE,
  GET_RECIPES,
  CREATE_RECIPE,
  DELETE_RECIPE,
  OPEN_CREATE_RECIPE_MODAL,
  CLOSE_CREATE_RECIPE_MODAL,
  CHANGE_CREATE_RECIPE_STEP,
  GET_RECIPES_SEARCH_DROPDOWN,
} from '../../actions/types';
import { Recipe } from '../../utils/types/Recipe';

export interface RecipeState {
  scrollData: {
    recipes: Recipe[] | [];
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
    page: number;
  };
  searchDropdownRecipes: Recipe[];
  recipe: Recipe | null;
  openCreateRecipe: boolean;
  createRecipeStep: number;
}

export interface RecipePayload {
  recipes: Recipe[] | [];
  total: number;
}

interface GetRecipesAction {
  type: typeof GET_RECIPES;
  payload: RecipePayload;
}

interface GetRecipesSearchDropdownAction {
  type: typeof GET_RECIPES_SEARCH_DROPDOWN;
  payload: RecipePayload;
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

interface OpenCreateRecipeModalAction {
  type: typeof OPEN_CREATE_RECIPE_MODAL;
}

interface CloseCreateRecipeModalAction {
  type: typeof CLOSE_CREATE_RECIPE_MODAL;
}

interface ChangeCreateRecipeStep {
  type: typeof CHANGE_CREATE_RECIPE_STEP;
  payload: { step: number };
}

export type RecipeActionTypes =
  | GetRecipeAction
  | GetRecipesAction
  | GetRecipesSearchDropdownAction
  | CreateRecipeAction
  | DeleteRecipeAction
  | OpenCreateRecipeModalAction
  | CloseCreateRecipeModalAction
  | ChangeCreateRecipeStep;
