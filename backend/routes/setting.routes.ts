import { Router } from 'express';
import { editSettings } from '../controllers/settings.controller';
import { verifyToken } from '../middlwares/verify-token.middleware';

const settingRoutes = Router();

settingRoutes.put('/', verifyToken, editSettings);

export default settingRoutes;
