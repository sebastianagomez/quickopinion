# 🧪 Guía de Testing - Frontend Trivia

## ✅ Pre-requisitos

1. ✅ Backend API corriendo en puerto 3000
2. ✅ Base de datos con datos de prueba (seed ya ejecutado)
3. ✅ Variables de entorno configuradas

---

## 🚀 Paso 1: Arrancar el Frontend

Abre una **nueva terminal** (manteniendo el API corriendo en la otra):

```powershell
npm run dev --workspace=@quickopinion/trivia
```

Deberías ver:

```
- ready started server on 0.0.0.0:3001
- Local:        http://localhost:3001
```

---

## 🌐 Paso 2: Abrir en el Navegador

Abre tu navegador en:

```
http://localhost:3001/00000000-0000-0000-0000-000000000001
```

(Este es el ID del quiz de prueba que creamos con el seed)

---

## ✅ Paso 3: Probar el Flujo Completo

### 1️⃣ Pantalla de Bienvenida

- ✅ Deberías ver el logo de QuickOpinion
- ✅ Título "Trivia Gastronómica"
- ✅ Indicadores: 5 preguntas, ~2 minutos, 🎁
- ✅ Botón "🚀 Comenzar Trivia"

**Acción:** Click en "Comenzar Trivia"

---

### 2️⃣ Pantalla de Preguntas

- ✅ Barra de progreso arriba (0/5)
- ✅ 5 preguntas con opciones A, B, C, D
- ✅ Al hacer click en una opción, se marca en naranja
- ✅ El progreso se actualiza (1/5, 2/5, etc.)
- ✅ Botón "Enviar Respuestas" deshabilitado hasta responder todas

**Acción:** Responde todas las 5 preguntas

**Respuestas correctas (para obtener 5/5):**

1. "¿Cuál es el ingrediente principal...?" → **Huevo**
2. "¿De dónde es originario...?" → **España**
3. "¿Qué es el umami?" → **El quinto sabor básico**
4. "¿Qué tipo de queso es el Brie?" → **Brie** (la opción que dice Brie)
5. "¿A qué temperatura...?" → **160°C**

**Acción:** Click en "✅ Enviar Respuestas"

---

### 3️⃣ Pantalla de Formulario

- ✅ Icono de email 📧
- ✅ Título "¡Casi listo!"
- ✅ 4 campos visibles

**Acción:** Llena el formulario

```
Nombre: Sebastian Test
Email: test@quickopinion.com
Teléfono: +5491155551234 (opcional)
Mensaje: ¡Excelente trivia! (opcional)
☑️ Acepto recibir... (obligatorio)
```

**Acción:** Click en "🎁 Recibir Cupón"

Deberías ver un spinner de "Enviando..."

---

### 4️⃣ Pantalla de Resultado

- ✅ Emoji de celebración 🎉
- ✅ "¡Felicitaciones!"
- ✅ Score: 5/5 (100% Correctas)
- ✅ 5 círculos verdes
- ✅ Cupón con código (ej: "RESTO-DEMO-2510-XXXX")
- ✅ Botón "📋 Copiar Código"
- ✅ Premio: "Postre gratis"
- ✅ Fecha de expiración
- ✅ Confirmación: "También te enviamos este cupón por email..."
- ✅ Instrucciones (1, 2, 3)

**Acción:** Click en "📋 Copiar Código"

Deberías ver un **toast verde** que dice "¡Código copiado al portapapeles!"

---

## 🔄 Paso 4: Probar Regla de 24h

Sin recargar la página, abre una **nueva pestaña** en:

```
http://localhost:3001/00000000-0000-0000-0000-000000000001
```

Repite el flujo completo con el **mismo email** (`test@quickopinion.com`):

1. Click "Comenzar"
2. Responde las preguntas
3. Click "Enviar Respuestas"
4. Llena el formulario con el mismo email
5. Click "Recibir Cupón"

**Resultado esperado:**

- ✅ Deberías ver un **toast rojo** que dice "Ya participaste en las últimas 24 horas"
- ✅ Te lleva a la pantalla de resultado
- ✅ Muestra el **mismo cupón** que obtuviste antes

---

## ✅ Paso 5: Probar con Email Diferente

Repite el flujo con un **email diferente** (ej: `otro@email.com`)

**Resultado esperado:**

- ✅ Debería funcionar normalmente
- ✅ Generar un cupón **nuevo y diferente**

---

## 📱 Paso 6: Probar Responsive

### Mobile (375px)

1. Abre las DevTools (F12)
2. Click en el icono de dispositivos (Ctrl+Shift+M)
3. Selecciona "iPhone SE" o ingresa 375px
4. Repite el flujo completo

**Debería verse bien en mobile!**

### Tablet (768px)

1. Cambia el ancho a 768px
2. Repite el flujo

### Desktop (1920px)

1. Cambia el ancho a 1920px
2. Verifica que todo esté centrado

---

## 🚨 Paso 7: Probar Casos de Error

### Error 1: Campo requerido vacío

1. En el formulario, intenta enviar sin nombre
2. **Resultado:** Error "El nombre es requerido"

### Error 2: Email inválido

1. Ingresa email inválido (ej: "test")
2. **Resultado:** Error "El email no es válido"

### Error 3: Sin consentimiento

1. Desactiva el checkbox
2. **Resultado:** Error "Debes aceptar los términos..."

### Error 4: Backend apagado

1. Detén el API (Ctrl+C en la terminal del backend)
2. Intenta completar la trivia
3. **Resultado:** Toast rojo con error de conexión

---

## ✅ Checklist Completo

- [ ] Pantalla de bienvenida se ve bien
- [ ] Botón "Comenzar" funciona
- [ ] Las 5 preguntas se muestran
- [ ] Seleccionar opciones funciona
- [ ] Progreso se actualiza (X/5)
- [ ] Botón "Enviar" se habilita al responder todas
- [ ] Formulario se muestra correctamente
- [ ] Validaciones funcionan (nombre, email, consentimiento)
- [ ] Loading state durante submit
- [ ] Pantalla de resultado se muestra con cupón
- [ ] Copiar código funciona (toast de confirmación)
- [ ] Regla de 24h funciona (toast de error + mismo cupón)
- [ ] Email diferente genera cupón nuevo
- [ ] Responsive funciona en mobile, tablet y desktop
- [ ] Animaciones se ven suaves
- [ ] No hay errores en la consola del navegador

---

## 🎯 Verificar en la Base de Datos

Después de completar la trivia, verifica en Supabase:

1. Ve a https://app.supabase.com
2. Selecciona tu proyecto
3. Click en "Table Editor"

**Tablas a verificar:**

### `leads`

Debería haber un nuevo registro con:

- email: `test@quickopinion.com`
- name: `Sebastian Test`
- consent: `true`

### `quiz_responses`

Debería haber un nuevo registro con:

- las 5 respuestas
- score calculado

### `coupons`

Debería haber un nuevo cupón con:

- code: `RESTO-DEMO-2510-XXXX`
- state: `ACTIVE`
- reward: `Postre gratis`
- expires_at: fecha +30 días

---

## 🎉 Si Todo Funciona...

**¡Felicitaciones! El frontend está 100% funcional.**

### Próximos pasos:

1. **Desplegar a producción** (Vercel + Railway)
2. **Continuar con Fase 4** (Validator PWA)
3. **O Fase 5** (Admin Backoffice)
4. **O Fase 6** (Emails reales)

---

## 🆘 Troubleshooting

### "Cannot GET /00000000..."

- Verifica que el quiz ID sea correcto
- Revisa que la base de datos tenga el quiz seed

### Spinner infinito al cargar

- Verifica que el backend esté corriendo
- Revisa el `.env.local` (debe tener `NEXT_PUBLIC_API_URL=http://localhost:3000`)

### Error 404 en el submit

- Verifica que el backend esté corriendo en puerto 3000
- Revisa los logs del backend para ver el error

### Estilos no se ven

- Recarga con Ctrl+Shift+R (hard refresh)
- Verifica que Tailwind esté compilando

---

**¡Éxito testeando!** 🚀
