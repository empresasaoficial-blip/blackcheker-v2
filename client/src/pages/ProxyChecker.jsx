import { useState } from 'react';
import { Globe, Play } from 'lucide-react';
import { api } from '@/lib/api';

export default function ProxyChecker() {
  const [proxies, setProxies] = useState('');
  const [results, setResults] = useState([]);

  async function run() {
    const list = proxies.split('\n').map(x => x.trim()).filter(Boolean);
    const data = await api('/tools/proxy', { method: 'POST', body: JSON.stringify({ proxies: list }) });
    setResults(data.results);
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-orbitron text-green-400 mb-2">PROXY CHECKER</h1>
      <p className="text-green-700 mb-6">Prueba proxies propios. Formato: host:puerto.</p>
      <textarea value={proxies} onChange={e => setProxies(e.target.value)} className="w-full h-44 bg-black/50 border border-green-500/20 rounded p-3 outline-none focus:border-green-400" placeholder="127.0.0.1:8080" />
      <button onClick={run} className="mt-3 px-5 py-2 bg-green-500 text-black rounded font-bold flex gap-2"><Play className="w-4 h-4" /> Verificar</button>
      <div className="mt-6 border border-green-500/20 rounded overflow-hidden">
        {results.map((r, i) => <div key={i} className="flex justify-between px-4 py-3 border-b border-green-500/10"><span><Globe className="inline w-4 h-4 mr-2" />{r.proxy}</span><span className={r.alive ? 'text-green-400' : 'text-red-400'}>{r.status} {r.latencyMs ? `${r.latencyMs}ms` : ''}</span></div>)}
      </div>
    </div>
  );
}
