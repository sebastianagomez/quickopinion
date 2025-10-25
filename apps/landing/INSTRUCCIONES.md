# 🚀 QuickOpinion Landing - Instrucciones de Uso

## ✅ Implementación Completada

La landing page está lista con todas las funcionalidades solicitadas.

---

## 📁 Estructura del Proyecto

```
apps/landing/
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # Layout principal + SEO
│   │   ├── page.tsx                      # Homepage one-page
│   │   ├── globals.css                   # Estilos globales
│   │   └── terminos-y-condiciones/
│   │       └── page.tsx                  # Página de T&C
│   └── components/
│       ├── Header.tsx                    # Navbar sticky
│       ├── Hero.tsx                      # Hero con CTAs
│       ├── HowItWorks.tsx               # 3 pasos
│       ├── Benefits.tsx                  # 4 beneficios
│       ├── DemoLive.tsx                  # CTA trivia demo
│       ├── ContactForm.tsx               # Formulario funcional
│       ├── FAQ.tsx                       # 5 FAQs
│       └── Footer.tsx                    # Footer con links
├── public/
│   ├── favicon.svg                       # Favicon placeholder
│   └── images/                           # 📸 GUARDA TUS PNG AQUÍ
│       └── README.md                     # Instrucciones imágenes
├── tailwind.config.ts                    # Paleta #000f2b + #4f729d
├── next.config.js
└── package.json                          # Puerto 3004

apps/api/
├── src/
│   ├── routes/landing.routes.ts          # POST /api/landing/lead
│   ├── controllers/landing.controller.ts # Lógica endpoint
│   ├── services/landing.service.ts       # DB operations
│   ├── services/email.service.ts         # + sendLandingLeadNotification
│   └── validators/landing.validators.ts  # Zod schemas

packages/database/
└── prisma/schema.prisma                  # + model LandingLead
```

---

## 🗄️ Base de Datos

### Ejecutar Migration

**IMPORTANTE**: Antes de iniciar, ejecuta la migration:

```bash
cd packages/database
npx prisma migrate dev --name add_landing_leads
```

Si hay error de timeout, intenta de nuevo o:

```bash
npx prisma db push
cd
```

### Tabla `landing_leads`

- `id` (uuid)
- `name` (text)
- `email` (text)
- `phone` (text, opcional)
- `message` (text, opcional)
- `origin` (text, default 'landing')
- `created_at` (timestamptz)

---

## 🔧 Configuración

### 1. Variables de Entorno

**Backend** (`apps/api/.env`):

```env
DATABASE_URL="postgresql://..."
SUPABASE_URL="..."
SUPABASE_ANON_KEY="..."
SUPABASE_SERVICE_KEY="..."
JWT_SECRET="..."
API_PORT=3000
NODE_ENV=development
```

**Frontend** (`apps/landing/.env.local`):

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 2. Instalar Dependencias

```bash
# Desde la raíz del monorepo
npm install
```

---

## 🚀 Iniciar Desarrollo

### Opción A: Todos los servicios

```bash
npm run dev
```

### Opción B: Solo Landing + API

```bash
# Terminal 1 - Backend
npm run dev --workspace=@quickopinion/api

# Terminal 2 - Landing
npm run dev --workspace=@quickopinion/landing
```

**URLs:**

- 🌐 Landing: http://localhost:3004
- 🔌 API: http://localhost:3000
- 🎮 Trivia: http://localhost:3001

---

## 📸 Agregar Imágenes PNG

1. Guarda tus imágenes en `apps/landing/public/images/`:
   - `logo.png`
   - `logo-white.png`
   - `icon.png`
   - `og-image.png`

2. Actualiza los componentes para usarlas:

**Header.tsx**:

```tsx
import Image from 'next/image';

// Reemplaza el <div> del logo con:
<Image
  src="/images/logo.png"
  alt="QuickOpinion"
  width={120}
  height={40}
  priority
/>;
```

**Hero.tsx**:

```tsx
// Reemplaza el placeholder SVG con:
<Image
  src="/images/hero-illustration.png"
  alt="QuickOpinion Trivia"
  width={500}
  height={500}
  className="rounded-2xl shadow-2xl"
/>
```

**layout.tsx** (OpenGraph):

```tsx
openGraph: {
  images: ['/images/og-image.png'],
  // ...resto
}
```

---

## 🧪 Probar el Formulario

### Usando curl:

```bash
curl -X POST http://localhost:3000/api/landing/lead \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+54 9 11 1234 5678",
    "message": "Quiero una demo"
  }'
```

### Desde la UI:

1. Ve a http://localhost:3004
2. Scroll hasta "Agendá una Demo"
3. Completa el formulario
4. Verifica:
   - ✅ Toast de éxito
   - 📧 Log en consola del backend
   - 🗄️ Registro en tabla `landing_leads`

---

## 📧 Email de Notificación

Actualmente es un **stub** que loguea a consola.

### Para implementar email real:

**Opción 1: Nodemailer**

```bash
npm install nodemailer @types/nodemailer --workspace=@quickopinion/api
```

Actualiza `apps/api/src/services/email.service.ts`:

```typescript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendLandingLeadNotification(input) {
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: 'sebastian.a.gomez@outlook.com.ar',
    subject: `Nuevo Lead de Landing: ${input.name}`,
    html: `
      <h2>Nuevo contacto desde QuickOpinion Landing</h2>
      <p><strong>Nombre:</strong> ${input.name}</p>
      <p><strong>Email:</strong> ${input.email}</p>
      ${input.phone ? `<p><strong>Teléfono:</strong> ${input.phone}</p>` : ''}
      ${input.message ? `<p><strong>Mensaje:</strong> ${input.message}</p>` : ''}
    `,
  });
}
```

**Opción 2**: Integrar con tu provider actual (emBlue, SendGrid, etc.)

---

## ✅ Validación Final

```bash
# Lint
pnpm lint

# TypeCheck
pnpm type-check

# Build
npm run build --workspace=@quickopinion/landing
```

---

## 🎨 Personalización

### Colores

Edita `apps/landing/tailwind.config.ts`:

```typescript
colors: {
  primary: '#4f729d',  // Acento principal
  dark: '#000f2b',     // Títulos
}
```

### Contenido

- Hero: `src/components/Hero.tsx`
- Beneficios: `src/components/Benefits.tsx`
- FAQs: `src/components/FAQ.tsx`
- Pasos: `src/components/HowItWorks.tsx`

### URLs

Actualiza en `Hero.tsx` y `DemoLive.tsx` el link de la trivia demo cuando tengas la URL de producción.

---

## 📊 Monitoreo

### Ver leads capturados:

```bash
# Prisma Studio
npm run db:studio
```

### Logs del backend:

Los logs de `sendLandingLeadNotification` aparecen en la consola del API.

---

## 🚢 Deploy (Futuro)

### Frontend (Vercel):

1. Conecta el repo a Vercel
2. Configura:
   - Root Directory: `apps/landing`
   - Build Command: `npm run build`
   - Output Directory: `.next`
3. Variables de entorno:
   - `NEXT_PUBLIC_API_URL=https://tu-api.com`

### Backend:

Sigue las instrucciones existentes del proyecto.

---

## 📝 Checklist Final

Antes de lanzar:

- [ ] Ejecutar migration `add_landing_leads`
- [ ] Generar Prisma Client
- [ ] Agregar imágenes PNG en `/public/images`
- [ ] Actualizar componentes con las imágenes
- [ ] Configurar SMTP real para emails
- [ ] Actualizar URLs de trivia demo a producción
- [ ] Testear formulario end-to-end
- [ ] Revisar todos los textos
- [ ] Validar responsive mobile
- [ ] Probar en navegadores principales
- [ ] Configurar analytics (opcional)

---

## 🆘 Troubleshooting

### Error: "Cannot find module '@prisma/client'"

```bash
cd packages/database
npx prisma generate
```

### Error: Puerto 3004 ocupado

Cambia el puerto en `apps/landing/package.json`:

```json
"dev": "next dev -p 3005"
```

### Email no llega

1. Verifica que el backend esté corriendo
2. Revisa logs en consola del API
3. Implementa SMTP real (ver sección Email)

---

¡Listo para capturar leads! 🎉
