'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WelcomeScreen } from '@/components/quiz/WelcomeScreen';
import { QuestionsList } from '@/components/quiz/QuestionsList';
import { LeadForm } from '@/components/quiz/LeadForm';
import { ResultScreen } from '@/components/quiz/ResultScreen';
import { Toast } from '@/components/ui/Toast';
import { api, ApiError } from '@/lib/api';
import { getClientInfo } from '@/lib/utils';
import type {
  Quiz,
  QuizStep,
  Coupon,
  QuizResult,
  QuizAnswer,
} from '@/types/quiz';
import type { LeadFormData } from '@/lib/validators';

export default function QuizPage({
  params,
}: {
  params: Promise<{ quizId: string }>;
}) {
  const [quizId, setQuizId] = useState<string | null>(null);
  const [step, setStep] = useState<QuizStep>('welcome');
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [leadData, setLeadData] = useState<LeadFormData | null>(null);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Unwrap params (Next.js 15 change)
  useEffect(() => {
    params.then((p) => setQuizId(p.quizId));
  }, [params]);

  // Load quiz on mount
  useEffect(() => {
    if (!quizId) return;

    const loadQuiz = async () => {
      try {
        const quizData = await api.getQuiz(quizId);
        setQuiz(quizData);
      } catch (err) {
        setError(
          err instanceof ApiError
            ? err.message
            : 'Error al cargar la trivia. Intenta recargar la página.'
        );
        console.error('Error loading quiz:', err);
      }
    };

    loadQuiz();
  }, [quizId]);

  const handleStart = () => {
    setStep('questions');
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleQuestionsSubmit = () => {
    setStep('form');
  };

  const handleLeadFormSubmit = async (data: LeadFormData) => {
    if (!quiz) return;

    setLoading(true);
    setLeadData(data);

    try {
      // Convert answers to API format
      const apiAnswers: QuizAnswer[] = Object.entries(answers).map(
        ([question_id, selected_option]) => ({
          question_id,
          selected_option,
        })
      );

      const clientInfo = getClientInfo();

      // Submit to backend
      const response = await api.submitQuiz({
        quiz_id: quiz.id,
        restaurant_id: quiz.restaurantId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        consent: data.consent,
        answers: apiAnswers,
        meta: {
          user_agent: clientInfo.user_agent,
        },
      });

      setCoupon(response.coupon);
      setResult(response.result);
      setStep('result');
    } catch (err) {
      if (err instanceof ApiError && err.status === 409 && err.data?.coupon) {
        // Already participated - show existing coupon
        setCoupon(err.data.coupon);
        setResult({ correct: 0, total: quiz.config.questions.length });
        setError(err.message);
        setStep('result');
      } else {
        setError(
          err instanceof ApiError
            ? err.message
            : 'Error al enviar tus respuestas. Por favor intenta de nuevo.'
        );
      }
      console.error('Error submitting quiz:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!quiz && !error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
            <p className="text-gray-600">Cargando trivia...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error && !quiz) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-error rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-3xl">❌</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Error al cargar
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Reintentar
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {step === 'welcome' && quiz && (
            <WelcomeScreen quiz={quiz} onStart={handleStart} />
          )}

          {step === 'questions' && quiz && (
            <QuestionsList
              questions={quiz.config.questions}
              answers={answers}
              onAnswerChange={handleAnswerChange}
              onSubmit={handleQuestionsSubmit}
            />
          )}

          {step === 'form' && (
            <LeadForm onSubmit={handleLeadFormSubmit} loading={loading} />
          )}

          {step === 'result' && coupon && result && leadData && (
            <ResultScreen
              coupon={coupon}
              result={result}
              userEmail={leadData.email}
            />
          )}
        </div>
      </main>

      <Footer />

      {error && step !== 'result' && (
        <Toast message={error} type="error" onClose={() => setError(null)} />
      )}
    </div>
  );
}
