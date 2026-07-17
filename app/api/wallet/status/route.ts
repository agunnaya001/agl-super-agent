import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { address } = await request.json();

    if (!address) {
      return NextResponse.json(
        { error: 'Address is required' },
        { status: 400 }
      );
    }

    // Validate address format
    const isValidAddress = /^0x[a-fA-F0-9]{40}$/.test(address);
    if (!isValidAddress) {
      return NextResponse.json(
        { error: 'Invalid address format' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      address,
      connected: true,
      network: 'base',
    });
  } catch (error) {
    console.error('[API] Wallet status error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
