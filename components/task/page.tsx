import { Types } from 'mongoose';
import { columns } from './columns';
import { DataTable } from './data-table';
import { Task } from '@/types/task';

async function getDummyTasks(): Promise<Task[]> {
  return [
    {
      _id: new Types.ObjectId(),
      goalId: new Types.ObjectId(),
      weekNumber: 1,
      name: "Task One",
      frequency: "daily",
      dueDate: new Date(),
      days: {
        Mon: true,
        Tue: true,
        Wed: true,
        Thu: true,
        Fri: true,
        Sat: false,
        Sun: false,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: new Types.ObjectId(),
      goalId: new Types.ObjectId(),
      weekNumber: 2,
      name: "Task Two",
      frequency: "3",
      dueDate: new Date(),
      days: {
        Mon: false,
        Tue: true,
        Wed: false,
        Thu: true,
        Fri: false,
        Sat: true,
        Sun: false,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: new Types.ObjectId(),
      goalId: new Types.ObjectId(),
      weekNumber: 3,
      name: "Task Three",
      frequency: "1",
      dueDate: new Date(),
      days: {
        Mon: false,
        Tue: false,
        Wed: false,
        Thu: false,
        Fri: true,
        Sat: false,
        Sun: false,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    // Add more tasks as needed...
  ];
}

export default async function DemoPage() {
  const data = await getDummyTasks();

  return (
    <div className='container pr-0 pl-0 py-10'>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
