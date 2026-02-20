'use client'

import React, { useState } from 'react'
import { Question } from '@/lib/types'
import { Button } from '@/_components/ui/button'
import { Badge } from '@/_components/ui/badge'
import { Card, CardContent } from '@/_components/ui/card'
import { ChevronDown, ChevronUp, Calendar, Building2, BarChart2, MessageSquareQuote, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MarkdownRenderer } from '@/_components/ui/MarkdownRenderer'

interface QuestionCardProps {
  question: Question
  className?: string
}

export function QuestionCard({ question, className }: QuestionCardProps) {
  const [showAnswer, setShowAnswer] = useState(false)

  return (
    <Card
      className={cn(
        'group relative overflow-hidden transition-all duration-500 hover:shadow-2xl border-border/40 bg-card hover:border-primary/30',
        'before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity',
        className,
      )}
    >
      <CardContent className="p-5 sm:p-6 lg:p-7 relative z-10">
        {/* Header: Company & Difficulty */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 shadow-sm">
              <Building2 className="h-3.5 w-3.5" />
              <span className="text-[11px] font-bold uppercase tracking-wider">{question.company}</span>
            </div>
            <div
              className={cn(
                'flex items-center gap-1.5 px-3 py-1 rounded-full border shadow-sm',
                question.difficulty === 'Easy'
                  ? 'bg-emerald-500/10 text-emerald-600 border-emerald-200/50'
                  : question.difficulty === 'Medium'
                    ? 'bg-amber-500/10 text-amber-600 border-amber-200/50'
                    : 'bg-rose-500/10 text-rose-600 border-rose-200/50',
              )}
            >
              <BarChart2 className="h-3.5 w-3.5" />
              <span className="text-[11px] font-bold uppercase tracking-wider">{question.difficulty}</span>
            </div>
          </div>
          <div className="flex items-center text-[11px] font-semibold text-muted-foreground/80 gap-2 bg-muted/50 px-2.5 py-1 rounded-md self-start sm:self-auto" suppressHydrationWarning>
            <Clock className="h-3.5 w-3.5 opacity-60" />
            {new Date(question.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
        </div>

        {/* Question Section */}
        <div className="flex gap-4 items-start mb-6">
          <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20 ring-4 ring-primary/5">
            <MessageSquareQuote className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/70">Interview Question</p>
            <div className="text-lg sm:text-xl lg:text-2xl font-extrabold text-foreground leading-tight tracking-tight group-hover:text-primary transition-colors duration-300">
              <MarkdownRenderer content={question.question} inline={true} />
            </div>
          </div>
        </div>

        {/* Categories & Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-5 border-t border-border/40">
          <div className="flex flex-wrap gap-2">
            {question.categories.map((cat) => (
              <span
                key={cat}
                className="text-[11px] font-bold text-muted-foreground bg-muted/30 hover:bg-primary/10 hover:text-primary px-3 py-1 rounded-lg transition-all border border-transparent hover:border-primary/20 cursor-default"
              >
                #{cat}
              </span>
            ))}
          </div>

          <Button
            onClick={() => setShowAnswer(!showAnswer)}
            className={cn(
              'w-full sm:w-auto h-11 px-6 font-black uppercase tracking-widest text-[11px] rounded-xl transition-all duration-300 shadow-xl',
              showAnswer ? 'bg-muted text-foreground hover:bg-muted/80 shadow-none' : 'bg-primary text-primary-foreground hover:shadow-primary/40 hover:-translate-y-0.5',
            )}
          >
            {showAnswer ? 'Hide Details' : 'Crack Answer'}
            {showAnswer ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
          </Button>
        </div>

        {/* Animated Answer Content */}
        <div className={cn('grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]', showAnswer ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0 mt-0 invisible')}>
          <div className="overflow-hidden">
            <div className="bg-gradient-to-br from-muted/50 to-muted/20 rounded-2xl p-6 sm:p-8 border border-border/40 space-y-4 shadow-inner">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse shadow-lg shadow-primary/50" />
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground">Detailed Solution</span>
              </div>
              <div className="max-w-none">
                <MarkdownRenderer content={question.answer || ''} className="text-zinc-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
