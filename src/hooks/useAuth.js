'use client';
import {
  useState,
  useEffect,
  createContext,
  useContext,
} from 'react';
import { account, ID } from '@/lib/appwrite';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch session user
  const fetchUser = async () => {
    try {
      const res = await account.get();
      setUser(res);
    } catch (err) {
      if (err.code && err.code !== 401)
        console.error('Auth fetch error:', err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (email, password) => {
    await account.createEmailPasswordSession(email, password);
    await fetchUser();
  };

  const register = async (email, password, name) => {
    await account.create(ID.unique(), email, password, name);
    // Optionally auto-login or simply return
  };

  const logout = async () => {
    try {
      await account.deleteSession('current');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
