import { Ingredient } from './Ingredient';

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

export enum Difficulties {
  easy = 'easy',
  medium = 'medium',
  hard = 'hard',
}

export type Recipe = {
  id?: number;
  title: string;
  ingredients: Ingredient[];
  preperation: string;
  category: RecipeCategories;
  tags?: string[];
  photos?: string[];
  userId: number;
};
