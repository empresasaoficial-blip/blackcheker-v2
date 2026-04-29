import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';

const ownerPass = bcrypt.hashSync('owner123', 10);
const userPass = bcrypt.hashSync('user123', 10);

export const db = {
  users: [
    { id: 'u_owner', email: 'owner@nexus.local', passwordHash: ownerPass, role: 'owner', licenseStatus: 'lifetime' },
    { id: 'u_user', email: 'user@nexus.local', passwordHash: userPass, role: 'user', licenseStatus: 'active' }
  ],
  licenses: [
    { key: 'OWNER-LIFETIME-2026', status: 'used', userId: 'u_owner', expiresAt: null },
    { key: 'DEMO-15D-ACCESS', status: 'used', userId: 'u_user', expiresAt: new Date(Date.now() + 15*864e5).toISOString() }
  ],
  logs: []
};

export function log(user, action, meta = '') {
  db.logs.unshift({
    id: nanoid(),
    createdAt: new Date().toISOString(),
    userEmail: user?.email || 'system',
    action,
    meta: typeof meta === 'string' ? meta : JSON.stringify(meta)
  });
  db.logs = db.logs.slice(0, 200);
}
