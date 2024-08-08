// app/api/login/route.js
import { PrismaClient } from '@prisma/client';
import { comparePassword } from '../../../utils/hash';
import { signToken } from '../../../utils/jwt';
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function POST(req) {
  const { email, password } = await req.json();
  console.log(email, password);

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: 'Invalid email ' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return new Response(JSON.stringify({ error: 'Invalid password' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const token = signToken({ userId: user.id, role: user.role });

    const cookiesStore = cookies();
    cookiesStore.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

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
