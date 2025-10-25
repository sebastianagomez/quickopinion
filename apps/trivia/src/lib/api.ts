import type {
  Quiz,
  QuizSubmit,
  QuizSubmitResponse,
  //QuizErrorResponse,
} from '@/types/quiz';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const api = {
  /**
   * Get quiz by ID
   */
  async getQuiz(quizId: string): Promise<Quiz> {
    const res = await fetch(`${API_BASE_URL}/api/quiz/${quizId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const error = await res
        .json()
        .catch(() => ({ error: 'Failed to fetch quiz' }));
      throw new ApiError(
        error.message || 'Failed to fetch quiz',
        res.status,
        error
      );
    }

    return res.json();
  },

  /**
   * Submit quiz answers
   */
  async submitQuiz(data: QuizSubmit): Promise<QuizSubmitResponse> {
    const res = await fetch(`${API_BASE_URL}/api/quiz/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await res.json();

    // Handle 409 - Already participated
    if (res.status === 409) {
      throw new ApiError(
        responseData.message || 'Ya participaste recientemente',
        409,
        responseData
      );
    }

    if (!res.ok) {
      throw new ApiError(
        responseData.message || 'Error al enviar respuestas',
        res.status,
        responseData
      );
    }

    return responseData;
  },
};

export { ApiError };
