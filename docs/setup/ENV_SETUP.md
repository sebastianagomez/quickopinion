# 🔐 Configuración de Variables de Entorno

## Archivos a Crear

Necesitas crear estos 2 archivos con tus credenciales:

### 1. `.env` (raíz del proyecto)

```bash
# Node Environment
NODE_ENV=development

# Supabase (obtén de https://app.supabase.com → Settings → API)
SUPABASE_URL="https://xxxxxxxxxxxxx.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
SUPABASE_SERVICE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Database (Supabase → Settings → Database → Connection String)
DATABASE_URL="postgresql://postgres:[TU-PASSWORD]@db.xxxxxxxxxxxxx.supabase.co:5432/postgres"

# Redis (crea gratis en https://upstash.com)
REDIS_URL="redis://default:[PASSWORD]@[HOST].upstash.io:6379"

# Email Provider (opcional por ahora)
EMBLUE_API_KEY=""
EMBLUE_API_URL="https://api.embluemail.com/v1"
SENDGRID_API_KEY=""

# API Configuration
API_PORT=3000
API_URL="http://localhost:3000"

# Frontend URLs
TRIVIA_URL="http://localhost:3001"
VALIDATOR_URL="http://localhost:3002"
ADMIN_URL="http://localhost:3003"

# JWT Secret
JWT_SECRET="cambia-esto-por-algo-seguro"

# Observability (opcional)
SENTRY_DSN=""
OTEL_EXPORTER_OTLP_ENDPOINT=""
```

### 2. `packages/database/.env`

```bash
# Prisma Database URL (el mismo que arriba)
DATABASE_URL="postgresql://postgres:[TU-PASSWORD]@db.xxxxxxxxxxxxx.supabase.co:5432/postgres"
```

---

## 📝 Cómo Obtener las Credenciales

### Supabase

1. Ve a https://app.supabase.com
2. Selecciona tu proyecto
3. **API Keys** (Settings → API):
   - `SUPABASE_URL`: Project URL
   - `SUPABASE_ANON_KEY`: anon/public key
   - `SUPABASE_SERVICE_KEY`: service_role key (⚠️ secreto)
   
4. **Database URL** (Settings → Database):
   - Copia el "Connection string" en formato URI
   - Reemplaza `[YOUR-PASSWORD]` con tu contraseña real

### Redis (Upstash - Gratis)

1. Ve a https://upstash.com
2. Sign up gratis
3. Create Database → Redis
4. Copia el "Redis URL" completo

---

## ✅ Verificar Configuración

Después de crear los archivos:

```bash
# Verificar que se carguen las variables
node -e "require('dotenv').config(); console.log('SUPABASE_URL:', process.env.SUPABASE_URL)"
```

---

## 🚨 Importante

- ⚠️ **NUNCA** subas estos archivos a Git
- ⚠️ Los archivos `.env*` están en `.gitignore`
- ⚠️ No compartas las credenciales

---

**Siguiente paso**: `docs/SETUP_SUPABASE.md` para configurar la base de datos

