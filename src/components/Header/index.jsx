'use client';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className='flex items-center justify-between p-4 bg-gray-800 text-white'>
      <div className='text-xl font-bold'>
        <Link href='/'>Pirate</Link>
      </div>
      <nav>
        {user ? (
          <div className='flex items-center space-x-4'>
            <span>Welcome, {user.email}</span>
            <button
              onClick={logout}
              className='px-3 py-1 bg-red-500 rounded'
            >
              Logout
            </button>
          </div>
        ) : (
          <div className='flex space-x-4'>
            <Link
              href='/login'
              className='px-3 py-1 bg-blue-500 rounded'
            >
              Login
            </Link>
            <Link
              href='/register'
              className='px-3 py-1 bg-green-500 rounded'
            >
              Register
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
