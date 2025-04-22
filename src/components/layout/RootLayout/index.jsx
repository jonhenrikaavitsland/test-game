'use client';

import '@/app/globals.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useAuth } from '@/hooks/useAuth';
import GameUI from '../GameUI';

export default function RootLayout({ children }) {
  const { user, loading } = useAuth();

  return (
    <html lang='en'>
      <body className='flex flex-col min-h-screen'>
        <Header />
        <main className='grow'>
          {/* While loading, you could show a spinner or skeleton */}
          {!loading && user ? (
            <GameUI>{children}</GameUI>
          ) : (
            children
          )}
        </main>
        <Footer />
      </body>
    </html>
  );
}
