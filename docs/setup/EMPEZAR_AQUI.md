# 🚀 EMPEZAR AQUÍ - QuickOpinion Setup

## ✅ Lo que Ya Está Hecho

He creado todos los **archivos de configuración** que faltaban en tu repositorio:

- Configuración de linter y formato (ESLint, Prettier)
- Git hooks para calidad de código (Husky)
- Configuración de VSCode
- `.gitignore` para proteger archivos sensibles
- Documentación completa

**Estado**: Fase 0 completada ✅

---

## 🎯 Lo que Debes Hacer Ahora (Paso a Paso)

### Paso 1: Instalar Dependencias (2 minutos)

```bash
npm install
```

Esto instalará todas las dependencias del proyecto.

### Paso 2: Configurar Git Hooks (30 segundos)

```bash
npm run prepare
```

Esto configurará Husky para validar tus commits.

### Paso 3: Configurar Supabase (5 minutos)

#### ¿Tienes un proyecto de Supabase?

- **Sí, y está vacío** → Úsalo ✅
- **Sí, pero tiene otras tablas** → Mejor crea uno nuevo para QuickOpinion
- **No tengo** → Crea uno ahora en https://supabase.com (gratis)

#### Obtener Credenciales

1. Ve a https://app.supabase.com
2. Selecciona tu proyecto
3. Ve a **Settings** → **API**
4. Copia estos 3 valores:
   - `Project URL`
   - `anon key`
   - `service_role key`
5. Ve a **Settings** → **Database**
6. Copia el `Connection String` (formato URI)

### Paso 4: Crear Archivos .env (2 minutos)

Necesitas crear 2 archivos manualmente:

#### A. Crear `.env` en la raíz del proyecto

Crea un archivo llamado `.env` (sin extensión adicional) con este contenido:

```env
NODE_ENV=development

# Supabase (pega tus valores aquí)
SUPABASE_URL="https://xxxxxxxxxxxxx.supabase.co"
SUPABASE_ANON_KEY="eyJhbGc..."
SUPABASE_SERVICE_KEY="eyJhbGc..."

# Database (pega tu connection string de Supabase)
DATABASE_URL="postgresql://postgres:[TU-PASSWORD]@db.xxxxxxxxxxxxx.supabase.co:5432/postgres"

# API Configuration
API_PORT=3000
API_URL="http://localhost:3000"

# JWT Secret
JWT_SECRET="cambia-esto-por-algo-seguro"
```

**⚠️ Importante**: Reemplaza `[TU-PASSWORD]`, `[PASSWORD]` y `[HOST]` con tus valores reales.

#### B. Crear `packages/database/.env`

Crea el archivo `packages/database/.env` con:

```env
DATABASE_URL="postgresql://postgres:[TU-PASSWORD]@db.xxxxxxxxxxxxx.supabase.co:5432/postgres"
```

(Usa el mismo `DATABASE_URL` del paso anterior)

### Paso 5: Ejecutar Migraciones (1 minuto)

```bash
npm run db:migrate
```

Esto creará todas las tablas en tu base de datos Supabase:

- restaurants
- leads
- quizzes
- quiz_responses
- coupons
- email_events

### Paso 6: Cargar Datos de Prueba (30 segundos)

```bash
npm run db:seed
```

Esto cargará:

- 1 restaurante demo
- 1 quiz con 5 preguntas
- 2 leads de ejemplo
- 2 cupones (1 activo, 1 canjeado)
- Eventos de email

### Paso 7: Verificar Base de Datos (opcional)

```bash
npm run db:studio
```

Esto abrirá Prisma Studio en http://localhost:5555 donde podrás ver tus datos.

### Paso 8: Iniciar el Proyecto 🎉

```bash
npm run dev
```

Esto iniciará todos los servicios:

- **API**: http://localhost:3000
- **Trivia**: http://localhost:3001
- **Validator**: http://localhost:3002
- **Admin**: http://localhost:3003

---

## ✅ Checklist Rápido

- [ ] `npm install` ✓
- [ ] `npm run prepare` ✓
- [ ] Obtener credenciales de Supabase ✅
- [ ] Crear `.env` en la raíz
- [ ] Crear `packages/database/.env`
- [ ] `npm run db:migrate` ✓
- [ ] `npm run db:seed` ✓
- [ ] `npm run db:studio` (verificar) ✓
- [ ] `npm run dev` 🚀

---

## 📚 Documentación Útil

Si te atascas, revisa estos archivos:

- **`ARCHIVOS_CREADOS.md`** - Lista de archivos que creé
- **`ENV_SETUP.md`** - Guía detallada de variables de entorno
- **`docs/SETUP_SUPABASE.md`** - Guía completa de Supabase con screenshots
- **`docs/GETTING_STARTED.md`** - Guía completa de inicio
- **`docs/QUICK_REFERENCE.md`** - Comandos útiles
- **`README.md`** - Información general del proyecto

---

## 🆘 Problemas Comunes

### Error: "Cannot find module '@prisma/client'"

```bash
cd packages/database
npx prisma generate
cd ../..
```

### Error: "Connection refused"

Verifica que:

1. El `DATABASE_URL` sea correcto
2. La contraseña no tenga caracteres especiales sin encodear
3. El proyecto de Supabase esté activo

### Error: "Port 3000 already in use"

```bash
# En PowerShell (Windows)
netstat -ano | findstr :3000
taskkill /PID [número] /F
```

---

## 💬 ¿Listo para Empezar?

**Pregúntame si tienes dudas sobre:**

- Cómo obtener las credenciales de Supabase
- Cómo configurar Upstash
- Cualquier paso que no esté claro

**¡Empecemos! 🚀**
