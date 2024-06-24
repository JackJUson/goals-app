import connectToDatabase from '@/lib/database';
import Task from '@/models/Task';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  try {
    await connectToDatabase();

    const { goalId, weekNumber, name, frequency, dueDate, days } = await request.json();

    const newTask = new Task({
      goalId: goalId || null,
      weekNumber: weekNumber || null,
      name: name || 'Unnamed Task',
      frequency: frequency || 'daily',
      dueDate: dueDate || null,
      days: days || {
        Mon: false,
        Tue: false,
        Wed: false,
        Thu: false,
        Fri: false,
        Sat: false,
        Sun: false,
      },
    });

    await newTask.save();

    return NextResponse.json(newTask, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const GET = async (request: Request) => {
  try {
    await connectToDatabase();
    const urlSearchParams = new URL(request.url).searchParams;
    const goalId = urlSearchParams.get('goalId');
    const weekNumber = parseInt(urlSearchParams.get('weekNumber') ?? '0', 10);
    const query = { goalId: { $in: goalId?.split(',') || [] }, weekNumber };
    const tasks = await Task.find(query);
    return NextResponse.json(tasks, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
