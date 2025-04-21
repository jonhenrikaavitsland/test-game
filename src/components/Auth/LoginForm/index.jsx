'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();
  const { login } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      router.push('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className='max-w-md mx-auto p-6 bg-white rounded shadow mt-10 space-y-4'
    >
      <h1 className='text-2xl'>Login</h1>
      {error && <p className='text-red-500'>{error}</p>}
      <input
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className='w-full border px-3 py-2 rounded'
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className='w-full border px-3 py-2 rounded'
      />
      <button
        type='submit'
        className='w-full bg-blue-600 text-white py-2 rounded'
      >
        Login
      </button>
    </form>
  );
}
