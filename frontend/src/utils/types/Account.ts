import { Recipe } from './Recipe';

export type Account = {
  id: number;
  email: string;
  username: string;
  password: string;
  photo?: string;
  biography?: string;
  recipes: { total: number; data: Recipe[] };
  followersCount: number;
  followingCount: number;
};
