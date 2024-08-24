// import { createSelector } from 'reselect';
import { RootState } from '../store';

export const selectUnitScrollData = (state: RootState) =>
  state.unit.scrollData;
export const selectIngredientScrollData = (
  state: RootState
) => state.ingredient.scrollData;

// do these for example when it comes to searches
// export const getUnitScrollData = createSelector(
//   [selectUnitScrollData],
//   scrollData => scrollData
// );

// export const getIngredientScrollData = createSelector(
//   [selectIngredientScrollData],
//   scrollData => scrollData
// );
