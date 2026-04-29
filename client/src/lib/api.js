const API_BASE = import.meta.env.VITE_API_BASE || '';

export async function api(path, options = {}) {
  const token = localStorage.getItem('bc_token');
  const res = await fetch(`${API_BASE}/api${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    }
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Error de API');
  return data;
}
