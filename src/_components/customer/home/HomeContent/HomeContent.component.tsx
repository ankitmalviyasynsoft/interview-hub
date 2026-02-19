'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { QuestionFilterState } from '@/lib/types'
import { Section } from '@/_components/ui/Section'
import { QuestionCard } from '@/_components/common/QuestionCard/QuestionCard.component'
import { QuestionFilter } from '../QuestionFilter/QuestionFilter.component'
import { Button } from '@/_components/ui/button'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/_components/ui/pagination'
import { Sparkles, ArrowRight, BookOpen, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Question } from '@/lib/types'

interface Company {
  _id: string
  name: string
}

interface Category {
  _id: string
  name: string
}

interface BaseQuestion {
  _id: string
  title: string
  modelAnswer: string
  targetCompanies: Company[]
  categories: Category[]
  complexity: string
  experience: string
  createdAt: string
}

export default function HomeContent() {
  const [filters, setFilters] = useState<QuestionFilterState>({
    search: '',
    company: '',
    category: '',
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(false)
  const [totalItems, setTotalItems] = useState(0)
  const itemsPerPage = 5

  const handleFilterChange = useCallback((newFilters: QuestionFilterState) => {
    setFilters((prev) => {
      const sanitizedFilters = {
        ...newFilters,
        company: newFilters.company === 'null_value' ? '' : newFilters.company,
        category: newFilters.category === 'null_value' ? '' : newFilters.category,
      }

      if (prev.search === sanitizedFilters.search && prev.company === sanitizedFilters.company && prev.category === sanitizedFilters.category) {
        return prev
      }

      return sanitizedFilters
    })
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [filters])

  const fetchQuestions = useCallback(async () => {
    try {
      setLoading(true)
      const queryParams = new URLSearchParams()
      queryParams.append('page', currentPage.toString())
      queryParams.append('limit', itemsPerPage.toString())

      if (filters.search) queryParams.append('search', filters.search)
      if (filters.company) queryParams.append('company', filters.company)
      if (filters.category) queryParams.append('category', filters.category)

      const res = await fetch(`/api/questions?${queryParams.toString()}`)
      const data = await res.json()

      if (data.success) {
        setTotalItems(data.data.total)
        const mappedQuestions: Question[] = data.data.data.map((q: BaseQuestion) => ({
          id: q._id,
          question: q.title,
          answer: q.modelAnswer,
          categories: q.categories?.map((c) => c.name) || [],
          company: q.targetCompanies?.[0]?.name || 'General',
          difficulty: q.complexity.charAt(0).toUpperCase() + q.complexity.slice(1),
          createdAt: q.createdAt,
        }))
        setQuestions(mappedQuestions)
      }
    } catch (error) {
      console.error('Failed to fetch questions:', error)
    } finally {
      setLoading(false)
    }
  }, [currentPage, filters])

  useEffect(() => {
    fetchQuestions()
  }, [fetchQuestions])

  const totalPages = Math.ceil(totalItems / itemsPerPage)

  return (
    <Section className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-primary/10 to-transparent pointer-events-none -z-10" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero Section */}
        <div className="mb-16 pt-8 sm:pt-16 text-center space-y-8">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <Sparkles className="h-4 w-4" />
            <span className="text-xs font-black uppercase tracking-[0.2em]">Interview Hub Premium</span>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-foreground leading-[0.9] lg:leading-[0.85]">
              Accelerate Your <br />
              <span className="text-primary italic relative">
                Career Path
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 25 0 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
              </span>
            </h1>
            <p className="text-lg sm:text-2xl text-muted-foreground font-medium max-w-2xl mx-auto leading-tight pt-4">Master the industry's toughest questions from top-tier companies with full explained solutions.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="w-full sm:w-auto px-10 h-14 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-primary/40 hover:-translate-y-1 transition-all duration-300">
              Start Preparation <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto px-10 h-14 rounded-2xl font-black uppercase tracking-widest text-xs border-2 hover:bg-muted transition-all duration-300">
              Browse Categories <BookOpen className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Filter Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <QuestionFilter onFilterChange={handleFilterChange} />
        </div>

        {/* Questions List */}
        <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-black uppercase tracking-widest flex items-center gap-2">
              Curated Content
              <span className="inline-flex items-center justify-center min-w-8 h-6 px-2 rounded-lg bg-primary text-primary-foreground text-[10px] font-bold">{totalItems}</span>
            </h2>
            <p className="hidden sm:block text-xs font-bold text-muted-foreground uppercase tracking-widest">
              Showing Page {currentPage} of {totalPages || 1}
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : questions.length > 0 ? (
            questions.map((q, idx) => (
              <div key={q.id} className="animate-in fade-in slide-in-from-bottom-8 duration-700" style={{ animationDelay: `${idx * 150}ms`, animationFillMode: 'both' }}>
                <QuestionCard question={q} />
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-32 bg-card/50 backdrop-blur-sm rounded-3xl border-2 border-dashed border-border/40 shadow-inner group">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6 text-muted-foreground group-hover:scale-110 transition-transform duration-500">
                <Search className="h-8 w-8" />
              </div>
              <p className="text-muted-foreground text-xl font-bold mb-6 text-center max-w-xs px-4">Wait! No matches found for these filters.</p>
              <Button variant="default" size="lg" className="px-10 h-12 rounded-xl font-black uppercase tracking-widest text-xs" onClick={() => window.location.reload()}>
                Clear All Filters
              </Button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-20 pb-20">
            <Pagination>
              <PaginationContent className="flex flex-wrap justify-center gap-2">
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className={cn('h-12 w-12 sm:w-auto sm:px-4 rounded-xl font-bold transition-all', currentPage === 1 ? 'pointer-events-none opacity-30' : 'cursor-pointer hover:bg-primary hover:text-primary-foreground')}
                  />
                </PaginationItem>

                <div className="hidden sm:flex items-center gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        isActive={currentPage === i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={cn(
                          'h-12 w-12 rounded-xl font-black text-xs transition-all cursor-pointer',
                          currentPage === i + 1 ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30' : 'hover:bg-primary/10 hover:text-primary',
                        )}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                </div>

                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className={cn(
                      'h-12 w-12 sm:w-auto sm:px-4 rounded-xl font-bold transition-all',
                      currentPage === totalPages ? 'pointer-events-none opacity-30' : 'cursor-pointer hover:bg-primary hover:text-primary-foreground',
                    )}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </Section>
  )
}
