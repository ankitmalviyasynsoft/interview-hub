'use client'

import { use } from 'react'
import { QuestionForm } from '@/_components/features/question/form/QuestionForm'

export default function EditQuestionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  return (
    <div className="container mx-auto py-10 px-4 md:px-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight">Edit Question</h2>
          <p className="text-muted-foreground">Update the question details and classification.</p>
        </div>
      </div>
      <div className="max-w-4xl">
        <QuestionForm questionId={id} />
      </div>
    </div>
  )
}
