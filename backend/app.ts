import express, {
  NextFunction,
  Request,
  Response,
} from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import recipeRoutes from './routes/recipe.routes';
import ingredientRoutes from './routes/ingredient.routes';
import unitRoutes from './routes/unit.routes';
import {
  Errors,
  errorHandler,
} from './controllers/error.controller';
import sequelize from './sequelize';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { socketIntegration } from './sockets/index';
import logger from './logger';

import './models/associations';

dotenv.config();

const app = express();
const { PORT } = process.env;

// Create http server to attach websockets
const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// Sync the model with the database
sequelize
  .sync({ force: true })
  .then(() => {
    logger.info('Database & tables created!');
  })
  .catch(err => {
    logger.error('Error while synchronizing tables', err);
  });

// Websocket integration
socketIntegration(io);

const apiRouter = express.Router();
apiRouter.use('/', authRoutes);
apiRouter.use('/recipes', recipeRoutes);
apiRouter.use('/ingredients', ingredientRoutes);
apiRouter.use('/units', unitRoutes);

app.use('/api', apiRouter);

app.use(
  (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    logger.error('Global error handler:', error);
    errorHandler(Errors.serverError, res); // Handle internal server error
    next();
  }
);

// Start the server
app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);
});
