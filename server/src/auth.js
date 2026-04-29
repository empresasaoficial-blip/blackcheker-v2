import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { db } from './db.js';

const secret = process.env.JWT_SECRET || 'dev_secret';

export function signUser(user) {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, secret, { expiresIn: '7d' });
}

export function publicUser(user) {
  return { id: user.id, email: user.email, role: user.role, licenseStatus: user.licenseStatus };
}

export function requireAuth(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'No autorizado' });
  try {
    const payload = jwt.verify(token, secret);
    const user = db.users.find(u => u.id === payload.id);
    if (!user) return res.status(401).json({ error: 'Usuario no existe' });
    req.user = user;
    next();
  } catch {
    res.status(401).json({ error: 'Sesión inválida' });
  }
}

export function requireOwner(req, res, next) {
  if (req.user?.role !== 'owner') return res.status(403).json({ error: 'Solo owner' });
  next();
}

export function verifyPassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}
