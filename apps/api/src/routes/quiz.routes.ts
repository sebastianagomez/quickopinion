import { Router } from 'express';
import * as quizController from '../controllers/quiz.controller';
import validateRequest from '../middleware/validateRequest';
import { getQuizSchema, submitQuizSchema } from '../validators/quiz.validators';

const router = Router();

// GET /api/quiz/:id - Get quiz questions
router.get('/:id', validateRequest(getQuizSchema), quizController.getQuiz);

// POST /api/quiz/submit - Submit quiz answers
router.post(
  '/submit',
  validateRequest(submitQuizSchema),
  quizController.submitQuiz
);

export default router;
