import { Types } from 'mongoose';

export type Goal = {
  _id: Types.ObjectId;
  title: string;
  description?: string;
  status?: 'pending' | 'in-progress' | 'completed';
  createdAt?: Date;
  updatedAt?: Date;
};
