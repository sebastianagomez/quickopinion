export function DemoLive() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-primary to-primary-700 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          ¿Querés ver cómo funciona?
        </h2>
        <p className="text-xl mb-8 text-primary-100">
          Probá nuestra trivia demo y experimentá la magia en primera persona
        </p>
        <a
          href="http://localhost:3001/00000000-0000-0000-0000-000000000001"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-10 py-4 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-2xl text-lg"
        >
          🎮 Jugar Trivia Demo
        </a>
        <p className="mt-6 text-sm text-primary-100">
          Se abre en una nueva pestaña • Toma solo 2 minutos
        </p>
      </div>
    </section>
  );
}
