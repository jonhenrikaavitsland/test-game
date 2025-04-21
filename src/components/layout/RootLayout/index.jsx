import '@app/globals';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className='flex flex-col min-h-screen'>
        <Header />
        <main className='grow'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
