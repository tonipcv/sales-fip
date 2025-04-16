import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    console.log('Received request');
    const body = await request.json();
    console.log('Request body:', body);
    
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
    
    console.log('Attempting to save to database with data:', {
      whatsapp,
      source: 'curso-web',
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term
    });
    
    // Save to database with UTM parameters
    const result = await prisma.whatsappLead.create({
      data: {
        whatsapp,
        source: 'curso-web',
        utm_source: utm_source || undefined,
        utm_medium: utm_medium || undefined,
        utm_campaign: utm_campaign || undefined,
        utm_content: utm_content || undefined,
        utm_term: utm_term || undefined
      }
    });
    
    console.log('Successfully saved to database:', result);
    
    return NextResponse.json(
      { success: true, message: 'WhatsApp number received successfully' },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : '';
    console.error('Error processing WhatsApp number - Message:', errorMessage);
    if (errorStack) {
      console.error('Error Stack:', errorStack);
    }
    
    return NextResponse.json(
      { error: 'An error occurred while processing the WhatsApp number' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}