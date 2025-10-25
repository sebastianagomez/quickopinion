import { z } from 'zod';

export const landingLeadSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    email: z.string().email('Email inválido'),
    phone: z.string().optional(),
    message: z.string().optional(),
  }),
});

export type LandingLeadInput = z.infer<typeof landingLeadSchema>['body'];
