'use client'

import { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { MoreHorizontal, FileEdit, Trash } from 'lucide-react'
import { Button } from '@/_components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/_components/ui/dropdown-menu'
import paths from '@/navigate/paths'
import { Blog } from '@/redux/services/blog.api'
import { DeleteConfirmDialog } from '@/_components/ui/delete-confirm-dialog'

interface UseBlogColumnsProps {
  onDelete: (blog: Blog) => void
}

export const useBlogColumns = ({ onDelete }: UseBlogColumnsProps): ColumnDef<Blog>[] => {
  return [
    {
      accessorKey: 'title',
      header: 'Title',
    },
    {
      accessorKey: 'author',
      header: 'Author',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => <span className={`capitalize ${row.original.status === 'published' ? 'text-green-600' : 'text-yellow-600'}`}>{row.original.status}</span>,
    },
    {
      accessorKey: 'publishDate',
      header: 'Publish Date',
      cell: ({ row }) => <span>{row.original.publishDate || '-'}</span>,
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const blog = row.original
        const [showDeleteDialog, setShowDeleteDialog] = useState(false)

        return (
          <div onClick={(e) => e.stopPropagation()}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(blog._id)}>Copy ID</DropdownMenuItem>
                <DropdownMenuSeparator />
                <Link href={paths.admin.blogs.edit(blog._id)}>
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
                onDelete(blog)
                setShowDeleteDialog(false)
              }}
              title="Delete Blog?"
              description={`Are you sure you want to delete "${blog.title}"? This action cannot be undone.`}
            />
          </div>
        )
      },
    },
  ]
}
