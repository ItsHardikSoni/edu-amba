import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  const { email, otp } = await request.json();

  // Fetch stored OTP and expiration
  const { data: user, error } = await supabase
    .from('user_roles')
    .select('otp, otp_expires_at, role')
    .eq('email', email)
    .single();

  if (error || !user) {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }

  const now = new Date();
  const expiresAt = new Date(user.otp_expires_at);

  if (user.otp !== otp || now > expiresAt) {
    return NextResponse.json({ success: false, error: 'Invalid or expired OTP' }, { status: 401 });
  }

  // Clear OTP fields
  await supabase
    .from('user_roles')
    .update({ otp: null, otp_expires_at: null })
    .eq('email', email);

  return NextResponse.json({ success: true, role: user.role });
}
