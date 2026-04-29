import { Link, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Database, Globe, LayoutDashboard, Lock, LogOut, MailCheck, Search, ShieldCheck, Terminal, Wifi, KeyRound, ScrollText } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';

const nav = [
  { path: '/', label: 'DASHBOARD', icon: LayoutDashboard },
  { path: '/bin-lookup', label: 'BIN LOOKUP', icon: Database },
  { path: '/email-verifier', label: 'EMAIL VERIFIER', icon: MailCheck },
  { path: '/proxy-checker', label: 'PROXY CHECKER', icon: Globe },
  { path: '/osint', label: 'OSINT PÚBLICO', icon: Search },
  { path: '/logs', label: 'LOGS', icon: ScrollText },
  { path: '/owner', label: 'OWNER PANEL', icon: KeyRound, owner: true }
];

function Clock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return <span>{time.toISOString().replace('T', ' ').slice(0, 19)}</span>;
}

export default function Layout() {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <aside className="w-72 border-r border-green-500/20 flex flex-col relative">
        <div className="absolute left-0 right-0 h-px bg-green-500/20 animate-scan pointer-events-none" />
        <div className="p-5 border-b border-green-500/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded border border-green-500/40 grid place-items-center glow">
              <Terminal className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h1 className="font-orbitron text-sm font-bold neon-green">BLACKCHEKER.SA</h1>
              <p className="text-[10px] text-green-600 tracking-widest">V2 SAFE SUITE</p>
            </div>
          </div>
          <div className="text-xs border border-green-500/10 bg-green-500/5 rounded px-2 py-1.5 flex gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse mt-1" />
            <Clock />
          </div>
        </div>

        <div className="px-4 py-3 border-b border-green-500/10">
          <p className="text-xs text-green-300 truncate">{user?.email}</p>
          <p className="text-[10px] text-green-700 uppercase">{user?.role} · licencia {user?.licenseStatus}</p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {nav.filter(i => !i.owner || user?.role === 'owner').map(({ path, label, icon: Icon }) => {
            const active = location.pathname === path;
            return (
              <Link key={path} to={path} className={`flex items-center gap-3 px-3 py-2.5 rounded border text-xs tracking-wider transition-all ${active ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'border-transparent text-green-700 hover:text-green-400 hover:border-green-500/20 hover:bg-green-500/5'}`}>
                <Icon className="w-4 h-4" />
                <span className={active ? 'neon-green' : ''}>{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-green-500/10 space-y-2 text-[10px] text-green-700">
          <p className="flex gap-2"><Wifi className="w-3 h-3 text-green-500" /> API: ONLINE</p>
          <p className="flex gap-2"><ShieldCheck className="w-3 h-3 text-cyan-400" /> SAFE MODE: ENABLED</p>
          <p className="flex gap-2"><Lock className="w-3 h-3 text-yellow-400" /> JWT AUTH</p>
        </div>

        <button onClick={logout} className="m-3 flex items-center gap-2 px-3 py-2 rounded border border-red-500/20 text-red-500/70 hover:text-red-400 hover:bg-red-500/5 text-xs">
          <LogOut className="w-4 h-4" /> CERRAR SESIÓN
        </button>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="sticky top-0 z-10 border-b border-green-500/10 px-6 py-2 flex justify-between text-[11px] text-green-700 bg-black/90 backdrop-blur">
          <span>CONEXIÓN SEGURA · TLS READY</span>
          <span>BUILD: V2.0-SAFE</span>
        </div>
        <Outlet />
      </main>
    </div>
  );
}
