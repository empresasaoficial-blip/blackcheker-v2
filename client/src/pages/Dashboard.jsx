import { Database, Globe, MailCheck, Search, ShieldCheck, KeyRound } from 'lucide-react';
import ToolCard from '@/components/ToolCard';

const metrics = [
  ['USUARIOS', '2'],
  ['LICENCIAS', '2'],
  ['SAFE MODE', 'ON'],
  ['API', 'ONLINE'],
  ['BUILD', 'V2'],
  ['LOGS', 'ACTIVO']
];

export default function Dashboard() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8 border-b border-green-500/10 pb-6">
        <p className="text-[11px] text-green-700 tracking-widest uppercase">SISTEMA ACTIVO · V2 SAFE</p>
        <h1 className="text-3xl font-orbitron font-bold neon-green tracking-wider">BLACKCHEKER.SA V2</h1>
        <p className="text-sm text-green-700">// Suite legal de inteligencia, verificación y operación SaaS</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-8">
        {metrics.map(([label, value]) => (
          <div key={label} className="border border-green-500/20 bg-green-500/5 rounded p-3 text-center">
            <p className="font-orbitron text-lg text-green-400">{value}</p>
            <p className="text-[9px] text-green-800">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ToolCard to="/bin-lookup" icon={Database} title="BIN LOOKUP" desc="Analiza BIN/IIN, marca, tipo y país sin generar tarjetas." color="text-cyan-400" />
        <ToolCard to="/email-verifier" icon={MailCheck} title="EMAIL VERIFIER" desc="Valida formato, dominio y MX autorizado." color="text-purple-400" />
        <ToolCard to="/proxy-checker" icon={Globe} title="PROXY CHECKER" desc="Prueba proxies propios y mide latencia." color="text-green-400" />
        <ToolCard to="/osint" icon={Search} title="OSINT PÚBLICO" desc="Recolecta señales públicas con límites seguros." color="text-yellow-400" />
        <ToolCard to="/owner" icon={KeyRound} title="OWNER PANEL" desc="Administra usuarios, keys y licencias." color="text-orange-400" />
        <ToolCard to="/logs" icon={ShieldCheck} title="LOGS" desc="Auditoría de uso del sistema." color="text-red-400" />
      </div>
    </div>
  );
}
