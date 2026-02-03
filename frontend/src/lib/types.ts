export interface Question {
  id: string
  question: string
  answer: string
  categories: string[]
  company: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  createdAt: string
}

export type QuestionFilterState = {
  search: string
  company: string
  category: string
}
