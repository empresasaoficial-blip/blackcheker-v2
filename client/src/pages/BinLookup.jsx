import { useState } from 'react';
import { Database, Search } from 'lucide-react';
import { api } from '@/lib/api';

export default function BinLookup() {
  const [bin, setBin] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  async function run() {
    setError('');
    setResult(null);
    try {
      const data = await api('/tools/bin', { method: 'POST', body: JSON.stringify({ bin }) });
      setResult(data);
    } catch (e) { setError(e.message); }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-orbitron neon-cyan mb-2">BIN LOOKUP</h1>
      <p className="text-green-700 mb-6">Analiza los primeros 6-8 dígitos. No genera ni valida tarjetas completas.</p>
      <div className="border border-green-500/20 rounded p-4 bg-black/30">
        <div className="flex gap-3">
          <input value={bin} onChange={e => setBin(e.target.value)} placeholder="Ej: 411111" className="flex-1 bg-black/60 border border-green-500/20 rounded px-3 py-2 outline-none focus:border-cyan-400" />
          <button onClick={run} className="px-5 py-2 bg-cyan-500 text-black rounded font-bold flex gap-2"><Search className="w-4 h-4" /> Buscar</button>
        </div>
        {error && <p className="text-red-400 text-xs mt-3">{error}</p>}
      </div>
      {result && (
        <div className="mt-6 border border-cyan-500/20 rounded p-4 bg-cyan-500/5">
          <Database className="w-6 h-6 text-cyan-400 mb-3" />
          <pre className="text-sm text-cyan-200 whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
