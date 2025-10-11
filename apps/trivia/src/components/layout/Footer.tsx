import React from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="text-center text-sm text-gray-600">
          <p>© {currentYear} QuickOpinion. Todos los derechos reservados.</p>
          <p className="mt-1">
            <a
              href="#"
              className="text-primary hover:text-primary-600 transition-colors"
            >
              Términos y Condiciones
            </a>
            {' · '}
            <a
              href="#"
              className="text-primary hover:text-primary-600 transition-colors"
            >
              Privacidad
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
