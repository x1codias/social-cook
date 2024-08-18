import {
  GET_INGREDIENTS,
  CREATE_INGREDIENT,
} from '../actions/types';
import {
  IngredientActionTypes,
  IngredientState,
} from './types/ingredient.reducer.types';

const initialState: IngredientState = {
  ingredients: [],
};

const ingredientReducer = (
  state = initialState,
  action: IngredientActionTypes
): IngredientState => {
  switch (action.type) {
    case GET_INGREDIENTS:
      const { ingredients } = action.payload;

      return {
        ingredients,
      };
    case CREATE_INGREDIENT:
      return {
        ingredients: [
          ...state.ingredients,
          action.payload.ingredient,
        ],
      };
    default:
      return state;
  }
};

export default ingredientReducer;
