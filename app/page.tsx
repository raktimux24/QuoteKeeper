// app/page.tsx
'use client';

import { useEffect } from 'react';
import LoginPage from './login/page';
import { useAuth } from '@/app/providers/auth-provider';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 dark:border-amber-400"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return null;
}