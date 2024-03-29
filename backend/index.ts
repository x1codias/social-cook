
import express, { Request, Response } from "express";
import dotenv from 'dotenv';

dotenv.config()

const app = express();
const {PORT} = process.env;

app.get("/", (req: Request, res: Response) => {
  res.get("Hello World!");
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello World! I'm JSON" });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});