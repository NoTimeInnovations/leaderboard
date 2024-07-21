// app/api/fetch-problem/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const problems = await prisma.problem.findMany();
    return NextResponse.json(problems, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch problems' }, { status: 500 });
  }
}