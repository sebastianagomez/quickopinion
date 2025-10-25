import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'QuickOpinion - Trivia',
  description: 'Participa y gana premios',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
