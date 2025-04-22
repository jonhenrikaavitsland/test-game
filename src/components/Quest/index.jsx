'use client';

import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';

export default function Quest() {
  const { completeQuest } = useAuth();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const xpReward = 10;
  const goldReward = 5;

  const handleComplete = async () => {
    setError(null);
    setBusy(true);
    try {
      await completeQuest(xpReward, goldReward);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className='max-w-sm mx-auto p-6 bg-white rounded shadow'>
      <h2 className='text-lg font-semibold'>
        Quest: Defeat 5 Rats
      </h2>
      <p className='mt-2'>
        Reward: {xpReward} XP, {goldReward} Gold
      </p>
      {error && <p className='text-red-500 mt-2'>{error}</p>}
      <button
        onClick={handleComplete}
        disabled={busy}
        className='mt-4 w-full bg-blue-600 text-white py-2 rounded'
      >
        {busy ? 'Completing…' : 'Complete Quest'}
      </button>
    </div>
  );
}
