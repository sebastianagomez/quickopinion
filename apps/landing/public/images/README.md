# Imágenes QuickOpinion

Guarda aquí las imágenes PNG de QuickOpinion:

- `logo.png` - Logo principal
- `logo-white.png` - Logo blanco para fondos oscuros
- `icon.png` - Ícono cuadrado
- `og-image.png` - Imagen para Open Graph (1200x630px recomendado)

Una vez agregadas, actualiza los componentes para usarlas:

- `Header.tsx` - Logo en navbar
- `Hero.tsx` - Ilustración principal
- `layout.tsx` - OpenGraph image

Ejemplo de uso:

```tsx
import Image from 'next/image';

<Image src="/images/logo.png" alt="QuickOpinion" width={200} height={50} />;
```
