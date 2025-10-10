import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');

  // 1. Crear restaurante de prueba
  console.log('📝 Creando restaurante de prueba...');
  const restaurant = await prisma.restaurant.upsert({
    where: { slug: 'resto-demo' },
    update: {},
    create: {
      name: 'Restaurante Demo',
      slug: 'resto-demo',
      sendingDomain: 'demo.quickopinion.com',
      defaultReward: 'Postre gratis',
      settings: {
        couponExpirationDays: 30,
        theme: {
          primaryColor: '#3B82F6',
          logo: '/logos/demo.png',
        },
      },
    },
  });
  console.log('✅ Restaurante creado:', restaurant.name);

  // 2. Crear quiz de prueba
  console.log('📝 Creando quiz de prueba...');
  const quiz = await prisma.quiz.upsert({
    where: { id: '00000000-0000-0000-0000-000000000001' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000001',
      restaurantId: restaurant.id,
      name: 'Trivia Gastronómica',
      active: true,
      config: {
        questions: [
          {
            id: 'q1',
            question: '¿Cuál es el ingrediente principal de la pasta carbonara?',
            options: ['Crema', 'Huevo', 'Queso crema', 'Leche'],
            correctAnswer: 'Huevo',
          },
          {
            id: 'q2',
            question: '¿De qué país es originaria la paella?',
            options: ['Italia', 'España', 'Francia', 'Portugal'],
            correctAnswer: 'España',
          },
          {
            id: 'q3',
            question: '¿Qué es el umami?',
            options: [
              'Un tipo de sushi',
              'El quinto sabor básico',
              'Una especia japonesa',
              'Un método de cocción',
            ],
            correctAnswer: 'El quinto sabor básico',
          },
          {
            id: 'q4',
            question: '¿Cuál de estos quesos NO es italiano?',
            options: ['Parmesano', 'Mozzarella', 'Brie', 'Gorgonzola'],
            correctAnswer: 'Brie',
          },
          {
            id: 'q5',
            question: '¿A qué temperatura se carameliza el azúcar aproximadamente?',
            options: ['100°C', '160°C', '200°C', '250°C'],
            correctAnswer: '160°C',
          },
        ],
        passingScore: 3,
        randomizeQuestions: true,
        showCorrectAnswers: true,
      },
    },
  });
  console.log('✅ Quiz creado:', quiz.name);

  // 3. Crear algunos leads de prueba
  console.log('📝 Creando leads de prueba...');
  const lead1 = await prisma.lead.upsert({
    where: {
      restaurantId_email: {
        restaurantId: restaurant.id,
        email: 'juan.perez@example.com',
      },
    },
    update: {},
    create: {
      restaurantId: restaurant.id,
      name: 'Juan Pérez',
      email: 'juan.perez@example.com',
      phone: '+5491112345678',
      consent: true,
      consentVersion: '1.0',
      consentTimestamp: new Date(),
      source: 'quiz',
      userIp: '192.168.1.1',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
    },
  });

  const lead2 = await prisma.lead.upsert({
    where: {
      restaurantId_email: {
        restaurantId: restaurant.id,
        email: 'maria.garcia@example.com',
      },
    },
    update: {},
    create: {
      restaurantId: restaurant.id,
      name: 'María García',
      email: 'maria.garcia@example.com',
      phone: '+5491198765432',
      consent: true,
      consentVersion: '1.0',
      consentTimestamp: new Date(),
      source: 'quiz',
      userIp: '192.168.1.2',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    },
  });
  console.log('✅ Leads creados: 2');

  // 4. Crear respuestas de quiz
  console.log('📝 Creando respuestas de quiz...');
  await prisma.quizResponse.create({
    data: {
      quizId: quiz.id,
      leadId: lead1.id,
      answers: {
        q1: { answer: 'Huevo', isCorrect: true },
        q2: { answer: 'España', isCorrect: true },
        q3: { answer: 'El quinto sabor básico', isCorrect: true },
        q4: { answer: 'Brie', isCorrect: true },
        q5: { answer: '200°C', isCorrect: false },
      },
      scoreCorrect: 4,
      scoreTotal: 5,
    },
  });

  await prisma.quizResponse.create({
    data: {
      quizId: quiz.id,
      leadId: lead2.id,
      answers: {
        q1: { answer: 'Crema', isCorrect: false },
        q2: { answer: 'España', isCorrect: true },
        q3: { answer: 'Un tipo de sushi', isCorrect: false },
        q4: { answer: 'Brie', isCorrect: true },
        q5: { answer: '160°C', isCorrect: true },
      },
      scoreCorrect: 3,
      scoreTotal: 5,
    },
  });
  console.log('✅ Respuestas creadas: 2');

  // 5. Crear cupones de prueba
  console.log('📝 Creando cupones de prueba...');
  const now = new Date();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30); // 30 días

  await prisma.coupon.create({
    data: {
      code: 'DEMO-2510-ABC1',
      restaurantId: restaurant.id,
      leadId: lead1.id,
      reward: 'Postre gratis',
      state: 'ACTIVE',
      expiresAt: expiresAt,
      issuedAt: now,
    },
  });

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  await prisma.coupon.create({
    data: {
      code: 'DEMO-2510-ABC2',
      restaurantId: restaurant.id,
      leadId: lead2.id,
      reward: 'Café gratis',
      state: 'REDEEMED',
      expiresAt: expiresAt,
      issuedAt: yesterday,
      redeemedAt: now,
      branch: 'Sucursal Centro',
      tableHint: 'Mesa 5',
    },
  });
  console.log('✅ Cupones creados: 2 (1 ACTIVE, 1 REDEEMED)');

  // 6. Crear algunos eventos de email
  console.log('📝 Creando eventos de email...');
  await prisma.emailEvent.createMany({
    data: [
      {
        restaurantId: restaurant.id,
        leadId: lead1.id,
        type: 'delivered',
        provider: 'emblue',
        providerMsgId: 'msg_123456',
        payload: {
          timestamp: new Date().toISOString(),
          email: lead1.email,
        },
      },
      {
        restaurantId: restaurant.id,
        leadId: lead1.id,
        type: 'open',
        provider: 'emblue',
        providerMsgId: 'msg_123456',
        payload: {
          timestamp: new Date().toISOString(),
          email: lead1.email,
          userAgent: 'iPhone Mail',
        },
      },
      {
        restaurantId: restaurant.id,
        leadId: lead2.id,
        type: 'delivered',
        provider: 'emblue',
        providerMsgId: 'msg_789012',
        payload: {
          timestamp: yesterday.toISOString(),
          email: lead2.email,
        },
      },
      {
        restaurantId: restaurant.id,
        leadId: lead2.id,
        type: 'open',
        provider: 'emblue',
        providerMsgId: 'msg_789012',
        payload: {
          timestamp: yesterday.toISOString(),
          email: lead2.email,
        },
      },
      {
        restaurantId: restaurant.id,
        leadId: lead2.id,
        type: 'click',
        provider: 'emblue',
        providerMsgId: 'msg_789012',
        payload: {
          timestamp: yesterday.toISOString(),
          email: lead2.email,
          url: 'https://resto-demo.quickopinion.com/validate',
        },
      },
    ],
  });
  console.log('✅ Eventos de email creados: 5');

  console.log('\n🎉 Seed completado exitosamente!\n');
  console.log('📊 Resumen:');
  console.log('  - 1 restaurante');
  console.log('  - 1 quiz con 5 preguntas');
  console.log('  - 2 leads');
  console.log('  - 2 respuestas de quiz');
  console.log('  - 2 cupones (1 activo, 1 canjeado)');
  console.log('  - 5 eventos de email');
  console.log('\n✨ Puedes explorar los datos con: npm run db:studio');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Error en seed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });

