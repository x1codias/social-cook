import { Router } from 'express';
import { units } from '../controllers/unit.controller';
import { verifyToken } from '../middlwares/verify-token.middleware';

const unitRoutes = Router();

unitRoutes.get('/', verifyToken, units);

export default unitRoutes;
