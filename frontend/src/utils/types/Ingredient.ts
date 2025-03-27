import { Unit } from './Unit';

export type Ingredient = {
  id: number;
  name: string;
};

export type IngredientItem = {
  name: number | string;
  quantity: number;
  unit: number | string;
};

export type RecipeIngredient = {
  quantity: number;
  ingredient: Ingredient;
  unit: Unit;
};
