import { Request, Response, NextFunction } from 'express';
import * as quizService from '../services/quiz.service';
import * as leadService from '../services/lead.service';
import * as couponService from '../services/coupon.service';
import * as emailService from '../services/email.service';
import { SubmitQuizBody } from '../validators/quiz.validators';
import { AppError } from '../middleware/errorHandler';
import logger from '../utils/logger';

/**
 * GET /api/quiz/:id
 * Get quiz questions (without correct answers)
 */
export async function getQuiz(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const result = await quizService.getQuizById(id);

    res.json(result);
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/quiz/submit
 * Submit quiz answers and create coupon
 */
export async function submitQuiz(
  req: Request<{}, {}, SubmitQuizBody>,
  res: Response,
  next: NextFunction
) {
  try {
    const {
      quiz_id,
      restaurant_id,
      name,
      email,
      phone,
      message,
      consent,
      answers,
      meta,
    } = req.body;

    logger.info({
      action: 'quiz_submit_start',
      quiz_id,
      restaurant_id,
      email,
    });

    // 1. Check 24h participation limit
    const participationCheck = await leadService.checkParticipationLimit(
      restaurant_id,
      email,
      24
    );

    if (!participationCheck.canParticipate) {
      logger.info({
        action: 'quiz_submit_blocked_24h',
        email,
        restaurant_id,
      });

      return res.status(409).json({
        error: 'ALREADY_PARTICIPATED',
        message: 'Ya participaste en las últimas 24 horas',
        coupon: {
          code: participationCheck.existingCoupon.code,
          reward: participationCheck.existingCoupon.reward,
          expires_at: participationCheck.existingCoupon.expiresAt,
        },
      });
    }

    // 2. Calculate score
    const scoreResult = await quizService.calculateScore(quiz_id, answers);

    logger.info({
      action: 'quiz_score_calculated',
      email,
      score: scoreResult,
    });

    // 3. Create or update lead
    const lead = await leadService.findOrCreateLead({
      restaurantId: restaurant_id,
      name,
      email,
      phone,
      consent,
      consentVersion: '1.0',
      source: 'quiz',
      userIp: meta?.ip,
      userAgent: meta?.user_agent,
    });

    // 4. Save quiz response
    await quizService.saveQuizResponse(
      quiz_id,
      lead.id,
      answers,
      scoreResult.correct,
      scoreResult.total
    );

    // 5. Get quiz details for reward
    const quiz = await quizService.getQuizById(quiz_id);
    const reward = quiz.quiz.restaurant.defaultReward || 'Descuento especial';

    // 6. Create coupon
    const coupon = await couponService.createCoupon({
      restaurantId: restaurant_id,
      restaurantSlug: quiz.quiz.restaurant.slug,
      leadId: lead.id,
      reward,
      expirationDays: 30,
    });

    logger.info({
      action: 'coupon_created',
      email,
      coupon_code: coupon.code,
    });

    // 7. Send email (stub for now)
    await emailService.sendCouponEmail({
      to: email,
      name,
      couponCode: coupon.code,
      reward: coupon.reward,
      expiresAt: coupon.expiresAt,
      restaurantName: quiz.quiz.restaurant.name,
    });

    // 8. Return response
    res.status(200).json({
      success: true,
      result: {
        correct: scoreResult.correct,
        total: scoreResult.total,
        score: scoreResult.score,
      },
      coupon: {
        code: coupon.code,
        reward: coupon.reward,
        expires_at: coupon.expiresAt,
      },
      message: `¡Gracias ${name} por participar! Te enviamos tu cupón por email.`,
    });

    logger.info({
      action: 'quiz_submit_success',
      email,
      coupon_code: coupon.code,
    });
  } catch (error) {
    logger.error({
      action: 'quiz_submit_error',
      error,
    });
    next(error);
  }
}
