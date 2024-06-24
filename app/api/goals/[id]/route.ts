import { NextResponse } from 'next/server';
import Goal from '@/models/Goal';
import connectToDatabase from '@/lib/database';


export const GET = async (request: Request, { params }: { params: any }) => {
  try {
    await connectToDatabase();
    const goal = await Goal.findById(params.id);
    if (!goal) {
      return NextResponse.json({ error: 'Goal not found' }, { status: 404 });
    }
    return NextResponse.json(goal, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
