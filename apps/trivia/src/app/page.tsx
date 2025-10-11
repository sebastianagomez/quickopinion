export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 flex justify-center animate-bounce-in">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary-600 rounded-3xl flex items-center justify-center shadow-xl">
              <span className="text-white text-5xl font-bold">Q</span>
            </div>
          </div>

          <h1 className="text-5xl font-bold mb-4 animate-fade-in">
            Quick<span className="text-primary">Opinion</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 animate-fade-in">
            Participa en trivias interactivas y gana premios especiales
          </p>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 animate-slide-up">
            <h2 className="text-2xl font-semibold mb-4">
              ¿Tienes un código de trivia?
            </h2>
            <p className="text-gray-600 mb-6">
              Escanea el código QR en el restaurante o ingresa el ID de la
              trivia
            </p>
            <div className="flex flex-col gap-4">
              <p className="text-sm text-gray-500 bg-gray-100 p-4 rounded-lg">
                <strong>Para probar:</strong> Visita{' '}
                <code className="bg-gray-200 px-2 py-1 rounded">
                  /00000000-0000-0000-0000-000000000001
                </code>
                <br />
                (ID del quiz de prueba)
              </p>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            <p>Desarrollado con ❤️ para mejorar la experiencia del cliente</p>
          </div>
        </div>
      </div>
    </main>
  );
}
