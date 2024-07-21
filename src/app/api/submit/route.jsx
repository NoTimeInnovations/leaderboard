import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// POST
export async function POST(req) {
  const { userId, problemId, content } = await req.json();

  try{
    const existingSubmission = await prisma.submission.findFirst({
      where: {
        userId,
        problemId,
      },
    });

    if(existingSubmission){
      return new Response(JSON.stringify({ error: 'You have already submitted a solution for this problem.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const submission = await prisma.submission.create({
      data: {
        userId,
        problemId,
        content,
      },
    });

    return new Response(JSON.stringify({ message: 'Solution submitted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  catch (error) {
    console.error('Error submitting solution:', error);
    return new Response(JSON.stringify({ error: 'Error submitting solution', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}