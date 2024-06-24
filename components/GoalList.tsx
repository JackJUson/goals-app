'use client';

import Link from 'next/link';
import { FC } from 'react';
import { Goal } from '@/types/goal';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface GoalListProps {
  goals: Goal[];
  onEdit: (goal: Goal) => void; // Ensure this line is added
  onDelete: (id: string) => Promise<void>;
}

const GoalList: FC<GoalListProps> = ({ goals }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-6'>
      {goals.map((goal) => (
        <Card
          className='shadow-lg hover:scale-105 hover:ease-in-out duration-200'
          key={goal.createdAt?.toString()}
        >
          <CardHeader>
            <CardTitle>{goal.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{goal.description}</CardDescription>
          </CardContent>
          <CardFooter className='flex justify-between'>
            <CardDescription>Status: {goal.status}</CardDescription>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default GoalList;
