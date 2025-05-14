import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';

export async function GET() {
  try {
    // Verify admin token
    const headersList = await headers();
    const authToken = headersList.get("x-admin-token");

    if (!authToken || authToken !== process.env.ADMIN_TOKEN) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Fetch all test users
    const testUsers = await prisma.testUser.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        email: true,
        phone: true,
        operatingSystem: true,
        createdAt: true,
        updatedAt: true,
        // Exclude password for security
      }
    });

    // Calculate statistics
    const totalUsers = testUsers.length;
    const androidUsers = testUsers.filter(user => 
      user.operatingSystem.toLowerCase().includes('android')
    ).length;
    const iphoneUsers = testUsers.filter(user => 
      user.operatingSystem.toLowerCase().includes('iphone') || 
      user.operatingSystem.toLowerCase().includes('ios')
    ).length;

    // Get count by day for the last 7 days
    const now = new Date();
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(now.getDate() - 7);
    
    const recentUsers = testUsers.filter(user => 
      new Date(user.createdAt) >= sevenDaysAgo
    );

    const usersByDay = recentUsers.reduce((acc, user) => {
      const date = new Date(user.createdAt).toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return NextResponse.json({
      users: testUsers,
      stats: {
        total: totalUsers,
        android: androidUsers,
        iphone: iphoneUsers,
        recentActivity: Object.entries(usersByDay).map(([date, count]) => ({ date, count }))
      }
    });
  } catch (error) {
    console.error('Error fetching test users:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 