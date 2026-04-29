import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { nanoid } from 'nanoid';
import { db, log } from './db.js';
import { publicUser, requireAuth, requireOwner, signUser, verifyPassword } from './auth.js';
import { checkProxy, lookupBin, safeOsint, verifyEmails } from './tools.js';

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_, res) => res.json({ ok: true }));

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = db.users.find(u => u.email === email);
  if (!user || !verifyPassword(password, user.passwordHash)) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }
  log(user, 'auth.login');
  res.json({ token: signUser(user), user: publicUser(user) });
});

app.get('/api/auth/me', requireAuth, (req, res) => {
  res.json({ user: publicUser(req.user) });
});

app.post('/api/tools/bin', requireAuth, (req, res) => {
  try {
    const result = lookupBin(req.body.bin);
    log(req.user, 'tools.bin', result.bin);
    res.json(result);
  } catch (e) { res.status(400).json({ error: e.message }); }
});

app.post('/api/tools/email', requireAuth, (req, res) => {
  const emails = Array.isArray(req.body.emails) ? req.body.emails.slice(0, 100) : [];
  const results = verifyEmails(emails);
  log(req.user, 'tools.email', `${results.length} emails`);
  res.json({ results });
});

app.post('/api/tools/proxy', requireAuth, async (req, res) => {
  const proxies = Array.isArray(req.body.proxies) ? req.body.proxies.slice(0, 50) : [];
  const results = await Promise.all(proxies.map(checkProxy));
  log(req.user, 'tools.proxy', `${results.length} proxies`);
  res.json({ results });
});

app.post('/api/tools/osint', requireAuth, (req, res) => {
  try {
    const result = safeOsint(req.body.query);
    log(req.user, 'tools.osint', result.query);
    res.json(result);
  } catch (e) { res.status(400).json({ error: e.message }); }
});

app.get('/api/logs', requireAuth, (req, res) => {
  const logs = req.user.role === 'owner' ? db.logs : db.logs.filter(l => l.userEmail === req.user.email);
  res.json({ logs });
});

app.get('/api/owner/summary', requireAuth, requireOwner, (req, res) => {
  res.json({
    users: db.users.map(publicUser),
    licenses: db.licenses
  });
});

app.post('/api/owner/licenses', requireAuth, requireOwner, (req, res) => {
  const days = Math.max(1, Math.min(Number(req.body.days || 15), 3650));
  const key = `BC-${days}D-${nanoid(12).toUpperCase()}`;
  const lic = {
    key,
    status: 'new',
    userId: null,
    expiresAt: new Date(Date.now() + days * 864e5).toISOString()
  };
  db.licenses.unshift(lic);
  log(req.user, 'owner.license.create', key);
  res.json({ license: lic });
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`BLACKCHEKER.SA V2 API on http://localhost:${port}`));
