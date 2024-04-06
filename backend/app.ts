import express, {
  NextFunction,
  Request,
  Response,
} from 'express';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import authRoutes from './routes/auth.routes';
import {
  Errors,
  errorHandler,
} from './controllers/error.controller';

dotenv.config();

const app = express();
const { PORT, DB_USERNAME, DB_NAME, DB_PASSWORD } =
  process.env;

// Connect to MySQL database from the server
export const sequelize = new Sequelize(
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  {
    dialect: 'mysql',
    host: 'localhost',
  }
);

console.log(sequelize);

// Sync the model with the database
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => {
    console.error('Error while synchronizing tables', err);
  });

// Check if Sequelize has been initialized middleware
const sequelizeInitialized = (req, res, next) => {
  if (sequelize) {
    next(); // Proceed to the next middleware
  } else {
    // Handle the error or send an appropriate response
    errorHandler(500, Errors.serverError, res); // For example
  }
};

// Middleware
app.use(express.json());
app.use(sequelizeInitialized);

const apiRouter = express.Router();
apiRouter.use('/', authRoutes);

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
