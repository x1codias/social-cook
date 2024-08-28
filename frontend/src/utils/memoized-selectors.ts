import { createSelector } from 'reselect';
import { RootState } from '../store';

const selectUnitScrollData = (state: RootState) =>
  state.unit.scrollData;
const selectIngredientScrollData = (state: RootState) =>
  state.ingredient.scrollData;

// do these for example when it comes to searches
export const filteredUnitScrollData = (
  searchTerm: string
) =>
  createSelector([selectUnitScrollData], scrollData => ({
    ...scrollData,
    units: scrollData.units.filter(unit =>
      unit.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    ),
  }));

export const filteredIngredientScrollData = (
  searchTerm: string
) =>
  createSelector(
    [selectIngredientScrollData],
    scrollData => ({
      ...scrollData,
      ingredients: scrollData.ingredients.filter(
        ingredient =>
          ingredient.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      ),
    })
  );
