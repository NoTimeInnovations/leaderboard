// app/api/login/route.js
import { PrismaClient } from '@prisma/client';
import { comparePassword } from '../../../utils/hash';
import { signToken } from '../../../utils/jwt';

const prisma = new PrismaClient();

export async function POST(req) {
  const { email, password } = await req.json();

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: 'Invalid email or password' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return new Response(JSON.stringify({ error: 'Invalid email or password' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const token = signToken({ userId: user.id });

    return new Response(JSON.stringify({ message: 'Login successful', token }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error logging in:', error);
    return new Response(JSON.stringify({ error: 'Error logging in' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
