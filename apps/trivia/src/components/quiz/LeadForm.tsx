'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { leadFormSchema, type LeadFormData } from '@/lib/validators';

interface LeadFormProps {
  onSubmit: (data: LeadFormData) => void;
  loading?: boolean;
}

export function LeadForm({ onSubmit, loading = false }: LeadFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
  });

  return (
    <div className="min-h-[60vh] flex items-center justify-center animate-fade-in">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <div className="mb-4 flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white text-3xl">📧</span>
            </div>
          </div>
          <CardTitle className="text-2xl sm:text-3xl text-center">
            ¡Casi listo!
          </CardTitle>
          <p className="text-center text-gray-600 mt-2">
            Dejanos tus datos para enviarte tu cupón
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Nombre"
              placeholder="Tu nombre completo"
              error={errors.name?.message}
              required
              {...register('name')}
            />

            <Input
              label="Email"
              type="email"
              placeholder="tu@email.com"
              error={errors.email?.message}
              required
              {...register('email')}
            />

            <Input
              label="Teléfono (opcional)"
              type="tel"
              placeholder="+54 9 11 1234 5678"
              error={errors.phone?.message}
              helperText="Opcional, pero nos ayuda a brindarte un mejor servicio"
              {...register('phone')}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Mensaje (opcional)
              </label>
              <textarea
                placeholder="¿Algún comentario sobre la trivia?"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-offset-1 focus:outline-none transition-colors resize-none"
                rows={3}
                maxLength={500}
                {...register('message')}
              />
              {errors.message && (
                <p className="mt-1.5 text-sm text-error">
                  {errors.message.message}
                </p>
              )}
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  className="mt-0.5 w-5 h-5 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary focus:ring-offset-1 cursor-pointer"
                  {...register('consent')}
                />
                <span className="text-sm text-gray-700 leading-relaxed">
                  Acepto recibir mi cupón por email y futuras promociones del
                  restaurante. Puedes darte de baja en cualquier momento.{' '}
                  <a
                    href="#"
                    className="text-primary hover:text-primary-600 underline"
                  >
                    Ver términos
                  </a>
                </span>
              </label>
              {errors.consent && (
                <p className="mt-2 text-sm text-error flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.consent.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              loading={loading}
              disabled={loading}
            >
              {loading ? 'Enviando...' : '🎁 Recibir Cupón'}
            </Button>

            <p className="text-xs text-gray-500 text-center">
              Tus datos están protegidos y no serán compartidos con terceros.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
