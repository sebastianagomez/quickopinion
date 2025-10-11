import { z } from 'zod';

export const leadFormSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre es demasiado largo'),
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('El email no es válido'),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 8, {
      message: 'El teléfono debe tener al menos 8 dígitos',
    }),
  message: z.string().max(500, 'El mensaje es demasiado largo').optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: 'Debes aceptar los términos y condiciones',
  }),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;
