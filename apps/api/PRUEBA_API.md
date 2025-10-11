# 🧪 Cómo Probar el API

## ✅ Prerequisitos

1. Base de datos con datos de prueba (ya lo hiciste con `npm run db:seed`)
2. Variables de entorno configuradas en `.env`
3. API corriendo en http://localhost:3000

## 🚀 Arrancar el API

```bash
# Desde la raíz del proyecto
npm run dev --workspace=@quickopinion/api

# O directamente
cd apps/api
npm run dev
```

Deberías ver:

```
🚀 QuickOpinion API listening on port 3000
📝 Environment: development
🔗 Health check: http://localhost:3000/health
✅ Database connected successfully
```

---

## 🔍 Obtener IDs Necesarios

Primero necesitas obtener los IDs del restaurante y quiz de tu base de datos:

### Opción 1: Prisma Studio

```bash
npm run db:studio
```

Abre http://localhost:5555

1. Click en `restaurants` → Copia el `id`
2. Click en `quizzes` → Copia el `id`

### Opción 2: SQL Directo en Supabase

Ve a https://app.supabase.com → Tu proyecto → SQL Editor

```sql
-- Obtener restaurant ID
SELECT id, name, slug FROM restaurants LIMIT 1;

-- Obtener quiz ID
SELECT id, name FROM quizzes LIMIT 1;
```

---

## 🧪 Testear Endpoints

### 1. Health Check

```bash
curl http://localhost:3000/health
```

**Respuesta esperada:**

```json
{
  "status": "ok",
  "timestamp": "2025-10-10T...",
  "database": "connected"
}
```

---

### 2. GET Quiz

Reemplaza `{QUIZ_ID}` con tu ID real:

```bash
curl http://localhost:3000/api/quiz/{QUIZ_ID}
```

**Respuesta esperada:**

```json
{
  "quiz": {
    "id": "...",
    "name": "Trivia Gastronómica",
    "restaurant": {
      "id": "...",
      "name": "Restaurante Demo",
      "slug": "resto-demo",
      "defaultReward": "Postre gratis"
    },
    "questions": [
      {
        "id": "q1",
        "question": "¿Cuál es el ingrediente principal de la pasta carbonara?",
        "options": ["Crema", "Huevo", "Queso crema", "Leche"]
      }
      // ... 4 preguntas más (sin respuestas correctas)
    ]
  }
}
```

---

### 3. POST Quiz Submit (Primera vez)

Crea un archivo `test-submit.json`:

```json
{
  "quiz_id": "REEMPLAZA_CON_TU_QUIZ_ID",
  "restaurant_id": "REEMPLAZA_CON_TU_RESTAURANT_ID",
  "name": "Juan Pérez",
  "email": "juan.test@example.com",
  "phone": "+5491112345678",
  "message": "¡Excelente trivia!",
  "consent": true,
  "answers": [
    { "question_id": "q1", "selected_option": "Huevo" },
    { "question_id": "q2", "selected_option": "España" },
    { "question_id": "q3", "selected_option": "El quinto sabor básico" },
    { "question_id": "q4", "selected_option": "Brie" },
    { "question_id": "q5", "selected_option": "160°C" }
  ],
  "meta": {
    "ip": "192.168.1.1",
    "user_agent": "curl/test"
  }
}
```

Ejecuta:

```bash
curl -X POST http://localhost:3000/api/quiz/submit \
  -H "Content-Type: application/json" \
  -d @test-submit.json
```

**Respuesta esperada (200):**

```json
{
  "success": true,
  "result": {
    "correct": 5,
    "total": 5,
    "score": 100
  },
  "coupon": {
    "code": "DEMO-2510-A3F9",
    "reward": "Postre gratis",
    "expires_at": "2025-11-09T23:59:59.999Z"
  },
  "message": "¡Gracias Juan Pérez por participar! Te enviamos tu cupón por email."
}
```

**Verifica en los logs:**

```
📧 [EMAIL STUB] Would send email to: juan.test@example.com
   Subject: ¡Tu cupón de Restaurante Demo está listo!
   Code: DEMO-2510-A3F9
   Reward: Postre gratis
```

---

### 4. POST Quiz Submit - Regla 24h (Mismo email)

Ejecuta el mismo request otra vez:

```bash
curl -X POST http://localhost:3000/api/quiz/submit \
  -H "Content-Type: application/json" \
  -d @test-submit.json
```

**Respuesta esperada (409 Conflict):**

```json
{
  "error": "ALREADY_PARTICIPATED",
  "message": "Ya participaste en las últimas 24 horas",
  "coupon": {
    "code": "DEMO-2510-A3F9",
    "reward": "Postre gratis",
    "expires_at": "2025-11-09T23:59:59.999Z"
  }
}
```

✅ **¡La regla de 24h funciona!**

---

### 5. Casos de Error

#### Email inválido (400)

```bash
curl -X POST http://localhost:3000/api/quiz/submit \
  -H "Content-Type: application/json" \
  -d '{
    "quiz_id": "...",
    "restaurant_id": "...",
    "name": "Test",
    "email": "invalid-email",
    "consent": true,
    "answers": []
  }'
```

#### Sin consentimiento (400)

```bash
curl -X POST http://localhost:3000/api/quiz/submit \
  -H "Content-Type: application/json" \
  -d '{
    "quiz_id": "...",
    "restaurant_id": "...",
    "name": "Test",
    "email": "test@example.com",
    "consent": false,
    "answers": []
  }'
```

---

## 🔍 Verificar en la Base de Datos

Después de hacer un submit exitoso, verifica en Prisma Studio:

```bash
npm run db:studio
```

**Deberías ver:**

1. **leads**: Nuevo lead creado
2. **quiz_responses**: Nueva respuesta guardada
3. **coupons**: Nuevo cupón con estado ACTIVE
4. **email_events**: (pendiente para Fase 6)

---

## 📊 Logs Útiles

El API loguea todo con Pino. Verás:

```
✅ Database connected successfully
INFO: POST /api/quiz/submit
INFO: quiz_submit_start { quiz_id: '...', restaurant_id: '...', email: '...' }
INFO: quiz_score_calculated { score: { correct: 5, total: 5, score: 100 } }
INFO: coupon_created { email: '...', coupon_code: 'DEMO-2510-A3F9' }
📧 [EMAIL STUB] Would send email to: ...
INFO: quiz_submit_success
```

---

## ✅ Checklist de Tests

- [ ] Health check devuelve 200
- [ ] GET /api/quiz/:id devuelve preguntas (sin respuestas correctas)
- [ ] POST /quiz/submit primera vez → 200 + cupón nuevo
- [ ] POST /quiz/submit mismo email <24h → 409 + cupón existente
- [ ] POST /quiz/submit email diferente → 200 + cupón nuevo
- [ ] Validaciones funcionan (email inválido → 400)
- [ ] Consentimiento requerido (false → 400)
- [ ] Quiz inexistente → 404
- [ ] Score se calcula correctamente
- [ ] Código de cupón es único
- [ ] Email stub loguea correctamente

---

## 🎯 ¡Listo!

Si todos los tests pasan, **¡el backend está funcionando perfectamente!** 🎉

**Siguiente paso**: Conectar el frontend (Fase 3) o configurar emails reales (Fase 6)

---

## 🆘 Troubleshooting

### "Cannot find module '@prisma/client'"

```bash
cd packages/database
npx prisma generate
cd ../..
```

### "Connection to database failed"

Verifica las variables de entorno en `.env`

### "Port 3000 already in use"

```bash
# Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
```

---

**¡Feliz testing! 🚀**
