import { Types } from 'mongoose';

export type Task = {
  _id: Types.ObjectId;
  goalId?: Types.ObjectId;
  weekNumber?: number;
  name?: string;
  frequency?: 'daily' | '6' | '5' | '4' | '3' | '2' | '1';
  dueDate?: Date;
  days?: {
    Mon: boolean;
    Tue: boolean;
    Wed: boolean;
    Thu: boolean;
    Fri: boolean;
    Sat: boolean;
    Sun: boolean;
  };
  createdAt?: Date;
  updatedAt?: Date;
};
