# 🎨 Fase 3: Frontend Trivia - Plan de Desarrollo

## 🎯 Objetivo

Crear la aplicación web de trivia con **Next.js 15 + React** que consuma el backend que acabamos de construir.

**Resultado final:** Una trivia moderna, bonita y completamente funcional.

---

## 📊 Flujo UI (Basado en tu descripción)

```
┌─────────────────────┐
│  1. BIENVENIDA      │  Mensaje inicial
│  "¡Bienvenido a..."  │  Botón "Comenzar"
└─────────────────────┘
          ↓
┌─────────────────────┐
│  2. PREGUNTAS       │  Las 5 preguntas juntas
│  ┌─────────────────┐│  (No "siguiente pregunta")
│  │ Pregunta 1  [ ] ││  Radio buttons
│  │ Pregunta 2  [ ] ││  o tarjetas clickeables
│  │ Pregunta 3  [ ] ││
│  │ Pregunta 4  [ ] ││  Botón "Enviar" al final
│  │ Pregunta 5  [ ] ││  (habilitado cuando todas
│  └─────────────────┘│   estén respondidas)
└─────────────────────┘
          ↓
┌─────────────────────┐
│  3. FORMULARIO      │  Se abre tras hacer submit
│  Nombre:    [____]  │  de las preguntas
│  Email:     [____]  │
│  (Opcional)         │  Validaciones en tiempo real
│  Teléfono:  [____]  │
│  Mensaje:   [____]  │  ✓ Nombre requerido
│                     │  ✓ Email válido requerido
│  [ ] Acepto términos│  ✓ Checkbox obligatorio
│                     │
│    [Enviar Datos]   │
└─────────────────────┘
          ↓
┌─────────────────────┐
│  4. RESULTADO       │  Pantalla final
│  🎉 ¡Felicitaciones!│
│                     │  Score: 4/5
│  Tu cupón:          │
│  ┌─────────────────┐│  Código destacado
│  │ DEMO-2510-XXXX  ││  (copiable)
│  └─────────────────┘│
│                     │  "Premio: Postre gratis"
│  Válido hasta:      │  "Vence: 09/11/2025"
│  09/11/2025         │
│                     │  Mensaje de email enviado
│  📧 Enviado a tu    │
│     email también   │
└─────────────────────┘
```

---

## 🎨 Diseño y UX

### Stack Frontend

- ✅ **Next.js 15** (App Router)
- ✅ **React 19**
- ✅ **TypeScript**
- ✅ **Tailwind CSS** (para UI moderna)
- ✅ **Zod** (validación de forms)
- ✅ **React Hook Form** (manejo de formularios)

### Principios de Diseño

- 🎨 **Moderno y limpio** - Inspirado en apps tipo Duolingo/Kahoot
- 📱 **Mobile-first** - Responsive desde el inicio
- ⚡ **Rápido** - Optimizado, sin delays innecesarios
- ♿ **Accesible** - Buenas prácticas de a11y
- 🎯 **Simple** - Sin distracciones, foco en la trivia

### Paleta de Colores (Sugerida)

```css
--primary: #ff6b35 /* Naranja vibrante */ --secondary: #004e89 /* Azul oscuro */
  --success: #10b981 /* Verde éxito */ --error: #ef4444 /* Rojo error */
  --background: #f9fafb /* Gris muy claro */ --text: #1f2937 /* Gris oscuro */;
```

(Podemos ajustar según tu brand de QuickOpinion)

---

## 📁 Estructura de Archivos

```
apps/trivia/
├── src/
│   ├── app/
│   │   ├── layout.tsx              ✅ Ya existe
│   │   ├── page.tsx                ✅ Modificar (landing page)
│   │   ├── [restaurantSlug]/
│   │   │   └── page.tsx            🆕 Página principal de trivia
│   │   └── globals.css             ✅ Ya existe (actualizar)
│   │
│   ├── components/
│   │   ├── quiz/
│   │   │   ├── WelcomeScreen.tsx   🆕 Pantalla de bienvenida
│   │   │   ├── QuestionsList.tsx   🆕 Lista de 5 preguntas
│   │   │   ├── QuestionCard.tsx    🆕 Cada pregunta
│   │   │   ├── LeadForm.tsx        🆕 Formulario de datos
│   │   │   └── ResultScreen.tsx    🆕 Pantalla de resultado
│   │   ├── ui/
│   │   │   ├── Button.tsx          🆕 Componente reutilizable
│   │   │   ├── Input.tsx           🆕 Input con validación
│   │   │   ├── Card.tsx            🆕 Tarjetas
│   │   │   └── Toast.tsx           🆕 Notificaciones
│   │   └── layout/
│   │       ├── Header.tsx          🆕 Header simple
│   │       └── Footer.tsx          🆕 Footer con copyright
│   │
│   ├── lib/
│   │   ├── api.ts                  🆕 Cliente API (fetch wrapper)
│   │   ├── validators.ts           🆕 Schemas Zod
│   │   └── utils.ts                🆕 Utilidades
│   │
│   └── types/
│       └── quiz.ts                 🆕 Types TypeScript
│
├── public/
│   ├── logo.svg                    🆕 Logo QuickOpinion
│   └── favicon.ico                 🆕 Favicon
│
└── package.json                    ✅ Ya existe
```

---

## 🔧 Features a Implementar

### 1. Pantalla de Bienvenida

```typescript
// WelcomeScreen.tsx
- Título del restaurante
- Subtítulo de la trivia
- Descripción breve
- Botón "Comenzar" destacado
- Animación suave de entrada
```

### 2. Sistema de Preguntas

```typescript
// QuestionsList.tsx + QuestionCard.tsx
- Mostrar 5 preguntas simultáneamente
- Cada pregunta es una tarjeta
- Opciones con radio buttons o botones
- Feedback visual al seleccionar (borde/color)
- Validación: todas respondidas para habilitar "Enviar"
- Loading state mientras se procesan
```

### 3. Formulario de Lead

```typescript
// LeadForm.tsx
- Campos: name, email, phone (opcional), message (opcional)
- Validación en tiempo real con Zod
- Mensajes de error claros
- Checkbox de consentimiento (obligatorio)
- Link a términos y condiciones
- Botón "Enviar" con loading state
```

### 4. Pantalla de Resultado

```typescript
// ResultScreen.tsx
- Score destacado (ej: 4/5 ⭐⭐⭐⭐)
- Código de cupón en tarjeta grande
- Botón "Copiar código" con feedback
- Fecha de expiración
- Descripción del premio
- Mensaje de confirmación de email
- (Opcional) Botón "Compartir en redes"
```

### 5. Manejo de Errores

```typescript
- Ya participó (409) → Mostrar cupón existente
- Validación fallida (400) → Mensajes claros
- Error de red → "Verifica tu conexión"
- Error de servidor → "Intenta más tarde"
```

### 6. Loading States

```typescript
- Skeleton screens mientras carga
- Spinners en botones durante submit
- Transiciones suaves entre estados
```

---

## 🧪 Integración con Backend

### Endpoints a Consumir

```typescript
// lib/api.ts

// 1. Obtener quiz
GET /api/quiz/:id
→ Devuelve: { id, name, config: { questions }, restaurantId }

// 2. Enviar respuestas
POST /api/quiz/submit
Body: {
  quiz_id, restaurant_id, name, email, phone, message,
  consent, answers, meta
}
→ Devuelve: { coupon, result } o { error, coupon } (si ya participó)
```

### Manejo de Estados con React

```typescript
type QuizState =
  | { step: 'welcome' }
  | { step: 'questions'; answers: Record<string, string> }
  | { step: 'form'; answers: Record<string, string> }
  | { step: 'result'; coupon: Coupon; score: Score }
  | { step: 'error'; message: string };
```

---

## 📋 Plan de Desarrollo Paso a Paso

### Paso 1: Setup y Configuración (30 min)

- [ ] Instalar dependencias faltantes
- [ ] Configurar Tailwind
- [ ] Crear estructura de carpetas
- [ ] Setup de tipos TypeScript
- [ ] Cliente API básico

### Paso 2: Componentes UI Base (1 hora)

- [ ] Button component
- [ ] Input component
- [ ] Card component
- [ ] Toast/notification system
- [ ] Layout (Header + Footer)

### Paso 3: Pantalla de Bienvenida (1 hora)

- [ ] Diseño de WelcomeScreen
- [ ] Animaciones de entrada
- [ ] Conectar con data del restaurante
- [ ] Botón "Comenzar" → transición

### Paso 4: Sistema de Preguntas (2 horas)

- [ ] QuestionCard component
- [ ] QuestionsList component
- [ ] Sistema de selección de respuestas
- [ ] Validación de completitud
- [ ] Botón "Enviar" con lógica

### Paso 5: Formulario de Lead (1.5 horas)

- [ ] LeadForm component
- [ ] React Hook Form setup
- [ ] Validaciones con Zod
- [ ] Manejo de errores
- [ ] Submit a backend

### Paso 6: Pantalla de Resultado (1 hora)

- [ ] ResultScreen component
- [ ] Mostrar score
- [ ] Mostrar cupón
- [ ] Copiar al clipboard
- [ ] Animaciones de celebración 🎉

### Paso 7: Integración Completa (1 hora)

- [ ] Conectar todos los flujos
- [ ] Manejo de estados global
- [ ] Navegación entre pantallas
- [ ] Transiciones suaves

### Paso 8: Responsive & Polish (1 hora)

- [ ] Mobile responsive
- [ ] Tablet responsive
- [ ] Desktop responsive
- [ ] Ajustes de UX
- [ ] Loading states

### Paso 9: Testing E2E (1 hora)

- [ ] Flujo completo funcionando
- [ ] Casos de error manejados
- [ ] Validaciones funcionando
- [ ] Cross-browser testing

---

## 🎨 Mockups de UI (Texto)

### Pantalla 1: Bienvenida

```
┌──────────────────────────────────────┐
│                                      │
│         🍕 Restaurante Demo          │
│                                      │
│      Trivia Gastronómica 2025        │
│                                      │
│   Responde 5 preguntas y gana un     │
│      premio especial en tu           │
│        próxima visita!               │
│                                      │
│    ┌────────────────────────┐        │
│    │   🚀 Comenzar Trivia   │        │
│    └────────────────────────┘        │
│                                      │
│     Solo toma 2 minutos ⏱️           │
│                                      │
└──────────────────────────────────────┘
```

### Pantalla 2: Preguntas

```
┌──────────────────────────────────────┐
│  Trivia Gastronómica             1/5 │
├──────────────────────────────────────┤
│                                      │
│  ❓ ¿Cuál es el ingrediente...?      │
│   ○ Crema                            │
│   ● Huevo        ← seleccionado      │
│   ○ Queso crema                      │
│   ○ Leche                            │
│                                      │
│  ❓ ¿De dónde es originario...?      │
│   ○ Italia                           │
│   ● España       ← seleccionado      │
│   ○ Francia                          │
│   ○ Grecia                           │
│                                      │
│  ... (3 preguntas más)               │
│                                      │
│    ┌────────────────────────┐        │
│    │   ✅ Enviar Respuestas │        │
│    └────────────────────────┘        │
│                                      │
└──────────────────────────────────────┘
```

### Pantalla 3: Formulario

```
┌──────────────────────────────────────┐
│  ¡Casi listo! Dejanos tus datos     │
├──────────────────────────────────────┤
│                                      │
│  Nombre *                            │
│  ┌────────────────────────┐          │
│  │ Sebastian              │          │
│  └────────────────────────┘          │
│                                      │
│  Email *                             │
│  ┌────────────────────────┐          │
│  │ seb@quickopinion.com   │          │
│  └────────────────────────┘          │
│                                      │
│  Teléfono (opcional)                 │
│  ┌────────────────────────┐          │
│  │ +54 9 11 5555 1234     │          │
│  └────────────────────────┘          │
│                                      │
│  ☑ Acepto recibir mi cupón por      │
│    email y futuras promociones      │
│                                      │
│    ┌────────────────────────┐        │
│    │   🎁 Recibir Cupón     │        │
│    └────────────────────────┘        │
│                                      │
└──────────────────────────────────────┘
```

### Pantalla 4: Resultado

```
┌──────────────────────────────────────┐
│                                      │
│        🎉 ¡Felicitaciones!           │
│                                      │
│        Obtuviste 4 de 5              │
│        ⭐⭐⭐⭐                        │
│                                      │
│  ┌──────────────────────────────┐   │
│  │    Tu Código de Cupón:       │   │
│  │                              │   │
│  │      DEMO-2510-A3F9          │   │
│  │                              │   │
│  │      [📋 Copiar Código]      │   │
│  └──────────────────────────────┘   │
│                                      │
│     🎁 Premio: Postre gratis         │
│     📅 Válido hasta: 09/11/2025      │
│                                      │
│  📧 También te lo enviamos por       │
│     email a seb@quickopinion.com     │
│                                      │
│  ─────────────────────────────────   │
│                                      │
│  Mostrá este código en tu próxima    │
│  visita para canjear tu premio!      │
│                                      │
└──────────────────────────────────────┘
```

---

## 🚀 Resultado Final

Al completar esta fase tendrás:

✅ Una web app moderna y funcional  
✅ Flujo completo: bienvenida → preguntas → form → resultado  
✅ Integración con el backend funcionando  
✅ Mobile responsive  
✅ Manejo de errores robusto  
✅ UI pulida y profesional  
✅ Listo para mostrar a clientes

---

## ⏱️ Estimación de Tiempo

| Tarea               | Tiempo    |
| ------------------- | --------- |
| Setup               | 30 min    |
| UI Components Base  | 1 hora    |
| WelcomeScreen       | 1 hora    |
| Questions System    | 2 horas   |
| LeadForm            | 1.5 horas |
| ResultScreen        | 1 hora    |
| Integración         | 1 hora    |
| Responsive & Polish | 1 hora    |
| Testing E2E         | 1 hora    |

**Total: 10 horas** (distribuidas en 2-3 sesiones)

---

## 🎯 ¿Empezamos?

**Paso 1 inmediato:** Setup inicial y crear componentes UI base.

**¿Listo para construir el frontend?** 🚀
