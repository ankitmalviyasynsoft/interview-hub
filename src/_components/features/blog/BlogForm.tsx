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
import { RichTextEditor } from "@/_components/ui/rich-text-editor"
import { blogSchema, BlogFormData } from "@/lib/schemas/admin-content"
import { Card, CardContent } from "@/_components/ui/card"
import { Info, FileText, Settings2, Tag } from "lucide-react"
import { MultiSelect } from "@/_components/ui/multi-select"

interface BlogFormProps {
    initialData?: BlogFormData
    onSubmit: (data: BlogFormData) => void
    isSubmitting?: boolean
}

const tagOptions = [
    { label: "Engineering", value: "engineering" },
    { label: "Product", value: "product" },
    { label: "Interview Tips", value: "tips" },
    { label: "Career", value: "career" },
    { label: "Company Culture", value: "culture" },
]

export function BlogForm({
    initialData,
    onSubmit,
    isSubmitting,
}: BlogFormProps) {
    const form = useForm<BlogFormData>({
        resolver: zodResolver(blogSchema),
        defaultValues: initialData || {
            title: "",
            content: "",
            excerpt: "",
            author: "",
            tags: [],
            status: "draft",
        },
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
                {/* Basic Info */}
                <section className="space-y-6">
                    <div className="flex items-center gap-2 text-primary font-semibold">
                        <Info className="h-5 w-5" />
                        <h3>General Information</h3>
                    </div>
                    <Card className="border-none shadow-sm bg-muted/30">
                        <CardContent className="p-6 space-y-6">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Blog Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="e.g. 10 Tips to Crack the Google Interview"
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
                                name="excerpt"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Short Excerpt</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Brief summary for social sharing and previews..."
                                                className="bg-background h-12 border-muted-foreground/20 focus:border-primary transition-all"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>
                </section>

                {/* Content Section */}
                <section className="space-y-6">
                    <div className="flex items-center gap-2 text-primary font-semibold">
                        <FileText className="h-5 w-5" />
                        <h3>Article Content</h3>
                    </div>
                    <Card className="border-none shadow-sm bg-muted/30">
                        <CardContent className="p-6">
                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Main Body</FormLabel>
                                        <FormControl>
                                            <div className="rounded-md border border-muted-foreground/20 bg-background overflow-hidden">
                                                <RichTextEditor
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    placeholder="Write your story here..."
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

                {/* Metadata section */}
                <section className="space-y-6">
                    <div className="flex items-center gap-2 text-primary font-semibold">
                        <Settings2 className="h-5 w-5" />
                        <h3>Metadata & Publishing</h3>
                    </div>
                    <Card className="border-none shadow-sm bg-muted/30">
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <FormField
                                    control={form.control}
                                    name="author"
                                    render={({ field }) => (
                                        <FormItem className="space-y-2">
                                            <FormLabel className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Author Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Admin or Staff Name"
                                                    className="bg-background h-11 border-muted-foreground/20"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem className="space-y-2">
                                            <FormLabel className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Publishing Status</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                value={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="h-11 bg-background border-muted-foreground/20">
                                                        <SelectValue placeholder="Select status" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="draft">Draft</SelectItem>
                                                    <SelectItem value="published">Published</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="md:col-span-2">
                                    <FormField
                                        control={form.control}
                                        name="tags"
                                        render={({ field }) => (
                                            <FormItem className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <Tag className="h-4 w-4 text-muted-foreground" />
                                                    <FormLabel className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Tags</FormLabel>
                                                </div>
                                                <FormControl>
                                                    <MultiSelect
                                                        options={tagOptions}
                                                        selected={field.value || []}
                                                        onChange={field.onChange}
                                                        placeholder="Tag your article..."
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                <div className="flex justify-end pt-4">
                    <Button size="lg" type="submit" disabled={isSubmitting} className="px-12 h-14 text-base font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                        {isSubmitting ? "Processing..." : (initialData ? "Update Post" : "Publish Blog Post")}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
