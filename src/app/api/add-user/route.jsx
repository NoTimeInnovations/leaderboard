import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../../../utils/hash';
import { signToken } from '../../../utils/jwt';

const prisma = new PrismaClient();

export async function POST(req) {
  const { username, email, password } = await req.json();

  try {
    // Check if the username already exists
    const existingUsername = await prisma.user.findFirst({
      where: { username },
    });

    if (existingUsername) {
      return new Response(JSON.stringify({ error: 'Username already exists. Please choose a different username.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Check if the email already exists
    const existingUseremail = await prisma.user.findFirst({
      where: { email },
    });

    if (existingUseremail) {
      return new Response(JSON.stringify({ error: 'Email already exists. Please log in or use a different email.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Check if the provided email and password match the admin credentials
    const isAdmin = email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD;
    const role = isAdmin ? 'admin' : 'user';

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role, // Assign the role based on the credentials check
      },
    });

    const token = signToken({ userId: user.id, role: user.role });

    return new Response(JSON.stringify({ message: 'User added successfully', token }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error adding user:', error);
    return new Response(JSON.stringify({ error: 'Error adding user', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}