import React from 'react'
import { cn } from '@/lib/utils'

interface StickyWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  /**
   * Distance from the top of the viewport when the element becomes sticky.
   * Useful when factoring in fixed navigation headers.
   * Default: 'top-24' (equivalent to 6rem or 96px in Tailwind)
   */
  topOffset?: string
  /**
   * At which breakpoint should the sticky behavior be disabled?
   * Often, sidebars should scroll naturally on mobile.
   * Default: enabled on large screens ('lg:sticky'). Set to 'sticky' to enable always.
   */
  breakpoint?: 'sticky' | 'sm:sticky' | 'md:sticky' | 'lg:sticky' | 'xl:sticky'
  /**
   * If true, restricts the maximum height to the viewport and enables inner scrolling.
   * Perfect for long sidebars.
   */
  scrollable?: boolean
}

export function StickyWrapper({ children, className, topOffset = 'top-24', breakpoint = 'lg:sticky', scrollable = false, ...props }: StickyWrapperProps) {
  return (
    <div
      className={cn(
        // Core sticky behavior
        breakpoint,
        topOffset,
        // Optional inner scroll for elements taller than the viewport
        scrollable && 'max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent',
        // Preserve layout structure (no width collapse)
        'self-start transition-all',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
