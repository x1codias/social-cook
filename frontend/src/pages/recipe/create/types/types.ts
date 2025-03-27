import {
  Difficulties,
  RecipeCategories,
} from '../../../../utils/types/Recipe';

export type RecipeDetails = {
  title: string;
  category: RecipeCategories | string;
  duration: {
    hours: number;
    minutes: number;
  };
  servings: number;
  difficulty: Difficulties | string;
  description: string;
  photos: (string | File)[];
};
