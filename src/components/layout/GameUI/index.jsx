'use client';

import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export default function GameUI({ children }) {
  const { player } = useAuth();

  return (
    <div className='game-ui-container p-4'>
      <div className='hud flex gap-4 mb-4'>
        <span>Level: {player?.level ?? 0}</span>
        <span>XP: {player?.xp ?? 0}</span>
        <span>Gold: {player?.gold ?? 0}</span>
        <nav className='mb-4'>
          <Link
            href='/leaderboard'
            className='text-blue-500 underline ms-6'
          >
            🏆 Leaderboard
          </Link>
        </nav>
      </div>
      {/* Navigation */}

      {children}
    </div>
  );
}
