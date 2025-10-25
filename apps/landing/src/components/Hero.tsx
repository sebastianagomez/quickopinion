export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-white to-primary-50 pt-20 pb-32 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark mb-6 leading-tight">
              Convertí encuestas en experiencias{' '}
              <span className="text-primary">divertidas</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Fidelizá clientes, construí comunidad y hacé crecer tu marca
              gastronómica con trivias interactivas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a
                href="#contacto"
                className="px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors shadow-lg hover:shadow-xl"
              >
                📅 Agendá una Demo
              </a>
              <a
                href="http://localhost:3001/00000000-0000-0000-0000-000000000001"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white text-primary font-semibold rounded-lg border-2 border-primary hover:bg-primary-50 transition-colors"
              >
                🎮 Probar Trivia en Vivo
              </a>
            </div>
          </div>

          {/* Illustration placeholder */}
          <div className="flex justify-center">
            <div className="w-full max-w-md aspect-square bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl shadow-2xl flex items-center justify-center">
              <svg
                className="w-48 h-48 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
