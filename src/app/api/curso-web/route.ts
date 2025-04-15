import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { whatsapp } = body;
    
    if (!whatsapp) {
      return NextResponse.json(
        { error: 'WhatsApp number is required' },
        { status: 400 }
      );
    }
    
    // Log the WhatsApp number (we'll skip database storage for now)
    console.log('WhatsApp number received:', whatsapp);
    
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