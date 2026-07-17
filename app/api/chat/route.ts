import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message, address } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    if (!address) {
      return NextResponse.json(
        { error: 'Address is required' },
        { status: 400 }
      );
    }

    // Placeholder AI response
    const responses = [
      'I can help you manage your AGL tokens and credits on Base Mainnet.',
      'Your portfolio is looking good! Would you like to transfer some tokens?',
      'I can provide insights about your blockchain transactions and activities.',
      'What would you like to do? Transfer tokens, burn for credits, or view history?',
      'I\'m here to assist with your AGL Super Agent account and transactions.',
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    return NextResponse.json({
      success: true,
      message: randomResponse,
      address,
    });
  } catch (error) {
    console.error('[API] Chat error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
