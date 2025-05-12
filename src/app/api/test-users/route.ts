import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, phone, password, operatingSystem } = body;

    // Basic validation
    if (!email || !phone || !password || !operatingSystem) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create or update the user
    const user = await prisma.testUser.upsert({
      where: {
        email: email,
      },
      update: {
        phone,
        password: hashedPassword,
        operatingSystem,
      },
      create: {
        email,
        phone,
        password: hashedPassword,
        operatingSystem,
      },
    });

    // Return success without sensitive data
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        operatingSystem: user.operatingSystem,
      },
    });
  } catch (error: any) {
    console.error('Error creating test user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 