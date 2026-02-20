'use client'

import { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, FileEdit, Trash } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/_components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/_components/ui/dropdown-menu'
import { Badge } from '@/_components/ui/badge'
import { Question } from '@/redux/services/question.api'
import { DeleteConfirmDialog } from '@/_components/ui/delete-confirm-dialog'
import paths from '@/navigate/paths'
import { MarkdownRenderer } from '@/_components/ui/MarkdownRenderer'

interface UseQuestionColumnsProps {
  onDelete: (question: Question) => void
}

export const useQuestionColumns = ({ onDelete }: UseQuestionColumnsProps): ColumnDef<Question>[] => {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  return [
    {
      accessorKey: 'title',
      header: 'Title',
      cell: ({ row }) => {
        return (
          <span className="max-w-[500px] truncate block font-medium">
            <MarkdownRenderer content={row.getValue('title')} inline={true} />
          </span>
        )
      },
    },
    {
      accessorKey: 'difficulty',
      header: 'Difficulty',
      cell: ({ row }) => {
        const diff = row.getValue('difficulty') as string
        return <Badge variant={diff === 'hard' || diff === 'super hard' ? 'destructive' : 'secondary'}>{diff}</Badge>
      },
    },
    {
      accessorKey: 'experience',
      header: 'Experience',
      cell: ({ row }) => <Badge variant="outline">{row.getValue('experience')}</Badge>,
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const question = row.original
        // eslint-disable-next-react-hooks/rules-of-hooks
        const [showDeleteDialog, setShowDeleteDialog] = useState(false)

        return (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(question._id)}>Copy ID</DropdownMenuItem>
                <DropdownMenuSeparator />
                <Link href={isAdmin ? paths.admin.question.edit(question._id) : paths.staffMember.question.edit(question._id)}>
                  <DropdownMenuItem>
                    <FileEdit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => setShowDeleteDialog(true)}>
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DeleteConfirmDialog
              isOpen={showDeleteDialog}
              onClose={() => setShowDeleteDialog(false)}
              onConfirm={() => {
                onDelete(question)
                setShowDeleteDialog(false)
              }}
              title="Delete Question"
              description="Are you sure you want to delete this question? This action cannot be undone."
            />
          </>
        )
      },
    },
  ]
}
