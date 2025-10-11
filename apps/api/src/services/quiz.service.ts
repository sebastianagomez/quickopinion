import prisma from '../config/database';
import { AppError } from '../middleware/errorHandler';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer?: string; // Only for score calculation
}

interface QuizConfig {
  questions: QuizQuestion[];
  passingScore?: number;
  randomizeQuestions?: boolean;
  showCorrectAnswers?: boolean;
}

export async function getQuizById(quizId: string) {
  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: {
      restaurant: {
        select: {
          id: true,
          name: true,
          slug: true,
          defaultReward: true,
        },
      },
    },
  });

  if (!quiz) {
    throw new AppError(404, 'Quiz not found');
  }

  if (!quiz.active) {
    throw new AppError(400, 'Quiz is not active');
  }

  const config = quiz.config as QuizConfig;

  // Remove correct answers from questions (security)
  const questionsWithoutAnswers = config.questions.map((q) => ({
    id: q.id,
    question: q.question,
    options: q.options,
  }));

  return {
    id: quiz.id,
    name: quiz.name,
    restaurantId: quiz.restaurantId,
    config: {
      questions: questionsWithoutAnswers,
      defaultReward: quiz.restaurant.defaultReward,
    },
  };
}

export async function calculateScore(
  quizId: string,
  answers: Array<{ question_id: string; selected_option: string }>
) {
  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
  });

  if (!quiz) {
    throw new AppError(404, 'Quiz not found');
  }

  const config = quiz.config as QuizConfig;
  let correctCount = 0;
  const totalQuestions = config.questions.length;

  // Check each answer
  const detailedResults = answers.map((answer) => {
    const question = config.questions.find((q) => q.id === answer.question_id);

    if (!question) {
      return {
        question_id: answer.question_id,
        is_correct: false,
        selected: answer.selected_option,
        correct: null,
      };
    }

    const isCorrect = answer.selected_option === question.correctAnswer;
    if (isCorrect) {
      correctCount++;
    }

    return {
      question_id: answer.question_id,
      is_correct: isCorrect,
      selected: answer.selected_option,
      correct: question.correctAnswer,
    };
  });

  return {
    correct: correctCount,
    total: totalQuestions,
    score: Math.round((correctCount / totalQuestions) * 100),
    details: detailedResults,
  };
}

export async function saveQuizResponse(
  quizId: string,
  leadId: string,
  answers: Array<{ question_id: string; selected_option: string }>,
  scoreCorrect: number,
  scoreTotal: number
) {
  return await prisma.quizResponse.create({
    data: {
      quizId,
      leadId,
      answers,
      scoreCorrect,
      scoreTotal,
    },
  });
}
