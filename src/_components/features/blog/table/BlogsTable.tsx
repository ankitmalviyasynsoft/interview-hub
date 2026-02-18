'use client'

import { DataTable } from '@/_components/ui/data-table'
import { Blog } from '@/redux/services/blog.api'
import { useBlogColumns } from './useColumn'

interface BlogsTableProps {
  data: Blog[]
  isLoading: boolean
  error: any
  onDelete: (blog: Blog) => void
}

export default function BlogsTable({ data, isLoading, error, onDelete }: BlogsTableProps) {
  const columns = useBlogColumns({ onDelete })

  if (isLoading) {
    return <div className="p-8 text-center text-muted-foreground">Loading blogs...</div>
  }

  if (error) {
    return <div className="p-8 text-center text-destructive">Error loading blogs</div>
  }

  return (
    <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
