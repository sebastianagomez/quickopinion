# Setup de Supabase - Guía Paso a Paso 🚀

Esta guía te ayudará a configurar Supabase para QuickOpinion.

---

## 📋 Prerequisitos

- Cuenta de Supabase (gratis en https://supabase.com)
- Proyecto de Supabase (nuevo o existente vacío)

---

## 🎯 Paso 1: Obtener Credenciales

### A. Ir a tu Dashboard de Supabase

1. Ve a https://app.supabase.com
2. Selecciona tu proyecto (o crea uno nuevo)
3. Ve a **Settings** (⚙️) en el sidebar izquierdo

### B. API Credentials

1. En Settings, ve a **API**
2. Copia estos 3 valores:

```bash
# Project URL
URL: https://xxxxxxxxxxxxx.supabase.co

# anon/public key
anon key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# service_role key (⚠️ SECRETO - nunca en cliente)
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### C. Database Connection String

1. En Settings, ve a **Database**
2. Scroll hasta **Connection string**
3. Selecciona la pestaña **URI**
4. Copia la connection string completa:

```bash
postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxxx.supabase.co:5432/postgres
```

⚠️ **Importante**: Reemplaza `[YOUR-PASSWORD]` con tu contraseña real del proyecto

---

## 🔧 Paso 2: Configurar Variables de Entorno

### A. En la Raíz del Proyecto

Edita el archivo `.env` (ya existe):

```bash
# .env

# Supabase
SUPABASE_URL="https://xxxxxxxxxxxxx.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
SUPABASE_SERVICE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Database URL (para Prisma)
DATABASE_URL="postgresql://postgres:[TU-PASSWORD]@db.xxxxxxxxxxxxx.supabase.co:5432/postgres"

# Redis (lo configuraremos después con Upstash)
REDIS_URL="redis://default:[PASSWORD]@[HOST].upstash.io:6379"
```

### B. En packages/database/.env

```bash
# packages/database/.env

DATABASE_URL="postgresql://postgres:[TU-PASSWORD]@db.xxxxxxxxxxxxx.supabase.co:5432/postgres"
```

---

## 🔴 Paso 3: Setup Redis Cloud (Upstash - Gratis)

### A. Crear Cuenta Upstash

1. Ve a https://upstash.com
2. Sign up gratis con GitHub o email
3. Crea una base de datos Redis:
   - Name: `quickopinion-redis`
   - Type: Regional
   - Region: Elige el más cercano (ej: us-east-1)
   - Plan: Free (suficiente para empezar)

### B. Obtener Connection String

1. Una vez creada, ve a tu base de datos
2. Copia el **REST URL** o **Connection String**

```bash
# Formato típico:
redis://default:AZG...xxx@us1-xxx.upstash.io:6379
```

3. Pégalo en `.env`:
```bash
REDIS_URL="redis://default:AZG...xxx@us1-xxx.upstash.io:6379"
```

---

## ✅ Paso 4: Verificar Configuración

Ejecuta este comando para verificar que todo esté bien:

```bash
# Verificar que las variables estén cargadas
node -e "require('dotenv').config(); console.log('SUPABASE_URL:', process.env.SUPABASE_URL)"
```

Deberías ver tu URL de Supabase.

---

## 🗄️ Paso 5: Ejecutar Migraciones

Ahora vamos a crear las tablas en Supabase:

```bash
# 1. Ir al directorio de database
cd packages/database

# 2. Generar Prisma Client
npx prisma generate

# 3. Ejecutar migraciones (esto crea las tablas)
npx prisma migrate dev --name init

# 4. Volver a la raíz
cd ../..
```

Esto creará:
- ✅ `restaurants`
- ✅ `leads`
- ✅ `quizzes`
- ✅ `quiz_responses`
- ✅ `coupons`
- ✅ `email_events`

---

## 🔍 Paso 6: Verificar con Prisma Studio

```bash
npm run db:studio
```

Esto abrirá http://localhost:5555 con una interfaz visual de tu base de datos.

Deberías ver las 6 tablas vacías. ✅

---

## 🌱 Paso 7: Cargar Datos de Prueba

Primero vamos a crear el archivo de seed:

```bash
# Ya lo crearemos en el siguiente paso
npm run db:seed
```

Esto creará:
- 1 restaurante de prueba
- 1 quiz de prueba
- Algunos leads y cupones de ejemplo

---

## 🎉 ¡Listo!

Tu Supabase está configurado. Ahora puedes:

```bash
# Iniciar el servidor de desarrollo
npm run dev
```

Y verificar la conexión:

```bash
curl http://localhost:3000/health
```

---

## 🆘 Troubleshooting

### Error: "Connection refused"

- Verifica que el `DATABASE_URL` sea correcto
- Verifica que la contraseña no tenga caracteres especiales (si tiene, usa URL encoding)
- Verifica que el proyecto de Supabase esté activo

### Error: "Invalid API key"

- Verifica que hayas copiado las keys correctamente
- No uses la `anon key` donde debe ir la `service_role key`

### Error: "Migration failed"

- Verifica que no haya tablas con los mismos nombres
- Si el proyecto tiene tablas existentes, considera usar uno nuevo

---

## 📝 Checklist

- [ ] Cuenta Supabase creada
- [ ] Proyecto Supabase activo
- [ ] Variables de entorno configuradas en `.env`
- [ ] Redis de Upstash configurado
- [ ] Migraciones ejecutadas exitosamente
- [ ] Prisma Studio muestra las tablas
- [ ] Datos de prueba cargados

---

## 🔐 Seguridad

⚠️ **NUNCA** compartas o commitees:
- `SUPABASE_SERVICE_KEY`
- `DATABASE_URL` (contiene tu password)
- `REDIS_URL` (contiene credentials)

Estos valores deben estar solo en `.env` que está en `.gitignore`.

---

**Siguiente paso**: [Crear el seed data](./SEED_DATA.md)

