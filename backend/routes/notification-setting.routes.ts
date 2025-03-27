import { Router } from 'express';
import { editNotificationSettings } from '../controllers/notification-settings.controller';
import { verifyToken } from '../middlwares/verify-token.middleware';

const notificationSettingRoutes = Router();

notificationSettingRoutes.put(
  '/',
  verifyToken,
  editNotificationSettings
);

export default notificationSettingRoutes;
