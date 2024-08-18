export enum RecipeCategories {
  pastas = 'pastas',
  fish = 'fish',
  meat = 'meat',
  vegan = 'vegan',
  salads = 'salads',
  breakfast = 'breakfast',
  fingerFood = 'fingerFood',
  desserts = 'desserts',
}

export type Recipe = {
  id?: number;
  title: string;
  preperation: string;
  category: RecipeCategories;
  tags?: string[];
  photos?: string[];
  userId: number;
};
