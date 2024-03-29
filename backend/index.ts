import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { Sequelize, DataTypes } from "sequelize";

dotenv.config();

const app = express();
const { PORT, DB_USERNAME, DB_NAME, DB_PASSWORD } = process.env;

// Connect to MySQL database from the server
const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  dialect: "mysql",
  host: "localhost",
});

// Define a model
const User = sequelize.define("User", {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
});

// Sync the model with the database
sequelize.sync();

// Middleware
app.use(express.json());

// Endpoints
app.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  const user = await User.create({
    name,
    email,
  });
  res.json(user);
});

// Protection middleware
app.use((req, res, next) => {
  const token = req.headers.authorization;
  if (token !== "secret-token") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
