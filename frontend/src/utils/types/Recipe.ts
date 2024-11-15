import { Ingredient, IngredientItem } from './Ingredient';
import { Preparation } from './Preparation';

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
  difficulty: Difficulties;
  description: string;
  duration: {
    hours: number;
    minutes: number;
  };
  User: {
    id: number;
    username: string;
    photo: string;
  };
};

export type RecipeInput = {
  title: string;
  duration: {
    hours: number | undefined;
    minutes: number | undefined;
  };
  servings: number;
  category: RecipeCategories | string;
  difficulty: Difficulties | string;
  description: string;
  photos: (string | File)[];
  ingredients: IngredientItem[];
  preparation: Preparation;
};
