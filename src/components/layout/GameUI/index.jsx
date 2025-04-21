'use client';

import { useAuth } from '@/hooks/useAuth';

export default function GameUI({ children }) {
  const { player } = useAuth();

  return (
    <div className='game-ui-container p-4'>
      <div className='hud mb-4'>
        <span>XP: {player?.xp ?? 0}</span>
        <span className='ml-4'>Gold: {player?.gold ?? 0}</span>
      </div>
      {children}
    </div>
  );
}
