'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
// import { WelcomeScreen } from '@/components/quiz/WelcomeScreen';
import { QuestionsList } from '@/components/quiz/QuestionsList';
import { LeadForm } from '@/components/quiz/LeadForm';
import { ResultScreen } from '@/components/quiz/ResultScreen';
import { Toast } from '@/components/ui/Toast';
import { Button } from '@/components/ui/Button';
import { api, ApiError } from '@/lib/api';
import { getClientInfo } from '@/lib/utils';
import type {
  Quiz,
  //QuizStep,
  Coupon,
  QuizResult,
  QuizAnswer,
} from '@/types/quiz';
import type { LeadFormData } from '@/lib/validators';

// si pensás usarlo después:
// const _welcomeScreen = WelcomeScreen; // antes: welcomeScreen
// type _QuizStep = QuizStep; // antes: QuizStep

export default function QuizPage({
  params,
}: {
  params: Promise<{ quizId: string }>;
}) {
  const [quizId, setQuizId] = useState<string | null>(null);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [leadData, setLeadData] = useState<LeadFormData | null>(null);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(false);

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

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleShowForm = () => {
    setShowForm(true);
    // Scroll to form
    setTimeout(() => {
      document.getElementById('form-section')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 100);
  };

  const handleSubmit = async (data: LeadFormData) => {
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
      setSubmitted(true);

      // Scroll to result
      setTimeout(() => {
        document.getElementById('result-section')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 100);
    } catch (err) {
      if (err instanceof ApiError && err.status === 409 && err.data?.coupon) {
        // Already participated - show existing coupon
        setCoupon(err.data.coupon);
        setResult({ correct: 0, total: quiz.config.questions.length });
        setError(err.message);
        setSubmitted(true);
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Intro section */}
          {quiz && !submitted && (
            <div className="bg-white rounded-lg shadow-sm p-6 text-center animate-fade-in">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                {quiz.name ||
                  'Participa de esta trivia para ganarte un lindo premio de parte de {nombre_negocio}'}
              </h1>
              <p className="text-gray-600 text-sm md:text-base">
                ¡Responde las preguntas y completa tus datos para recibir tu
                cupón!
              </p>
            </div>
          )}

          {/* Questions */}
          {quiz && !submitted && (
            <>
              <QuestionsList
                questions={quiz.config.questions}
                answers={answers}
                onAnswerChange={handleAnswerChange}
              />

              {/* Submit button */}
              {!showForm && (
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={handleShowForm}
                    disabled={
                      Object.keys(answers).length !==
                      quiz.config.questions.length
                    }
                  >
                    ✅ Enviar
                  </Button>
                  {Object.keys(answers).length !==
                    quiz.config.questions.length && (
                    <p className="text-sm text-gray-500 text-center mt-3">
                      Responde todas las preguntas para continuar
                    </p>
                  )}
                </div>
              )}
            </>
          )}

          {/* Lead Form */}
          {quiz && !submitted && showForm && (
            <div id="form-section">
              <LeadForm
                onSubmit={handleSubmit}
                loading={loading}
                restaurantName={quiz.name}
              />
            </div>
          )}

          {/* Result */}
          {submitted && result && coupon && (
            <div id="result-section">
              <ResultScreen
                coupon={coupon}
                result={result}
                userEmail={leadData?.email || ''}
              />
            </div>
          )}
        </div>
      </main>

      <Footer />

      {error && !submitted && (
        <Toast message={error} type="error" onClose={() => setError(null)} />
      )}
    </div>
  );
}
