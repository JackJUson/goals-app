// app/api/goals/route.js
import { NextResponse } from 'next/server';
import Goal from '@/models/Goal';
import connectToDatabase from '@/lib/database';

export const POST = async (request: Request) => {
  try {
    await connectToDatabase();
    const { title, description } = await request.json();
    const newGoal = new Goal({ title, description });
    await newGoal.save();
    return NextResponse.json(newGoal, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const GET = async () => {
  try {
    await connectToDatabase();
    const goals = await Goal.find({});
    return NextResponse.json(goals, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const PUT = async (request: Request) => {
  try {
    await connectToDatabase();
    const { id, title, description, status } = await request.json();
    const updatedGoal = await Goal.findByIdAndUpdate(
      id,
      { title, description, status },
      { new: true }
    );
    return NextResponse.json(updatedGoal, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const DELETE = async (request: Request) => {
  try {
    await connectToDatabase();
    const { id } = await request.json();
    await Goal.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Goal deleted' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
