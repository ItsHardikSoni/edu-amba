import { NextRequest, NextResponse } from 'next/server';

export default function proxy(req: NextRequest) {
  console.log('Request received:', req.nextUrl.pathname);
  return NextResponse.next();
}
