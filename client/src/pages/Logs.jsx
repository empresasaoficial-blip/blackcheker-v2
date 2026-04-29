import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export default function Logs() {
  const [logs, setLogs] = useState([]);
  useEffect(() => { api('/logs').then(d => setLogs(d.logs)); }, []);
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-orbitron neon-green mb-6">LOGS</h1>
      <div className="border border-green-500/20 rounded overflow-hidden">
        {logs.map((l, i) => (
          <div key={i} className="grid grid-cols-4 gap-3 px-4 py-2 border-b border-green-500/5 text-xs">
            <span>{l.createdAt}</span><span>{l.userEmail}</span><span>{l.action}</span><span className="text-green-700">{l.meta}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
