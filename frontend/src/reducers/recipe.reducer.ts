import {
  GET_RECIPE,
  GET_RECIPES,
  CREATE_RECIPE,
  DELETE_RECIPE,
  OPEN_CREATE_RECIPE_MODAL,
  CLOSE_CREATE_RECIPE_MODAL,
  CHANGE_CREATE_RECIPE_STEP,
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
    page: 0, // Track the current page
  },
  recipe: null,
  openCreateRecipe: false,
  createRecipeStep: 0,
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
      const hasMore = newOffset < total;

      return {
        ...state,
        scrollData: {
          ...state.scrollData,
          recipes: [
            ...state.scrollData.recipes,
            ...recipes,
          ], // Use spread to maintain immutability
          offset: newOffset,
          total: total,
          hasMore: hasMore,
          page: state.scrollData.page + 1, // Increment page only on successful fetch
        },
      };
    case CREATE_RECIPE:
      return state;
    case DELETE_RECIPE:
      const filteredRecipes =
        state.scrollData.recipes.filter(
          recipe => recipe.id !== action.payload.id
        );
      return {
        ...state,
        scrollData: {
          ...state.scrollData,
          recipes: filteredRecipes,
        },
        recipe: null,
      };
    case OPEN_CREATE_RECIPE_MODAL:
      return {
        ...state,
        openCreateRecipe: true,
      };
    case CLOSE_CREATE_RECIPE_MODAL:
      return {
        ...state,
        openCreateRecipe: false,
      };
    case CHANGE_CREATE_RECIPE_STEP:
      return {
        ...state,
        createRecipeStep: action.payload.step,
      };
    default:
      return state;
  }
};

export default recipeReducer;
