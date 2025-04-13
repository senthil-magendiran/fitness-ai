import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
  userId:   { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type:     { type: String, required: true },
  duration: { type: Number },
  reps:     { type: Number },
  sets:     { type: Number },
  date:     { type: Date, default: Date.now }
});

export default mongoose.model("Workout", workoutSchema);