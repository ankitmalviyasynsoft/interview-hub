'use client'

import { PlusCircle, Search, Filter } from 'lucide-react'
import Link from 'next/link'
import paths from '@/navigate/paths'

import { Button } from '@/_components/ui/button'
import { Input } from '@/_components/ui/input'
import { useGetQuestionsQuery, useDeleteQuestionMutation, Question } from '@/redux/services/question.api'
import QuestionsTable from '@/_components/features/question/table/QuestionsTable'
import { toast } from 'sonner'

export default function StaffQuestionPage() {
  const { data, isLoading, error } = useGetQuestionsQuery()
  const [deleteQuestion, { isLoading: isDeleting }] = useDeleteQuestionMutation()
  const questions = data?.data || []

  const handleDelete = async (question: Question) => {
    try {
      await deleteQuestion(question._id).unwrap()
      toast.success('Question deleted successfully')
    } catch (error) {
      toast.error('Failed to delete question')
      console.error(error)
    }
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-8 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Staff Questions</h1>
          <p className="text-muted-foreground">Manage and contribute to the interview questions library.</p>
        </div>
        <Link href={paths.staffMember.question.add()}>
          <Button className="gap-2 shadow-lg shadow-primary/20">
            <PlusCircle className="h-4 w-4" />
            Add Question
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search questions..." className="pl-9 h-10 border-muted-foreground/20" />
        </div>
        <Button variant="outline" size="sm" className="h-10 gap-2 border-dashed">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      <QuestionsTable data={questions} isLoading={isLoading} error={error} onDelete={handleDelete} />
    </div>
  )
}
