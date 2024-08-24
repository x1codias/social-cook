export type Ingredient = {
  id: number;
  name: string;
};

export type IngredientItem = {
  name: number | string;
  quantity?: number;
  unit: number | string;
};
