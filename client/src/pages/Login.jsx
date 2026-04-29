import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('owner@nexus.local');
  const [password, setPassword] = useState('owner123');
  const [error, setError] = useState('');

  async function submit(e) {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="min-h-screen grid place-items-center p-6">
      <form onSubmit={submit} className="w-full max-w-md border border-green-500/20 bg-black/60 rounded p-6 glow">
        <div className="flex items-center gap-3 mb-6">
          <Terminal className="w-8 h-8 text-green-400" />
          <div>
            <h1 className="font-orbitron text-xl neon-green">BLACKCHEKER.SA V2</h1>
            <p className="text-xs text-green-700">Acceso seguro</p>
          </div>
        </div>
        <label className="text-xs text-green-700">EMAIL</label>
        <input value={email} onChange={e => setEmail(e.target.value)} className="w-full mb-3 bg-black/70 border border-green-500/20 rounded px-3 py-2 text-green-300 outline-none focus:border-green-400" />
        <label className="text-xs text-green-700">PASSWORD</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full mb-4 bg-black/70 border border-green-500/20 rounded px-3 py-2 text-green-300 outline-none focus:border-green-400" />
        {error && <p className="text-red-400 text-xs mb-3">{error}</p>}
        <button className="w-full py-2 rounded bg-green-500 text-black font-bold hover:bg-green-400">ENTRAR</button>
        <p className="text-[10px] text-green-800 mt-4">Demo owner: owner@nexus.local / owner123</p>
      </form>
    </div>
  );
}
