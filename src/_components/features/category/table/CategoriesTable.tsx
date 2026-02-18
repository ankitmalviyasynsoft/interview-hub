import { DataTable } from '@/_components/ui/data-table'
import { Category } from '@/redux/services/category.api'
import { useCategoryColumns } from './useColumn'

interface CategoriesTableProps {
  data: Category[]
  isLoading: boolean
  error: any
  onDelete: (category: Category) => void
}

export default function CategoriesTable({ data, isLoading, error, onDelete }: CategoriesTableProps) {
  const columns = useCategoryColumns({ onDelete })

  if (isLoading) {
    return <div className="p-8 text-center text-muted-foreground">Loading categories...</div>
  }

  if (error) {
    return <div className="p-8 text-center text-destructive">Error loading categories</div>
  }

  return (
    <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
