import { api } from './api.config'
import { BlogFormData } from '@/lib/schemas/admin-content'
import { ApiResponse } from '@/types/APIResponse.type'

export interface Blog {
  _id: string
  title: string
  content: string
  excerpt: string
  author: string
  tags?: string[]
  status: 'draft' | 'published'
  publishDate?: string
  createdAt?: string
  updatedAt?: string
}

export const blogApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query<ApiResponse<Blog[]>, void>({
      query: () => ({
        url: '/blogs',
        method: 'GET',
      }),
      providesTags: (result) => (result ? [...result.data.map(({ _id }) => ({ type: 'Blog' as const, id: _id })), { type: 'Blog', id: 'LIST' }] : [{ type: 'Blog', id: 'LIST' }]),
    }),
    getBlog: builder.query<Blog, string>({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Blog', id }],
    }),
    createBlog: builder.mutation<ApiResponse<Blog>, BlogFormData>({
      query: (body) => ({
        url: '/blogs',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Blog', id: 'LIST' }],
    }),
    updateBlog: builder.mutation<ApiResponse<Blog>, { id: string; data: BlogFormData }>({
      query: ({ id, data }) => ({
        url: `/blogs/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Blog', id },
        { type: 'Blog', id: 'LIST' },
      ],
    }),
    deleteBlog: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Blog', id: 'LIST' }],
    }),
  }),
  overrideExisting: false,
})

export const { useGetBlogsQuery, useGetBlogQuery, useCreateBlogMutation, useUpdateBlogMutation, useDeleteBlogMutation } = blogApi
