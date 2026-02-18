import { api } from './api.config'
import { CategoryFormData } from '@/lib/schemas/admin-content'
import { ApiResponse } from '@/types/APIResponse.type'

export interface Category {
  _id: string
  name: string
  description: string
  createdAt?: string
  updatedAt?: string
}

export const categoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<ApiResponse<Category[]>, void>({
      query: () => ({
        url: '/categories',
        method: 'GET',
      }),
      providesTags: (result) => (result ? [...result.data.map(({ _id }) => ({ type: 'Category' as const, id: _id })), { type: 'Category', id: 'LIST' }] : [{ type: 'Category', id: 'LIST' }]),
    }),
    getCategory: builder.query<Category, string>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Category', id }],
    }),
    createCategory: builder.mutation<ApiResponse<Category>, CategoryFormData>({
      query: (body) => ({
        url: '/categories',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    }),
    updateCategory: builder.mutation<ApiResponse<Category>, { id: string; data: CategoryFormData }>({
      query: ({ id, data }) => ({
        url: `/categories/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Category', id },
        { type: 'Category', id: 'LIST' },
      ],
    }),
    deleteCategory: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    }),
  }),
  overrideExisting: false,
})

export const { useGetCategoriesQuery, useGetCategoryQuery, useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation } = categoryApi
