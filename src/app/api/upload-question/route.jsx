// app/api/upload-question/route.js
"use server"
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export async function POST(request) {
  const { title, description, score, category } = await request.json();

  try {
    const problem = await prisma.problem.create({
      data: {
        title,
        description,
        score: parseInt(score),
        category,
      },
    });
    return NextResponse.json(problem, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create problem' }, { status: 500 });
  }
}
