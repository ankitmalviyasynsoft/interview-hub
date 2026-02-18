'use client'

import { QuestionForm } from '@/_components/features/question/form/QuestionForm'

export default function AddQuestionPage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight">Add New Question</h2>
          <p className="text-muted-foreground">Create a high-quality interview question for the community.</p>
        </div>
      </div>
      <div className="max-w-4xl">
        <QuestionForm />
      </div>
    </div>
  )
}
