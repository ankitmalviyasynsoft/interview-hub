
"use client"

import React, { useMemo } from "react"
import ReactQuill from "react-quill-new"
import "quill/dist/quill.snow.css"

interface RichTextEditorClientProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
}

export default function RichTextEditorClient({
    value,
    onChange,
    placeholder,
}: RichTextEditorClientProps) {
    const modules = useMemo(
        () => ({
            toolbar: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
                [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                ],
                ["link", "image"],
                ["clean"],
            ],
        }),
        []
    )

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "code-block",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
    ]

    return (
        <div className="bg-background">
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                placeholder={placeholder}
                className="h-[300px] mb-12 sm:mb-10"
            />
        </div>
    )
}
