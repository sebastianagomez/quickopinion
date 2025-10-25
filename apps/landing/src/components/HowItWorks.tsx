export function HowItWorks() {
  const steps = [
    {
      icon: '🎯',
      title: 'Creamos tu trivia',
      description:
        'Diseñamos preguntas personalizadas sobre gastronomía y tu marca.',
    },
    {
      icon: '📱',
      title: 'Tus clientes juegan',
      description:
        'Responden la trivia en su celular y dejan sus datos para el premio.',
    },
    {
      icon: '🎁',
      title: 'Fidelizás y crecés',
      description:
        'Envían cupones automáticos y construís una base de clientes leales.',
    },
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            ¿Cómo funciona?
          </h2>
          <p className="text-lg text-gray-600">Simple, rápido y efectivo</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-4xl">{step.icon}</span>
              </div>
              <div className="text-center mb-4">
                <span className="inline-block w-8 h-8 bg-primary text-white rounded-full font-bold leading-8">
                  {index + 1}
                </span>
              </div>
              <h3 className="text-xl font-bold text-dark mb-3 text-center">
                {step.title}
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
