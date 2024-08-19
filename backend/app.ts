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

import './models/associations';

dotenv.config();

const app = express();
const { PORT } = process.env;

// Sync the model with the database
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => {
    console.error('Error while synchronizing tables', err);
  });

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const apiRouter = express.Router();
apiRouter.use('/', authRoutes);
apiRouter.use('/', recipeRoutes);
apiRouter.use('/', ingredientRoutes);
apiRouter.use('/', unitRoutes);

app.use('/api', apiRouter);

app.use(
  (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.error('Global error handler:', error);
    errorHandler(500, Errors.serverError, res); // Handle internal server error
    next();
  }
);

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
