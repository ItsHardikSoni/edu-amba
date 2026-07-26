'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2, KeyRound, Mail, ArrowLeft, Eye, EyeOff, Store } from "lucide-react";
import Cookies from "js-cookie";
import { supabase } from "@/lib/supabase";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const loginSchema = z.object({
  email: z.string().regex(emailRegex, { message: "Invalid email address format" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'login' | 'verifyOtp' | 'pin'>('login');
  const [otp, setOtp] = useState("");
  const [pin, setPin] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [shopName, setShopName] = useState("");

  // Using shared supabase instance

  useEffect(() => {
    async function getShopName() {
      const { data } = await supabase.from('store_info').select('name').eq('id', 1).single();
      if (data?.name) {
        setShopName(data.name);
      }
    }
    getShopName();
  }, [supabase]);

  useEffect(() => {
    async function checkExistingSession() {
      const session = Cookies.get('aura_admin_session');
      if (!session) return;

      try {
        // Try to get current user from Supabase; if present, show PIN prompt
        if (!supabase) {
          router.replace('/admin/dashboard');
          return;
        }

        const { data, error } = await supabase.auth.getUser();
        const userEmail = (data as any)?.user?.email;

        if (userEmail) {
          setEmail(userEmail);
          setStep('pin');
          return;
        }
      } catch (err) {
        // ignore and fallback to redirect
      }

      router.replace("/admin/dashboard");
    }

    checkExistingSession();
  }, [router, supabase]);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSendOtp = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });

      const result = await response.json();
      if (result.success) {
        setEmail(data.email);
        setStep('verifyOtp');
      } else {
        setError(result.error || "Invalid email or password");
      }
    } catch (err) {
      setError("Connection error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const onVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit code");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const result = await response.json();
      if (result.success) {
        // Create session token
        const mockToken = btoa(JSON.stringify({
          user: 'admin',
          role: 'manager',
          exp: Date.now() + 24 * 60 * 60 * 1000
        }));

        Cookies.set('aura_admin_session', mockToken, {
          expires: 1,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });

        // Set user role for AuthGuard
        Cookies.set('user_role', 'admin', {
          expires: 1,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });

        router.replace("/admin/dashboard");
      } else {
        setError(result.error || "Invalid OTP code");
      }
    } catch (err) {
      setError("Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const onVerifyPin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!pin || pin.length < 4) {
      setError("Please enter your security PIN");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/verify-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, pin }),
      });

      const result = await response.json();
      if (result.success) {
        router.replace('/admin/dashboard'); // keep only router navigation
      } else {
        setError(result.error || 'Incorrect PIN');
      }
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 'verifyOtp') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 space-y-6">
          <button
            onClick={() => setStep('login')}
            className="flex items-center gap-2 text-xs text-gray-500 hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="w-3 h-3" /> Change Email
          </button>

          <div className="text-center mb-6">
            <div className="mx-auto w-16 h-16 bg-gradient-to-tr from-primary to-gold-400 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <KeyRound className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Verify Your Identity</h3>
            <p className="text-gray-600 mt-2">
              An email with a 6-digit verification code has been sent to <br />
              <span className="font-semibold text-primary">{email}</span>.
            </p>
          </div>

          {error && (
            <div className="p-4 rounded-lg bg-red-50 text-red-700 border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={onVerifyOtp} className="space-y-6">
            <div>
              <label htmlFor="otp-input" className="sr-only">
                Verification Code
              </label>
              <input
                id="otp-input"
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="000-000"
                className="block w-full text-center text-4xl tracking-[12px] font-mono font-bold rounded-xl border-2 border-gray-200 py-4 text-gray-800 placeholder:text-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all"
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || otp.length !== 6}
              className="group relative flex w-full justify-center rounded-xl bg-gradient-to-r from-primary to-indigo-600 px-4 py-4 text-sm font-bold text-white hover:from-indigo-600 hover:to-primary transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60"
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Verify & Sign In"}
            </button>

            <div className="text-center text-sm text-gray-500">
              <span>Didn't receive the code?</span>{' '}
              <button
                type="button"
                onClick={() => onSendOtp(getValues())}
                className="font-semibold text-primary hover:text-indigo-600 hover:underline"
                disabled={isLoading}
              >
                Resend OTP
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // PIN prompt for existing sessions
  if (step === 'pin') {
    return (
      <div className="mt-8 space-y-6">
        <button
          onClick={() => {
            Cookies.remove('aura_admin_session');
            setStep('login');
          }}
          className="flex items-center gap-2 text-xs text-gray-500 hover:text-primary transition-colors mb-4"
        >
          <ArrowLeft className="w-3 h-3" /> Use different account
        </button>

        <div className="text-center mb-6">
          <div className="mx-auto w-12 h-12 bg-gold-50 rounded-full flex items-center justify-center mb-4">
            <KeyRound className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">Enter Security PIN</h3>
          <p className="text-sm text-gray-500 mt-1">For security, enter your PIN for <br /><span className="font-semibold text-gray-700">{email}</span></p>
        </div>

        {error && (
          <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={onVerifyPin} className="space-y-6">
          <div>
            <input
              type="password"
              maxLength={6}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
              placeholder="••••"
              className="block w-full text-center text-3xl tracking-[10px] font-bold rounded-xl border-0 py-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary transition-all"
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || pin.length < 4}
            className="group relative flex w-full justify-center rounded-xl bg-black px-3 py-4 text-sm font-bold text-white hover:bg-gray-900 transition-all shadow-xl disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Verify & Continue"}
          </button>

          <p className="text-center text-xs text-gray-400">Not you? <button type="button" onClick={() => {
        setStep('login');
          }} className="text-primary font-semibold hover:underline">Sign in as different user</button></p>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center">{shopName ? `Welcome to ${shopName}` : 'Login'}</h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSendOtp)}>
          {error && (
            <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm border border-red-200">
              {error}
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Username or Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                autoComplete="off"
                className="block w-full rounded-xl border-0 py-3 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm transition-all bg-gray-50/50"
                placeholder="username or email"
                {...register('email')}
              />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <KeyRound className="h-4 w-4 text-gray-400" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                className="block w-full rounded-xl border-0 py-3 pl-10 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm transition-all bg-gray-50/50"
                placeholder="••••••••"
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
            <div className="text-right mt-2">
              <a href="/forgot-password" className="text-xs text-primary hover:underline">Forgot Password?</a>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="group relative flex w-full justify-center rounded-xl bg-black px-3 py-4 text-sm font-bold text-white hover:bg-gray-900 transition-all shadow-xl disabled:opacity-70"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Continue to Verify"}
          </button>
        </form>
      </div>
    </div>
  );
}
