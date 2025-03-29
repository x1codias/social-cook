import {
  GET_RECIPE,
  GET_RECIPES,
  CREATE_RECIPE,
  DELETE_RECIPE,
  OPEN_CREATE_RECIPE_MODAL,
  CLOSE_CREATE_RECIPE_MODAL,
  CHANGE_CREATE_RECIPE_STEP,
  GET_RECIPES_SEARCH_DROPDOWN,
  RESET_SCROLL_RECIPES_DATA,
  RATE_RECIPE,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  GET_FAVORITE_RECIPES,
  RESET_SCROLL_FAVORITES_DATA,
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
  favorites: {
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
  search: boolean;
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
interface ResetScrollDataAction {
  type: typeof RESET_SCROLL_RECIPES_DATA;
}

interface ResetFavoritesAction {
  type: typeof RESET_SCROLL_FAVORITES_DATA;
}

interface RateRecipeAction {
  type: typeof RATE_RECIPE;
  payload: { avgRating: number };
}

interface GetFavoriteRecipesAction {
  type: typeof GET_FAVORITE_RECIPES;
  payload: {
    favoriteRecipes: Recipe[] | [];
    total: number;
  };
}

interface AddToFavoritesAction {
  type: typeof ADD_TO_FAVORITES;
  payload: { recipeId: number };
}

interface RemoveFromFavoritesAction {
  type: typeof REMOVE_FROM_FAVORITES;
  payload: { recipeId: number };
}

export type RecipeActionTypes =
  | GetRecipeAction
  | GetRecipesAction
  | GetRecipesSearchDropdownAction
  | CreateRecipeAction
  | DeleteRecipeAction
  | OpenCreateRecipeModalAction
  | CloseCreateRecipeModalAction
  | ChangeCreateRecipeStep
  | ResetScrollDataAction
  | RateRecipeAction
  | AddToFavoritesAction
  | RemoveFromFavoritesAction
  | GetFavoriteRecipesAction
  | ResetFavoritesAction;
