import { AuthProvider } from '../hooks/useAuth';
import RootLayout from '../components/layout/RootLayout';

export default function AppLayout({ children }) {
  return (
    <AuthProvider>
      <RootLayout>{children}</RootLayout>
    </AuthProvider>
  );
}
