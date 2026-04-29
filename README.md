# BLACKCHEKER.SA V2 — Safe SaaS Starter

Panel React + Vite + Tailwind con backend Express propio.  
Esta versión elimina Base44 y reemplaza módulos riesgosos por herramientas legales:

- Login demo con JWT
- Sistema de licencias / keys premium
- Owner panel
- BIN lookup seguro usando tabla local
- Email verifier básico: formato + dominio + MX opcional
- Proxy checker básico para infraestructura propia
- OSINT público / scraper seguro con validaciones
- Logs de uso
- UI estilo terminal/neón

## Requisitos
- Node.js 20+
- npm

## Instalar
```bash
cd server
npm install
cp .env.example .env
npm run dev
```

En otra terminal:

```bash
cd client
npm install
npm run dev
```

## Acceso demo
Owner:
- email: owner@nexus.local
- password: owner123

Usuario:
- email: user@nexus.local
- password: user123

## Producción
Cambia `JWT_SECRET`, conecta PostgreSQL/Supabase y agrega APIs reales autorizadas.
