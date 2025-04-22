'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect unauthenticated users
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [loading, user, router]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null; // avoid rendering when user is null

  return (
    <div className='text-center mt-20'>
      <h1 className='text-3xl font-bold'>
        Ahoy, {user.name || user.email}!
      </h1>
      <p className='mt-4'>
        Welcome to Pirate Quest. Your adventure awaits.
      </p>
    </div>
  );
}
