# QuickOpinion App - Especificación Técnica y Plan de Desarrollo

## 📋 Resumen Ejecutivo

**QuickOpinion** es un micro-SaaS de fidelización para restaurantes que permite:
- Capturar leads mediante trivias interactivas con QR
- Generar cupones únicos con vencimiento
- Validar canjes en tiempo real
- Automatizar emails y recordatorios
- Reportes y análisis de engagement

### Objetivo de la Versión Nativa
Reemplazar WordPress/Forminator + n8n por una aplicación nativa 100% código, mejorando robustez, escalabilidad y control total del sistema.

---

## 🎯 Visión del Producto

### Flujo Principal
1. **Comensal** escanea QR en mesa → Abre trivia
2. **Completa trivia** → Deja datos (email, nombre, consentimiento)
3. **Sistema** genera código único + envía email
4. **Mozo/Caja** valida código → Marca como canjeado
5. **Sistema** envía recordatorios automáticos si no canjea

### Reglas de Negocio Clave
- ✅ Un cupón activo por persona cada 24h por restaurante
- ✅ Estados: `ACTIVE → REDEEMED | EXPIRED | CANCELLED`
- ✅ Idempotencia en validación (doble submit no duplica)
- ✅ Consentimiento obligatorio (RGPD/Ley 25.326)
- ✅ Códigos únicos: formato `RESTO-AAAAMM-XXXX` o ULID

---

## 🏗️ Arquitectura Técnica

### Stack Tecnológico

#### Frontend
- **Framework**: React + Next.js 15
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **PWA**: Para validación offline
- **i18n**: Soporte multi-idioma

#### Backend
- **Runtime**: Node.js 22
- **Framework**: NestJS (o Express)
- **Lenguaje**: TypeScript
- **API**: REST + OpenAPI (GraphQL opcional)

#### Base de Datos
- **Principal**: Supabase (PostgreSQL + Auth + Storage + Realtime)
- **Cache**: Redis (rate limiting, sessions)
- **Cola de Jobs**: BullMQ (sobre Redis)

#### Infraestructura
- **Containerización**: Docker
- **CI/CD**: GitHub Actions
- **Hosting**: Vercel (Frontend) + Railway/Render (Backend)
- **Storage**: Supabase Storage (QR PDFs)

#### Observabilidad
- **Logs**: Pino + OpenTelemetry
- **Métricas**: Prometheus/Grafana
- **Errores**: Sentry
- **Tracing**: Distributed tracing

#### Email
- **Proveedores**: emBlue (principal), SendGrid/Mailgun (fallback)
- **Arquitectura**: Adapter pattern con feature flags

---

## 📊 Modelo de Datos (Supabase)

### Tablas Principales

#### `restaurants` - Multi-tenant
```sql
create table restaurants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  sending_domain text,           -- SPF/DKIM/DMARC
  email_subaccount_id text,      -- ID en ESP
  default_reward text,
  settings jsonb not null default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

#### `leads` - Comensales capturados
```sql
create table leads (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid references restaurants(id) on delete cascade,
  name text,
  email citext not null,
  phone text,
  consent bool not null default false,
  consent_version text,
  consent_timestamp timestamptz,
  source text default 'quiz',
  user_ip inet,
  user_agent text,
  unsubscribed bool default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(restaurant_id, email)
);
```

#### `quizzes` - Configuración de trivias
```sql
create table quizzes (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid references restaurants(id) on delete cascade,
  name text not null,
  config jsonb not null,         -- preguntas, opciones, tema
  active bool default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

#### `quiz_responses` - Respuestas de usuarios
```sql
create table quiz_responses (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid references quizzes(id) on delete cascade,
  lead_id uuid references leads(id) on delete cascade,
  answers jsonb not null,
  score_correct int,
  score_total int,
  created_at timestamptz default now()
);
```

#### `coupons` - Cupones generados
```sql
create type coupon_state as enum ('ACTIVE','REDEEMED','EXPIRED','CANCELLED');

create table coupons (
  code text primary key,
  restaurant_id uuid references restaurants(id) on delete cascade,
  lead_id uuid references leads(id) on delete cascade,
  reward text not null,
  state coupon_state not null default 'ACTIVE',
  expires_at timestamptz not null,
  issued_at timestamptz not null default now(),
  redeemed_at timestamptz,
  redeemed_by uuid,              -- staff user
  branch text,
  table_hint text,
  created_at timestamptz default now()
);

create index idx_coupons_restaurant_state on coupons (restaurant_id, state, expires_at);
create index idx_coupons_lead on coupons (lead_id);
```

#### `email_events` - Tracking de emails
```sql
create table email_events (
  id bigserial primary key,
  restaurant_id uuid references restaurants(id) on delete cascade,
  lead_id uuid references leads(id) on delete set null,
  type text not null,            -- delivered/open/click/bounce/unsub
  provider text not null,
  provider_msg_id text,
  payload jsonb,
  occurred_at timestamptz not null default now()
);

create index idx_email_events_restaurant on email_events (restaurant_id, type, occurred_at desc);
create index idx_email_events_lead on email_events (lead_id, occurred_at desc);
```

---

## 🔌 Contratos de API

### Autenticación
- **Público**: Quiz submit (sin auth)
- **Staff**: Validación de cupones (JWT/Magic Link)
- **Admin**: Backoffice (Supabase Auth)

### Endpoints Principales

#### 1. Quiz (Público)

**GET** `/api/quiz/:quizId`
```json
Response 200:
{
  "quiz_id": "uuid",
  "name": "Trivia del Día",
  "questions": [
    {
      "id": "q1",
      "question": "¿En qué año se fundó el restaurante?",
      "options": ["2010", "2015", "2020"]
    }
  ]
}
```

**POST** `/api/quiz/submit`
```json
Request:
{
  "quiz_id": "uuid",
  "name": "Pablo",
  "email": "pablo@example.com",
  "consent": true,
  "answers": [
    {"qid": "q1", "answer": "2015", "is_correct": true}
  ],
  "meta": {
    "ip": "186.143.134.218",
    "ua": "Mozilla/5.0..."
  }
}

Response 200:
{
  "coupon": {
    "code": "REST-202510-A3F9",
    "reward": "Postre gratis",
    "expires_at": "2025-11-08T23:59:59Z"
  },
  "result": {
    "correct": 4,
    "total": 5
  }
}

Response 409 (participó <24h):
{
  "error": "ALREADY_PARTICIPATED",
  "message": "Ya participaste en las últimas 24 horas",
  "coupon": { ... }  // cupón existente
}
```

#### 2. Validación (Staff)

**POST** `/api/validate`
```json
Request:
{
  "code": "REST-202510-A3F9",
  "branch": "Sucursal Centro",
  "table_hint": "Mesa 12"
}

Headers:
Authorization: Bearer <staff_jwt>
Idempotency-Key: <uuid>  // opcional

Response 200 (válido):
{
  "valid": true,
  "reward": "Postre gratis",
  "expires_at": "2025-11-08T23:59:59Z",
  "lead": {
    "name": "Pablo",
    "email": "pablo@example.com"
  }
}

Response 200 (inválido):
{
  "valid": false,
  "reason": "EXPIRED" | "REDEEMED" | "INVALID"
}
```

**GET** `/api/coupons/:code`
```json
Response 200:
{
  "code": "REST-202510-A3F9",
  "state": "ACTIVE",
  "reward": "Postre gratis",
  "expires_at": "2025-11-08T23:59:59Z"
}
```

#### 3. Webhooks

**POST** `/api/webhooks/email/:provider`
```json
Request (ejemplo emBlue):
{
  "event": "open",
  "email": "pablo@example.com",
  "messageId": "msg_123",
  "timestamp": "2025-10-09T10:30:00Z"
}

Response: 204 No Content
```

#### 4. Backoffice (Admin)

**GET** `/api/admin/restaurants`  
**POST** `/api/admin/restaurants`  
**PUT** `/api/admin/restaurants/:id`  
**DELETE** `/api/admin/restaurants/:id`  

**GET** `/api/admin/quizzes`  
**POST** `/api/admin/quizzes`  

**GET** `/api/admin/reports/kpis?restaurant_id=uuid&from=date&to=date`
```json
Response:
{
  "leads": 156,
  "coupons_issued": 156,
  "coupons_redeemed": 89,
  "redemption_rate": 57.05,
  "avg_time_to_redeem_hours": 72,
  "email_open_rate": 34.5,
  "email_ctr": 6.2
}
```

---

## 🔄 Jobs y Automatizaciones

### BullMQ Workers

#### 1. `SendTransactionalEmail`
**Trigger**: Después de crear cupón  
**Plantilla**: "Gracias + código"  
**Variables**: `{nombre, codigo, vence_el, premio, restaurante}`

#### 2. `SendReminder`
**Trigger**: Cron diario  
**Lógica**: Cupones ACTIVE con `expires_at` en T-14, T-4, T-1 días  
**Plantilla**: "Recordatorio - Tu cupón vence pronto"

#### 3. `ExpireCoupons`
**Trigger**: Cron cada hora  
**Lógica**: `state=ACTIVE AND expires_at < now()` → `state=EXPIRED`

#### 4. `SendPostRedemption`
**Trigger**: Después de canje (opcional)  
**Plantilla**: "Gracias por tu visita + cross-sell"

#### 5. `ListHygiene`
**Trigger**: Cron semanal  
**Lógica**: Marcar `unsubscribed=true` para bounces duros

---

## 🎨 Aplicaciones Frontend

### 1. Trivia SPA (`/apps/trivia`)
**Ruta**: `/:restaurant/:quiz`  
**Features**:
- UI gamificada (3-5 preguntas)
- Captura de datos antes de mostrar resultado
- Animaciones smooth
- Responsive mobile-first
- Tracking de completion rate

### 2. Validator PWA (`/apps/validator`)
**Features**:
- Login con magic link (Supabase Auth)
- Escáner QR (MediaDevices API)
- Input manual de código
- Respuesta visual clara (✅/🚫)
- Offline-first con sync queue
- Historial local (últimos 50 canjes)

### 3. Admin Backoffice (`/apps/admin`)
**Features**:
- Dashboard con KPIs
- CRUD de restaurantes
- Editor de quizzes (arrastrar preguntas)
- Gestión de plantillas de email
- Reportes y exportación CSV
- Reenvío manual de cupones
- Cancelación de cupones

---

## 🔐 Seguridad y Compliance

### Seguridad
- ✅ TLS extremo a extremo + HSTS
- ✅ Rate limiting por IP y email (Redis)
- ✅ CORS configurado por dominio
- ✅ Secrets en variables de entorno (nunca en código)
- ✅ Validación de input (Zod/Joi)
- ✅ SQL injection prevention (Prisma/ORM)
- ✅ Logs de auditoría en operaciones críticas

### Privacidad (Ley 25.326 Argentina)
- ✅ Consentimiento explícito con timestamp + IP + versión
- ✅ Endpoint de baja/acceso/rectificación
- ✅ Anonimización a los 24 meses inactivos
- ✅ PII cifrado en reposo (opcional con pgcrypto)
- ✅ Políticas de retención documentadas

### Email Deliverability
- ✅ SPF/DKIM/DMARC por dominio
- ✅ Subdominios dedicados por restaurante
- ✅ Warm-up de IPs
- ✅ Suppression lists automáticas

---

## 📈 KPIs y Monitoreo

### SLOs (Service Level Objectives)
- Email delivery rate: **> 98%**
- Email open rate: **> 30%**
- Email CTR: **4-8%**
- API p95 latency `/validate`: **< 150ms**
- Error rate 5xx: **< 0.1%**
- Uptime: **> 99.5%**

### Métricas Clave
```sql
-- Leads por día
SELECT date_trunc('day', created_at) AS date, 
       count(*) AS leads
FROM leads
WHERE restaurant_id = $1
GROUP BY 1 ORDER BY 1 DESC;

-- Tasa de canje
SELECT 
  count(*) FILTER (WHERE state = 'REDEEMED') AS redeemed,
  count(*) AS total,
  round(100.0 * count(*) FILTER (WHERE state = 'REDEEMED') / count(*), 2) AS redemption_rate
FROM coupons
WHERE restaurant_id = $1;

-- Tiempo promedio a canje
SELECT 
  percentile_disc(0.5) WITHIN GROUP (ORDER BY redeemed_at - issued_at) AS median_time,
  percentile_disc(0.95) WITHIN GROUP (ORDER BY redeemed_at - issued_at) AS p95_time
FROM coupons
WHERE restaurant_id = $1 AND state = 'REDEEMED';
```

---

## 🚀 Plan de Desarrollo - Fases

### **FASE 0: Setup Inicial** (Semana 1)
- [ ] Configurar monorepo (Turborepo/Nx)
- [ ] Crear proyecto Supabase
- [ ] Setup GitHub repo + CI/CD básico
- [ ] Configurar ESLint + Prettier + Husky
- [ ] Definir arquitectura de carpetas
- [ ] Setup Docker local

**Deliverable**: Entorno de desarrollo listo

---

### **FASE 1: Base de Datos y Migraciones** (Semana 1-2)
- [ ] Crear schema completo en Supabase
- [ ] Definir RLS policies (Row Level Security)
- [ ] Configurar triggers para `updated_at`
- [ ] Seed data de prueba (1 restaurante, 1 quiz)
- [ ] Setup Prisma Client
- [ ] Migraciones versionadas

**Deliverable**: DB funcional con datos de prueba

**Test**: 
```bash
npm run db:migrate
npm run db:seed
npm run db:test
```

---

### **FASE 2: Backend Core - API Quiz** (Semana 2-3)
- [ ] Setup NestJS/Express + TypeScript
- [ ] Implementar `POST /quiz/submit`
  - [ ] Validación de input (Zod)
  - [ ] Lógica anti-abuso (24h rule)
  - [ ] Generación de código único
  - [ ] Creación de lead + coupon
- [ ] Implementar `GET /quiz/:id`
- [ ] Tests unitarios + integración
- [ ] OpenAPI documentation

**Deliverable**: API de quiz funcional

**Test**:
```bash
curl -X POST http://localhost:3000/api/quiz/submit \
  -H "Content-Type: application/json" \
  -d '{
    "quiz_id": "uuid",
    "name": "Test",
    "email": "test@example.com",
    "consent": true,
    "answers": [...]
  }'
```

---

### **FASE 3: Sistema de Emails** (Semana 3-4)
- [ ] Crear Email Adapter (interface)
- [ ] Implementar adapter emBlue
- [ ] Setup BullMQ + Redis
- [ ] Job: `SendTransactionalEmail`
- [ ] Plantillas HTML responsive
- [ ] Webhook handler (`/webhooks/email/:provider`)
- [ ] Tests con mocks

**Deliverable**: Emails automáticos funcionando

**Test**:
```bash
# Enviar email de prueba
npm run job:test-email -- --to=test@example.com

# Verificar webhook
curl -X POST http://localhost:3000/api/webhooks/email/emblue \
  -d '{"event":"open","email":"test@example.com"}'
```

---

### **FASE 4: Frontend Trivia SPA** (Semana 4-5)
- [ ] Setup Next.js 15 + TypeScript
- [ ] Diseño UI/UX (Figma → Tailwind)
- [ ] Página de quiz (`/:restaurant/:quiz`)
- [ ] Integración con API
- [ ] Validación de formulario
- [ ] Animaciones y feedback visual
- [ ] Responsive mobile
- [ ] Tests E2E (Playwright)

**Deliverable**: Trivia jugable end-to-end

**Test**: Flujo completo manual + E2E automatizado

---

### **FASE 5: API Validación + PWA** (Semana 5-6)
- [ ] Implementar `POST /validate`
- [ ] Implementar `GET /coupons/:code`
- [ ] Lógica de idempotencia
- [ ] Setup PWA con Next.js
- [ ] Auth con Supabase (magic link)
- [ ] Escáner QR (react-qr-reader)
- [ ] Offline-first con Service Worker
- [ ] Sync queue local → server

**Deliverable**: PWA de validación funcional

**Test**: Validar cupón online + offline

---

### **FASE 6: Jobs de Recordatorios y Expiración** (Semana 6-7)
- [ ] Job: `SendReminder` (cron diario)
- [ ] Job: `ExpireCoupons` (cron horario)
- [ ] Job: `SendPostRedemption`
- [ ] Job: `ListHygiene`
- [ ] Dashboard de jobs (BullMQ UI)
- [ ] Logs estructurados

**Deliverable**: Automatizaciones completas

**Test**: Simular fechas y verificar envíos

---

### **FASE 7: Backoffice Admin** (Semana 7-8)
- [ ] Setup Next.js Admin
- [ ] Auth con Supabase
- [ ] CRUD Restaurantes
- [ ] CRUD Quizzes (editor visual)
- [ ] Dashboard KPIs
- [ ] Reportes y filtros
- [ ] Exportación CSV
- [ ] Gestión de cupones (reenvío, cancelación)

**Deliverable**: Backoffice funcional

**Test**: Crear restaurante → quiz → ver reportes

---

### **FASE 8: Observabilidad y Seguridad** (Semana 8-9)
- [ ] Configurar Pino logger
- [ ] OpenTelemetry tracing
- [ ] Sentry error tracking
- [ ] Prometheus metrics
- [ ] Grafana dashboards
- [ ] Rate limiting (Redis)
- [ ] Implementar ReCAPTCHA
- [ ] Auditoría de seguridad

**Deliverable**: Sistema observable y seguro

**Test**: Generar carga y ver métricas

---

### **FASE 9: Testing Integral y QA** (Semana 9-10)
- [ ] Tests unitarios > 80% coverage
- [ ] Tests de integración completos
- [ ] Tests E2E críticos
- [ ] Load testing (k6/Artillery)
- [ ] Penetration testing básico
- [ ] Validación de compliance
- [ ] Documentación técnica

**Deliverable**: Suite de tests completa

---

### **FASE 10: Migración y Go-Live** (Semana 10-11)
- [ ] ETL de datos existentes (WordPress → Supabase)
- [ ] Configurar dominios de email
- [ ] Setup producción (Vercel + Railway)
- [ ] Deploy staging
- [ ] Pruebas con clientes beta
- [ ] Deploy producción
- [ ] Monitoring 24/7 primera semana

**Deliverable**: Sistema en producción

---

## 📦 Estructura de Proyecto (Monorepo)

```
quickopinion-app/
├── apps/
│   ├── api/                 # Backend NestJS
│   │   ├── src/
│   │   │   ├── modules/
│   │   │   │   ├── quiz/
│   │   │   │   ├── coupon/
│   │   │   │   ├── email/
│   │   │   │   ├── validation/
│   │   │   │   └── webhook/
│   │   │   ├── jobs/
│   │   │   └── main.ts
│   │   ├── test/
│   │   └── package.json
│   │
│   ├── trivia/              # Frontend Trivia (Next.js)
│   │   ├── src/
│   │   │   ├── app/
│   │   │   ├── components/
│   │   │   └── lib/
│   │   └── package.json
│   │
│   ├── validator/           # PWA Validación (Next.js)
│   │   ├── src/
│   │   └── package.json
│   │
│   └── admin/               # Backoffice (Next.js)
│       ├── src/
│       └── package.json
│
├── packages/
│   ├── database/            # Prisma schema + migrations
│   │   ├── prisma/
│   │   └── package.json
│   │
│   ├── email/               # Email adapters
│   │   ├── src/
│   │   │   ├── adapters/
│   │   │   └── templates/
│   │   └── package.json
│   │
│   ├── jobs/                # BullMQ processors
│   │   └── src/
│   │
│   ├── ui/                  # Design system compartido
│   │   └── src/
│   │       └── components/
│   │
│   └── shared/              # Utilidades compartidas
│       └── src/
│           ├── types/
│           ├── validators/
│           └── utils/
│
├── infra/
│   ├── docker/
│   │   ├── Dockerfile.api
│   │   └── docker-compose.yml
│   └── k8s/                 # Opcional
│
├── docs/
│   ├── context.md           # Este archivo
│   ├── api-spec.yaml        # OpenAPI
│   └── architecture.md
│
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
│
├── package.json
├── turbo.json               # Turborepo config
└── README.md
```

---

## 🧪 Estrategia de Testing

### Niveles de Testing

#### 1. Unitarios (Jest)
- Lógica de negocio aislada
- Generación de códigos
- Validaciones
- Coverage > 80%

#### 2. Integración (Supertest)
- Endpoints completos
- Interacción con Supabase
- Jobs y queues
- Webhooks

#### 3. E2E (Playwright)
- Flujo completo: Quiz → Email → Validación
- Casos de error
- Navegadores múltiples

#### 4. Load Testing (k6)
- 100 RPS sostenidos
- Picos de 500 RPS
- Validación bajo carga

---

## 🔧 Variables de Entorno

```bash
# Database
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_KEY=xxx

# Redis
REDIS_URL=redis://localhost:6379

# Email
EMBLUE_API_KEY=xxx
EMBLUE_API_URL=https://api.embluemail.com/v1
SENDGRID_API_KEY=xxx (fallback)

# Auth
JWT_SECRET=xxx
AUTH_MAGIC_LINK_SECRET=xxx

# Observability
SENTRY_DSN=xxx
OTEL_EXPORTER_OTLP_ENDPOINT=xxx

# App
NODE_ENV=development|production
API_URL=http://localhost:3000
FRONTEND_URL=http://localhost:3001
```

---

## 📝 Casos de Uso Críticos

### 1. Anti-abuso 24h
```typescript
// Pseudocódigo
async function createCoupon(quizSubmit) {
  const existing = await findActiveCoupon({
    restaurant_id,
    email,
    created_at: { gte: now() - 24h }
  });
  
  if (existing) {
    throw new ConflictError('ALREADY_PARTICIPATED', existing);
  }
  
  // Crear nuevo cupón...
}
```

### 2. Idempotencia en validación
```typescript
async function validateCoupon(code, idempotencyKey?) {
  if (idempotencyKey) {
    const cached = await redis.get(idempotencyKey);
    if (cached) return JSON.parse(cached);
  }
  
  const coupon = await findByCode(code);
  
  if (coupon.state !== 'ACTIVE') {
    return { valid: false, reason: coupon.state };
  }
  
  if (coupon.expires_at < now()) {
    return { valid: false, reason: 'EXPIRED' };
  }
  
  await updateCoupon(code, { 
    state: 'REDEEMED', 
    redeemed_at: now() 
  });
  
  const result = { valid: true, reward: coupon.reward };
  
  if (idempotencyKey) {
    await redis.setex(idempotencyKey, 3600, JSON.stringify(result));
  }
  
  return result;
}
```

### 3. Generación de código único
```typescript
import { ulid } from 'ulid';

function generateCouponCode(restaurantSlug: string): string {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const unique = ulid().slice(-4); // Últimos 4 chars
  
  return `${restaurantSlug.toUpperCase()}-${year}${month}-${unique}`;
}

// Ejemplo: "RESTO-2510-A3F9"
```

---

## 🎯 Checklist Pre-Launch

### Técnico
- [ ] Todas las migraciones ejecutadas
- [ ] Seed data en staging
- [ ] Variables de entorno configuradas
- [ ] SSL/TLS configurado
- [ ] Rate limiting activo
- [ ] Backups automáticos (Supabase)
- [ ] Monitoring y alertas activas
- [ ] Logs centralizados

### Email
- [ ] SPF/DKIM/DMARC configurados
- [ ] Dominio verificado en emBlue
- [ ] Plantillas aprobadas
- [ ] Tests de deliverability
- [ ] Suppression lists configuradas

### Legal
- [ ] Términos y condiciones publicados
- [ ] Política de privacidad publicada
- [ ] Consentimiento implementado
- [ ] Endpoint de baja funcional
- [ ] Registro AAIP (si aplica)

### Testing
- [ ] Tests E2E pasando
- [ ] Load testing completado
- [ ] Security audit pasado
- [ ] Smoke tests en staging

### Documentación
- [ ] README actualizado
- [ ] API docs (OpenAPI)
- [ ] Runbook de incidentes
- [ ] Onboarding de clientes

---

## 🚨 Casos Borde y Manejo de Errores

| Caso | Comportamiento |
|------|----------------|
| Email duplicado <24h | HTTP 409 + cupón existente |
| Código inválido | `{valid: false, reason: 'INVALID'}` |
| Cupón ya canjeado | `{valid: false, reason: 'REDEEMED'}` |
| Cupón expirado | `{valid: false, reason: 'EXPIRED'}` |
| Email bounce hard | Marcar `unsubscribed=true` |
| Doble validación | Idempotencia con Idempotency-Key |
| Webhook duplicado | Dedup por `provider_msg_id` |
| Quiz desactivado | HTTP 404 + mensaje amigable |
| Sin consentimiento | HTTP 400 + mensaje legal |
| Rate limit excedido | HTTP 429 + Retry-After |

---

## 📚 Referencias y Recursos

### Documentación
- [Supabase Docs](https://supabase.com/docs)
- [NestJS Docs](https://docs.nestjs.com)
- [Next.js 15 Docs](https://nextjs.org/docs)
- [BullMQ Guide](https://docs.bullmq.io)

### Herramientas
- [Prisma Studio](https://www.prisma.io/studio) - DB GUI
- [Bruno/Insomnia](https://www.usebruno.com) - API testing
- [BullMQ Dashboard](https://github.com/OptimalBits/bull-board)

### Compliance
- [Ley 25.326](https://www.argentina.gob.ar/aaip/datospersonales/ley)
- [GDPR Checklist](https://gdpr.eu/checklist/)

---

## 📞 Soporte y Mantenimiento

### Runbook de Incidentes

#### Emails no llegan
1. Verificar logs de `email_events`
2. Revisar bounce rate en emBlue
3. Validar SPF/DKIM con mxtoolbox
4. Activar fallback a SendGrid

#### Validación lenta
1. Revisar métricas de latencia
2. Verificar conexión a Supabase
3. Revisar pool de conexiones
4. Escalar workers

#### Cupones duplicados
1. Revisar constraint `unique(code)`
2. Auditar logs de creación
3. Verificar race conditions

---

## 🗺️ Roadmap Futuro (Post-MVP)

### Q1 2026
- [ ] Wallet passes (Apple/Google)
- [ ] NPS integrado en post-canje
- [ ] Segmentación avanzada (cumpleaños, horarios)

### Q2 2026
- [ ] Integración POS para atribuir tickets
- [ ] Mini-CRM con campañas manuales
- [ ] A/B testing de trivias

### Q3 2026
- [ ] API pública para partners
- [ ] Punch-card digital
- [ ] Gamificación avanzada

---

## ✅ Resumen de Decisiones Técnicas

| Decisión | Opción Elegida | Razón |
|----------|----------------|-------|
| Base de datos | Supabase | Auth + Storage + Realtime integrados |
| Backend | NestJS + TypeScript | Arquitectura escalable y type-safe |
| Frontend | Next.js 15 | SSR, RSC, optimal DX |
| Cache | Redis | Rate limiting + sessions + jobs |
| Jobs | BullMQ | Robusto, observable, Redis-based |
| Email | Adapter pattern | Multi-provider con fallback |
| Auth | Supabase Auth | Magic links, JWT, RLS |
| Deploy | Vercel + Railway | DX óptimo, autoscaling |
| Monitoring | Sentry + Grafana | Errores + métricas centralizadas |

---

**Versión**: 1.0  
**Última actualización**: 9 de octubre de 2025  
**Autor**: Sebastian Gomez  
**Estado**: Ready para desarrollo ✨

