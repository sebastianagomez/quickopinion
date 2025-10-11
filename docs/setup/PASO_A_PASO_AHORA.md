# 🚀 PASO A PASO - Qué Hacer Ahora

## ✅ Lo que Ya Hice

1. ✅ Eliminé toda dependencia de Redis/BullMQ/Upstash
2. ✅ Simplifiqué arquitectura a **solo Supabase + Vercel**
3. ✅ Actualicé toda la documentación
4. ✅ Creé archivos de configuración necesarios

**Costo: $0/mes** 🎉

---

## 📝 Lo que TÚ Debes Hacer (5 pasos - 10 minutos)

### 📌 PASO 1: Instalar Dependencias (3 min)

Abre tu terminal en la carpeta del proyecto y ejecuta:

```bash
npm install
```

Espera a que termine (puede tardar 2-3 minutos).

---

### 📌 PASO 2: Configurar Husky (30 segundos)

```bash
npm run prepare
```

Esto configura los git hooks para validar código antes de commits.

---

### 📌 PASO 3: Crear Archivo `.env` (2 minutos)

**Crea un archivo llamado `.env`** (sin extensión) en la raíz del proyecto con este contenido:

```env
NODE_ENV=development

# Supabase - PEGA TUS VALORES AQUÍ
SUPABASE_URL="https://xxxxxxxxxx.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
SUPABASE_SERVICE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Database - PEGA TU CONNECTION STRING AQUÍ
DATABASE_URL="postgresql://postgres:TU-PASSWORD@db.xxxxxxxxxx.supabase.co:5432/postgres"

# API Configuration (dejar como está)
API_PORT=3000
API_URL="http://localhost:3000"

# JWT Secret (dejar como está por ahora)
JWT_SECRET="desarrollo-secret-cambiar-en-produccion"
```

**⚠️ IMPORTANTE**:

- Reemplaza `SUPABASE_URL` con tu Project URL
- Reemplaza `SUPABASE_ANON_KEY` con tu anon key
- Reemplaza `SUPABASE_SERVICE_KEY` con tu service_role key
- Reemplaza `DATABASE_URL` con tu connection string (recuerda poner tu password)

#### ¿Dónde Encuentro Estos Valores?

1. Ve a https://app.supabase.com
2. Selecciona tu proyecto
3. **Settings** (⚙️ abajo a la izquierda) → **API**:
   - Copia `Project URL`
   - Copia `anon public` key
   - Copia `service_role` key
4. **Settings** → **Database**:
   - Scroll hasta "Connection string"
   - Copia el URI format
   - Reemplaza `[YOUR-PASSWORD]` con tu password del proyecto

---

### 📌 PASO 4: Crear Archivo `packages/database/.env` (1 minuto)

**Crea el archivo `packages/database/.env`** con:

```env
DATABASE_URL="postgresql://postgres:TU-PASSWORD@db.xxxxxxxxxx.supabase.co:5432/postgres"
```

(Es el mismo `DATABASE_URL` del paso anterior)

---

### 📌 PASO 5: Ejecutar Migraciones (2 minutos)

```bash
# Crear las tablas en Supabase
npm run db:migrate

# Cargar datos de prueba
npm run db:seed

# Ver los datos (opcional)
npm run db:studio
```

Esto creará 6 tablas y cargará datos de ejemplo.

---

## ✅ Verificar que Todo Funciona

```bash
npm run dev
```

Deberías ver:

```
✓ Trivia running on http://localhost:3001
✓ API running on http://localhost:3000
✓ Validator running on http://localhost:3002
✓ Admin running on http://localhost:3003
```

---

## 🎯 Resumen de Comandos (Copia y Pega)

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar Husky
npm run prepare

# 3. (Crear archivos .env manualmente con tus credenciales)

# 4. Ejecutar migraciones
npm run db:migrate

# 5. Cargar datos de prueba
npm run db:seed

# 6. Ver datos (opcional)
npm run db:studio

# 7. Iniciar desarrollo
npm run dev
```

---

## 🆘 Problemas Comunes

### "Cannot find module '@prisma/client'"

```bash
cd packages/database
npx prisma generate
cd ../..
```

### "Connection to database failed"

- Verifica que el `DATABASE_URL` sea correcto
- Verifica que pusiste tu password correcta
- Verifica que el proyecto de Supabase esté activo

### "Port already in use"

```bash
# Cierra otros procesos que usen el puerto
# O cambia el puerto en .env
```

---

## 📚 Documentación Útil

- **`RESUMEN_CAMBIOS.md`** - Qué cambió en la arquitectura
- **`ARQUITECTURA_SIMPLIFICADA.md`** - Arquitectura completa detallada
- **`EMPEZAR_AQUI.md`** - Guía completa
- **`README.md`** - Info general del proyecto

---

## 💬 ¿En Qué Paso Estás?

**Dime si:**

- ✅ Ya instalaste dependencias
- ✅ Ya creaste los archivos .env
- ❓ Tienes algún error
- ❓ Necesitas ayuda con algo

¡Vamos paso a paso! 🚀
