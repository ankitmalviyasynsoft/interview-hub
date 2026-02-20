'use client'

import React from 'react'
import { Section } from '@/_components/ui/Section'
import { QuestionCard } from '@/_components/common/QuestionCard/QuestionCard.component'
import { QuestionFilter } from '../QuestionFilter/QuestionFilter.component'
import { Button } from '@/_components/ui/button'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/_components/ui/pagination'
import { Search, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useQuestionFilter } from '@/hooks/useQuestionFilter'

export default function HomeContent() {
  const { questions, categories, companies, loading, totalItems, currentPage, totalPages, filters, setFilters } = useQuestionFilter(5)

  return (
    <Section className="min-h-screen bg-background relative overflow-clip">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero Section */}
        <div className="mb-16 pt-8 sm:pt-16 text-center space-y-8">
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black tracking-tighter text-foreground leading-[0.9] lg:leading-[0.85]">
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
        </div>

        {/* Filter Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <QuestionFilter onFilterChange={setFilters} companies={companies} categories={categories} initialFilters={filters} />
        </div>

        {/* Questions List */}
        <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-black uppercase tracking-widest flex items-center gap-2">
              Curated Content
              <span className="mr-4 inline-flex items-center justify-center min-w-10 h-10 px-2 rounded-full bg-primary text-primary-foreground font-bold text-xs">{totalItems}</span>
            </h2>
            <div className="flex items-center gap-4">
              <p className="hidden sm:block text-xs font-bold text-muted-foreground uppercase tracking-widest">
                Showing Page {currentPage} of {totalPages || 1}
              </p>
              <Button asChild variant="outline" size="sm" className="rounded-xl border-primary/20 text-xs font-bold uppercase tracking-widest hover:bg-primary/5 hover:text-primary">
                <Link href="/questions">
                  View All <ArrowRight className="ml-2 h-3 w-3" />
                </Link>
              </Button>
            </div>
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
                    href={`?page=${Math.max(1, currentPage - 1)}`}
                    className={cn('h-12 w-12 sm:w-auto sm:px-4 rounded-xl font-bold transition-all', currentPage === 1 ? 'pointer-events-none opacity-30' : 'cursor-pointer hover:bg-primary hover:text-primary-foreground')}
                  />
                </PaginationItem>

                <div className="hidden sm:flex items-center gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        isActive={currentPage === i + 1}
                        href={`?page=${i + 1}`}
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
                    href={`?page=${Math.min(totalPages, currentPage + 1)}`}
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
