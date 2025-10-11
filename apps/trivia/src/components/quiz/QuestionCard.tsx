'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import type { Question } from '@/types/quiz';

interface QuestionCardProps {
  question: Question;
  index: number;
  selectedAnswer?: string;
  onSelect: (answer: string) => void;
}

export function QuestionCard({
  question,
  index,
  selectedAnswer,
  onSelect,
}: QuestionCardProps) {
  return (
    <Card className="animate-fade-in">
      <div className="mb-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
            {index + 1}
          </div>
          <h3 className="text-lg font-medium text-gray-900 flex-1 pt-0.5">
            {question.question}
          </h3>
        </div>
      </div>

      <div className="space-y-3">
        {question.options.map((option, optIndex) => {
          const isSelected = selectedAnswer === option;
          const optionLetter = String.fromCharCode(65 + optIndex); // A, B, C, D

          return (
            <button
              key={optIndex}
              onClick={() => onSelect(option)}
              className={cn(
                'w-full text-left p-4 rounded-lg border-2 transition-all duration-200',
                'flex items-center gap-3',
                'hover:border-primary-300 hover:bg-primary-50',
                'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                isSelected
                  ? 'border-primary bg-primary-50 ring-2 ring-primary ring-offset-2'
                  : 'border-gray-200 bg-white'
              )}
            >
              <div
                className={cn(
                  'flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center font-medium text-sm transition-colors',
                  isSelected
                    ? 'bg-primary border-primary text-white'
                    : 'bg-white border-gray-300 text-gray-600'
                )}
              >
                {isSelected ? (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  optionLetter
                )}
              </div>
              <span
                className={cn(
                  'flex-1 text-base transition-colors',
                  isSelected ? 'text-gray-900 font-medium' : 'text-gray-700'
                )}
              >
                {option}
              </span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
