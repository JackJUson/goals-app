'use client';

import Link from 'next/link';
import { FC } from 'react';
import { Goal } from '@/types/goal';

interface GoalListProps {
  goals: Goal[];
  onEdit: (goal: Goal) => void; // Ensure this line is added
  onDelete: (id: string) => Promise<void>;
}

const GoalList: FC<GoalListProps> = ({ goals }) => {
  return (
    <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-4 p-5'>
      {goals.map((goal) => (
        <li
          key={goal.createdAt?.toString() || goal.dueDate.toString()}
          className='relative overflow-hidden rounded-lg border border-border bg-background shadow-lg p-4 hover:scale-105 hover:ease-in-out duration-200'
        >
          <Link
            href={`/goals/${goal.createdAt?.toString() || goal.dueDate.toString()}`}
            className='block p-2 rounded'
          >
            <h3 className='text-lg font-bold'>{goal.title}</h3>
            <p>{goal.description}</p>
            <p>Status: {goal.status}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default GoalList;
