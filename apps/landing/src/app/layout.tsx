import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'QuickOpinion | Trivia Gastronómica para Fidelizar Clientes',
  description:
    'Transforma encuestas en experiencias divertidas. Construí comunidad, fidelizá clientes y hacé crecer tu marca gastronómica en LATAM.',
  keywords:
    'trivia gastronómica, fidelización clientes, marketing restaurantes, cupones descuento, engagement gastronomía, leads restaurantes',
  authors: [{ name: 'QuickOpinion' }],
  openGraph: {
    title: 'QuickOpinion | Trivia Gastronómica para Fidelizar Clientes',
    description:
      'Transforma encuestas en experiencias divertidas. Construí comunidad, fidelizá clientes y hacé crecer tu marca gastronómica en LATAM.',
    type: 'website',
    locale: 'es_AR',
    siteName: 'QuickOpinion',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QuickOpinion | Trivia Gastronómica para Fidelizar Clientes',
    description:
      'Transforma encuestas en experiencias divertidas. Construí comunidad, fidelizá clientes y hacé crecer tu marca gastronómica.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
