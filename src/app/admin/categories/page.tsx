'use client'

import { PlusCircle, Search } from 'lucide-react'
import Link from 'next/link'
import paths from '@/navigate/paths'
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/_components/ui/button'
import { Input } from '@/_components/ui/input'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/_components/ui/dialog'
import { useGetCategoriesQuery, useDeleteCategoryMutation, Category } from '@/redux/services/category.api'
import CategoriesTable from '@/_components/features/category/table/CategoriesTable'

export default function CategoriesPage() {
  const { data: categoriesData, isLoading, error } = useGetCategoriesQuery()
  const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation()

  const [searchQuery, setSearchQuery] = useState('')
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null)

  const handleDeleteClick = (category: Category) => {
    setCategoryToDelete(category)
    setDeleteConfirmOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!categoryToDelete) return

    try {
      await deleteCategory(categoryToDelete._id).unwrap()
      setDeleteConfirmOpen(false)
      setCategoryToDelete(null)
    } catch (error) {
      console.error(error)
    }
  }

  const filteredData = categoriesData?.data?.filter((cat) => cat.name.toLowerCase().includes(searchQuery.toLowerCase())) || []

  return (
    <div className="container mx-auto py-10 px-4 md:px-8 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">Manage the technical domains and skills categories.</p>
        </div>
        <Link href={paths.admin.categories.add()}>
          <Button className="gap-2 shadow-lg shadow-primary/20">
            <PlusCircle className="h-4 w-4" />
            Add Category
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-2 max-w-sm mb-4">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search categories..." className="pl-9 h-10 border-muted-foreground/20" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
      </div>

      <CategoriesTable data={filteredData} isLoading={isLoading} error={error} onDelete={handleDeleteClick} />

      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the category
              <span className="font-bold text-foreground mx-1">"{categoryToDelete?.name}"</span>
              and remove it from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete} disabled={isDeleting}>
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
