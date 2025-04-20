import Auth from '../Auth';

export default function Header() {
  return (
    <header className='bg-blue-900 text-white'>
      <div className='text-center font-bold text-4xl'>
        Test Game
      </div>
      <Auth />
    </header>
  );
}
