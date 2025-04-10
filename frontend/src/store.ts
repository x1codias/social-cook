import {
  Action,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import authReducer from './reducers/auth.reducer';
import recipeReducer from './reducers/recipe.reducer';
import ingredientReducer from './reducers/ingredient.reducer';
import unitReducer from './reducers/unit.reducer';
import searchReducer from './reducers/search.reducer';
import userReducer from './reducers/user.reducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    recipe: recipeReducer,
    ingredient: ingredientReducer,
    unit: unitReducer,
    search: searchReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
