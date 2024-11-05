import { Ingredient } from './Ingredient';
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
  category: RecipeCategories | '';
  difficulty: Difficulties | '';
  description: string;
  images: File[];
  ingredients: {
    name: number;
    quantity: number;
    unit: number;
  }[];
  preparation: Preparation;
};
