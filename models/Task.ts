import { Schema, model, models, Types } from 'mongoose';
import { Task } from '@/types/task';

const TaskSchema = new Schema<Task>(
  {
    goalId: {
      type: Types.ObjectId,
      ref: 'Goal',
      required: false,
    },
    weekNumber: {
      type: Number,
      required: false,
    },
    name: {
      type: String,
      required: false,
      default: 'Unnamed Task', // Provide a default value
    },
    frequency: {
      type: String,
      enum: ['daily', '6', '5', '4', '3', '2', '1'],
      default: 'daily',
    },
    dueDate: {
      type: Date,
      required: false,
    },
    days: {
      Mon: { type: Boolean, default: false },
      Tue: { type: Boolean, default: false },
      Wed: { type: Boolean, default: false },
      Thu: { type: Boolean, default: false },
      Fri: { type: Boolean, default: false },
      Sat: { type: Boolean, default: false },
      Sun: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

export default models.Task || model<Task>('Task', TaskSchema);
