import { z } from 'zod';

// Quiz submission validator
export const quizSubmitSchema = z.object({
  quiz_id: z.string().uuid(),
  name: z.string().min(1).max(100),
  email: z.string().email(),
  consent: z.boolean().refine((val) => val === true, {
    message: 'Consent is required',
  }),
  answers: z.array(
    z.object({
      qid: z.string(),
      answer: z.string(),
      is_correct: z.boolean(),
    })
  ),
  meta: z
    .object({
      ip: z.string().optional(),
      ua: z.string().optional(),
    })
    .optional(),
});

// Coupon validation validator
export const validateCouponSchema = z.object({
  code: z.string().min(1),
  branch: z.string().optional(),
  table_hint: z.string().optional(),
});

export type QuizSubmitInput = z.infer<typeof quizSubmitSchema>;
export type ValidateCouponInput = z.infer<typeof validateCouponSchema>;

