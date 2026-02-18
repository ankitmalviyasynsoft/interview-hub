import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { MoreHorizontal, FileEdit, Trash } from 'lucide-react'
import { Button } from '@/_components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/_components/ui/dropdown-menu'
import paths from '@/navigate/paths'
import { Category } from '@/redux/services/category.api'

interface UseCategoryColumnsProps {
  onDelete: (category: Category) => void
}

export const useCategoryColumns = ({ onDelete }: UseCategoryColumnsProps): ColumnDef<Category>[] => {
  return [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }) => <span className="text-muted-foreground line-clamp-1">{row.original.description || '-'}</span>,
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const category = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(category._id)}>Copy ID</DropdownMenuItem>
              <DropdownMenuSeparator />
              <Link href={paths.admin.categories.edit(category._id)}>
                <DropdownMenuItem>
                  <FileEdit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => onDelete(category)}>
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}
