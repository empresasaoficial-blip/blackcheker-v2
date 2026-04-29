import { useState } from 'react';
import { MailCheck, Play } from 'lucide-react';
import { api } from '@/lib/api';

export default function EmailVerifier() {
  const [emails, setEmails] = useState('');
  const [results, setResults] = useState([]);

  async function run() {
    const list = emails.split('\n').map(x => x.trim()).filter(Boolean);
    const data = await api('/tools/email', { method: 'POST', body: JSON.stringify({ emails: list }) });
    setResults(data.results);
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-orbitron text-purple-400 mb-2">EMAIL VERIFIER</h1>
      <p className="text-green-700 mb-6">Valida formato y dominio. Úsalo solo para listas propias o con permiso.</p>
      <textarea value={emails} onChange={e => setEmails(e.target.value)} className="w-full h-44 bg-black/50 border border-green-500/20 rounded p-3 outline-none focus:border-purple-400" placeholder="correo@dominio.com\notro@empresa.com" />
      <button onClick={run} className="mt-3 px-5 py-2 bg-purple-500 text-white rounded flex gap-2"><Play className="w-4 h-4" /> Verificar</button>
      <div className="mt-6 border border-green-500/20 rounded overflow-hidden">
        {results.map((r, i) => <div key={i} className="flex justify-between px-4 py-3 border-b border-green-500/10"><span>{r.email}</span><span className={r.valid ? 'text-green-400' : 'text-red-400'}>{r.reason}</span></div>)}
      </div>
    </div>
  );
}
