"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/_components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/_components/ui/form"
import { Input } from "@/_components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/_components/ui/select"
import { MultiSelect, Option } from "@/_components/ui/multi-select"
import { RichTextEditor } from "@/_components/ui/rich-text-editor"
import { questionSchema, QuestionFormData } from "@/lib/schemas/admin-content"
import { Card, CardContent } from "@/_components/ui/card"
import { Separator } from "@/_components/ui/separator"
import { Sparkles, Info, Settings2 } from "lucide-react"

interface QuestionFormProps {
    initialData?: QuestionFormData
    companies: Option[]
    categories: Option[]
    onSubmit: (data: QuestionFormData) => void
    isSubmitting?: boolean
}

export function QuestionForm({
    initialData,
    companies,
    categories,
    onSubmit,
    isSubmitting,
}: QuestionFormProps) {
    const form = useForm<QuestionFormData>({
        resolver: zodResolver(questionSchema),
        defaultValues: initialData || {
            question: "",
            answer: "",
            companyIds: [],
            categoryIds: [],
            difficulty: "easy",
            level: "entry",
        },
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
                {/* Basic Information Section */}
                <section className="space-y-6">
                    <div className="flex items-center gap-2 text-primary font-semibold">
                        <Info className="h-5 w-5" />
                        <h3>Basic Content</h3>
                    </div>
                    <Card className="border-none shadow-sm bg-muted/30">
                        <CardContent className="p-6 space-y-6">
                            <FormField
                                control={form.control}
                                name="question"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Question Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="e.g. Explain the concept of Closures in Javascript"
                                                className="bg-background h-12 border-muted-foreground/20 focus:border-primary transition-all"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="answer"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Modal Answer</FormLabel>
                                        <FormControl>
                                            <div className="rounded-md border border-muted-foreground/20 bg-background overflow-hidden">
                                                <RichTextEditor
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    placeholder="Provide a comprehensive and accurate answer..."
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>
                </section>

                {/* Classification Section */}
                <section className="space-y-6">
                    <div className="flex items-center gap-2 text-primary font-semibold">
                        <Sparkles className="h-5 w-5" />
                        <h3>Categorization</h3>
                    </div>
                    <Card className="border-none shadow-sm bg-muted/30">
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <FormField
                                    control={form.control}
                                    name="companyIds"
                                    render={({ field }) => (
                                        <FormItem className="space-y-2">
                                            <FormLabel className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Target Companies</FormLabel>
                                            <FormControl>
                                                <MultiSelect
                                                    options={companies}
                                                    selected={field.value}
                                                    onChange={field.onChange}
                                                    placeholder="Select one or more companies..."
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="categoryIds"
                                    render={({ field }) => (
                                        <FormItem className="space-y-2">
                                            <FormLabel className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Categories & Skills</FormLabel>
                                            <FormControl>
                                                <MultiSelect
                                                    options={categories}
                                                    selected={field.value}
                                                    onChange={field.onChange}
                                                    placeholder="Select relevant categories..."
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Difficulty Section */}
                <section className="space-y-6">
                    <div className="flex items-center gap-2 text-primary font-semibold">
                        <Settings2 className="h-5 w-5" />
                        <h3>Level & Difficulty</h3>
                    </div>
                    <Card className="border-none shadow-sm bg-muted/30">
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <FormField
                                    control={form.control}
                                    name="difficulty"
                                    render={({ field }) => (
                                        <FormItem className="space-y-2">
                                            <FormLabel className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Complexity Level</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                value={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="h-11 bg-background border-muted-foreground/20">
                                                        <SelectValue placeholder="Select difficulty" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="easy">Easy</SelectItem>
                                                    <SelectItem value="medium">Medium</SelectItem>
                                                    <SelectItem value="hard">Hard</SelectItem>
                                                    <SelectItem value="super hard">Super Hard</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="level"
                                    render={({ field }) => (
                                        <FormItem className="space-y-2">
                                            <FormLabel className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Experience Breadth</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                value={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="h-11 bg-background border-muted-foreground/20">
                                                        <SelectValue placeholder="Select level" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="entry">Entry Level</SelectItem>
                                                    <SelectItem value="junior">Junior Role</SelectItem>
                                                    <SelectItem value="mid">Mid-Level</SelectItem>
                                                    <SelectItem value="senior">Senior Level</SelectItem>
                                                    <SelectItem value="expert">Expert / Architect</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </section>

                <div className="flex justify-end pt-4">
                    <Button size="lg" type="submit" disabled={isSubmitting} className="px-12 h-14 text-base font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                        {isSubmitting ? "Processing..." : "Submit Question"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
