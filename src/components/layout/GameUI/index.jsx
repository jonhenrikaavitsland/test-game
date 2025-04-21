'use client';

export default function GameUI({ children }) {
  return (
    <div className='game-ui-container p-4'>
      {/* Future: XP/Gold HUD, Quest log, Map, etc. */}
      {children}
    </div>
  );
}
