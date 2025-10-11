# 🔐 Configurar Credenciales de Supabase

## 🎯 Objetivo

Crear 2 archivos `.env` con tus credenciales de Supabase para que la app funcione.

---

## 📋 Necesitas 4 Valores de Supabase

Antes de comenzar, obtén estos 4 valores:

### Ir a Supabase Dashboard

1. Abre https://app.supabase.com
2. Click en tu proyecto (el que acabas de crear)

### Obtener API Credentials

3. En el sidebar izquierdo, click en **Settings** (⚙️)
4. Click en **API**
5. Copia estos 3 valores:

```
✅ Project URL
   Ejemplo: https://abcdefghijk.supabase.co

✅ anon public key
   Ejemplo: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS...

✅ service_role key (⚠️ Este es secreto, nunca lo subas a Git)
   Ejemplo: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS...
```

### Obtener Database URL

6. Todavía en **Settings**, click en **Database**
7. Scroll hacia abajo hasta "**Connection string**"
8. Selecciona la pestaña **URI**
9. Copia el string completo:

```
✅ Connection String (URI)
   Ejemplo: postgresql://postgres:[YOUR-PASSWORD]@db.abcdefghijk.supabase.co:5432/postgres
```

10. **⚠️ IMPORTANTE**: Reemplaza `[YOUR-PASSWORD]` con tu password real

**¿No recuerdas tu password?**

- En Settings → Database → Reset Database Password

---

## 📝 Crear Archivos .env

### Archivo 1: `.env` (en la raíz del proyecto)

**Ubicación**: `D:\Sebi\QuickOpinion\QuickOpinion-App\quickopinion\.env`

**Contenido**:

```env
NODE_ENV=development

# Supabase - PEGA TUS VALORES AQUÍ ⬇️
SUPABASE_URL="https://abcdefghijk.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS..."
SUPABASE_SERVICE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS..."

# Database - PEGA TU CONNECTION STRING ⬇️
DATABASE_URL="postgresql://postgres:TU-PASSWORD-REAL@db.abcdefghijk.supabase.co:5432/postgres"

# API Configuration (dejar como está)
API_PORT=3000
API_URL="http://localhost:3000"

# JWT Secret (dejar como está)
JWT_SECRET="desarrollo-secret-cambiar-en-produccion"
```

**Checklist**:

- [ ] Reemplacé `SUPABASE_URL` con mi Project URL
- [ ] Reemplacé `SUPABASE_ANON_KEY` con mi anon key
- [ ] Reemplacé `SUPABASE_SERVICE_KEY` con mi service_role key
- [ ] Reemplacé `DATABASE_URL` con mi connection string
- [ ] En `DATABASE_URL` puse mi password REAL (sin corchetes)

---

### Archivo 2: `packages/database/.env`

**Ubicación**: `D:\Sebi\QuickOpinion\QuickOpinion-App\quickopinion\packages\database\.env`

**Contenido**:

```env
DATABASE_URL="postgresql://postgres:TU-PASSWORD-REAL@db.abcdefghijk.supabase.co:5432/postgres"
```

**Checklist**:

- [ ] Es el mismo `DATABASE_URL` del archivo anterior
- [ ] Tiene mi password REAL

---

## ✅ Ejemplo Completo (con datos ficticios)

### `.env`

```env
NODE_ENV=development

SUPABASE_URL="https://xyzabc123def.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5emFiYzEyM2RlZiIsInJvbGUiOiJhbm9uIn0.abc123xyz"
SUPABASE_SERVICE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5emFiYzEyM2RlZiIsInJvbGUiOiJzZXJ2aWNlX3JvbGUifQ.xyz789abc"

DATABASE_URL="postgresql://postgres:MiPassword123!@db.xyzabc123def.supabase.co:5432/postgres"

API_PORT=3000
API_URL="http://localhost:3000"

JWT_SECRET="desarrollo-secret-cambiar-en-produccion"
```

### `packages/database/.env`

```env
DATABASE_URL="postgresql://postgres:MiPassword123!@db.xyzabc123def.supabase.co:5432/postgres"
```

---

## 🚨 Errores Comunes

### ❌ "Password contains special characters"

Si tu password tiene caracteres especiales (`@`, `#`, `!`, etc.), debes URL-encodearlos:

| Carácter | Reemplazo |
| -------- | --------- |
| `@`      | `%40`     |
| `#`      | `%23`     |
| `!`      | `%21`     |
| `$`      | `%24`     |
| `%`      | `%25`     |
| `^`      | `%5E`     |
| `&`      | `%26`     |
| `*`      | `%2A`     |

**Ejemplo**:

```
Password original: MyPass@123!
Password encodado: MyPass%40123%21

DATABASE_URL="postgresql://postgres:MyPass%40123%21@db.xxx.supabase.co:5432/postgres"
```

### ❌ "Cannot find module 'dotenv'"

No te preocupes, se instalará cuando hagas `npm install`.

### ❌ "Access denied"

- Verifica que la password sea correcta
- Resetea la password en Supabase si es necesario

---

## ✅ Verificar que Funciona

Después de crear los archivos `.env`, ejecuta:

```bash
# Verificar que las variables se carguen
node -e "require('dotenv').config(); console.log('SUPABASE_URL:', process.env.SUPABASE_URL)"
```

Deberías ver tu Supabase URL.

---

## 📚 Próximo Paso

Una vez que hayas creado los 2 archivos `.env`, continúa con:

**`PASO_A_PASO_AHORA.md`** → Paso 4 (Ejecutar migraciones)

---

## 💬 ¿Necesitas Ayuda?

**Dime si:**

- No encuentras algún valor en Supabase
- Tienes algún error
- No sabes cómo crear los archivos .env

¡Aquí estoy para ayudarte! 🚀
