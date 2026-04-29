import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import Layout from '@/components/Layout';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import OwnerPanel from '@/pages/OwnerPanel';
import BinLookup from '@/pages/BinLookup';
import EmailVerifier from '@/pages/EmailVerifier';
import ProxyChecker from '@/pages/ProxyChecker';
import OsintSearch from '@/pages/OsintSearch';
import Logs from '@/pages/Logs';

function Protected({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="fixed inset-0 grid place-items-center"><div className="w-8 h-8 border-4 border-green-900 border-t-green-400 rounded-full animate-spin" /></div>;
  return user ? children : <Navigate to="/login" replace />;
}

function OwnerOnly({ children }) {
  const { user } = useAuth();
  return user?.role === 'owner' ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Protected><Layout /></Protected>}>
            <Route index element={<Dashboard />} />
            <Route path="bin-lookup" element={<BinLookup />} />
            <Route path="email-verifier" element={<EmailVerifier />} />
            <Route path="proxy-checker" element={<ProxyChecker />} />
            <Route path="osint" element={<OsintSearch />} />
            <Route path="logs" element={<Logs />} />
            <Route path="owner" element={<OwnerOnly><OwnerPanel /></OwnerOnly>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
