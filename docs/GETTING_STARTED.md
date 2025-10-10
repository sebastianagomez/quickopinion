# Getting Started - QuickOpinion App

Esta guía te ayudará a configurar el entorno de desarrollo de QuickOpinion desde cero.

---

## 📋 Prerequisitos

### Software Requerido

1. **Node.js** (v22 o superior)
   ```bash
   node --version  # Debe ser >= 22.0.0
   ```
   Descarga: https://nodejs.org/

2. **npm** (v10 o superior)
   ```bash
   npm --version  # Debe ser >= 10.0.0
   ```

3. **Git**
   ```bash
   git --version
   ```

4. **Docker** (opcional, para desarrollo local)
   ```bash
   docker --version
   docker-compose --version
   ```

### Servicios Externos

1. **Cuenta Supabase** (gratis)
   - Registrarse en: https://supabase.com
   - Crear un nuevo proyecto

2. **Cuenta Redis** (opcional para desarrollo)
   - Usar Docker local o
   - Upstash Redis: https://upstash.com

---

## 🚀 Instalación Paso a Paso

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/quickopinion-app.git
cd quickopinion-app
```

### 2. Instalar Dependencias

```bash
# Instalar todas las dependencias del monorepo
npm install
```

Este comando instalará las dependencias para:
- Root workspace
- apps/api
- apps/trivia
- apps/validator
- apps/admin
- packages/database
- packages/shared
- packages/email
- packages/jobs

### 3. Configurar Variables de Entorno

#### A. Copiar archivos de ejemplo

```bash
# En la raíz del proyecto
cp .env.example .env

# En packages/database
cp packages/database/.env.example packages/database/.env

# En apps/api
cp apps/api/.env.example apps/api/.env
```

#### B. Configurar Supabase

1. Ve a tu dashboard de Supabase: https://app.supabase.com
2. Selecciona tu proyecto
3. Ve a Settings → API
4. Copia las credenciales:

```bash
# En .env y apps/api/.env.example
SUPABASE_URL="https://tu-proyecto.supabase.co"
SUPABASE_ANON_KEY="tu-anon-key"
SUPABASE_SERVICE_KEY="tu-service-role-key"
```

5. Ve a Settings → Database
6. Copia la Connection String:

```bash
# En packages/database/.env
DATABASE_URL="postgresql://postgres:[TU-PASSWORD]@db.tu-proyecto.supabase.co:5432/postgres"
```

### 4. Configurar Servicios Locales (Docker)

#### Opción A: Usar Docker (Recomendado para desarrollo)

```bash
# Levantar PostgreSQL y Redis local
docker-compose up -d postgres redis

# Verificar que estén corriendo
docker-compose ps
```

Si usas Docker local, actualiza las URLs en `.env`:
```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/quickopinion"
REDIS_URL="redis://localhost:6379"
```

#### Opción B: Usar servicios cloud

- **Supabase**: Ya configurado en el paso 3
- **Redis**: Usar Upstash o Redis Cloud

```bash
# En .env
REDIS_URL="redis://default:tu-password@tu-redis.upstash.io:6379"
```

### 5. Ejecutar Migraciones de Base de Datos

```bash
# Ejecutar migraciones de Prisma
npm run db:migrate

# Generar Prisma Client
cd packages/database
npx prisma generate
cd ../..

# (Opcional) Cargar datos de ejemplo
npm run db:seed
```

### 6. Verificar Configuración

```bash
# Verificar Prisma
npm run db:studio
# Debe abrir http://localhost:5555 con Prisma Studio

# Verificar TypeScript
npm run type-check

# Verificar linting
npm run lint
```

---

## 🎯 Ejecutar en Desarrollo

### Iniciar Todos los Servicios

```bash
npm run dev
```

Esto iniciará:
- **API**: http://localhost:3000
- **Trivia**: http://localhost:3001
- **Validator**: http://localhost:3002
- **Admin**: http://localhost:3003

### Iniciar Servicios Individuales

```bash
# Solo API
npm run dev --workspace=@quickopinion/api

# Solo Trivia
npm run dev --workspace=@quickopinion/trivia

# Solo Validator
npm run dev --workspace=@quickopinion/validator

# Solo Admin
npm run dev --workspace=@quickopinion/admin
```

---

## ✅ Verificar que Todo Funciona

### 1. Verificar API

```bash
# Health check
curl http://localhost:3000/health

# Respuesta esperada:
# {"status":"ok","timestamp":"2025-10-09T..."}
```

### 2. Verificar Trivia

Abre http://localhost:3001 en tu navegador.
Deberías ver la página de bienvenida.

### 3. Verificar Base de Datos

```bash
# Abrir Prisma Studio
npm run db:studio

# Verificar que existan las tablas:
# - restaurants
# - leads
# - quizzes
# - coupons
# - quiz_responses
# - email_events
```

### 4. Verificar Redis

```bash
# Si usas Docker
docker exec -it quickopinion-redis redis-cli ping
# Respuesta: PONG
```

---

## 🔧 Troubleshooting

### Error: "Cannot find module '@prisma/client'"

```bash
cd packages/database
npx prisma generate
cd ../..
```

### Error: "Port 3000 already in use"

```bash
# Cambiar puerto en apps/api/.env
PORT=3001

# O matar el proceso
lsof -ti:3000 | xargs kill -9
```

### Error: "Connection to database failed"

1. Verifica que Docker esté corriendo:
   ```bash
   docker-compose ps
   ```

2. Verifica la URL en `packages/database/.env`:
   ```bash
   echo $DATABASE_URL
   ```

3. Reinicia PostgreSQL:
   ```bash
   docker-compose restart postgres
   ```

### Error: "Redis connection failed"

```bash
# Verificar Redis
docker-compose logs redis

# Reiniciar Redis
docker-compose restart redis
```

### Error de Permisos en Husky

```bash
chmod +x .husky/pre-commit
chmod +x .husky/commit-msg
```

---

## 📚 Próximos Pasos

Una vez que tengas el entorno funcionando:

1. **Lee la documentación completa**: [docs/context.md](./context.md)

2. **Revisa la arquitectura**: Entiende cómo se comunican los servicios

3. **Explora el código**:
   - `apps/api/src/main.ts` - Entry point del backend
   - `apps/trivia/src/app/page.tsx` - Página principal de la trivia
   - `packages/database/prisma/schema.prisma` - Schema de base de datos

4. **Ejecuta los tests**:
   ```bash
   npm test
   ```

5. **Comienza a desarrollar**:
   - Revisa las issues abiertas
   - Crea una rama feature
   - ¡Haz tus cambios!

---

## 🎓 Recursos Adicionales

- **Turborepo**: https://turbo.build/repo/docs
- **Next.js 15**: https://nextjs.org/docs
- **Prisma**: https://www.prisma.io/docs
- **Supabase**: https://supabase.com/docs
- **BullMQ**: https://docs.bullmq.io

---

## 🆘 ¿Necesitas Ayuda?

- Revisa la [documentación completa](./context.md)
- Crea un issue en GitHub
- Contacta al equipo de desarrollo

---

**¡Feliz coding! 🚀**

