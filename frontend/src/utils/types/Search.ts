import { Account } from './Account';
import { Recipe } from './Recipe';

export type Search = {
  id: number;
  context: 'user' | 'recipe';
  user: Account;
  recipe: Recipe;
};
