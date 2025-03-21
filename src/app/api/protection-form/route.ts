import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, whatsapp } = body;

    // Get UTM parameters from the URL if they exist
    const url = new URL(request.url);
    const utm_source = url.searchParams.get('utm_source') || null;
    const utm_medium = url.searchParams.get('utm_medium') || null;
    const utm_campaign = url.searchParams.get('utm_campaign') || null;
    const utm_content = url.searchParams.get('utm_content') || null;
    const utm_term = url.searchParams.get('utm_term') || null;

    // Validate required fields
    if (!name || !email || !whatsapp) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create new lead
    const lead = await prisma.protectionFormLead.create({
      data: {
        name,
        email,
        whatsapp,
        utm_source,
        utm_medium,
        utm_campaign,
        utm_content,
        utm_term,
      },
    });

    return NextResponse.json(lead);
  } catch (error) {
    console.error('Error creating protection form lead:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 