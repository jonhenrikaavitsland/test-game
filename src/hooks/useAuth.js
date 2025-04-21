'use client';
import {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from 'react';
import {
  account,
  databases,
  ID,
  Permission,
  Role,
} from '@/lib/appwrite';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  const createPlayerDoc = async (userId, username) => {
    return databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_PLAYERS_COLLECTION_ID,
      userId, // document ID matches user ID
      { userId: username, xp: 0, gold: 0, level: 1 },
      [
        Permission.read(Role.any()),
        Permission.update(Role.user(userId)),
      ]
    );
  };

  const fetchPlayerDoc = async (userId) => {
    try {
      const doc = await databases.getDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_APPWRITE_PLAYERS_COLLECTION_ID,
        userId
      );
      setPlayer(doc);
    } catch (err) {
      console.error('Player fetch error:', err);
      setPlayer(null);
    }
  };

  // Fetch session user
  const fetchUser = useCallback(async () => {
    try {
      const res = await account.get();
      setUser(res);
      await fetchPlayerDoc(res.$id);
    } catch (err) {
      if (err.code && err.code !== 401)
        console.error('Auth fetch error:', err);
      setUser(null);
      setPlayer(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (email, password) => {
    await account.createEmailPasswordSession(email, password);
    await fetchUser();
  };

  const register = async (email, password, username) => {
    const res = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    // create associated player document
    await createPlayerDoc(res.$id, username);
    return res;
  };

  const logout = async () => {
    try {
      await account.deleteSession('current');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
      setPlayer(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, player, loading, login, register, logout }}
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
