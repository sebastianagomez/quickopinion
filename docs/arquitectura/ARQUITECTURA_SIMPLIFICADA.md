# 🏗️ Arquitectura Simplificada - QuickOpinion

## 📋 Stack Tecnológico (Solo Supabase + Vercel)

### ✅ Lo que Usamos

```
┌─────────────────┐
│   Vercel        │  Frontend (Trivia, Validator, Admin)
│   Hobby (Free)  │  Next.js 15 Apps
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│           Supabase (Free Tier)          │
│                                         │
│  ✅ PostgreSQL Database                │  Datos
│  ✅ Auth (Magic Links, JWT)            │  Autenticación
│  ✅ Storage                             │  QR PDFs, imágenes
│  ✅ Edge Functions                      │  Backend API (reemplazo Express)
│  ✅ pg_cron (Cron Jobs)                │  Tareas programadas
│  ✅ Realtime (opcional)                │  Subscripciones
└─────────────────────────────────────────┘
```

### ❌ Lo que NO Usamos (Simplificado)

- ❌ Redis / Upstash (no necesario inicialmente)
- ❌ BullMQ (usamos pg_cron de Supabase)
- ❌ Express/NestJS (usamos Edge Functions)
- ❌ Servidor Node dedicado (usamos serverless)

---

## 🎯 Componentes Principales

### 1. Frontend (Vercel)

**Apps Next.js 15 desplegadas en Vercel Hobby:**

- **Trivia SPA** (`apps/trivia`)
  - URL: `trivia.tudominio.com`
  - CNAME → `cname.vercel-dns.com`
- **Validator PWA** (`apps/validator`)
  - URL: `validator.tudominio.com`
  - Offline-first con Service Workers
- **Admin Backoffice** (`apps/admin`)
  - URL: `admin.tudominio.com`
  - Dashboard y gestión

### 2. Backend (Supabase Edge Functions)

**Edge Functions en vez de Express:**

```typescript
// supabase/functions/quiz-submit/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from '@supabase/supabase-js';

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_KEY')!
  );

  // Lógica de negocio aquí
  const { quiz_id, email, answers } = await req.json();

  // Crear lead y cupón
  // ...

  return new Response(JSON.stringify({ success: true }));
});
```

**Funciones necesarias:**

- `quiz-submit` - Envío de trivia
- `validate-coupon` - Validación de cupones
- `webhook-email` - Eventos de email
- `reports` - Reportes y KPIs

### 3. Base de Datos (Supabase PostgreSQL)

**6 Tablas principales:**

- `restaurants`
- `leads`
- `quizzes`
- `quiz_responses`
- `coupons`
- `email_events`

### 4. Tareas Programadas (pg_cron)

**En vez de BullMQ, usamos pg_cron de Supabase:**

```sql
-- Configurar en Supabase SQL Editor

-- 1. Expirar cupones cada hora
SELECT cron.schedule(
  'expire-coupons',
  '0 * * * *', -- Cada hora
  $$
    UPDATE coupons
    SET state = 'EXPIRED'
    WHERE state = 'ACTIVE'
    AND expires_at < NOW()
  $$
);

-- 2. Recordatorios diarios (T-14, T-4)
SELECT cron.schedule(
  'send-reminders',
  '0 9 * * *', -- Cada día a las 9am
  $$
    SELECT send_reminder_email(id)
    FROM coupons
    WHERE state = 'ACTIVE'
    AND expires_at BETWEEN NOW() AND NOW() + INTERVAL '14 days'
  $$
);
```

### 5. Emails

**Opciones:**

**Opción A: Supabase Edge Function + Proveedor**

```typescript
// supabase/functions/send-email/index.ts
serve(async (req) => {
  const { to, template, vars } = await req.json();

  // Llamar a emBlue/SendGrid API
  await fetch('https://api.embluemail.com/v1/send', {
    method: 'POST',
    headers: { Authorization: `Bearer ${Deno.env.get('EMBLUE_API_KEY')}` },
    body: JSON.stringify({ to, template, vars }),
  });
});
```

**Opción B: Supabase Auth Emails (básico)**

- Para emails transaccionales simples
- Configurar SMTP custom en Supabase

---

## 🚀 Deployment Flow

### Desarrollo Local

```bash
# Frontend
npm run dev  # Todos los apps en localhost

# Database
npm run db:migrate  # Migraciones
npm run db:studio   # Ver datos
```

### Producción

#### 1. Frontend (Vercel)

```bash
# Conectar repo a Vercel (una vez)
vercel link

# Deploy automático con git push
git push origin main  # Auto-deploy

# O manual
vercel --prod
```

**Configuración en Vercel:**

- Root Directory: `apps/trivia` (o validator, admin)
- Framework Preset: Next.js
- Build Command: `cd ../.. && npm run build --workspace=@quickopinion/trivia`
- Output Directory: `.next`

#### 2. Backend (Supabase Edge Functions)

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Deploy function
supabase functions deploy quiz-submit
supabase functions deploy validate-coupon
```

#### 3. Cron Jobs (pg_cron)

Ejecutar en Supabase SQL Editor:

```sql
-- Ver el script en la sección anterior
```

---

## 🔧 Configuración de DNS (Hostinger)

### Dominio Principal

- **A Record** `@` → `76.76.21.21` (Vercel)
- **CNAME** `www` → `cname.vercel-dns.com`

### Subdominios (Apps)

- **CNAME** `trivia` → `cname.vercel-dns.com`
- **CNAME** `validator` → `cname.vercel-dns.com`
- **CNAME** `admin` → `cname.vercel-dns.com`

---

## 💰 Costos

### Free Tier (Empezar)

| Servicio  | Plan  | Costo | Límites                                    |
| --------- | ----- | ----- | ------------------------------------------ |
| Vercel    | Hobby | $0    | 100GB bandwidth/mes                        |
| Supabase  | Free  | $0    | 500MB DB, 2GB storage, 50MB edge functions |
| Hostinger | DNS   | $0    | Incluido con dominio                       |

**Total: $0/mes** ✅

### Cuándo Escalar

**Vercel Pro** ($20/mes) si necesitas:

- Más de 100GB bandwidth
- Más de 1 miembro en el equipo
- Protección DDoS avanzada

**Supabase Pro** ($25/mes) si necesitas:

- Más de 500MB DB
- Más de 2GB storage
- Backups diarios
- Soporte prioritario

---

## 📊 Comparación: Antes vs Ahora

### ❌ Arquitectura Compleja (Original)

```
Express API → PostgreSQL + Redis + BullMQ
  ↓              ↓           ↓        ↓
 Node Server   Supabase   Upstash  Workers
  ↓              ↓           ↓        ↓
Railway ($)   Free      Free      Railway ($)
```

**Costo mínimo: ~$10/mes** (Railway hobby tier)

### ✅ Arquitectura Simplificada (Nueva)

```
Edge Functions → PostgreSQL + pg_cron
       ↓              ↓
   Supabase      Supabase
       ↓              ↓
     Free          Free
```

**Costo: $0/mes** 🎉

---

## 🎯 Roadmap de Implementación

### Fase 1: Base (Actual)

- ✅ Setup Supabase Database
- ✅ Migraciones Prisma
- ⏳ Frontend Next.js en local
- ⏳ Edge Functions básicas

### Fase 2: Core Features

- [ ] Quiz submit (Edge Function)
- [ ] Validación de cupones (Edge Function)
- [ ] Frontend Trivia completo
- [ ] Validator PWA

### Fase 3: Automatización

- [ ] pg_cron para expiración de cupones
- [ ] pg_cron para recordatorios
- [ ] Integración email (emBlue)

### Fase 4: Producción

- [ ] Deploy Vercel
- [ ] Deploy Edge Functions
- [ ] Configurar DNS
- [ ] Testing end-to-end

### Fase 5: Escala (Futuro)

- [ ] Analytics con Vercel Analytics
- [ ] Monitoring con Sentry
- [ ] Escalar a planes pagos si es necesario

---

## ✅ Ventajas de Esta Arquitectura

1. **Costo $0** para empezar y testear
2. **Serverless** - no te preocupas por servidores
3. **Auto-scaling** - Vercel y Supabase escalan automático
4. **Simple** - menos servicios = menos complejidad
5. **Rápido** - Edge Functions cerca del usuario
6. **Git-based** - deploy con git push

---

## 📚 Documentación Relevante

- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [Supabase pg_cron](https://supabase.com/docs/guides/database/extensions/pg_cron)
- [Vercel Next.js Deployment](https://vercel.com/docs/frameworks/nextjs)
- [Vercel Hobby Limits](https://vercel.com/docs/accounts/plans#hobby)

---

**Arquitectura simplificada ✅ - Lista para escalar cuando lo necesites**
