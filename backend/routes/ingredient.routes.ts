import { Router } from 'express';
import {
  ingredients,
  createIngredient,
} from '../controllers/ingredient.controller';
import { verifyToken } from '../controllers/auth.controller';

const ingredientRoutes = Router();

ingredientRoutes.get(
  '/ingredients',
  verifyToken,
  ingredients
);
ingredientRoutes.post(
  '/ingredients',
  verifyToken,
  createIngredient
);

export default ingredientRoutes;
