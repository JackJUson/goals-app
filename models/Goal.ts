import { Schema, model, models } from 'mongoose';
import { Goal } from "@/types/goal";

const GoalSchema = new Schema<Goal>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export default models.Goal || model<Goal>('Goal', GoalSchema);
