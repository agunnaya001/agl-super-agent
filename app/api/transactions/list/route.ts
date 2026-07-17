import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const address = request.nextUrl.searchParams.get('address');
    const limit = request.nextUrl.searchParams.get('limit') || '50';

    if (!address) {
      return NextResponse.json(
        { error: 'Address is required' },
        { status: 400 }
      );
    }

    const parsedLimit = Math.min(parseInt(limit), 100);

    // Placeholder response - in production this would fetch from database or blockchain indexer
    return NextResponse.json({
      success: true,
      address,
      transactions: [],
      total: 0,
      limit: parsedLimit,
    });
  } catch (error) {
    console.error('[API] Transactions list error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
