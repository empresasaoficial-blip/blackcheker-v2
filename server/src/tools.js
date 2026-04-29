import net from 'node:net';
import validator from 'validator';

const binDb = {
  '411111': { scheme: 'VISA', type: 'credit', country: 'US', bank: 'Test Bank' },
  '550000': { scheme: 'MASTERCARD', type: 'credit', country: 'US', bank: 'Test Bank' },
  '400000': { scheme: 'VISA', type: 'debit', country: 'MX', bank: 'Demo MX Bank' },
  '520416': { scheme: 'MASTERCARD', type: 'credit', country: 'MX', bank: 'Demo LATAM Bank' }
};

export function lookupBin(bin) {
  const clean = String(bin || '').replace(/\D/g, '').slice(0, 8);
  if (clean.length < 6) throw new Error('Ingresa mínimo 6 dígitos BIN/IIN');
  const key = clean.slice(0, 6);
  const found = binDb[key] || { scheme: detectScheme(clean), type: 'unknown', country: 'unknown', bank: 'unknown' };
  return { bin: clean, ...found, note: 'Lookup seguro. No valida tarjetas completas.' };
}

function detectScheme(num) {
  if (num.startsWith('4')) return 'VISA';
  if (/^5[1-5]/.test(num) || /^2[2-7]/.test(num)) return 'MASTERCARD';
  if (/^3[47]/.test(num)) return 'AMEX';
  return 'unknown';
}

export function verifyEmails(emails) {
  return emails.map(email => {
    const valid = validator.isEmail(email || '');
    const domain = String(email).split('@')[1] || '';
    return {
      email,
      valid,
      domain,
      reason: valid ? 'FORMATO OK' : 'FORMATO INVÁLIDO',
      mxCheck: 'Configura un proveedor DNS para MX real en producción'
    };
  });
}

export function checkProxy(proxy) {
  return new Promise(resolve => {
    const [host, portRaw] = String(proxy).split(':');
    const port = Number(portRaw);
    if (!host || !port) return resolve({ proxy, alive: false, status: 'FORMATO INVÁLIDO' });

    const start = Date.now();
    const socket = net.createConnection({ host, port, timeout: 3000 });
    socket.on('connect', () => {
      const latencyMs = Date.now() - start;
      socket.destroy();
      resolve({ proxy, alive: true, status: 'ALIVE', latencyMs });
    });
    socket.on('timeout', () => {
      socket.destroy();
      resolve({ proxy, alive: false, status: 'TIMEOUT' });
    });
    socket.on('error', () => resolve({ proxy, alive: false, status: 'DEAD' }));
  });
}

export function safeOsint(query) {
  const q = String(query || '').trim();
  if (q.length < 3) throw new Error('Consulta muy corta');
  return {
    query: q,
    mode: 'safe-public',
    suggestions: [
      `Buscar sitio oficial relacionado con: ${q}`,
      `Revisar WHOIS/registrador si es dominio autorizado`,
      `Revisar redes sociales oficiales y directorios públicos`,
      `Documentar fuentes y fecha de consulta`
    ],
    warning: 'No recolectes datos privados ni accedas a sistemas sin permiso.'
  };
}
