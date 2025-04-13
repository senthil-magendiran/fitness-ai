import express from "express";
import Workout from "../models/Workout.model";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  const workout = new Workout(req.body);
  await workout.save();
  res.status(201).json(workout);
});

router.get("/:userId", authenticate, async (req, res) => {
  const workouts = await Workout.find({ userId: req.params.userId });
  res.json(workouts);
});

export default router;

