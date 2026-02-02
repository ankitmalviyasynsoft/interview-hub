
'use client';

import React, { useState } from 'react';
import { Question } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
    ChevronDown,
    ChevronUp,
    Calendar,
    Building2,
    BarChart2,
    MessageSquareQuote
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuestionCardProps {
    question: Question;
    className?: string;
}

export function QuestionCard({ question, className }: QuestionCardProps) {
    const [showAnswer, setShowAnswer] = useState(false);

    return (
        <Card className={cn(
            "group overflow-hidden transition-all duration-300 hover:shadow-lg border-border/50 bg-card hover:border-primary/20",
            className
        )}>
            <CardContent className="p-4 md:p-5">
                {/* Header: Badges and Date */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="secondary" className="flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-primary/5 text-primary border-primary/10">
                            <Building2 className="h-3 w-3" />
                            {question.company}
                        </Badge>
                        <Badge
                            variant="outline"
                            className={cn(
                                "flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                                question.difficulty === 'Easy' ? 'bg-emerald-500/5 text-emerald-600 border-emerald-200' :
                                    question.difficulty === 'Medium' ? 'bg-amber-500/5 text-amber-600 border-amber-200' :
                                        'bg-rose-500/5 text-rose-600 border-rose-200'
                            )}
                        >
                            <BarChart2 className="h-3 w-3" />
                            {question.difficulty}
                        </Badge>
                    </div>
                    <div className="flex items-center text-[10px] font-medium text-muted-foreground gap-1.5 uppercase tracking-tighter" suppressHydrationWarning>
                        <Calendar className="h-3 w-3 opacity-70" />
                        {new Date(question.createdAt).toLocaleDateString()}
                    </div>
                </div>

                {/* Question */}
                <div className="flex gap-3 items-start mb-4">
                    <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <MessageSquareQuote className="h-4 w-4" />
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-foreground leading-tight group-hover:text-primary transition-colors duration-300">
                        {question.question}
                    </h3>
                </div>

                {/* Footer: Categories and Toggle */}
                <div className="flex items-center justify-between gap-4 border-t border-border/40 pt-4 mt-2">
                    <div className="flex flex-wrap gap-1.5">
                        {question.categories.map((cat) => (
                            <span
                                key={cat}
                                className="text-[10px] font-semibold text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-md hover:bg-muted hover:text-foreground transition-colors"
                            >
                                #{cat}
                            </span>
                        ))}
                    </div>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowAnswer(!showAnswer)}
                        className="h-8 px-3 text-xs font-bold gap-1.5 hover:bg-primary/10 hover:text-primary rounded-full transition-all"
                    >
                        {showAnswer ? 'Hide' : 'Show'}
                        {showAnswer ? (
                            <ChevronUp className="h-3.5 w-3.5" />
                        ) : (
                            <ChevronDown className="h-3.5 w-3.5" />
                        )}
                    </Button>
                </div>

                {/* Answer Content */}
                <div
                    className={cn(
                        "grid transition-all duration-500 ease-in-out",
                        showAnswer ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'
                    )}
                >
                    <div className="overflow-hidden">
                        <div className="bg-muted/30 rounded-xl p-4 border border-border/40 text-sm leading-relaxed text-muted-foreground shadow-inner">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-foreground">Suggested Answer</span>
                            </div>
                            <p className="text-zinc-700 dark:text-zinc-300 font-medium">
                                {question.answer}
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
