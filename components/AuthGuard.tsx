'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const adminSession = Cookies.get('aura_admin_session');
      // If session exists, consider authenticated regardless of role cookie timing
      if (!adminSession) {
        setIsAuthenticated(false);
        router.replace("/login");
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAuth();

    // Re-run check on back/forward navigation, page show, and visibility change
    const handlePopState = () => checkAuth();
    window.addEventListener('pageshow', checkAuth);
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        checkAuth();
      }
    });

    return () => {
      window.removeEventListener('pageshow', checkAuth);
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('visibilitychange', checkAuth);
    };
  }, [router]);

  if (!isAuthenticated) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
