import connectToDatabase from '@/lib/database';
import Task from '@/models/Task';
import { NextResponse } from 'next/server';

export const PATCH = async (request: Request, { params }: { params: any }) => {
  try {
    await connectToDatabase();
    const { id } = params;
    const updateData = await request.json();

    const updatedTask = await Task.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedTask) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const DELETE = async (request: Request, { params }: { params: any }) => {
  try {
    await connectToDatabase();
    const { id } = params;

    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Task deleted' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
