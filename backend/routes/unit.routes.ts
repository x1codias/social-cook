import { Router } from 'express';
import { units } from '../controllers/unit.controller';
import { verifyToken } from '../controllers/auth.controller';

const unitRoutes = Router();

unitRoutes.get('/', verifyToken, units);

export default unitRoutes;
