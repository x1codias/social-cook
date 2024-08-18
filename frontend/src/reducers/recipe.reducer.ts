import {
  GET_RECIPE,
  GET_RECIPES,
  CREATE_RECIPE,
  DELETE_RECIPE,
} from '../actions/types';
import {
  RecipeState,
  RecipeActionTypes,
} from './types/recipe.reducer.types';

const initialState: RecipeState = {
  recipes: [],
  recipe: null,
};

const recipeReducer = (
  state = initialState,
  action: RecipeActionTypes
): RecipeState => {
  switch (action.type) {
    case GET_RECIPE:
      return {
        ...state,
        recipe: action.payload.recipe,
      };
    case GET_RECIPES:
      const { recipes } = action.payload;

      return {
        ...state,
        recipes,
      };
    case CREATE_RECIPE:
      return {
        recipes: [...state.recipes, action.payload.recipe],
        recipe: action.payload.recipe,
      };
    case DELETE_RECIPE:
      const filteredRecipes = state.recipes.filter(
        recipe => recipe.id !== action.payload.id
      );
      return {
        recipes: filteredRecipes,
        recipe: null,
      };
    default:
      return state;
  }
};

export default recipeReducer;
