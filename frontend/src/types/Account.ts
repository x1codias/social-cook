import { Recipe } from './Recipe';

export type Account = {
  id: number;
  email: string;
  username: string;
  password: string;
  photo?: string;
  biography?: string;
  token?: string;
  recipes?: Partial<Recipe>[];
};
