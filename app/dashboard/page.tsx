'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ModeToggle';
import GoalForm from '@/components/GoalForm';
import GoalList from '@/components/GoalList';
import WeeklyTable from '@/components/WeeklyTable';
import { Goal } from '@/types/goal';
import { AlertDialogDemo } from '@/components/Modal';

export default function Dashboard() {
  const [goals, setGoals] = useState([]);
  const [editingGoal, setEditingGoal] = useState<
    Partial<Omit<Goal, 'createdAt' | 'updatedAt'>> | undefined
  >(undefined);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    const response = await fetch('/api/goals');
    const data = await response.json();
    setGoals(data);
  };

  const handleDeleteGoal = async (id: string) => {
    await fetch(`/api/goals`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchGoals();
  };

  const handleEditGoal = (goal: Goal) => {
    setEditingGoal(goal);
  };

  return (
    <div className='max-w-5xl mx-auto min-h-screen'>
      <div className='flex flex-col justify-center min-h-screen bg-background'>
        <div className='flex justify-between mt-12'>
          <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
            &nbsp;2024 Goal 🎯
          </h1>
          <div className='flex items-center gap-3'>
            <Link href='/'>
              <Button variant='outline'>Home</Button>
            </Link>
            <AlertDialogDemo />
            <ModeToggle />
          </div>
        </div>
        <br />
        <br />
        <h2 className='scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0'>
          &nbsp;12 Week Goals
        </h2>
        <div className='w-full flex justify-center items-center'>
          <GoalList goals={goals} onEdit={handleEditGoal} onDelete={handleDeleteGoal} />
        </div>
        <br />
        <br />
        <h2 className='scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0'>
          &nbsp;Tasks
        </h2>
        {[...Array(12)].map((_, index) => (
          <WeeklyTable key={index} weekNumber={index + 1} goals={goals} />
        ))}
      </div>
    </div>
  );
}
