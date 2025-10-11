// Quiz types
export interface Question {
  id: string;
  question: string;
  options: string[];
}

export interface Quiz {
  id: string;
  name: string;
  restaurantId: string;
  config: {
    questions: Question[];
    defaultReward?: string;
  };
}

export interface QuizAnswer {
  question_id: string;
  selected_option: string;
}

export interface QuizSubmit {
  quiz_id: string;
  restaurant_id: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  consent: boolean;
  answers: QuizAnswer[];
  meta?: {
    ip?: string;
    user_agent?: string;
  };
}

export interface Coupon {
  code: string;
  reward: string;
  expires_at: string;
}

export interface QuizResult {
  correct: number;
  total: number;
}

export interface QuizSubmitResponse {
  coupon: Coupon;
  result: QuizResult;
}

export interface QuizErrorResponse {
  error: string;
  message: string;
  coupon?: Coupon;
}

// UI State types
export type QuizStep = 'welcome' | 'questions' | 'form' | 'result' | 'error';

export interface QuizState {
  step: QuizStep;
  quiz: Quiz | null;
  answers: Record<string, string>;
  result: QuizResult | null;
  coupon: Coupon | null;
  error: string | null;
  loading: boolean;
}
