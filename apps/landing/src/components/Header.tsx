export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">Q</span>
          </div>
          <span className="text-2xl font-bold text-dark">QuickOpinion</span>
        </div>

        <a
          href="#contacto"
          className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors"
        >
          Contacto
        </a>
      </nav>
    </header>
  );
}
