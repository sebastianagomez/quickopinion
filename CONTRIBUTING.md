# Guía de Contribución 🤝

¡Gracias por tu interés en contribuir a QuickOpinion! Esta guía te ayudará a comenzar.

---

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [¿Cómo Contribuir?](#cómo-contribuir)
- [Convenciones de Código](#convenciones-de-código)
- [Convenciones de Commits](#convenciones-de-commits)
- [Proceso de Pull Request](#proceso-de-pull-request)
- [Desarrollo Local](#desarrollo-local)

---

## 📜 Código de Conducta

Este proyecto sigue un código de conducta profesional y respetuoso. Al participar, te comprometes a mantener un ambiente positivo y constructivo.

---

## 🚀 ¿Cómo Contribuir?

### Reportar Bugs

1. Busca si el bug ya fue reportado en [Issues](https://github.com/tu-usuario/quickopinion-app/issues)
2. Si no existe, crea un nuevo issue usando la plantilla de Bug Report
3. Incluye detalles: pasos para reproducir, screenshots, logs, etc.

### Sugerir Nuevas Features

1. Revisa los issues existentes para evitar duplicados
2. Crea un nuevo issue usando la plantilla de Feature Request
3. Describe claramente el problema que resuelve y la solución propuesta

### Contribuir con Código

1. **Fork** el repositorio
2. **Clone** tu fork localmente
3. **Crea una rama** para tu feature/fix
4. **Haz tus cambios**
5. **Commit** siguiendo las convenciones
6. **Push** a tu fork
7. **Abre un Pull Request**

---

## 💻 Desarrollo Local

### Setup Inicial

```bash
# 1. Fork y clonar
git clone https://github.com/TU-USUARIO/quickopinion-app.git
cd quickopinion-app

# 2. Setup
./scripts/init.sh

# 3. Crear rama
git checkout -b feature/mi-nueva-feature
```

### Workflow de Desarrollo

```bash
# 1. Desarrollar
npm run dev

# 2. Verificar calidad
npm run lint
npm run type-check
npm test

# 3. Commit
git add .
git commit -m "feat: agregar nueva funcionalidad"

# 4. Push
git push origin feature/mi-nueva-feature
```

---

## 🎨 Convenciones de Código

### TypeScript

```typescript
// ✅ Bueno
interface User {
  id: string;
  email: string;
  name?: string;
}

export function getUserById(id: string): Promise<User> {
  // ...
}

// ❌ Malo
function getUser(i: any) {
  // ...
}
```

### Nombres

- **Variables/Funciones**: `camelCase`
- **Clases/Interfaces**: `PascalCase`
- **Constantes**: `UPPER_SNAKE_CASE`
- **Archivos**: `kebab-case.ts`

### Estructura de Archivos

```
feature/
├── feature.service.ts      # Lógica de negocio
├── feature.controller.ts   # Controlador (si es API)
├── feature.types.ts        # Tipos TypeScript
├── feature.test.ts         # Tests
└── index.ts                # Exports públicos
```

### Imports

```typescript
// 1. Node modules
import { readFile } from 'fs/promises';

// 2. External dependencies
import express from 'express';
import { z } from 'zod';

// 3. Internal packages
import { prisma } from '@quickopinion/database';
import { generateCouponCode } from '@quickopinion/shared';

// 4. Relative imports
import { UserService } from './user.service';
import type { User } from './types';
```

---

## 📝 Convenciones de Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

### Formato

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Tipos

| Tipo | Descripción |
|------|-------------|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de bug |
| `docs` | Cambios en documentación |
| `style` | Formateo, sin cambios de código |
| `refactor` | Refactorización |
| `perf` | Mejoras de performance |
| `test` | Agregar o modificar tests |
| `build` | Cambios en build/dependencias |
| `ci` | Cambios en CI/CD |
| `chore` | Otras tareas de mantenimiento |

### Ejemplos

```bash
# Feature
git commit -m "feat(api): agregar endpoint de validación de cupones"

# Bug fix
git commit -m "fix(trivia): corregir cálculo de score"

# Docs
git commit -m "docs: actualizar README con instrucciones de deploy"

# Breaking change
git commit -m "feat(api)!: cambiar formato de respuesta de quiz

BREAKING CHANGE: El campo 'result' ahora es un objeto con {correct, total}"
```

---

## 🔍 Proceso de Pull Request

### Antes de Abrir el PR

- [ ] Los tests pasan: `npm test`
- [ ] Lint pasa: `npm run lint`
- [ ] Type check pasa: `npm run type-check`
- [ ] El código está formateado: `npm run format`
- [ ] Agregaste tests para tus cambios
- [ ] Actualizaste la documentación si es necesario

### Abrir el PR

1. Usa la plantilla de PR
2. Título descriptivo en formato de Conventional Commit
3. Descripción clara de los cambios
4. Linkea los issues relacionados
5. Agrega screenshots si hay cambios visuales

### Durante el Review

- Responde a los comentarios
- Haz los cambios solicitados
- Mantén la conversación constructiva
- Usa `git commit --amend` o commits adicionales (preferiblemente commits adicionales)

### Después de Aprobación

- El equipo hará merge (squash and merge)
- Elimina tu rama después del merge

---

## ✅ Checklist de Calidad

### Para Cada PR

- [ ] Tests unitarios agregados/actualizados
- [ ] Tests de integración (si aplica)
- [ ] Documentación actualizada
- [ ] No hay console.log dejados por error
- [ ] No hay TODOs sin issue asociado
- [ ] Variables de entorno documentadas en .env.example
- [ ] Migraciones de DB (si aplica)

### Para Features

- [ ] Especificación escrita o aprobada
- [ ] Diseño UI/UX aprobado (si aplica)
- [ ] Tests E2E para flujos críticos
- [ ] Consideraciones de performance
- [ ] Consideraciones de seguridad
- [ ] Logging apropiado
- [ ] Manejo de errores robusto

---

## 🧪 Testing

### Escribir Tests

```typescript
// feature.test.ts
import { describe, it, expect, beforeEach } from '@jest/globals';
import { generateCouponCode } from './utils';

describe('generateCouponCode', () => {
  it('should generate code with correct format', () => {
    const code = generateCouponCode('RESTO');
    expect(code).toMatch(/^RESTO-\d{4}-[A-Z0-9]{4}$/);
  });

  it('should generate unique codes', () => {
    const code1 = generateCouponCode('RESTO');
    const code2 = generateCouponCode('RESTO');
    expect(code1).not.toBe(code2);
  });
});
```

### Ejecutar Tests

```bash
# Todos
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:cov

# Específicos
npm test -- feature.test.ts
```

---

## 🐛 Debugging

### VSCode Launch Config

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug API",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev", "--workspace=@quickopinion/api"],
      "console": "integratedTerminal"
    }
  ]
}
```

### Logs

```typescript
// Usar pino para logging
import { pino } from 'pino';

const logger = pino();

logger.info({ userId: '123' }, 'User logged in');
logger.error({ err }, 'Failed to process request');
```

---

## 📚 Recursos

- [Especificación Técnica](./docs/context.md)
- [Getting Started](./docs/GETTING_STARTED.md)
- [Quick Reference](./docs/QUICK_REFERENCE.md)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [TypeScript Best Practices](https://typescript-eslint.io/rules/)

---

## 🙏 Agradecimientos

¡Gracias por contribuir a QuickOpinion! Cada contribución, grande o pequeña, es valiosa para el proyecto.

---

**¿Preguntas?** Abre un issue o contacta al equipo de desarrollo.

