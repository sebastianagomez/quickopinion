import { z } from 'zod';

// GET /api/quiz/:id
export const getQuizSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid quiz ID format'),
  }),
  query: z
    .object({
      restaurantSlug: z.string().optional(),
    })
    .optional(),
});

// POST /api/quiz/submit
export const submitQuizSchema = z.object({
  body: z.object({
    quiz_id: z.string().uuid('Invalid quiz ID'),
    restaurant_id: z.string().uuid('Invalid restaurant ID'),
    name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
    email: z.string().email('Invalid email format'),
    phone: z.string().optional(),
    message: z.string().max(500, 'Message too long').optional(),
    consent: z
      .boolean()
      .refine((val) => val === true, { message: 'Consent is required' }),
    answers: z
      .array(
        z.object({
          question_id: z.string().min(1, 'Question ID is required'),
          selected_option: z.string().min(1, 'Selected option is required'),
        })
      )
      .min(1, 'At least one answer is required')
      .max(10, 'Too many answers'),
    meta: z
      .object({
        ip: z.string().optional(),
        user_agent: z.string().optional(),
      })
      .optional(),
  }),
});

export type GetQuizParams = z.infer<typeof getQuizSchema>;
export type SubmitQuizBody = z.infer<typeof submitQuizSchema>['body'];
