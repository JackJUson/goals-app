'use client';

import { useState, useEffect, FC, FormEvent } from 'react';
import { Goal } from '@/types/goal';
import { Types } from 'mongoose';

interface GoalFormProps {
  onCreate: (goal: Omit<Goal, 'createdAt' | 'updatedAt'>) => Promise<void>;
  initialData?: Partial<Omit<Goal, 'createdAt' | 'updatedAt'>>;
}

const GoalForm: FC<GoalFormProps> = ({ onCreate, initialData = {} }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');

  useEffect(() => {
    setTitle(initialData?.title || '');
    setDescription(initialData?.description || '');
  }, [initialData]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 84); // 12 weeks
    const _id = new Types.ObjectId();
    await onCreate({ _id, title, description, status: 'pending' });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className='form-control'>
      <h2 className='text-2xl font-bold text-primary text-center mb-2'>What is your Goal?</h2>
      <input
        type='text'
        placeholder='Goal Title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className='input input-bordered mb-2 text-sm'
        required
      />
      <textarea
        placeholder='Goal Description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className='textarea textarea-bordered mb-2 text-sm'
      />
      <button
        type='submit'
        className='btn btn-outline bg-primary text-primary-foreground px-12 mt-2 font-medium'
      >
        {initialData?.title ? 'Update Goal' : 'Create Goal'}
      </button>
    </form>
  );
};

export default GoalForm;
