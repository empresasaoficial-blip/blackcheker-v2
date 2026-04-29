import { useEffect, useState } from 'react';
import { KeyRound, Plus } from 'lucide-react';
import { api } from '@/lib/api';

export default function OwnerPanel() {
  const [data, setData] = useState(null);
  const [days, setDays] = useState(15);

  async function load() { setData(await api('/owner/summary')); }
  async function createKey() {
    await api('/owner/licenses', { method: 'POST', body: JSON.stringify({ days }) });
    load();
  }
  useEffect(() => { load(); }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-orbitron text-orange-400 mb-2">OWNER PANEL</h1>
      <p className="text-green-700 mb-6">Administra licencias, usuarios y logs.</p>
      <div className="border border-orange-500/20 bg-orange-500/5 rounded p-4 mb-6">
        <label className="text-xs text-green-700">DÍAS DE LICENCIA</label>
        <div className="flex gap-3 mt-2">
          <input type="number" value={days} onChange={e => setDays(Number(e.target.value))} className="bg-black/60 border border-orange-500/20 rounded px-3 py-2" />
          <button onClick={createKey} className="px-5 py-2 bg-orange-500 text-black rounded font-bold flex gap-2"><Plus className="w-4 h-4" /> Crear key</button>
        </div>
      </div>
      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Panel title="Usuarios" items={data.users.map(u => `${u.email} · ${u.role} · ${u.licenseStatus}`)} />
          <Panel title="Licencias" items={data.licenses.map(l => `${l.key} · ${l.status} · expira ${l.expiresAt || 'N/A'}`)} />
        </div>
      )}
    </div>
  );
}

function Panel({ title, items }) {
  return (
    <div className="border border-green-500/20 rounded overflow-hidden">
      <div className="px-4 py-3 border-b border-green-500/10 text-green-400 font-orbitron flex gap-2"><KeyRound className="w-4 h-4" /> {title}</div>
      {items.map((x, i) => <div key={i} className="px-4 py-2 text-xs border-b border-green-500/5">{x}</div>)}
    </div>
  );
}
