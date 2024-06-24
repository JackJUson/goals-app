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
      <div className='m-6 flex justify-between'>
        <div className=''>
          <Link href='/' className='mr-3'>
            <Button variant='outline'>Home</Button>
          </Link>
          <AlertDialogDemo />
        </div>
        <ModeToggle />
      </div>
      <div className='flex flex-col items-center justify-center min-h-screen bg-background'>
        <div className='w-full flex justify-center items-center'>
          <GoalList goals={goals} onEdit={handleEditGoal} onDelete={handleDeleteGoal} />
        </div>
        {[...Array(12)].map((_, index) => (
          <WeeklyTable key={index} weekNumber={index + 1} goals={goals} />
        ))}
      </div>
    </div>
  );
}
