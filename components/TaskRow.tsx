'use client';

import { useState, useEffect, FC, ChangeEvent } from 'react';
import { Task as TaskType } from '@/types/task';
import { Goal } from '@/types/goal';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const frequencyOptions = [
  { value: 'daily', label: 'Daily', days: 7 },
  { value: '6', label: '6 times', days: 6 },
  { value: '5', label: '5 times', days: 5 },
  { value: '4', label: '4 times', days: 4 },
  { value: '3', label: '3 times', days: 3 },
  { value: '2', label: '2 times', days: 2 },
  { value: '1', label: '1 time', days: 1 },
];

interface TaskRowProps {
  task: TaskType;
  goals: Goal[];
  updateTask: (task: TaskType) => void;
  selectedTasks: string[];
  setSelectedTasks: (tasks: string[]) => void;
}

const TaskRow: FC<TaskRowProps> = ({
  task,
  goals,
  updateTask,
  selectedTasks,
  setSelectedTasks,
}) => {
  const [name, setName] = useState(task.name || '');
  const [goalId, setGoalId] = useState(task.goalId?.toString() || '');
  const [frequency, setFrequency] = useState<string>(task.frequency || 'daily');
  const [dueDate, setDueDate] = useState(
    task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
  );
  const [days, setDays] = useState<{ [key: string]: boolean }>(
    task.days || {
      Mon: false,
      Tue: false,
      Wed: false,
      Thu: false,
      Fri: false,
      Sat: false,
      Sun: false,
    }
  );
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const selectedFrequency = frequencyOptions.find((option) => option.value === frequency);
    const completedDays = Object.values(days).filter(Boolean).length;
    const totalDays = selectedFrequency?.days || 0;
    const newProgress = totalDays
      ? Math.min(Math.round((completedDays / totalDays) * 100), 100)
      : 0;
    setProgress(newProgress);
  }, [days, frequency]);

  const handleChange = async (field: keyof TaskType, value: any) => {
    try {
      const updatedTask = { ...task, [field]: value };
      updateTask(updatedTask);
      await fetch(`/api/tasks/${task._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [field]: value }),
      });
    } catch (error) {
      console.error(`Failed to update ${field}:`, error);
    }
  };

  const toggleDay = (day: string) => {
    const updatedDays = { ...days, [day]: !days[day] };
    setDays(updatedDays);
    handleChange('days', updatedDays);
  };

  const handleSelectTask = () => {
    if (selectedTasks.includes(task._id.toString())) {
      setSelectedTasks(selectedTasks.filter((id) => id !== task._id.toString()));
    } else {
      setSelectedTasks([...selectedTasks, task._id.toString()]);
    }
  };

  return (
    <tr className={`task-row ${selectedTasks.includes(task._id.toString()) ? 'selected-row' : ''}`}>
      <td className='border border-border border-l-0'>
        <div className='flex items-center'>
          <div
            className={`hidden-checkbox ${
              selectedTasks.includes(task._id.toString()) ? 'selected-checkbox' : ''
            }`}
          >
            BOX
          </div>
          <input
            type='text'
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              handleChange('name', e.target.value);
            }}
            className='w-full bg-background outline-none cursor-pointer focus:cursor-text focus:bg-muted-foreground'
          />
        </div>
      </td>
      <td className='border border-border px-2'>
        <select
          value={goalId}
          onChange={(e) => {
            setGoalId(e.target.value);
            handleChange('goalId', e.target.value);
          }}
          className='w-full bg-background outline-none cursor-pointer'
        >
          <option value=''>Select Goal</option>
          {goals.map((goal) => (
            <option key={goal._id.toString()} value={goal._id.toString()}>
              {goal.title}
            </option>
          ))}
        </select>
      </td>
      <td className='border border-border px-2'>
        <select
          value={frequency}
          onChange={(e) => {
            setFrequency(e.target.value);
            handleChange('frequency', e.target.value);
          }}
          className='w-full bg-background outline-none cursor-pointer'
        >
          {frequencyOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </td>
      <td className='border border-border px-2'>
        <input
          type='date'
          value={dueDate}
          onChange={(e) => {
            setDueDate(e.target.value);
            handleChange('dueDate', e.target.value);
          }}
          className='w-full bg-background outline-none cursor-pointer'
        />
      </td>
      {daysOfWeek.map((day) => (
        <td key={day} className='border border-border'>
          <div className='flex justify-center items-center'>
            <input type='checkbox' checked={days[day]} onChange={() => toggleDay(day)} />
          </div>
        </td>
      ))}
      {/* <td className='border border-border border-r-0'>
        <ProgressBar progress={progress} />
      </td> */}
    </tr>
  );
};

export default TaskRow;
