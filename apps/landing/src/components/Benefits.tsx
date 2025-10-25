export function Benefits() {
  const benefits = [
    {
      icon: '⚡',
      title: 'Implementación fácil',
      description: 'Configuramos todo por vos. Sin instalaciones complicadas.',
    },
    {
      icon: '👥',
      title: 'Construí comunidad en la 1ª semana',
      description:
        'Empezá a capturar leads y conectar con tus clientes desde el día uno.',
    },
    {
      icon: '🔄',
      title: 'Fidelizá para que vuelvan',
      description:
        'Cupones automáticos y comunicación directa aumentan las visitas recurrentes.',
    },
    {
      icon: '📈',
      title: 'Hacé crecer tu branding',
      description:
        'Experiencias memorables que fortalecen la identidad de tu marca.',
    },
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            ¿Por qué QuickOpinion?
          </h2>
          <p className="text-lg text-gray-600">
            Todo lo que necesitás para fidelizar clientes
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex gap-6 p-6 rounded-xl bg-gray-50 hover:bg-primary-50 transition-colors border-2 border-transparent hover:border-primary-200"
            >
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-primary text-white rounded-xl flex items-center justify-center text-2xl">
                  {benefit.icon}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-dark mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
