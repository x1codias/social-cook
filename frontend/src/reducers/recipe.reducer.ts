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
  scrollData: {
    recipes: [],
    total: 0,
    limit: 10,
    offset: 0,
    hasMore: true,
  },
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
      const { recipes, total } = action.payload;

      const newOffset =
        state.scrollData.offset + recipes.length;
      const hasMore =
        state.scrollData.recipes.length < total;

      return {
        ...state,
        scrollData: {
          recipes: [
            ...state.scrollData.recipes,
            ...recipes,
          ],
          offset: newOffset,
          limit: 10,
          total: total,
          hasMore,
        },
      };
    case CREATE_RECIPE:
      return {
        scrollData: {
          ...state.scrollData,
          recipes: [
            ...state.scrollData.recipes,
            action.payload.recipe,
          ],
        },
        recipe: action.payload.recipe,
      };
    case DELETE_RECIPE:
      const filteredRecipes =
        state.scrollData.recipes.filter(
          recipe => recipe.id !== action.payload.id
        );
      return {
        scrollData: {
          ...state.scrollData,
          recipes: filteredRecipes,
        },
        recipe: null,
      };
    default:
      return state;
  }
};

export default recipeReducer;
