import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db";

dotenv.config(); // load .env sebelum dipakai

const app = express();

// Connect Database
connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
