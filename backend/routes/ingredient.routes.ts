import { Router } from 'express';
import {
  ingredients,
  createIngredient,
} from '../controllers/ingredient.controller';
import { verifyToken } from '../middlwares/verify-token.middleware';

const ingredientRoutes = Router();

ingredientRoutes.get('/', verifyToken, ingredients);
ingredientRoutes.post('/', verifyToken, createIngredient);

export default ingredientRoutes;
