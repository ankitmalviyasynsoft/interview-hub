'use client'

import { PlusCircle, Search } from 'lucide-react'
import Link from 'next/link'
import paths from '@/navigate/paths'
import { toast } from 'sonner'

import { Button } from '@/_components/ui/button'
import { Input } from '@/_components/ui/input'
import CompanyTable from '@/_components/features/company/table/CompanyTable'
import { useDeleteCompanyMutation, useGetCompaniesQuery, Company } from '@/redux/services/company.api'

export default function StaffCompanyPage() {
  const { data: apiResponse, isLoading, error } = useGetCompaniesQuery()
  const [deleteCompany] = useDeleteCompanyMutation()

  const handleDelete = async (company: Company) => {
    try {
      await deleteCompany(company._id).unwrap()
      toast.success('Company deleted successfully')
    } catch (err) {
      console.error('Failed to delete company:', err)
      toast.error('Failed to delete company')
    }
  }

  const companyData = apiResponse?.data || []

  return (
    <div className="container mx-auto py-10 px-4 md:px-8 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Staff Companies</h1>
          <p className="text-muted-foreground">View and add companies to the platform registry.</p>
        </div>
        <Link href={paths.staffMember.company.add()}>
          <Button className="gap-2 shadow-lg shadow-primary/20">
            <PlusCircle className="h-4 w-4" />
            Add Company
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-2 max-w-sm mb-4">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search companies..." className="pl-9 h-10 border-muted-foreground/20" />
        </div>
      </div>

      <CompanyTable data={companyData} isLoading={isLoading} error={error} onDelete={handleDelete} />
    </div>
  )
}
