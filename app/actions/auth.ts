'use server';

import { supabase } from '@/lib/supabase';
import bcrypt from 'bcryptjs';

export async function loginUser(email: string, passwordPlain: string) {
  try {
    // 1. Fetch user from custom user_roles table
    const { data: user, error } = await supabase
      .from('user_roles')
      .select('email, password, role')
      .eq('email', email)
      .single();

    if (error || !user) {
      return { success: false, error: 'Invalid login credentials' };
    }

    // 2. Compare passwords
    // Note: pgcrypto crypt with gen_salt('bf') creates standard bcrypt hashes that bcryptjs can verify!
    const isMatch = await bcrypt.compare(passwordPlain, user.password);

    if (!isMatch) {
      return { success: false, error: 'Invalid login credentials' };
    }

    // 3. Return success and the role
    return { success: true, role: user.role };
  } catch (error) {
    console.error('Login Error:', error);
    return { success: false, error: 'An unexpected server error occurred' };
  }
}
