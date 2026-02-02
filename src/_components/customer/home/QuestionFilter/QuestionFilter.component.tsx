
'use client';

import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { QuestionFilterState } from '@/lib/types';
import { COMPANIES, CATEGORIES } from '@/lib/dummy-data';
import { ControlledInput } from '@/_components/ui/ControlledInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { Search, RotateCcw } from 'lucide-react';

interface QuestionFilterProps {
    onFilterChange: (filters: QuestionFilterState) => void;
}

export function QuestionFilter({ onFilterChange }: QuestionFilterProps) {
    const { control, handleSubmit, watch, reset } = useForm<QuestionFilterState>({
        defaultValues: {
            search: '',
            company: '',
            category: ''
        }
    });

    const values = watch();
    const [mounted, setMounted] = React.useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            onFilterChange(values);
        }
    }, [values, onFilterChange, mounted]);

    if (!mounted) {
        return null; // Or a skeleton/placeholder to prevent layout shift
    }

    const handleReset = () => {
        reset({
            search: '',
            company: '',
            category: ''
        });
    };

    return (
        <Card className="mb-8 border-border bg-card shadow-sm">
            <CardContent className="p-6">
                <form onSubmit={handleSubmit(() => { })} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
                    <div className="md:col-span-4">
                        <ControlledInput
                            control={control}
                            name="search"
                            label="Search Questions"
                            placeholder="Keywords, skills..."
                        />
                    </div>

                    <div className="md:col-span-3">
                        <Label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Company</Label>
                        <Controller
                            control={control}
                            name="company"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="All Companies" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="null_value">All Companies</SelectItem>
                                        {COMPANIES.map(company => (
                                            <SelectItem key={company} value={company}>{company}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>

                    <div className="md:col-span-3">
                        <Label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Category</Label>
                        <Controller
                            control={control}
                            name="category"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="All Categories" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="null_value">All Categories</SelectItem>
                                        {CATEGORIES.map(category => (
                                            <SelectItem key={category} value={category}>{category}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleReset}
                            className="w-full gap-2 font-semibold"
                        >
                            <RotateCcw className="h-4 w-4" />
                            Reset
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
