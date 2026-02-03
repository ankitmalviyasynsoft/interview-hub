
"use client"

import dynamic from "next/dynamic"

interface RichTextEditorProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
}

const RichTextEditorClient = dynamic(
    () => import("./rich-text-editor-client"),
    {
        ssr: false,
        loading: () => <div className="h-[350px] w-full animate-pulse rounded-md bg-muted" />
    }
)

export function RichTextEditor(props: RichTextEditorProps) {
    return <RichTextEditorClient {...props} />
}
