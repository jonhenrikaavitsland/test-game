'use client';
import {
  useState,
  useEffect,
  createContext,
  useContext,
} from 'react';
import { account } from '../lib/appwrite';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    account.get().then(
      (res) => setUser(res),
      () => setUser(null)
    );
  }, []);

  const logout = async () => {
    await account.deleteSession('current');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
