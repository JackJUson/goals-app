'use client';

import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { Goal } from '@/types/goal';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

// interface GoalListProps {
//   goals: Goal[];
//   // onEdit: (goal: Goal) => void;
//   // onDelete: (id: string) => Promise<void>;
// }

const GoalList = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  // const [editingGoal, setEditingGoal] = useState<
  //   Partial<Omit<Goal, 'createdAt' | 'updatedAt'>> | undefined
  // >(undefined);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    const response = await fetch('/api/goals');
    const data = await response.json();
    setGoals(data);
  };

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-6'>
      {goals.map((goal) => (
        <Card
          className='shadow-lg hover:scale-105 hover:ease-in-out duration-200 cursor-pointer'
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
