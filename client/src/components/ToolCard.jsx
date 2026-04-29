import { Link } from 'react-router-dom';

export default function ToolCard({ to, icon: Icon, title, desc, color = 'text-green-400' }) {
  return (
    <Link to={to} className="block border border-green-500/20 bg-green-500/5 rounded p-4 hover:border-green-500/50 transition-all">
      <div className="flex items-center gap-2 mb-2">
        <Icon className={`w-5 h-5 ${color}`} />
        <h3 className={`font-orbitron text-sm ${color}`}>{title}</h3>
      </div>
      <p className="text-xs text-green-700">{desc}</p>
      <p className="mt-3 text-[10px] text-green-500">ACCEDER →</p>
    </Link>
  );
}
