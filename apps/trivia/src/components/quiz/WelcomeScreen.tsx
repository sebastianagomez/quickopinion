import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import type { Quiz } from '@/types/quiz';

interface WelcomeScreenProps {
  quiz: Quiz;
  onStart: () => void;
}

export function WelcomeScreen({ quiz, onStart }: WelcomeScreenProps) {
  const totalQuestions = quiz.config?.questions?.length || 5;

  return (
    <div className="min-h-[60vh] flex items-center justify-center animate-fade-in">
      <Card className="max-w-2xl w-full text-center">
        <CardHeader>
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white text-4xl">🎯</span>
            </div>
          </div>
          <CardTitle className="text-3xl sm:text-4xl mb-4">
            {quiz.name}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <p className="text-lg text-gray-600 leading-relaxed">
            Responde {totalQuestions} preguntas y gana un{' '}
            <span className="font-bold text-primary">premio especial</span> en
            tu próxima visita!
          </p>

          <div className="flex items-center justify-center gap-8 py-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {totalQuestions}
              </div>
              <div className="text-sm text-gray-600 mt-1">Preguntas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">~2</div>
              <div className="text-sm text-gray-600 mt-1">Minutos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl">🎁</div>
              <div className="text-sm text-gray-600 mt-1">Premio</div>
            </div>
          </div>

          <div className="bg-primary-50 rounded-lg p-4 border-2 border-primary-100">
            <p className="text-sm text-gray-700 flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5 text-primary flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Te enviaremos tu cupón por email al finalizar</span>
            </p>
          </div>

          <Button
            size="lg"
            className="w-full sm:w-auto px-12"
            onClick={onStart}
          >
            <span className="flex items-center gap-2">🚀 Comenzar Trivia</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
