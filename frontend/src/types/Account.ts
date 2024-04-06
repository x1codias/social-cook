import { Recipe } from './Recipe';

export type Account = {
  email: string;
  username: string;
  password: string;
  photo?: string;
  biography?: string;
  token?: string;
  recipes?: Partial<Recipe>[];
};
