import express, { Request, Response } from "express";
import { authenticate } from "../middleware/authMiddleware";
import { generateMealPlan } from "../utils/generateMealPlan";

const router = express.Router();

router.post("/", authenticate, async (req: any, res: Response) => {
  try {
    const { goal } = req.body;

    if (!goal) {
        res.status(400).json({ error: "Goal is required" });
        return;
    }

    const mealPlan = await generateMealPlan(goal);
    res.json({ mealPlan });
  } catch (err) {
    console.error("Meal plan error:", err);
    res.status(500).json({ error: "Failed to generate meal plan" });
  }
});

export default router;
