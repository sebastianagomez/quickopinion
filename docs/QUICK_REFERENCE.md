# QuickOpinion - Referencia Rápida 🚀

Comandos más utilizados para desarrollo diario.

---

## 🏃 Inicio Rápido

```bash
# Setup inicial (primera vez)
./scripts/init.sh

# Desarrollo diario
npm run dev
```

---

## 📦 Instalación y Setup

```bash
# Instalar dependencias
npm install

# Setup Husky
npm run prepare

# Copiar .env
cp .env.example .env
cp packages/database/.env.example packages/database/.env
```

---

## 🗄️ Base de Datos

```bash
# Ejecutar migraciones
npm run db:migrate

# Seed data
npm run db:seed

# Abrir Prisma Studio
npm run db:studio

# Generar Prisma Client
cd packages/database && npx prisma generate

# Reset database (⚠️ destructivo)
npm run db:reset

# Ver estado de migraciones
cd packages/database && npx prisma migrate status
```

---

## 🚀 Desarrollo

```bash
# Iniciar todos los servicios
npm run dev

# Iniciar servicios individuales
npm run dev --workspace=@quickopinion/api        # API en :3000
npm run dev --workspace=@quickopinion/trivia     # Trivia en :3001
npm run dev --workspace=@quickopinion/validator  # Validator en :3002
npm run dev --workspace=@quickopinion/admin      # Admin en :3003
```

---

## 🏗️ Build

```bash
# Build todos los workspaces
npm run build

# Build workspace específico
npm run build --workspace=@quickopinion/api
npm run build --workspace=@quickopinion/trivia
```

---

## ✅ Calidad de Código

```bash
# Lint
npm run lint

# Fix automático
npm run lint -- --fix

# Format con Prettier
npm run format

# Verificar formato
npm run format:check

# Type check
npm run type-check
```

---

## 🧪 Testing

```bash
# Tests unitarios
npm test

# Tests con coverage
npm run test:cov

# Tests en watch mode
npm run test:watch

# Tests E2E
npm run test:e2e

# Tests de un workspace
npm test --workspace=@quickopinion/api
```

---

## 🐳 Docker

```bash
# Levantar PostgreSQL y Redis
docker-compose up -d postgres redis

# Ver logs
docker-compose logs -f postgres
docker-compose logs -f redis

# Ver estado
docker-compose ps

# Parar servicios
docker-compose down

# Parar y eliminar volúmenes
docker-compose down -v

# Rebuild
docker-compose build --no-cache

# Entrar a PostgreSQL
docker exec -it quickopinion-postgres psql -U postgres -d quickopinion

# Entrar a Redis
docker exec -it quickopinion-redis redis-cli
```

---

## 📝 Git y Commits

```bash
# Commit con Conventional Commits
git commit -m "feat: agregar validación de cupones"
git commit -m "fix: corregir bug en generación de código"
git commit -m "docs: actualizar README"

# Tipos válidos:
# - feat: nueva característica
# - fix: corrección de bug
# - docs: documentación
# - style: formateo
# - refactor: refactorización
# - perf: performance
# - test: tests
# - build: build system
# - ci: CI/CD
# - chore: mantenimiento
```

---

## 📊 Monitoreo y Debug

```bash
# Logs de la API
cd apps/api && npm run dev

# Ver requests en tiempo real
curl http://localhost:3000/health

# Prisma Studio (GUI de DB)
npm run db:studio

# Ver variables de entorno
cat .env

# Ver estructura del proyecto
tree -L 3 -I 'node_modules|dist|build|.next'
```

---

## 🔧 Troubleshooting

### Error: Puerto en uso
```bash
# Ver qué proceso usa el puerto
lsof -ti:3000

# Matar proceso
lsof -ti:3000 | xargs kill -9
```

### Error: Prisma Client no encontrado
```bash
cd packages/database
npx prisma generate
cd ../..
```

### Error: Permisos en Husky
```bash
chmod +x .husky/pre-commit
chmod +x .husky/commit-msg
```

### Limpiar todo y empezar de nuevo
```bash
npm run clean
rm -rf node_modules
npm install
npm run db:reset
```

### Error de TypeScript
```bash
# Limpiar cache de Turbo
rm -rf .turbo

# Type check completo
npm run type-check
```

---

## 📦 Gestión de Dependencias

```bash
# Agregar dependencia a workspace específico
npm install zod --workspace=@quickopinion/shared

# Agregar dependencia de desarrollo
npm install -D @types/express --workspace=@quickopinion/api

# Actualizar dependencias
npm update

# Ver dependencias desactualizadas
npm outdated

# Eliminar node_modules
npm run clean
```

---

## 🌐 Endpoints API (Desarrollo)

```bash
# Health check
curl http://localhost:3000/health

# Quiz submit (ejemplo)
curl -X POST http://localhost:3000/api/quiz/submit \
  -H "Content-Type: application/json" \
  -d '{
    "quiz_id": "uuid",
    "name": "Test",
    "email": "test@example.com",
    "consent": true,
    "answers": []
  }'

# Validar cupón
curl -X POST http://localhost:3000/api/validate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer token" \
  -d '{"code": "RESTO-2510-XXXX"}'
```

---

## 📱 URLs de Desarrollo

| Servicio | URL | Puerto |
|----------|-----|--------|
| API Backend | http://localhost:3000 | 3000 |
| Trivia SPA | http://localhost:3001 | 3001 |
| Validator PWA | http://localhost:3002 | 3002 |
| Admin Backoffice | http://localhost:3003 | 3003 |
| Prisma Studio | http://localhost:5555 | 5555 |

---

## 🔑 Variables de Entorno Clave

```bash
# Supabase
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_KEY=xxx

# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/quickopinion

# Redis
REDIS_URL=redis://localhost:6379

# Email
EMBLUE_API_KEY=xxx
```

---

## 📚 Documentación

- **Especificación Completa**: `docs/context.md`
- **Guía de Inicio**: `docs/GETTING_STARTED.md`
- **Resumen Fase 0**: `docs/PHASE_0_SUMMARY.md`
- **Este Archivo**: `docs/QUICK_REFERENCE.md`

---

## 🆘 Ayuda

```bash
# Ver scripts disponibles
npm run

# Ver workspaces
npm ls --workspaces

# Ver versión de Node
node --version

# Ver versión de npm
npm --version
```

---

## 💡 Tips

1. **Usa VSCode**: Las extensiones recomendadas están en `.vscode/extensions.json`
2. **Auto-save**: El código se formatea automáticamente al guardar
3. **Pre-commit**: Los hooks verifican calidad antes de cada commit
4. **Turborepo**: Cachea builds para mayor velocidad
5. **Prisma Studio**: Mejor que CLI para explorar datos

---

**Última actualización**: Octubre 2025  
**Versión**: Fase 0 - Setup Inicial

