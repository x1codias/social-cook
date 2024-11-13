import {
  GET_INGREDIENTS,
  CREATE_INGREDIENT,
} from '../actions/types';
import {
  IngredientActionTypes,
  IngredientState,
} from './types/ingredient.reducer.types';

const initialState: IngredientState = {
  scrollData: {
    ingredients: [],
    total: 0,
    limit: 10,
    offset: 0,
    hasMore: true,
    page: 0, // Track the current page
  },
};

const ingredientReducer = (
  state = initialState,
  action: IngredientActionTypes
): IngredientState => {
  switch (action.type) {
    case GET_INGREDIENTS:
      const { ingredients, total } = action.payload;

      const newOffset =
        state.scrollData.offset + ingredients.length;
      const hasMore = newOffset < total;

      return {
        ...state,
        scrollData: {
          ...state.scrollData,
          ingredients: [
            ...state.scrollData.ingredients,
            ...ingredients,
          ], // Use spread to maintain immutability
          offset: newOffset,
          total: total,
          hasMore: hasMore,
          page: state.scrollData.page + 1, // Increment page only on successful fetch
        },
      };
    case CREATE_INGREDIENT:
      return {
        scrollData: {
          ...state.scrollData,
          ingredients: [
            ...state.scrollData.ingredients,
            action.payload.ingredient,
          ],
        },
      };
    default:
      return state;
  }
};

export default ingredientReducer;
