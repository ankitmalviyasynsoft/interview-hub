'use client'

import React, { useEffect, useState } from 'react'
import { QuestionCard } from '@/_components/common/QuestionCard/QuestionCard.component'
import { QuestionFilter } from '../home/QuestionFilter/QuestionFilter.component'
import { Button } from '@/_components/ui/button'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/_components/ui/pagination'
import { Search, ChevronRight, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useQuestionFilter } from '@/hooks/useQuestionFilter'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { MarkdownRenderer } from '@/_components/ui/MarkdownRenderer'

export default function QuestionsContent() {
  const { questions, categories, companies, loading, totalItems, currentPage, totalPages, filters, setFilters } = useQuestionFilter(10)

  const questionIds = React.useMemo(() => questions.map((q) => `question-${q.id}`), [questions])

  const { activeSection, scrollToSection } = useScrollSpy({
    sectionIds: questionIds,
    rootMargin: '-20% 0px -60% 0px',
  })

  // Generate pagination links to avoid overwhelming UI
  const getVisiblePages = () => {
    const delta = 2
    const range = []
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }
    if (currentPage - delta > 2) range.unshift('...')
    if (currentPage + delta < totalPages - 1) range.push('...')
    range.unshift(1)
    if (totalPages > 1) range.push(totalPages)
    return range
  }

  return (
    <div className="min-h-screen bg-background pt-8 pb-12 overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none -z-10" />
      <div className="absolute top-40 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Page Header */}
        <div className="mb-12 text-center flex flex-col items-center justify-center space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-foreground uppercase leading-[0.9]">
            Question <span className="text-primary italic">Library</span>
          </h1>
          <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto">Browse through our comprehensive collection of detailed interview questions.</p>
        </div>

        {/* Global Filter */}
        <div className="mb-12 relative z-20">
          <QuestionFilter onFilterChange={setFilters} companies={companies} categories={categories} initialFilters={filters} />
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative lg:pb-32">
          {/* Left Sidebar Table of Contents */}
          <div className="hidden lg:block lg:col-span-4 sticky top-28 h-[calc(100vh-8rem)]">
            <div className="h-full overflow-y-auto pr-6 pb-20 scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/30">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Contents</h3>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded-md">{totalItems} Total</span>
              </div>

              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((skeleton) => (
                    <div key={skeleton} className="h-16 bg-muted/50 animate-pulse rounded-2xl" />
                  ))}
                </div>
              ) : questions.length > 0 ? (
                <div className="flex flex-col gap-2 relative">
                  {/* Connection Line */}
                  <div className="absolute left-[1.1rem] top-8 bottom-8 w-px bg-border/50 -z-10" />

                  {questions.map((q) => (
                    <button
                      key={q.id}
                      onClick={() => scrollToSection(`question-${q.id}`)}
                      className={cn(
                        'text-left p-4 rounded-3xl transition-all duration-300 group flex items-start gap-4 border border-transparent outline-none ring-0',
                        activeSection === `question-${q.id}` ? 'bg-card shadow-xl shadow-primary/5 border-primary/20 scale-[1.02]' : 'hover:bg-muted/40 text-muted-foreground hover:text-foreground hover:border-border/50',
                      )}
                    >
                      <div
                        className={cn(
                          'mt-[2px] w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors shadow-sm',
                          activeSection === `question-${q.id}` ? 'bg-primary text-primary-foreground' : 'bg-background border border-border group-hover:border-primary/50 group-hover:bg-primary/5',
                        )}
                      >
                        <ChevronRight className={cn('h-3 w-3 transition-transform', activeSection === `question-${q.id}` ? 'translate-x-0.5' : '')} />
                      </div>
                      <span className={cn('text-sm font-bold leading-relaxed line-clamp-3 transition-colors', activeSection === `question-${q.id}` ? 'text-primary' : '')}>
                        <MarkdownRenderer content={q.question} inline={true} />
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-6 bg-muted/30 rounded-3xl border border-dashed border-border/50 text-center">
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">No topics listed.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Main Content */}
          <div className="lg:col-span-8 min-h-[500px]">
            <div className="flex items-center justify-between mb-8 lg:hidden">
              <h2 className="text-lg font-black uppercase tracking-widest flex items-center gap-2">
                Questions
                <span className="inline-flex items-center justify-center h-6 px-3 rounded-xl bg-primary/10 text-primary text-[10px] font-bold border border-primary/20">{totalItems} matches</span>
              </h2>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-40 bg-card/30 rounded-[3rem] border border-border/40 backdrop-blur-sm shadow-xl">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center animate-pulse">
                    <BookOpen className="h-8 w-8 text-primary animate-bounce opacity-80" />
                  </div>
                  <div className="absolute -inset-4 border-2 border-primary/20 rounded-3xl animate-[spin_3s_linear_infinite]" />
                </div>
                <p className="mt-8 text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Fetching Knowledge...</p>
              </div>
            ) : questions.length > 0 ? (
              <div className="space-y-10">
                {questions.map((q, idx) => (
                  <div key={q.id} id={`question-${q.id}`} className="group scroll-mt-36">
                    <div className="flex gap-4 sm:gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000" style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'both' }}>
                      <div className="hidden sm:flex flex-col items-center py-2">
                        <div
                          className={cn(
                            'w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-black shadow-lg shadow-primary/20 transition-all duration-500',
                            activeSection === `question-${q.id}`
                              ? 'bg-primary text-primary-foreground scale-110'
                              : 'bg-card text-muted-foreground border border-border group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110',
                          )}
                        >
                          {(currentPage - 1) * 10 + idx + 1}
                        </div>
                        {idx !== questions.length - 1 && <div className="w-px h-full bg-gradient-to-b from-border/80 to-transparent mt-4 mb-2" />}
                      </div>

                      <div className="flex-1 min-w-0 pb-4">
                        <QuestionCard question={q} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-32 bg-card/60 backdrop-blur-md rounded-[3rem] border-2 border-dashed border-border/40 shadow-2xl shadow-primary/5 group">
                <div className="w-24 h-24 rounded-full bg-background border-4 border-muted flex items-center justify-center mb-8 text-muted-foreground group-hover:scale-110 group-hover:border-primary/20 group-hover:text-primary transition-all duration-500">
                  <Search className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 text-foreground">No matches found</h3>
                <p className="text-muted-foreground text-sm font-medium mb-8 text-center max-w-sm px-4 leading-relaxed">Try adjusting your filters or search terms to uncover more interview questions.</p>
                <Button
                  size="lg"
                  className="px-10 h-14 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all duration-300"
                  onClick={() => (window.location.href = '/questions')}
                >
                  Clear All Filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <div className="pt-16 pb-12 mt-12 border-t border-border/40 flex justify-center lg:justify-start">
                <Pagination>
                  <PaginationContent className="flex flex-wrap items-center gap-2">
                    <PaginationItem>
                      <PaginationPrevious
                        href={`?page=${Math.max(1, currentPage - 1)}`}
                        className={cn(
                          'h-14 px-6 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-sm',
                          currentPage === 1 ? 'pointer-events-none opacity-40 bg-muted/50' : 'cursor-pointer hover:bg-primary hover:text-primary-foreground bg-card border border-border',
                        )}
                      />
                    </PaginationItem>

                    <div className="hidden sm:flex items-center gap-1.5 px-2">
                      {getVisiblePages().map((page, index) => {
                        if (page === '...') {
                          return (
                            <span key={`ellipsis-${index}`} className="px-3 h-14 flex items-center font-black text-lg text-muted-foreground/50 tracking-widest">
                              ...
                            </span>
                          )
                        }
                        return (
                          <PaginationItem key={`page-${page}`}>
                            <PaginationLink
                              isActive={currentPage === page}
                              href={`?page=${page}`}
                              className={cn(
                                'h-14 min-w-14 px-4 rounded-2xl font-black text-sm transition-all cursor-pointer border',
                                currentPage === page
                                  ? 'bg-primary text-primary-foreground border-primary shadow-xl shadow-primary/30 scale-105'
                                  : 'bg-card border-border hover:border-primary/50 hover:bg-primary/5 text-muted-foreground hover:text-foreground',
                              )}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        )
                      })}
                    </div>

                    <PaginationItem>
                      <PaginationNext
                        href={`?page=${Math.min(totalPages, currentPage + 1)}`}
                        className={cn(
                          'h-14 px-6 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-sm',
                          currentPage === totalPages ? 'pointer-events-none opacity-40 bg-muted/50' : 'cursor-pointer hover:bg-primary hover:text-primary-foreground bg-card border border-border',
                        )}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
