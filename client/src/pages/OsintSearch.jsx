import { useState } from 'react';
import { Search } from 'lucide-react';
import { api } from '@/lib/api';

export default function OsintSearch() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);

  async function run() {
    const data = await api('/tools/osint', { method: 'POST', body: JSON.stringify({ query }) });
    setResult(data);
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-orbitron text-yellow-400 mb-2">OSINT PÚBLICO</h1>
      <p className="text-green-700 mb-6">Búsqueda segura orientada a información pública y dominios autorizados.</p>
      <div className="flex gap-3">
        <input value={query} onChange={e => setQuery(e.target.value)} className="flex-1 bg-black/60 border border-green-500/20 rounded px-3 py-2 outline-none focus:border-yellow-400" placeholder="dominio.com, empresa, marca..." />
        <button onClick={run} className="px-5 py-2 bg-yellow-400 text-black rounded font-bold flex gap-2"><Search className="w-4 h-4" /> Buscar</button>
      </div>
      {result && <pre className="mt-6 border border-yellow-500/20 bg-yellow-500/5 rounded p-4 text-yellow-100 whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}
