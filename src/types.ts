export interface Question {
  question_id: number;
  quiz_id: number;
  question: string;
  answer: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
}

export interface Quiz {
  quiz_id: number;
  quiz_name: string;
  submitted_at: string;
  submitted_by: string;
}

export interface QuizDataResponse {
  quiz: Quiz;
  questions: Question[];
}

export interface QuizExists {
  exists: boolean;
}
