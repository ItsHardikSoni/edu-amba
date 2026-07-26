import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import nodemailer from 'nodemailer';

// Helper to generate 6‑digit OTP
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Configure nodemailer transport using env variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // 1️⃣ Verify email/password against stored hash
  const { data: user, error } = await supabase
    .from('user_roles')
    .select('email, password, role')
    .eq('email', email)
    .single();

  if (error || !user) {
    return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
  }

  // Compare password hash using bcryptjs (already installed)
  const bcrypt = (await import('bcryptjs')).default;
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
  }

  // 2️⃣ Generate OTP and store with expiration (10 minutes)
  const otp = generateOtp();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

  const { error: updateError } = await supabase
    .from('user_roles')
    .update({ otp, otp_expires_at: expiresAt })
    .eq('email', email);

  if (updateError) {
    return NextResponse.json({ success: false, error: 'Failed to store OTP' }, { status: 500 });
  }

  // 3️⃣ Send OTP email
  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: email,
    subject: 'Your One‑Time Passcode (6‑digit)',
    text: `Your verification code is ${otp}. It expires in 10 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (e) {
    console.error('Mail send error', e);
    // Continue anyway – client will handle failure
  }

  return NextResponse.json({ success: true, message: 'OTP sent' });
}
