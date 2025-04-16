import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      whatsapp,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term 
    } = body;
    
    if (!whatsapp) {
      return NextResponse.json(
        { error: 'WhatsApp number is required' },
        { status: 400 }
      );
    }
    
    // Save to database with UTM parameters
    await prisma.whatsappLead.create({
      data: {
        whatsapp,
        source: 'curso-web',
        utm_source: utm_source || null,
        utm_medium: utm_medium || null,
        utm_campaign: utm_campaign || null,
        utm_content: utm_content || null,
        utm_term: utm_term || null
      }
    });
    
    return NextResponse.json(
      { success: true, message: 'WhatsApp number received successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing WhatsApp number:', error);
    
    return NextResponse.json(
      { error: 'An error occurred while processing the WhatsApp number' },
      { status: 500 }
    );
  }
}