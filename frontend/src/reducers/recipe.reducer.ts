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
  favorites: {
    // Separate structure for favorites
    recipes: [],
    total: 0,
    limit: 10,
    offset: 0,
    hasMore: true,
    page: 0,
  },
  searchDropdownRecipes: [],
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
    case RESET_SCROLL_RECIPES_DATA:
      return {
        ...state,
        scrollData: {
          ...state.scrollData,
          recipes: [], // Reset recipes list
          offset: 0, // Reset offset
          total: 0, // Reset total
          hasMore: true, // Reset hasMore to allow new fetches
          page: 0, // Reset page count
        },
      };
    case RESET_SCROLL_FAVORITES_DATA:
      return {
        ...state,
        favorites: {
          ...state.favorites,
          recipes: [], // Reset recipes list
          offset: 0, // Reset offset
          total: 0, // Reset total
          hasMore: true, // Reset hasMore to allow new fetches
          page: 0, // Reset page count
        },
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
    case GET_RECIPES_SEARCH_DROPDOWN: {
      const { recipes } = action.payload;

      return {
        ...state,
        searchDropdownRecipes: recipes,
      };
    }
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
    case RATE_RECIPE: {
      const newAvgRating =
        action.payload.avgRating.data.avgRating;

      return {
        ...state,
        recipe: {
          ...state.recipe,
          avgRating: newAvgRating,
        },
        scrollData: {
          ...state.scrollData,
          recipes: state.scrollData.recipes.map(recipe => {
            if (recipe.id === state.recipe?.id) {
              return { ...recipe, avgRating: newAvgRating };
            }

            return recipe;
          }),
        },
      };
    }
    case GET_FAVORITE_RECIPES: {
      const { favoriteRecipes, total } = action.payload;

      const newOffset =
        state.favorites.offset + favoriteRecipes.length;
      const hasMore = newOffset < total;

      return {
        ...state,
        favorites: {
          ...state.favorites,
          recipes: [
            ...state.favorites.recipes,
            ...favoriteRecipes,
          ],
          offset: newOffset,
          total: total,
          hasMore: hasMore,
          page: state.favorites.page + 1,
        },
      };
    }
    case ADD_TO_FAVORITES: {
      const recipeId = action.payload.recipeId;
      const updatedRecipe = state.scrollData.recipes.find(
        recipe => recipe.id === recipeId
      );

      return {
        ...state,
        recipe:
          state.recipe?.id === recipeId
            ? { ...state.recipe, isFavorite: true }
            : state.recipe,
        scrollData: {
          ...state.scrollData,
          recipes: state.scrollData.recipes.map(recipe =>
            recipe.id === recipeId
              ? { ...recipe, isFavorite: true }
              : recipe
          ),
        },
        favorites: {
          ...state.favorites,
          recipes: updatedRecipe
            ? [
                ...state.favorites.recipes,
                { ...updatedRecipe, isFavorite: true },
              ]
            : state.favorites.recipes,
        },
      };
    }
    case REMOVE_FROM_FAVORITES: {
      const recipeId = action.payload.recipeId;

      return {
        ...state,
        recipe:
          state.recipe?.id === recipeId
            ? { ...state.recipe, isFavorite: false }
            : state.recipe,
        scrollData: {
          ...state.scrollData,
          recipes: state.scrollData.recipes.map(recipe =>
            recipe.id === recipeId
              ? { ...recipe, isFavorite: false }
              : recipe
          ),
        },
        favorites: {
          ...state.favorites,
          recipes: state.favorites.recipes.filter(
            recipe => recipe.id !== recipeId
          ),
        },
      };
    }
    default:
      return state;
  }
};

export default recipeReducer;
