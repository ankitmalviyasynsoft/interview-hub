
'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { QuestionFilterState } from '@/lib/types';
import { DUMMY_QUESTIONS } from '@/lib/dummy-data';
import { Section } from '@/_components/ui/Section';
import { QuestionCard } from '@/_components/common/QuestionCard/QuestionCard.component';
import { QuestionFilter } from '../QuestionFilter/QuestionFilter.component';
import { Button } from '@/components/ui/button';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Sparkles } from 'lucide-react';

export default function HomeContent() {
    const [filters, setFilters] = useState<QuestionFilterState>({
        search: '',
        company: '',
        category: ''
    });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const handleFilterChange = useCallback((newFilters: QuestionFilterState) => {
        // Handle the "null_value" from shadcn select
        const sanitizedFilters = {
            ...newFilters,
            company: newFilters.company === 'null_value' ? '' : newFilters.company,
            category: newFilters.category === 'null_value' ? '' : newFilters.category,
        };
        setFilters(sanitizedFilters);
        setCurrentPage(1);
    }, []);

    const filteredQuestions = useMemo(() => {
        return DUMMY_QUESTIONS.filter(q => {
            const matchesSearch = q.question.toLowerCase().includes(filters.search.toLowerCase()) ||
                q.answer.toLowerCase().includes(filters.search.toLowerCase());
            const matchesCompany = filters.company ? q.company === filters.company : true;
            const matchesCategory = filters.category ? q.categories.includes(filters.category) : true;

            return matchesSearch && matchesCompany && matchesCategory;
        });
    }, [filters]);

    const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);
    const displayedQuestions = filteredQuestions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <Section className="min-h-screen bg-background/50">
            <div className="mb-12 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4 border border-primary/20">
                    <Sparkles className="h-3.5 w-3.5" />
                    Interview Readiness
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6">
                    Master Your <span className="text-primary italic">Interviews</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Study curated questions from top-tier tech companies. Level up your career with practice.
                </p>
            </div>

            <div className="max-w-3xl mx-auto">
                <QuestionFilter onFilterChange={handleFilterChange} />
            </div>

            <div className="space-y-6 max-w-3xl mx-auto">
                {displayedQuestions.length > 0 ? (
                    displayedQuestions.map(q => (
                        <QuestionCard key={q.id} question={q} />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 bg-card rounded-2xl border border-dashed border-border shadow-inner">
                        <p className="text-muted-foreground text-lg font-medium mb-4">No questions match your current filters.</p>
                        <Button
                            variant="default"
                            onClick={() => window.location.reload()}
                        >
                            Reset All Filters
                        </Button>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-16">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                />
                            </PaginationItem>

                            {Array.from({ length: totalPages }).map((_, i) => (
                                <PaginationItem key={i}>
                                    <PaginationLink
                                        isActive={currentPage === i + 1}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className="cursor-pointer"
                                    >
                                        {i + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </Section>
    );
}
