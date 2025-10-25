'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Toast } from '@/components/ui/Toast';
import { copyToClipboard, formatDate, getScoreEmoji } from '@/lib/utils';
import type { Coupon, QuizResult } from '@/types/quiz';

interface ResultScreenProps {
  coupon: Coupon;
  result: QuizResult;
  userEmail: string;
}

export function ResultScreen({
  coupon,
  result,
  userEmail: _userEmail,
}: ResultScreenProps) {
  const [showToast, setShowToast] = useState(false);
  const percentage = Math.round((result.correct / result.total) * 100);
  const scoreEmoji = getScoreEmoji(result.correct, result.total);

  const handleCopy = async () => {
    const success = await copyToClipboard(coupon.code);
    if (success) {
      setShowToast(true);
    }
  };

  return (
    <>
      <Card className="w-full animate-bounce-in">
        <CardHeader>
          <div className="mb-4 flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-success to-green-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-3xl">{scoreEmoji}</span>
            </div>
          </div>
          <CardTitle className="text-2xl md:text-3xl text-center">
            ¡Gracias por participar!
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Score */}
          <div className="text-center pb-6 border-b-2 border-gray-100">
            <p className="text-gray-600 mb-3">Tu resultado:</p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-5xl font-bold text-gray-900">
                {result.correct}
              </span>
              <span className="text-3xl text-gray-400">/</span>
              <span className="text-3xl text-gray-600">{result.total}</span>
            </div>
            <p className="mt-3 text-lg text-primary font-semibold">
              {percentage}% Correctas
            </p>
            <div className="flex justify-center gap-1 mt-2">
              {Array.from({ length: result.total }).map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i < result.correct ? 'bg-success' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Coupon */}
          <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-6 border-2 border-primary-200 shadow-inner">
            <p className="text-center text-sm font-medium text-gray-700 mb-3">
              🎁 Tu Código de Cupón:
            </p>
            <div className="bg-white rounded-lg p-4 mb-4 border-2 border-dashed border-primary-300">
              <p className="text-center text-3xl font-mono font-bold text-gray-900 tracking-wider select-all">
                {coupon.code}
              </p>
            </div>
            <Button
              variant="primary"
              size="md"
              className="w-full mb-3"
              onClick={handleCopy}
            >
              📋 Copiar Código
            </Button>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Premio:</span>
                <span className="font-semibold text-gray-900">
                  {coupon.reward}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Válido hasta:</span>
                <span className="font-semibold text-gray-900">
                  {formatDate(coupon.expires_at)}
                </span>
              </div>
            </div>
          </div>

          {/* Success message */}
          <div className="bg-primary-50 rounded-lg p-4 border-2 border-primary-100">
            <p className="text-sm text-gray-700 text-center">
              <span className="block font-semibold text-primary mb-1">
                ✅ Tu cupón ha sido generado exitosamente
              </span>
              Guarda este código para tu próxima visita
            </p>
          </div>

          {/* Instructions */}
          <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-xl">ℹ️</span>
              Cómo usar tu cupón:
            </h4>
            <ol className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                  1
                </span>
                <span>Guarda tu código o revisa tu email</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                  2
                </span>
                <span>Mostralo al mesero en tu próxima visita</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                  3
                </span>
                <span>¡Disfruta tu premio antes de que expire!</span>
              </li>
            </ol>
          </div>

          {/* Thank you message */}
          <div className="text-center pt-2">
            <p className="text-base md:text-lg text-gray-800">
              ¡Te esperamos pronto! 🎉
            </p>
          </div>
        </CardContent>
      </Card>

      {showToast && (
        <Toast
          message="¡Código copiado al portapapeles!"
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
}
