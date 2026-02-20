import { useState, useEffect, useCallback, useRef } from 'react'

interface UseScrollSpyOptions {
  /**
   * Root margin for the IntersectionObserver.
   * Default: '-20% 0px -60% 0px'
   */
  rootMargin?: string
  /**
   * The IDs of the DOM elements to observe.
   */
  sectionIds: string[]
  /**
   * Optional initial active section.
   */
  initialActiveId?: string | null
}

export function useScrollSpy({ sectionIds, rootMargin = '-20% 0px -60% 0px', initialActiveId = null }: UseScrollSpyOptions) {
  const [activeSection, setActiveSection] = useState<string | null>(initialActiveId)
  // Track manual scrolling to temporarily pause the observer updates
  const isManualScrolling = useRef(false)
  const manualScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Return early if no IDs or if running on server
    if (!sectionIds.length || typeof window === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        // If the user manually clicked a link, don't let the observer overwrite it immediately
        if (isManualScrolling.current) return

        // Find the top-most intersecting entry
        const intersectingEntries = entries.filter((entry) => entry.isIntersecting)
        if (intersectingEntries.length > 0) {
          // In some edge cases with small margins, you might get multiple intersecting,
          // usually the first one or the one with highest intersection ratio is desired.
          setActiveSection(intersectingEntries[0].target.id)
        }
      },
      { rootMargin },
    )

    // Observe all provided section IDs
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sectionIds, rootMargin])

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) {
      // Prevents the intersection observer from flipping the active state mid-scroll
      isManualScrolling.current = true
      setActiveSection(id)
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })

      // Clear existing timeout if multiple clicks happen quickly
      if (manualScrollTimeoutRef.current) {
        clearTimeout(manualScrollTimeoutRef.current)
      }

      // Re-enable observer updates after scroll animation roughly finishes
      manualScrollTimeoutRef.current = setTimeout(() => {
        isManualScrolling.current = false
      }, 800)
    }
  }, [])

  return { activeSection, scrollToSection }
}
