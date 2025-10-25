'use client';

import React from 'react';
import { QuestionCard } from './QuestionCard';
import type { Question } from '@/types/quiz';

interface QuestionsListProps {
  questions: Question[];
  answers: Record<string, string>;
  onAnswerChange: (questionId: string, answer: string) => void;
}

export function QuestionsList({
  questions,
  answers,
  onAnswerChange,
}: QuestionsListProps) {
  return (
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
  );
}
