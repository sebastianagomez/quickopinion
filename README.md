# QuickOpinion App 🎯

**Micro-SaaS de fidelización para restaurantes**

QuickOpinion permite a los restaurantes capturar leads mediante trivias interactivas, generar cupones únicos con vencimiento, validar canjes en tiempo real y automatizar comunicaciones.

---

## 📋 Tabla de Contenidos

- [Características](#características)
- [Stack Tecnológico](#stack-tecnológico)
- [Arquitectura](#arquitectura)
- [Inicio Rápido](#inicio-rápido)
- [Desarrollo](#desarrollo)
- [Scripts Disponibles](#scripts-disponibles)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Roadmap](#roadmap)

---

## ✨ Características

- ✅ **Multi-tenant** - Múltiples restaurantes en una sola instancia
- 🎮 **Trivias interactivas** - Captura de leads gamificada
- 🎫 **Cupones únicos** - Generación y validación de códigos
- 📧 **Emails automatizados** - Envío de cupones y recordatorios
- 📱 **PWA offline** - Validación en salón sin conexión
- 📊 **Analytics** - Métricas de engagement y conversión
- 🔒 **Seguridad** - Cumplimiento Ley 25.326 (Argentina)
- 🚀 **Escalable** - Arquitectura moderna y robusta

---

## 🛠️ Stack Tecnológico

### Frontend

- **Framework**: Next.js 15 (React 18)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **PWA**: Service Workers + Offline support

### Backend

- **Runtime**: Node.js 22
- **Framework**: Express
- **Lenguaje**: TypeScript
- **API**: REST + OpenAPI

### Infraestructura

- **Base de datos**: Supabase (PostgreSQL)
- **Backend**: Supabase Edge Functions
- **Cron Jobs**: Supabase pg_cron
- **Email**: emBlue / SendGrid
- **Hosting**: Vercel (Frontend + Backend)
- **CI/CD**: GitHub Actions

### Monorepo

- **Tool**: Turborepo
- **Package Manager**: npm workspaces

---

## 🏗️ Arquitectura

```
┌─────────────┐
│  Cliente    │ QR → Trivia SPA (Vercel)
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────┐
│         Supabase                │
│  • PostgreSQL Database          │
│  • Edge Functions (Backend)     │
│  • pg_cron (Scheduled Jobs)     │
│  • Auth                         │
│  • Storage                      │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────┐
│  Email Provider     │ emBlue/SendGrid
└─────────────────────┘
```

---

## 🚀 Inicio Rápido

### Prerequisitos

- Node.js >= 22.0.0
- npm >= 10.0.0
- Cuenta Supabase (gratis en https://supabase.com)

### Instalación

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/tu-usuario/quickopinion-app.git
   cd quickopinion-app
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Configurar Supabase**

   ```bash
   # Sigue la guía: docs/SETUP_SUPABASE.md
   # Obtén tus credenciales de Supabase y Upstash Redis
   ```

4. **Configurar variables de entorno**

   ```bash
   cp .env.example .env
   cp packages/database/.env.example packages/database/.env
   # Editar ambos archivos con tus credenciales
   ```

5. **Ejecutar migraciones**

   ```bash
   npm run db:migrate
   npm run db:seed
   ```

6. **Iniciar en modo desarrollo**
   ```bash
   npm run dev
   ```

### URLs de desarrollo

- API: http://localhost:3000
- Trivia SPA: http://localhost:3001
- Validator PWA: http://localhost:3002
- Admin Backoffice: http://localhost:3003

---

## 💻 Desarrollo

### Estructura del Monorepo

```
quickopinion-app/
├── apps/
│   ├── api/              # Backend API (Express)
│   ├── trivia/           # Trivia SPA (Next.js)
│   ├── validator/        # PWA Validación (Next.js)
│   └── admin/            # Backoffice (Next.js)
├── packages/
│   ├── database/         # Prisma Schema + Migrations
│   ├── email/            # Email Adapters
│   ├── jobs/             # BullMQ Workers
│   ├── shared/           # Utilidades compartidas
│   └── ui/               # Design System
├── infra/
│   └── docker/           # Dockerfiles
└── docs/                 # Documentación
```

### Trabajar con Workspaces

```bash
# Ejecutar comando en un workspace específico
npm run dev --workspace=@quickopinion/api

# Instalar dependencia en un workspace
npm install zod --workspace=@quickopinion/shared

# Ejecutar tests en todos los workspaces
npm test
```

### Database (Prisma)

```bash
# Crear nueva migración
npm run db:migrate

# Abrir Prisma Studio
npm run db:studio

# Generar Prisma Client
npm run db:generate

# Reset database (⚠️ destructivo)
npm run db:reset
```

---

## 📜 Scripts Disponibles

### Global (Root)

```bash
npm run dev          # Iniciar todos los servicios en desarrollo
npm run build        # Build de producción
npm run lint         # Ejecutar ESLint
npm run format       # Formatear código con Prettier
npm run type-check   # Verificar tipos TypeScript
npm test             # Ejecutar tests
npm run clean        # Limpiar node_modules y builds
```

### Por Workspace

#### API (`apps/api`)

```bash
npm run dev --workspace=@quickopinion/api
npm run build --workspace=@quickopinion/api
npm test --workspace=@quickopinion/api
```

#### Frontend Apps

```bash
npm run dev --workspace=@quickopinion/trivia
npm run build --workspace=@quickopinion/trivia
npm run lint --workspace=@quickopinion/trivia
```

---

## 🗂️ Estructura del Proyecto

### Apps

#### `apps/api` - Backend API

- Express + TypeScript
- Rutas: `/quiz`, `/validate`, `/webhooks`, `/admin`
- Autenticación con Supabase Auth
- Rate limiting con Redis

#### `apps/trivia` - Trivia SPA

- Next.js 15 (App Router)
- Rutas dinámicas: `/:restaurant/:quiz`
- Tailwind CSS para estilos
- Optimizado para mobile

#### `apps/validator` - PWA Validación

- Next.js con PWA support
- Escáner QR (MediaDevices API)
- Offline-first con Service Workers
- Sync queue para operaciones offline

#### `apps/admin` - Backoffice

- Dashboard con KPIs
- CRUD de restaurantes y quizzes
- Reportes y exportación CSV
- Gestión de cupones

### Packages

#### `packages/database`

- Prisma schema para Supabase
- Migraciones versionadas
- Seed data para desarrollo

#### `packages/shared`

- Tipos TypeScript compartidos
- Validadores Zod
- Utilidades (generación de códigos, fechas)

#### `packages/email`

- Adapters para emBlue/SendGrid
- Plantillas HTML responsive
- Tracking de eventos

#### `packages/jobs`

- BullMQ processors
- Recordatorios automáticos
- Expiración de cupones
- List hygiene

---

## 🧪 Testing

### Estrategia

- **Unitarios**: Jest (coverage > 80%)
- **Integración**: Supertest
- **E2E**: Playwright
- **Load**: k6

### Ejecutar Tests

```bash
# Todos los tests
npm test

# Tests con coverage
npm run test:cov

# Tests E2E
npm run test:e2e

# Watch mode
npm run test:watch
```

---

## 🔒 Seguridad

- ✅ TLS extremo a extremo
- ✅ Rate limiting (Redis)
- ✅ CORS configurado
- ✅ Helmet.js para headers de seguridad
- ✅ Validación de input con Zod
- ✅ SQL injection prevention (Prisma)
- ✅ Secrets en variables de entorno

### Compliance

- ✅ Ley 25.326 (Argentina) - Protección de Datos Personales
- ✅ Consentimiento explícito
- ✅ Endpoint de baja/acceso/rectificación
- ✅ Anonimización a los 24 meses

---

## 📊 Observabilidad

- **Logs**: Pino (JSON structured)
- **Métricas**: Prometheus + Grafana
- **Errores**: Sentry
- **Tracing**: OpenTelemetry

---

## 🚢 Deployment

### Producción

```bash
# Build
npm run build

# Deploy API (Railway)
railway up

# Deploy Frontends (Vercel)
vercel --prod
```

### Docker

```bash
# Build imagen
docker build -f infra/docker/Dockerfile.api -t quickopinion-api .

# Run
docker run -p 3000:3000 --env-file .env quickopinion-api
```

---

## 📚 Documentación

### Guías de Setup

- [**LEEME PRIMERO**](./docs/setup/LEEME_PRIMERO.md) - Guía de inicio rápido
- [Configurar Supabase](./docs/setup/CONFIGURAR_SUPABASE_CREDENCIALES.md)
- [Configurar y Testear API](./docs/setup/CONFIGURAR_ENV_Y_TESTEAR.md)
- [Setup Inicial](./docs/setup/EMPEZAR_AQUI.md)

### Arquitectura

- [Arquitectura Simplificada](./docs/arquitectura/ARQUITECTURA_SIMPLIFICADA.md) - Diagrama y decisiones
- [Resumen de Cambios](./docs/arquitectura/RESUMEN_CAMBIOS.md)
- [Archivos Creados](./docs/arquitectura/ARCHIVOS_CREADOS.md)

### Fases del Proyecto

- [Fase 2: Backend API](./docs/fases/FASE_2_EXITOSA.md) ✅ Completada
- [Fase 3: Frontend Trivia](./docs/fases/FASE_3_FRONTEND_PLAN.md) 🔄 En progreso

### Documentación Técnica Completa

- [Contexto y Especificación](./docs/context.md) - Documento maestro del proyecto

---

## 🗺️ Roadmap

### ✅ Fase 0 - Setup Inicial (Completado)

- [x] Monorepo configurado con Turborepo
- [x] Estructura de carpetas
- [x] Tooling (ESLint, Prettier, Husky, Conventional Commits)
- [x] VSCode settings y extensions

### ✅ Fase 1 - Base de Datos (Completado)

- [x] Migraciones de Supabase
- [x] Prisma Client configurado
- [x] 6 tablas principales (Restaurant, Lead, Quiz, QuizResponse, Coupon, EmailEvent)
- [x] Seed data funcionando

### ✅ Fase 2 - Backend API (Completado)

- [x] Express + TypeScript
- [x] GET /api/quiz/:id - Obtener preguntas
- [x] POST /api/quiz/submit - Enviar respuestas y generar cupón
- [x] Validaciones con Zod
- [x] Regla anti-abuso 24h
- [x] Generación de códigos únicos
- [x] Email service (stub)
- [x] Tests funcionando

### 🔄 Fase 3 - Frontend Trivia (En progreso)

- [ ] Pantalla de bienvenida
- [ ] Sistema de 5 preguntas
- [ ] Formulario de lead capture
- [ ] Pantalla de resultado con cupón
- [ ] Mobile responsive
- [ ] Integración con backend

### 📅 Próximas Fases

- [ ] Fase 4: Validator PWA
- [ ] Fase 5: Admin Backoffice
- [ ] Fase 6: Emails Reales (emBlue/SendGrid)
- [ ] Fase 7: Deploy Producción

---

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'feat: add amazing feature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Convenciones de Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: nueva característica
fix: corrección de bug
docs: cambios en documentación
style: formateo, sin cambios de código
refactor: refactorización de código
perf: mejoras de performance
test: agregar o modificar tests
build: cambios en build o dependencias
ci: cambios en CI/CD
chore: otras tareas de mantenimiento
```

---

## 📄 Licencia

Este proyecto es privado y propietario.

---

## 👥 Equipo

- **Desarrollador**: Sebastian Gomez
- **Proyecto**: QuickOpinion App
- **Fecha**: Octubre 2025

---

## 📞 Soporte

Para preguntas o soporte, contactar a través de:

- Email: soporte@quickopinion.com
- Documentación: [docs/context.md](./docs/context.md)

---

## 🙏 Agradecimientos

- Next.js team por el framework
- Prisma team por el ORM
- Supabase por el BaaS
- Turborepo por el tooling de monorepo

---

**¡Construido con ❤️ para revolucionar la fidelización en restaurantes!**
