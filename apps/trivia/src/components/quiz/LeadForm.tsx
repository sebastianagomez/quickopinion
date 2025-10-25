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
  restaurantName?: string;
}

export function LeadForm({
  onSubmit,
  loading = false,
  restaurantName,
}: LeadFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
  });

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl text-center">
          Dejanos tus datos
        </CardTitle>
        <p className="text-center text-gray-600 text-sm md:text-base mt-2 leading-relaxed">
          ¡Para saber las respuestas y poder enviarte el cupón de descuento{' '}
          {restaurantName && (
            <span className="font-semibold">de {restaurantName}</span>
          )}{' '}
          dejanos tus datos!
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            {loading ? 'Enviando...' : '✅ Enviar'}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            Tus datos están protegidos y no serán compartidos con terceros.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
