import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { Question, QuestionFilterState } from '@/lib/types'
import { BaseQuestion, Category, Company } from '@/_components/customer/home/HomeContent/HomeContent.type'

interface UseQuestionFilterReturn {
  questions: Question[]
  categories: Category[]
  companies: Company[]
  loading: boolean
  totalItems: number
  currentPage: number
  totalPages: number
  filters: QuestionFilterState
  setFilter: (key: keyof QuestionFilterState, value: string) => void
  setFilters: (filters: QuestionFilterState) => void
  setPage: (page: number) => void
  resetFilters: () => void
}

export const useQuestionFilter = (itemsPerPage: number = 5): UseQuestionFilterReturn => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // State
  const [questions, setQuestions] = useState<Question[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(false)
  const [totalItems, setTotalItems] = useState(0)

  // Derived state
  const currentPage = Number(searchParams.get('page')) || 1

  const filters = React.useMemo<QuestionFilterState>(
    () => ({
      search: searchParams.get('search') || '',
      company: searchParams.get('company') || '',
      category: searchParams.get('category') || '',
    }),
    [searchParams],
  )

  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1

  const abortControllerRef = useRef<AbortController | null>(null)
  const initFetch = useRef(false)

  // Fetch Filters (Categories & Companies)
  useEffect(() => {
    const fetchFilters = async () => {
      if (initFetch.current) return
      initFetch.current = true

      try {
        const [catRes, compRes] = await Promise.all([fetch('/api/categories'), fetch('/api/companies')])
        const catData = await catRes.json()
        const compData = await compRes.json()

        if (catData.success) setCategories(catData.data.data)
        if (compData.success) setCompanies(compData.data.data)
      } catch (error) {
        console.error('Failed to fetch filters:', error)
      }
    }
    fetchFilters()
  }, [])

  // Fetch Questions
  const fetchQuestions = useCallback(async () => {
    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    const controller = new AbortController()
    abortControllerRef.current = controller

    try {
      setLoading(true)
      const queryParams = new URLSearchParams()
      queryParams.append('page', currentPage.toString())
      queryParams.append('limit', itemsPerPage.toString())

      if (filters.search) queryParams.append('search', filters.search)
      if (filters.company) queryParams.append('company', filters.company)
      if (filters.category) queryParams.append('category', filters.category)

      const res = await fetch(`/api/questions?${queryParams.toString()}`, {
        signal: controller.signal,
      })
      const data = await res.json()

      if (data.success) {
        setTotalItems(data.data.total)
        const mappedQuestions: Question[] = data.data.data.map((q: BaseQuestion) => ({
          id: q._id,
          question: q.title,
          answer: q.modelAnswer,
          categories: q.categories?.map((c) => c.name) || [],
          company: q.targetCompanies?.[0]?.name || 'General',
          difficulty: q.complexity ? q.complexity.charAt(0).toUpperCase() + q.complexity.slice(1) : 'Medium',
          createdAt: q.createdAt,
        }))
        setQuestions(mappedQuestions)
      }
    } catch (error: any) {
      if (error.name === 'AbortError') return
      console.error('Failed to fetch questions:', error)
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false)
      }
    }
  }, [currentPage, filters.search, filters.company, filters.category, itemsPerPage])

  // Trigger fetch when URL params change
  useEffect(() => {
    fetchQuestions()
  }, [fetchQuestions])

  // URL Helper
  const updateUrl = useCallback(
    (newParams: URLSearchParams) => {
      const newQuery = newParams.toString()
      const currentQuery = searchParams.toString()

      if (newQuery !== currentQuery) {
        router.push(`${pathname}?${newQuery}`, { scroll: false })
      }
    },
    [pathname, router, searchParams],
  )

  // Actions
  const setFilter = useCallback(
    (key: keyof QuestionFilterState, value: string) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()))

      if (value && value !== 'null_value') {
        current.set(key, value)
      } else {
        current.delete(key)
      }

      // Reset to page 1 on filter change
      current.set('page', '1')
      updateUrl(current)
    },
    [searchParams, updateUrl],
  )

  const setFilters = useCallback(
    (newFilters: QuestionFilterState) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()))

      Object.entries(newFilters).forEach(([key, value]) => {
        if (value && value !== 'null_value') {
          current.set(key, value)
        } else {
          current.delete(key)
        }
      })

      current.set('page', '1')
      updateUrl(current)
    },
    [searchParams, updateUrl],
  )

  const setPage = useCallback(
    (page: number) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()))
      current.set('page', page.toString())
      updateUrl(current)
    },
    [searchParams, updateUrl],
  )

  const resetFilters = useCallback(() => {
    router.push(pathname, { scroll: false })
  }, [pathname, router])

  return {
    questions,
    categories,
    companies,
    loading,
    totalItems,
    currentPage,
    totalPages,
    filters,
    setFilter,
    setFilters,
    setPage,
    resetFilters,
  }
}
