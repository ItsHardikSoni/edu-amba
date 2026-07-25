'use client';
import { Bell, Book, CheckCircle, DollarSign, UserPlus, Award, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import AuthGuard from '@/components/AuthGuard';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      try {
        await fetch('/api/auth/logout', { method: 'POST' });
      } catch (error) {
        console.error('An unexpected error occurred during logout:', error);
      }
      
      Cookies.remove('aura_admin_session');
      localStorage.clear();
      sessionStorage.clear();
      router.replace('/');
    }
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md flex flex-col">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
          </div>
          <nav className="mt-6 flex-1">
            <a href="/admin/dashboard" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-200">
              <Book className="w-6 h-6" />
              <span className="mx-3">Dashboard</span>
            </a>
            <a href="/admin/new-admission" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-200">
              <UserPlus className="w-6 h-6" />
              <span className="mx-3">New Admission</span>
            </a>
            <a href="/admin/fees" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-200">
              <DollarSign className="w-6 h-6" />
              <span className="mx-3">Fees</span>
            </a>
            <a href="/admin/results" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-200">
              <Award className="w-6 h-6" />
              <span className="mx-3">Results</span>
            </a>
            <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-200">
              <CheckCircle className="w-6 h-6" />
              <span className="mx-3">Grades</span>
            </a>
            <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-200">
              <Bell className="w-6 h-6" />
              <span className="mx-3">Announcements</span>
            </a>
          </nav>
          <div className="p-6">
            <button onClick={handleLogout} className="flex items-center w-full px-6 py-3 text-gray-600 hover:bg-gray-200 rounded-md">
              <LogOut className="w-6 h-6" />
              <span className="mx-3">Logout</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-10">
          {children}
        </div>
      </div>
    </AuthGuard>
  );
}
