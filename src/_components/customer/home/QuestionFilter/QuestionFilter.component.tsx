'use client'

import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { QuestionFilterState } from '@/lib/types'
import { ControlledInput } from '@/_components/ui/ControlledInput'
import { Button } from '@/_components/ui/button'
import { Badge } from '@/_components/ui/badge'
import { Card, CardContent } from '@/_components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/_components/ui/select'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerFooter, DrawerClose } from '@/_components/ui/drawer'
import { Label } from '@/_components/ui/label'
import { Search, RotateCcw, Filter, X, SlidersHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'

interface QuestionFilterProps {
  onFilterChange: (filters: QuestionFilterState) => void
  companies: { _id: string; name: string }[]
  categories: { _id: string; name: string }[]
  initialFilters: QuestionFilterState
}

export function QuestionFilter({ onFilterChange, companies, categories, initialFilters }: QuestionFilterProps) {
  const { control, handleSubmit, watch, reset } = useForm<QuestionFilterState>({
    defaultValues: initialFilters,
  })

  // Debounced search effect
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const watchedSearch = watch('search')
  const values = watch()

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Sync debounced search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(watchedSearch)
    }, 500)
    return () => clearTimeout(handler)
  }, [watchedSearch])

  // Stability ref for onFilterChange to prevent infinite render loops
  const onFilterChangeRef = React.useRef(onFilterChange)
  useEffect(() => {
    onFilterChangeRef.current = onFilterChange
  }, [onFilterChange])

  // Effect to trigger parent callback
  useEffect(() => {
    if (mounted) {
      onFilterChangeRef.current({
        ...values,
        search: debouncedSearch,
      })
    }
  }, [debouncedSearch, values.company, values.category, mounted])

  if (!mounted) return null

  const handleReset = () => {
    reset({
      search: '',
      company: '',
      category: '',
    })
    onFilterChange({
      search: '',
      company: '',
      category: '',
    })
  }

  const activeFiltersCount = [values.company && values.company !== 'null_value', values.category && values.category !== 'null_value'].filter(Boolean).length

  // MOBILE VIEW: Drawer Search + Drawer Filter
  if (isMobile) {
    return (
      <div className="mb-10 space-y-4 px-1">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Controller
            control={control}
            name="search"
            render={({ field }) => (
              <input
                {...field}
                placeholder="Search industry questions..."
                className="w-full h-14 pl-12 pr-4 bg-card border border-border/50 rounded-2xl shadow-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-sm"
              />
            )}
          />

          <Drawer>
            <DrawerTrigger asChild>
              <Button size="icon" variant="ghost" className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 text-primary hover:bg-primary/10 rounded-xl relative">
                <SlidersHorizontal className="h-5 w-5" />
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center animate-in zoom-in">{activeFiltersCount}</span>
                )}
              </Button>
            </DrawerTrigger>
            <DrawerContent className="bg-background px-4 pb-8 border-none rounded-t-[2.5rem]">
              <DrawerHeader className="text-left px-4 pt-8">
                <DrawerTitle className="text-2xl font-black uppercase tracking-tighter">Advanced Filters</DrawerTitle>
                <p className="text-sm text-muted-foreground">Customize your preparation sequence</p>
              </DrawerHeader>
              <div className="p-4 space-y-8 mt-4">
                <FilterFields control={control} companies={companies} categories={categories} handleReset={handleReset} isDrawer />
              </div>
              <DrawerFooter className="pt-8">
                <DrawerClose asChild>
                  <Button className="w-full h-14 rounded-2xl font-black uppercase shadow-xl shadow-primary/20">Apply Filters</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    )
  }

  // DESKTOP VIEW: Premium Card
  return (
    <Card className="mb-12 border-border/40 bg-card/60 backdrop-blur-xl shadow-2xl shadow-primary/5 p-2 rounded-[2rem] overflow-visible">
      <CardContent className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary shadow-lg shadow-primary/30 text-primary-foreground">
              <SlidersHorizontal className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] leading-none">Filter Library</h2>
              <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold tracking-widest">Global Taxonomy Engine</p>
            </div>
          </div>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-primary/10 text-primary border-primary/20">
              {activeFiltersCount} Filters Active
            </Badge>
          )}
        </div>

        <form onSubmit={handleSubmit(() => {})} className="relative">
          <FilterFields control={control} companies={companies} categories={categories} handleReset={handleReset} />
        </form>
      </CardContent>
    </Card>
  )
}

interface FilterFieldsProps {
  control: any
  companies: { _id: string; name: string }[]
  categories: { _id: string; name: string }[]
  handleReset: () => void
  isDrawer?: boolean
}

const FilterFields = ({ control, companies, categories, handleReset, isDrawer = false }: FilterFieldsProps) => (
  <div className={cn('grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-8 items-end', isDrawer && 'gap-6')}>
    <div className="md:col-span-5 lg:col-span-12 xl:col-span-5">
      <ControlledInput control={control} name="search" label="Search Library" placeholder="Search topics, companies..." className="bg-muted/30 border-border/40 h-12" />
    </div>

    <div className="md:col-span-3 lg:col-span-4 xl:col-span-3">
      <Label className="mb-2.5 block text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/80">Company</Label>
      <Controller
        control={control}
        name="company"
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="w-full h-12 bg-muted/30 border-border/40 rounded-xl">
              <SelectValue placeholder="All Brands" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="null_value">All Brands</SelectItem>
              {companies?.map((company) => (
                <SelectItem key={company._id} value={company.name}>
                  {company.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </div>

    <div className="md:col-span-3 lg:col-span-4 xl:col-span-3">
      <Label className="mb-2.5 block text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/80">Category</Label>
      <Controller
        control={control}
        name="category"
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="w-full h-12 bg-muted/30 border-border/40 rounded-xl">
              <SelectValue placeholder="All Topics" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="null_value">All Topics</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category._id} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </div>

    <div className="md:col-span-1 lg:col-span-4 xl:col-span-1 pt-2 md:pt-0">
      <Button type="button" variant="ghost" onClick={handleReset} className="w-full h-12 gap-2 font-black text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary transition-all rounded-xl">
        <RotateCcw className="h-4 w-4" />
        Reset
      </Button>
    </div>
  </div>
)
