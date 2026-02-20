import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import { cn } from '@/lib/utils'

interface MarkdownRendererProps {
  content: string
  className?: string
  /**
   * If true, removes the surrounding prose container styles.
   * Useful when rendering inline text.
   */
  inline?: boolean
}

export function MarkdownRenderer({ content, className, inline = false }: MarkdownRendererProps) {
  return (
    <div
      className={cn(
        // Common tailwind typography (prose) classes for markdown
        !inline && 'prose prose-sm sm:prose-base dark:prose-invert max-w-none break-words',
        // Typography tweaks to match the theme:
        !inline && 'prose-headings:font-black prose-headings:tracking-tight',
        !inline && 'prose-p:leading-relaxed prose-a:text-primary hover:prose-a:text-primary/80 prose-a:transition-colors',
        !inline && 'prose-strong:font-extrabold prose-strong:text-primary/90',
        !inline && 'prose-ul:list-disc prose-ol:list-decimal',
        className,
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        components={
          inline
            ? {
                // If rendering inline, replace paragraph wrappers with spans to avoid hydration errors
                p: ({ children }) => <span className="inline-block flex-1">{children}</span>,
              }
            : undefined
        }
      >
        {content || ''}
      </ReactMarkdown>
    </div>
  )
}
