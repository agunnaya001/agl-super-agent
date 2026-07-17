import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const address = request.nextUrl.searchParams.get('address');
    const token = request.nextUrl.searchParams.get('token');

    if (!address) {
      return NextResponse.json(
        { error: 'Address is required' },
        { status: 400 }
      );
    }

    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
    }

    // Placeholder response - in production this would call the blockchain
    return NextResponse.json({
      success: true,
      address,
      token,
      balance: '0',
      unit: 'wei',
    });
  } catch (error) {
    console.error('[API] Balance error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
