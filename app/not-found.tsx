'use client';

import Link from 'next/link';
import LottiePlayer from '../components/lottie-player';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <LottiePlayer
        src="/404 Robot Error.json"
        style={{ width: '500px', height: '500px' }}
      />
      <h1 className="text-4xl font-bold text-gray-900 mt-8">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mt-4">Sorry, the page you are looking for does not exist.</p>
      <Link href="/" className="mt-8 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700">
        Go back to homepage
      </Link>
    </div>
  );
}
