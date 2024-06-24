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

  const handleCreateGoal = async (goal: Goal) => {
    if (editingGoal) {
      await fetch(`/api/goals`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...goal, id: editingGoal._id }),
      });
      setEditingGoal(undefined);
    } else {
      await fetch('/api/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(goal),
      });
    }
    fetchGoals();
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
      <div className='p-6 flex justify-between'>
        <div className=''>
          <Link href='/' className='mr-3'>
            {/* <button className='btn btn-outline bg-primary text-primary-foreground px-12 font-medium'>
            Home
            </button> */}
            <Button variant='outline'>Home</Button>
          </Link>
        </div>
        <ModeToggle />
      </div>
      <div className='flex flex-col items-center justify-center min-h-screen bg-background'>
        {/* <h1 className='text-6xl font-heading font-[550] mb-4 text-primary'>Dashboard</h1> */}

        <AlertDialogDemo />

        <GoalForm onCreate={handleCreateGoal} initialData={editingGoal} />

        <div className='w-full my-9 flex justify-center items-center'>
          <GoalList goals={goals} onEdit={handleEditGoal} onDelete={handleDeleteGoal} />
        </div>
        {[...Array(12)].map((_, index) => (
          <WeeklyTable key={index} weekNumber={index + 1} goals={goals} />
        ))}
      </div>
    </div>
  );
}
