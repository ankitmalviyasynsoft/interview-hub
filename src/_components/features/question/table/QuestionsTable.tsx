'use client'

import { DataTable } from '@/_components/ui/data-table'
import { Question } from '@/redux/services/question.api'
import { useQuestionColumns } from './useColumn'

interface QuestionsTableProps {
  data: Question[]
  isLoading: boolean
  error: any
  onDelete: (question: Question) => void
}

export default function QuestionsTable({ data, isLoading, error, onDelete }: QuestionsTableProps) {
  const columns = useQuestionColumns({ onDelete })

  if (isLoading) {
    return <div className="p-8 text-center text-muted-foreground">Loading questions...</div>
  }

  if (error) {
    return <div className="p-8 text-center text-destructive">Error loading questions</div>
  }

  return (
    <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
