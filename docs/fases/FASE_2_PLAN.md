# 🚀 Fase 2: Backend API - Plan de Desarrollo

## 🎯 Objetivo

Crear una API REST funcional con Express que soporte el flujo completo de la trivia:

1. Obtener preguntas de quiz
2. Enviar respuestas + datos del usuario
3. Generar cupón único
4. Aplicar reglas de negocio (24h, validaciones)

---

## 📊 Flujo Completo (basado en UI)

```
Usuario abre trivia
     ↓
GET /api/quiz/:id → Devuelve 5 preguntas
     ↓
Usuario responde y llena datos
     ↓
POST /api/quiz/submit → {answers, name, email, phone, message}
     ↓
Backend:
  1. Valida datos
  2. Verifica regla 24h (email + restaurant)
  3. Calcula score (respuestas correctas)
  4. Crea/actualiza lead
  5. Genera código único
  6. Crea cupón
  7. [Stub] Envía email
     ↓
Response → {cupón, score, mensaje}
```

---

## 🏗️ Estructura del API

```
apps/api/src/
├── main.ts                 # Entry point
├── config/
│   ├── database.ts         # Prisma client
│   └── env.ts              # Validación de env vars
├── middleware/
│   ├── errorHandler.ts     # Global error handler
│   ├── validateRequest.ts  # Validación con Zod
│   └── cors.ts             # CORS config
├── routes/
│   ├── index.ts            # Router principal
│   ├── quiz.routes.ts      # Rutas de quiz
│   └── health.routes.ts    # Health check
├── controllers/
│   └── quiz.controller.ts  # Lógica de endpoints
├── services/
│   ├── quiz.service.ts     # Lógica de negocio quiz
│   ├── lead.service.ts     # Lógica de leads
│   ├── coupon.service.ts   # Generación de cupones
│   └── email.service.ts    # [Stub] Envío de emails
├── validators/
│   └── quiz.validators.ts  # Schemas Zod
└── utils/
    ├── generateCode.ts     # Generar código único
    └── logger.ts           # Pino logger
```

---

## 📝 Endpoints a Desarrollar

### 1. Health Check (Ya existe básico)

```typescript
GET /health
Response: { status: "ok", timestamp: "..." }
```

**Status:** ✅ Ya funciona

---

### 2. Obtener Quiz

```typescript
GET /api/quiz/:id
Query params: ?restaurantSlug=resto-demo (opcional)

Response 200:
{
  "quiz": {
    "id": "uuid",
    "name": "Trivia Gastronómica",
    "restaurant": {
      "name": "Restaurante Demo",
      "slug": "resto-demo"
    },
    "questions": [
      {
        "id": "q1",
        "question": "¿Cuál es el ingrediente principal de la pasta carbonara?",
        "options": ["Crema", "Huevo", "Queso crema", "Leche"]
      },
      // ... 4 preguntas más
    ]
  }
}

Response 404:
{
  "error": "Quiz not found"
}
```

**Lógica:**

- Buscar quiz por ID en DB
- Incluir restaurante
- Parsear `config` JSON para sacar preguntas
- **NO devolver respuestas correctas** (seguridad)

---

### 3. Enviar Respuestas (Principal)

```typescript
POST /api/quiz/submit

Headers:
Content-Type: application/json

Body:
{
  "quiz_id": "uuid",
  "restaurant_id": "uuid",  // o restaurant_slug
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "phone": "+5491112345678",  // opcional
  "message": "¡Estuvo genial!",  // opcional
  "consent": true,  // obligatorio
  "answers": [
    { "question_id": "q1", "selected_option": "Huevo" },
    { "question_id": "q2", "selected_option": "España" },
    // ... 5 respuestas
  ],
  "meta": {
    "ip": "192.168.1.1",
    "user_agent": "Mozilla/5.0..."
  }
}

Response 200:
{
  "success": true,
  "result": {
    "correct": 4,
    "total": 5,
    "score": 80
  },
  "coupon": {
    "code": "DEMO-2510-A3F9",
    "reward": "Postre gratis",
    "expires_at": "2025-11-09T23:59:59Z"
  },
  "message": "¡Gracias por participar! Te enviamos tu cupón por email."
}

Response 409 (Ya participó <24h):
{
  "error": "ALREADY_PARTICIPATED",
  "message": "Ya participaste en las últimas 24 horas",
  "coupon": {
    "code": "DEMO-2510-XXXX",
    "reward": "Postre gratis",
    "expires_at": "2025-11-09T23:59:59Z"
  }
}

Response 400 (Validación):
{
  "error": "VALIDATION_ERROR",
  "details": [
    { "field": "email", "message": "Email inválido" },
    { "field": "consent", "message": "Debes aceptar los términos" }
  ]
}
```

**Lógica:**

1. **Validar input** con Zod
2. **Obtener quiz** de DB con respuestas correctas
3. **Calcular score** comparando respuestas
4. **Verificar regla 24h:**
   - Buscar lead por email + restaurant_id
   - Si existe cupón activo < 24h → Devolver cupón existente (409)
5. **Crear/actualizar lead:**
   - Si existe → actualizar
   - Si no existe → crear nuevo
6. **Guardar quiz_response:**
   - Respuestas + score
7. **Generar código único:**
   - Formato: `{RESTAURANT_SLUG}-{YYMM}-{RANDOM}`
   - Ejemplo: `DEMO-2510-A3F9`
8. **Crear cupón:**
   - state: ACTIVE
   - expires_at: +30 días
   - reward: del restaurante o quiz
9. **[Stub] Enviar email:**
   - Por ahora solo log
   - Más adelante: integración emBlue
10. **Response:** score + cupón

---

## 🔧 Tecnologías y Librerías

| Propósito     | Librería           | ¿Ya instalada? |
| ------------- | ------------------ | -------------- |
| Web framework | Express            | ✅             |
| Validación    | Zod                | ✅             |
| ORM           | Prisma             | ✅             |
| Logger        | Pino               | ✅             |
| CORS          | cors               | ✅             |
| Security      | helmet             | ✅             |
| Rate limiting | express-rate-limit | ✅             |
| Env vars      | dotenv             | ✅             |

**Todo ya instalado!** ✅

---

## 📋 Tareas Paso a Paso

### Paso 1: Estructura Base (30 min)

- [x] Crear carpetas
- [ ] Configurar Prisma client
- [ ] Setup logger
- [ ] Middleware de error handling

### Paso 2: Primer Endpoint (1 hora)

- [ ] GET /api/quiz/:id
- [ ] Controller
- [ ] Service
- [ ] Testear con REST client

### Paso 3: Validaciones (30 min)

- [ ] Crear schemas Zod
- [ ] Middleware de validación
- [ ] Error responses

### Paso 4: Quiz Submit - Básico (1 hora)

- [ ] POST /api/quiz/submit
- [ ] Recibir datos
- [ ] Validar
- [ ] Calcular score

### Paso 5: Quiz Submit - Crear Lead (1 hora)

- [ ] Buscar/crear lead
- [ ] Guardar quiz_response
- [ ] Regla de 24h

### Paso 6: Quiz Submit - Crear Cupón (1 hora)

- [ ] Generar código único
- [ ] Crear cupón en DB
- [ ] Response completo

### Paso 7: Email Stub (30 min)

- [ ] Service de email
- [ ] Por ahora solo logs
- [ ] Preparado para emBlue

### Paso 8: Testing (1 hora)

- [ ] Testear con REST client
- [ ] Casos de error
- [ ] Regla 24h
- [ ] Validaciones

---

## 🧪 Plan de Testing

### Casos a Probar

1. **GET /api/quiz/:id**
   - ✅ Quiz existe → 200
   - ❌ Quiz no existe → 404
   - ❌ ID inválido → 400

2. **POST /api/quiz/submit**
   - ✅ Primera participación → 200 + cupón nuevo
   - ⚠️ Ya participó <24h → 409 + cupón existente
   - ✅ Ya participó >24h → 200 + cupón nuevo
   - ❌ Email inválido → 400
   - ❌ Sin consentimiento → 400
   - ❌ Quiz no existe → 404

---

## 📝 Notas sobre Emails

**Por ahora:**

- Solo vamos a hacer un stub (función vacía que loguea)
- Estructura preparada para integración real

**Más adelante (Fase 6):**

- Integración con emBlue
- Plantillas HTML
- Tracking de eventos

---

## 🎯 Resultado Final de Fase 2

Al terminar tendremos:

✅ API REST funcional  
✅ Endpoints documentados  
✅ Validaciones robustas  
✅ Lógica de negocio completa  
✅ Regla de 24h funcionando  
✅ Generación de cupones  
✅ Todo testeable con Postman/Bruno

**Duración estimada:** 6-8 horas de desarrollo (repartidas en 3-4 sesiones)

---

## 🚀 Empezamos

**Paso 1 inmediato:** Crear la estructura de carpetas y archivos base.

**¿Listo para comenzar?** 💪
