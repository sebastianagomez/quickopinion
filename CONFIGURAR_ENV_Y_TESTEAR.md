# 🚀 Configurar y Testear el API - Guía Rápida

## 📋 Paso 1: Configurar Variables de Entorno

### 1.1 Obtener Credenciales de Supabase

Ve a tu proyecto en Supabase:

**URL:** https://app.supabase.com/project/[tu-proyecto-id]

#### a) SUPABASE_URL y API Keys

1. Ve a: **Project Settings** → **API**
2. Copia:
   - **Project URL** → `SUPABASE_URL`
   - **anon public** → `SUPABASE_ANON_KEY`
   - **service_role** (⚠️ secret!) → `SUPABASE_SERVICE_KEY`

#### b) DATABASE_URL

1. Ve a: **Project Settings** → **Database**
2. Busca la sección **Connection string**
3. Selecciona el tab **"Transaction"** (importante!)
4. Copia el string que dice:
   ```
   postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
   ```
5. Reemplaza `[YOUR-PASSWORD]` con tu password de la base de datos

### 1.2 Editar el archivo .env

Abre el archivo: `apps\api\.env`

Reemplaza todos los valores placeholder:

```env
SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
DATABASE_URL=postgresql://postgres.xxxx:tu-password@...
```

**Guarda el archivo.**

---

## 🧪 Paso 2: Arrancar el API

```powershell
npm run dev --workspace=@quickopinion/api
```

Deberías ver:

```
🚀 QuickOpinion API listening on port 3000
✅ Database connected successfully
```

✅ Si ves esto, **el API está funcionando!**

❌ Si ves errores, revisa que las variables de entorno estén correctas.

---

## 📊 Paso 3: Obtener IDs para Testing

### Opción A: Desde Supabase (Recomendado)

1. Ve a: https://app.supabase.com/project/[tu-proyecto]/editor
2. Click en la tabla **`restaurants`**
3. Copia el **id** del "Restaurante Demo" (será algo como `d1234567-abcd-...`) fa6b73cd-0f74-4aff-8000-c1034c4f21ea
4. Click en la tabla **`quizzes`**
5. Copia el **id** de "Trivia Gastronómica" 00000000-0000-0000-0000-000000000001

### Opción B: Con SQL Directo

Ve a: **SQL Editor** en Supabase

Ejecuta:

```sql
SELECT id, name, slug FROM restaurants LIMIT 1;
SELECT id, name FROM quizzes LIMIT 1;
```

Copia los IDs que te devuelve.

---

## 🧪 Paso 4: Testear con curl (PowerShell)

### Test 1: Health Check

```powershell
curl http://localhost:3000/health
```

**Respuesta esperada:**

```json
{ "status": "ok", "timestamp": "..." }
```

---

### Test 2: GET Quiz

Reemplaza `TU_QUIZ_ID` con el ID que copiaste:

```powershell
curl http://localhost:3000/api/quiz/TU_QUIZ_ID
```

**Respuesta esperada:**

```json
{
  "id": "...",
  "name": "Trivia Gastronómica",
  "config": {
    "questions": [...]
  },
  "restaurantId": "..."
}
```

---

### Test 3: POST Submit Quiz (Primera vez)

Crea un archivo `test-submit.json` en la raíz del proyecto:

```json
{
  "quizId": "TU_QUIZ_ID",
  "restaurantId": "TU_RESTAURANT_ID",
  "name": "Sebastian Test",
  "email": "test@quickopinion.com",
  "phone": "+5491155551234",
  "consent": true,
  "answers": [
    { "questionId": "q1", "answer": "Huevo" },
    { "questionId": "q2", "answer": "España" },
    { "questionId": "q3", "answer": "El quinto sabor básico" },
    { "questionId": "q4", "answer": "Brie" },
    { "questionId": "q5", "answer": "160°C" }
  ],
  "meta": {
    "ip": "127.0.0.1",
    "userAgent": "PowerShell/Test"
  }
}
```

Luego ejecuta en PowerShell:

```powershell
# Opción 1: Con archivo JSON
curl -Method POST -Uri http://localhost:3000/api/quiz/submit -ContentType "application/json" -InFile test-submit.json

# Opción 2: Inline (todo en una línea)
curl -Method POST -Uri http://localhost:3000/api/quiz/submit -ContentType "application/json" -Body '{"quizId":"00000000-0000-0000-0000-000000000001","restaurantId":"fa6b73cd-0f74-4aff-8000-c1034c4f21ea","name":"Test","email":"test@quickopinion.com","consent":true,"answers":[{"questionId":"q1","answer":"Huevo"},{"questionId":"q2","answer":"España"},{"questionId":"q3","answer":"El quinto sabor básico"},{"questionId":"q4","answer":"Brie"},{"questionId":"q5","answer":"160°C"}]}'
```

**Respuesta esperada (Primera vez):**

```json
{
  "coupon": {
    "code": "RESTO-DEMO-2510-A3F9",
    "reward": "Postre gratis",
    "expires_at": "2025-11-09T23:59:59.999Z"
  },
  "result": {
    "correct": 5,
    "total": 5
  }
}
```

---

### Test 4: POST Submit Quiz (Segunda vez - Regla 24h)

Ejecuta el **mismo request** otra vez:

**Respuesta esperada (409 Conflict):**

```json
{
  "error": "ALREADY_PARTICIPATED",
  "message": "Ya participaste en las últimas 24 horas",
  "coupon": {
    "code": "RESTO-DEMO-2510-A3F9",
    "reward": "Postre gratis",
    "expires_at": "2025-11-09T23:59:59.999Z"
  }
}
```

✅ **¡Regla de 24h funcionando!**

---

## ✅ Checklist

- [ ] Variables de entorno configuradas
- [ ] API arrancando sin errores
- [ ] Health check funciona
- [ ] GET /api/quiz/:id devuelve preguntas
- [ ] POST /quiz/submit primera vez → 200 + cupón
- [ ] POST /quiz/submit segunda vez → 409 + mismo cupón
- [ ] Verificar en Supabase que se crearon: lead, quiz_response, coupon

---

## 🆘 Troubleshooting

### "Invalid environment variables"

- Verifica que el archivo `.env` existe en `apps/api/.env`
- Verifica que todas las variables tienen valores reales (no placeholders)

### "Database connection failed"

- Revisa el `DATABASE_URL`
- Asegúrate de haber seleccionado **"Transaction"** mode en Supabase
- Verifica el password

### "Cannot find module '@prisma/client'"

```powershell
cd packages\database
npx prisma generate
cd ..\..
```

### curl no funciona

En PowerShell de Windows, `curl` es un alias de `Invoke-WebRequest`. Usa la sintaxis completa:

```powershell
Invoke-WebRequest -Method GET -Uri http://localhost:3000/health
```

---

## 🎯 ¡Listo!

Una vez que todos los tests pasen, el backend está **100% funcional** y listo para conectar con el frontend.

**Siguiente fase:** Frontend con Next.js 15


npm run dev --workspace-@quickopinion/api