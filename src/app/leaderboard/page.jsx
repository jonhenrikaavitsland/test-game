'use client';

import { useEffect, useState } from 'react';
import { databases, Query } from '@/lib/appwrite';
import Link from 'next/link';

export default function LeaderboardPage() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const res = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          process.env.NEXT_PUBLIC_APPWRITE_PLAYERS_COLLECTION_ID,
          [Query.orderDesc('xp'), Query.limit(10)]
        );
        setPlayers(res.documents);
      } catch (err) {
        console.error('Error fetching leaderboard', err);
      } finally {
        setLoading(false);
      }
    }
    fetchLeaderboard();
  }, []);

  if (loading) return <div>Loading leaderboard…</div>;

  return (
    <div className='max-w-2xl mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-4'>
        🏴‍☠️ Pirate Quest Leaderboard
      </h1>
      <ol className='list-decimal list-inside space-y-2'>
        {players.map((p) => (
          <li key={p.$id} className='flex justify-between'>
            <span>{p.username}</span>
            <span>{p.xp} XP</span>
          </li>
        ))}
      </ol>
      <div className='mt-6'>
        <Link href='/' className='text-blue-500 underline'>
          ← Back to Game
        </Link>
      </div>
    </div>
  );
}
