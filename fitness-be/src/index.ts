import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import authRoutes from './routes/auth.route';
import workoutRoutes from './routes/workout.route';
import mealPlanRoutes from './routes/mealPlan.route';
import { createServer } from 'node:http';
import 'dotenv/config';

const server = express();
const PORT = process.env.PORT as string;

server.use(cors());
server.use(express.json());

server.use("/api/auth", authRoutes);
server.use("/api/workouts", workoutRoutes);
server.use("/api/mealplan", mealPlanRoutes);


const http = createServer(server);

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log("✅ MongoDB connected");
    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });