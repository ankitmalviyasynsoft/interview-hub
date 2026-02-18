import { DataTable } from '@/_components/ui/data-table'
import { Company } from '@/redux/services/company.api'
import { useCompanyColumns } from './useColumn'

interface CompanyTableProps {
  data: Company[]
  isLoading: boolean
  error: any
  onDelete: (company: Company) => void
}

export default function CompanyTable({ data, isLoading, error, onDelete }: CompanyTableProps) {
  const columns = useCompanyColumns({ onDelete })

  if (isLoading) {
    return <div className="p-8 text-center text-muted-foreground">Loading companies...</div>
  }

  if (error) {
    return <div className="p-8 text-center text-destructive">Error loading companies</div>
  }

  return (
    <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
