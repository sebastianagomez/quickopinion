'use client';

import { useState } from 'react';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: '¿Cómo se implementa QuickOpinion en mi negocio?',
      answer:
        'Nosotros nos encargamos de todo. Creamos tu trivia personalizada, generamos un código QR y te ayudamos con la configuración. En menos de 48 horas estás listo para capturar leads.',
    },
    {
      question: '¿Necesito conocimientos técnicos?',
      answer:
        'No. QuickOpinion está diseñado para ser simple. Solo necesitás imprimir el QR y colocarlo en tu local. El resto es automático.',
    },
    {
      question: '¿Los datos de mis clientes están seguros?',
      answer:
        'Sí. Todos los datos se almacenan de forma segura cumpliendo con las normativas de protección de datos. Tus clientes también pueden darse de baja en cualquier momento.',
    },
    {
      question: '¿Puedo personalizar las preguntas de la trivia?',
      answer:
        'Absolutamente. Trabajamos juntos para crear preguntas que reflejen tu marca, tu menú y la experiencia que querés transmitir.',
    },
    {
      question: '¿Cuánto cuesta?',
      answer:
        'Ofrecemos planes flexibles según el tamaño de tu negocio. Agendá una demo para conocer las opciones y encontrar la que mejor se adapte a vos.',
    },
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-lg text-gray-600">
            Todo lo que necesitás saber sobre QuickOpinion
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-dark text-lg pr-4">
                  {faq.question}
                </span>
                <svg
                  className={`w-6 h-6 text-primary flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
