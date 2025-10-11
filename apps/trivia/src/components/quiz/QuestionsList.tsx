'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { QuestionCard } from './QuestionCard';
import type { Question } from '@/types/quiz';

interface QuestionsListProps {
  questions: Question[];
  answers: Record<string, string>;
  onAnswerChange: (questionId: string, answer: string) => void;
  onSubmit: () => void;
  loading?: boolean;
}

export function QuestionsList({
  questions,
  answers,
  onAnswerChange,
  onSubmit,
  loading = false,
}: QuestionsListProps) {
  const allAnswered = questions.every((q) => answers[q.id]);
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="animate-fade-in space-y-6">
      {/* Progress indicator */}
      <div className="bg-white rounded-lg shadow-sm p-4 sticky top-20 z-30">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progreso</span>
          <span className="text-sm font-bold text-primary">
            {answeredCount} / {questions.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{
              width: `${(answeredCount / questions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {questions.map((question, index) => (
          <QuestionCard
            key={question.id}
            question={question}
            index={index}
            selectedAnswer={answers[question.id]}
            onSelect={(answer) => onAnswerChange(question.id, answer)}
          />
        ))}
      </div>

      {/* Submit button */}
      <div className="sticky bottom-4 pt-4">
        <div className="bg-white rounded-lg shadow-lg p-4 border-2 border-gray-200">
          {!allAnswered && (
            <p className="text-sm text-gray-600 text-center mb-3 flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5 text-warning"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Responde todas las preguntas para continuar
            </p>
          )}
          <Button
            size="lg"
            className="w-full"
            onClick={onSubmit}
            disabled={!allAnswered}
            loading={loading}
          >
            {loading ? 'Enviando...' : '✅ Enviar Respuestas'}
          </Button>
        </div>
      </div>
    </div>
  );
}
