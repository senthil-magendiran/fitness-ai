'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';


export default function MealPlanner() {
  const [goal, setGoal] = useState("gain");
  const [mealPlan, setMealPlan] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }, []);

  const fetchMealPlan = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:3000/api/mealplan",
        { goal },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMealPlan(res.data.mealPlan);
    } catch (err) {
      alert("Failed to generate meal plan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">AI Meal Planner 🍽️</h1>

      <select
        className="border rounded p-2 mb-4"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      >
        <option value="gain">Gain Weight</option>
        <option value="lose">Lose Weight</option>
        <option value="maintain">Maintain Weight</option>
      </select>

      <button
        onClick={fetchMealPlan}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Generating..." : "Generate Meal Plan"}
      </button>

      {mealPlan && (
        <div className="mt-6 bg-white shadow-md rounded p-4">
          <ul className="space-y-2">
            <li><strong>Breakfast:</strong> {mealPlan.breakfast}</li>
            <li><strong>Lunch:</strong> {mealPlan.lunch}</li>
            <li><strong>Dinner:</strong> {mealPlan.dinner}</li>
            <li><strong>Snacks:</strong> {mealPlan.snacks}</li>
            <li><strong>Total Calories:</strong> {mealPlan.totalCalories}</li>
          </ul>
        </div>
      )}
    </div>
  );
}
