'use client'

import { QuestionForm } from '@/_components/features/question/form/QuestionForm'

export default function StaffAddQuestionPage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-8 space-y-8">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight">Staff: Add Question</h2>
        <p className="text-muted-foreground">Contribute a new question to the platform's knowledge base.</p>
      </div>
      <div className="max-w-4xl">
        <QuestionForm />
      </div>
    </div>
  )
}
