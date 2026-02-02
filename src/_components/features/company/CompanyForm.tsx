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
import { companySchema, CompanyFormData } from "@/lib/schemas/admin-content"
import { Card, CardContent } from "@/_components/ui/card"
import { Building2 } from "lucide-react"

interface CompanyFormProps {
    initialData?: CompanyFormData
    onSubmit: (data: CompanyFormData) => void
    isSubmitting?: boolean
}

export function CompanyForm({
    initialData,
    onSubmit,
    isSubmitting,
}: CompanyFormProps) {
    const form = useForm<CompanyFormData>({
        resolver: zodResolver(companySchema),
        defaultValues: initialData || {
            name: "",
        },
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Card className="border-none shadow-sm bg-muted/30">
                    <CardContent className="p-8 space-y-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-primary/10 p-2 rounded-lg">
                                <Building2 className="h-5 w-5 text-primary" />
                            </div>
                            <h3 className="font-bold">Company Profile</h3>
                        </div>

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Company Identity</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="e.g. Google, Meta, or Start-up name"
                                            className="bg-background h-12 border-muted-foreground/20 text-lg focus:ring-primary transition-all"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                <div className="flex justify-end">
                    <Button size="lg" type="submit" disabled={isSubmitting} className="h-12 px-10 shadow-lg shadow-primary/10">
                        {isSubmitting ? "Saving..." : "Save Company"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
