#!/bin/bash

# QuickOpinion - Script de Inicialización
# Este script configura el entorno de desarrollo desde cero

set -e

echo "🚀 Iniciando setup de QuickOpinion..."
echo ""

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Verificar Node.js
echo -e "${BLUE}[1/7]${NC} Verificando Node.js..."
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 22 ]; then
    echo -e "${YELLOW}⚠️  Node.js >= 22 requerido. Tienes: $(node -v)${NC}"
    exit 1
fi
echo -e "${GREEN}✓${NC} Node.js $(node -v)"

# 2. Instalar dependencias
echo ""
echo -e "${BLUE}[2/7]${NC} Instalando dependencias..."
npm install
echo -e "${GREEN}✓${NC} Dependencias instaladas"

# 3. Configurar Husky
echo ""
echo -e "${BLUE}[3/7]${NC} Configurando Husky..."
npm run prepare
chmod +x .husky/pre-commit
chmod +x .husky/commit-msg
echo -e "${GREEN}✓${NC} Husky configurado"

# 4. Copiar .env si no existe
echo ""
echo -e "${BLUE}[4/7]${NC} Configurando variables de entorno..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo -e "${YELLOW}⚠️  Creado .env - Por favor configura tus credenciales${NC}"
else
    echo -e "${GREEN}✓${NC} .env ya existe"
fi

if [ ! -f packages/database/.env ]; then
    cp packages/database/.env.example packages/database/.env
    echo -e "${YELLOW}⚠️  Creado packages/database/.env - Por favor configura DATABASE_URL${NC}"
else
    echo -e "${GREEN}✓${NC} packages/database/.env ya existe"
fi

# 5. Verificar servicios cloud
echo ""
echo -e "${BLUE}[5/7]${NC} Servicios cloud..."
echo -e "${YELLOW}→${NC} Supabase: Obtén credenciales en https://app.supabase.com"
echo -e "${YELLOW}→${NC} Redis: Crea cuenta gratis en https://upstash.com"
echo -e "${YELLOW}→${NC} Guía completa: docs/SETUP_SUPABASE.md"

# 6. Generar Prisma Client
echo ""
echo -e "${BLUE}[6/7]${NC} Generando Prisma Client..."
cd packages/database
npx prisma generate
cd ../..
echo -e "${GREEN}✓${NC} Prisma Client generado"

# 7. Verificación
echo ""
echo -e "${BLUE}[7/7]${NC} Verificando instalación..."
npm run type-check
echo -e "${GREEN}✓${NC} TypeScript configurado correctamente"

# Resumen
echo ""
echo "================================================"
echo -e "${GREEN}✨ Setup completado exitosamente!${NC}"
echo "================================================"
echo ""
echo "Próximos pasos:"
echo ""
echo "1. Configura tus variables de entorno:"
echo "   - Edita .env con tus credenciales de Supabase"
echo "   - Edita packages/database/.env con DATABASE_URL"
echo ""
echo "2. Ejecuta las migraciones:"
echo "   npm run db:migrate"
echo ""
echo "3. Inicia el entorno de desarrollo:"
echo "   npm run dev"
echo ""
echo "URLs de desarrollo:"
echo "   - API:       http://localhost:3000"
echo "   - Trivia:    http://localhost:3001"
echo "   - Validator: http://localhost:3002"
echo "   - Admin:     http://localhost:3003"
echo ""
echo "Documentación:"
echo "   - docs/context.md - Especificación completa"
echo "   - docs/GETTING_STARTED.md - Guía paso a paso"
echo "   - README.md - Información general"
echo ""
echo -e "${GREEN}¡Feliz coding! 🚀${NC}"

